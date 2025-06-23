document.addEventListener('DOMContentLoaded', function() {
            // --- ELEMEN DOM ---
            const greetingEl = document.getElementById('greeting');
            const input1 = document.getElementById('input1');
            const input2 = document.getElementById('input2');
            const swapButton = document.getElementById('swap-button');
            const label1 = document.getElementById('label1');
            const label2 = document.getElementById('label2');
            const serviceTabs = document.querySelectorAll('.service-selector .nav-link');
            const noteSection = document.getElementById('note-section');

            // --- PARAMETER RUMUS ---
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
            
            // --- STATE (KONDISI AWAL) ---
            let currentService = 'bike'; // 'bike' atau 'car'
            let isDistanceToFare = true; // true = Jarak -> Tarif

            // --- FUNGSI ---
            function setGreeting() {
                const hour = new Date().getHours();
                greetingEl.textContent = hour >= 5 && hour < 12 ? 'Selamat Pagi, Semangat Cari Orderan!' :
                                     hour >= 12 && hour < 15 ? 'Selamat Siang, Semangat Cari Orderan!' :
                                     hour >= 15 && hour < 18 ? 'Selamat Sore, Semangat Cari Orderan!' :
                                     'Selamat Malam, Semangat Cari Orderan!';
            }

            function updateNote() {
                const p = params[currentService];
                noteSection.innerHTML = `
                    <p class="small text-secondary">
                        <strong>NB:</strong> Tarif ini adalah <strong>estimasi</strong> untuk layanan ${p.serviceName} di Yogyakarta, dihitung berdasarkan formula:
                        <br>
                        <code>${p.formulaText}</code>
                        <br>
                        Dengan penerapan tarif minimal <strong>Rp ${new Intl.NumberFormat('id-ID').format(p.minFare)}</strong>. Harga final di aplikasi bisa sedikit berbeda.
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

                    const calculatedFare = (distance * p.rate) + p.adjustment;
                    const finalFare = Math.max(calculatedFare, p.minFare);
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
                    const calculatedDistance = (fare - p.adjustment) / p.rate;
                    input2.value = calculatedDistance.toFixed(1);
                }
            }

            function swapCalculation() {
                isDistanceToFare = !isDistanceToFare;
                input1.value = '';
                input2.value = '';

                const label1Text = isDistanceToFare ? 'Jarak Perjalanan' : 'Budget Tarif';
                const label2Text = isDistanceToFare ? 'Estimasi Tarif' : 'Estimasi Jarak';
                const placeholder = isDistanceToFare ? 'Contoh: 4.5' : `Contoh: ${params[currentService].minFare + 5000}`;
                
                label1.textContent = label1Text;
                label2.textContent = label2Text;
                input1.placeholder = placeholder;
            }

            // --- EVENT LISTENERS ---
            serviceTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    currentService = tab.getAttribute('data-service');
                    input1.value = '';
                    input2.value = '';
                    updateNote();
                    calculate(); // Recalculate if there's any value
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

            // Inisialisasi awal
            setGreeting();
            updateNote();
        });