 document.addEventListener('DOMContentLoaded', function() {
            const greetingEl = document.getElementById('greeting');
            const input1 = document.getElementById('input1');
            const input2 = document.getElementById('input2');
            const swapButton = document.getElementById('swap-button');
            const label1 = document.getElementById('label1');
            const label2 = document.getElementById('label2');
            const serviceTabs = document.querySelectorAll('.service-selector .nav-link');
            const noteSection = document.getElementById('note-section');

            const params = {
                bike: {
                    rate: 2400,
                    adjustment: -1800,
                    minFare: 8900,
                    formulaText: '(Jarak &times; Rp 2.400) - Rp 1.800',
                    serviceName: 'Maxim Bike'
                },
                car: {
                    rate: 4150,
                    adjustment: 3100,
                    minFare: 12100,
                    formulaText: '(Jarak &times; Rp 4.150) + Rp 3.100',
                    serviceName: 'Maxim Car'
                }
            };
            
            let currentService = 'bike';
            let isDistanceToFare = true;

            function setGreeting() {
                const hour = new Date().getHours();
                const greetingText = hour >= 5 && hour < 12 ? 'Selamat Pagi' :
                                     hour >= 12 && hour < 15 ? 'Selamat Siang' :
                                     hour >= 15 && hour < 18 ? 'Selamat Sore' :
                                     'Selamat Malam';
                greetingEl.textContent = `${greetingText}, Semangat Cari Orderan!`;
            }

            function updateNote() {
                const p = params[currentService];
                noteSection.innerHTML = `
                    <p class="small text-secondary">
                        <strong>NB:</strong> Tarif ini adalah <strong>estimasi</strong> untuk layanan ${p.serviceName} di Yogyakarta.
                        <br>
                        - Tarif minimal <strong>Rp ${new Intl.NumberFormat('id-ID').format(p.minFare)}</strong> (untuk jarak 0-3 km).
                        <br>
                        - Jarak di atas 3 km dihitung dengan formula dan bisa sedikit berbeda dari harga final di aplikasi.
                    </p>`;
            }

            function calculate() {
                const p = params[currentService];

                if (isDistanceToFare) {
                    const standardizedValue = input1.value.replace(',', '.');
                    const distance = parseFloat(standardizedValue);
                    
                    if (isNaN(distance) || distance <= 0) {
                        input2.value = ''; return;
                    }

                    let finalFare;

                    // ==========================================================
                    // --- PERBAIKAN LOGIKA ADA DI SINI ---
                    // Terapkan tarif flat untuk Maxim Car di bawah 3 km
                    if (currentService === 'car' && distance <= 3) {
                        finalFare = p.minFare;
                    } else {
                        // Gunakan rumus standar untuk kasus lain
                        const calculatedFare = (distance * p.rate) + p.adjustment;
                        finalFare = Math.max(calculatedFare, p.minFare);
                    }
                    // ==========================================================
                    
                    const roundedFare = Math.ceil(finalFare / 100) * 100;
                    input2.value = new Intl.NumberFormat('id-ID').format(roundedFare);
                } else {
                    const fare = parseFloat(input1.value.replace(/[^0-9]/g, ''));
                    if (isNaN(fare)) {
                        input2.value = ''; return;
                    }
                    if (fare < p.minFare) {
                        input2.value = `Tarif min. Rp ${new Intl.NumberFormat('id-ID').format(p.minFare)}`;
                        return;
                    }
                    // Logika kebalikan rumus
                    // Jika tarif sama dengan tarif minimal, kita tidak bisa pastikan jaraknya
                    if (fare === p.minFare && currentService === 'car') {
                        input2.value = '~ 0 - 3'; // Beri estimasi rentang
                        return;
                    }
                    const calculatedDistance = (fare - p.adjustment) / p.rate;
                    input2.value = calculatedDistance.toFixed(1);
                }
            }

            function swapCalculation() {
                isDistanceToFare = !isDistanceToFare;
                input1.value = '';
                input2.value = '';
                label1.textContent = isDistanceToFare ? 'Jarak Perjalanan' : 'Budget Tarif';
                label2.textContent = isDistanceToFare ? 'Estimasi Tarif' : 'Estimasi Jarak';
                input1.placeholder = isDistanceToFare ? 'Contoh: 4.5' : `Contoh: ${params[currentService].minFare + 5000}`;
            }

            serviceTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    currentService = tab.getAttribute('data-service');
                    input1.value = '';
                    input2.value = '';
                    updateNote();
                });
            });
            
            input1.addEventListener('input', calculate);
            input1.addEventListener('keyup', function(e) {
                if (!isDistanceToFare) {
                    let value = parseInt(this.value.replace(/[^,\d]/g, ''));
                    this.value = isNaN(value) ? "" : new Intl.NumberFormat('id-ID').format(value);
                }
            });
            swapButton.addEventListener('click', swapCalculation);

            setGreeting();
            updateNote();
        });