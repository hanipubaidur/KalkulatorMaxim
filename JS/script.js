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
                bike: { minFare: 8900 },
                car: { minFare: 12100 }
            };
            
            let currentService = 'bike';
            let isDistanceToFare = true;

            function setGreeting() {
                const hour = new Date().getHours();
                const greetingText = hour >= 5 && hour < 12 ? 'Selamat Pagi' : hour >= 12 && hour < 15 ? 'Selamat Siang' : hour >= 15 && hour < 18 ? 'Selamat Sore' : 'Selamat Malam';
                greetingEl.textContent = `${greetingText}, Semangat Cari Orderan!`;
            }

            // --- FUNGSI 'updateNote' YANG DISEMPURNAKAN ---
            function updateNote() {
                let noteContent = `
                    <p class="small text-secondary mb-0">
                        <strong>Penting:</strong> Kalkulator ini adalah <i>tool independen</i> dan bukan aplikasi resmi dari Maxim. 
                        Perhitungan tarif di bawah ini adalah <strong>hasil estimasi</strong> yang didasarkan pada analisis puluhan data orderan nyata di area Yogyakarta.
                    </p>
                    <hr class="my-2">
                    <p class="small text-secondary mb-1">
                `;

                if (currentService === 'bike') {
                    noteContent += `
                        Layanan <strong>Bike</strong> diestimasi menggunakan <strong>formula progresif tunggal</strong>:
                        <br>
                        <code>(Jarak &times; Rp 2.400) - Rp 1.800</code>, dengan tarif minimal <strong>Rp 8.900</strong>.
                    `;
                } else {
                    noteContent += `
                        Layanan <strong>Car</strong> diestimasi menggunakan <strong>model presisi 3-lapis</strong>:
                        <ul class="mb-0 ps-3">
                            <li><strong>0-3 km:</strong> Tarif flat <strong>Rp 12.100</strong>.</li>
                            <li><strong>3.1-9 km:</strong> <code>Rp 625 + (Jarak &times; Rp 4.200)</code>.</li>
                            <li><strong>>9 km:</strong> <code>Rp 3.200 + (Jarak &times; Rp 4.140)</code>.</li>
                        </ul>
                    `;
                }

                noteContent += `
                    </p>
                    <p class="small text-danger mt-2 fst-italic">
                        *Tarif final di aplikasi resmi dapat berbeda karena faktor jam sibuk (surge price) dan kondisi lalu lintas.
                    </p>
                `;
                noteSection.innerHTML = noteContent;
            }

            function calculate() {
                if (isDistanceToFare) {
                    const standardizedValue = input1.value.replace(',', '.');
                    const distance = parseFloat(standardizedValue);
                    if (isNaN(distance) || distance <= 0) { input2.value = ''; return; }

                    let finalFare = 0;
                    if (currentService === 'bike') {
                        const calculatedFare = (distance * 2400) - 1800;
                        finalFare = Math.max(calculatedFare, params.bike.minFare);
                    } else { // Layanan Car dengan Sistem 3 Lapis
                        if (distance <= 3) {
                            finalFare = params.car.minFare;
                        } else if (distance > 3 && distance <= 9) {
                            finalFare = 625 + (distance * 4200);
                        } else { // distance > 9
                            finalFare = 3200 + (distance * 4140);
                        }
                    }
                    const roundedFare = Math.ceil(finalFare / 100) * 100;
                    input2.value = new Intl.NumberFormat('id-ID').format(roundedFare);
                } else {
                    const fare = parseFloat(input1.value.replace(/[^0-9]/g, ''));
                    if (isNaN(fare)) { input2.value = ''; return; }
                    
                    const p = params[currentService];
                    if (fare < p.minFare) {
                        input2.value = `Tarif min. Rp ${new Intl.NumberFormat('id-ID').format(p.minFare)}`;
                        return;
                    }

                    let estimatedDistance = 0;
                    if(currentService === 'bike') {
                        estimatedDistance = (fare + 1800) / 2400;
                    } else {
                         if (fare === 12100) { input2.value = '~ 0 - 3'; return; }
                         // Menggunakan estimasi terbalik dari rumus lapis 2 & 3
                         if (fare <= 40000) { // Asumsi tarif di bawah 40rb masuk lapis 2
                            estimatedDistance = (fare - 625) / 4200;
                         } else { // Asumsi tarif di atas 40rb masuk lapis 3
                            estimatedDistance = (fare - 3200) / 4140;
                         }
                    }
                    input2.value = Math.max(0, estimatedDistance).toFixed(1);
                }
            }

            function swapCalculation() {
                isDistanceToFare = !isDistanceToFare;
                [input1.value, input2.value] = ['', ''];
                label1.textContent = isDistanceToFare ? 'Jarak Perjalanan' : 'Budget Tarif';
                label2.textContent = isDistanceToFare ? 'Estimasi Tarif' : 'Estimasi Jarak';
                input1.placeholder = isDistanceToFare ? 'Contoh: 4.5' : `Contoh: 25000`;
            }

            serviceTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    document.querySelector('.service-selector .nav-link.active').classList.remove('active');
                    tab.classList.add('active');
                    currentService = tab.getAttribute('data-service');
                    [input1.value, input2.value] = ['', ''];
                    updateNote();
                });
            });
            
            input1.addEventListener('input', calculate);
            swapButton.addEventListener('click', swapCalculation);
            setGreeting();
            updateNote();
        });