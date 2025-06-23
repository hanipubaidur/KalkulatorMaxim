document.addEventListener('DOMContentLoaded', function() {
            // --- ELEMEN DOM ---
            const greetingEl = document.getElementById('greeting');
            const input1 = document.getElementById('input1');
            const input2 = document.getElementById('input2');
            const swapButton = document.getElementById('swap-button');
            const label1 = document.getElementById('label1');
            const label2 = document.getElementById('label2');
            const icon1 = document.getElementById('icon1');
            const icon2 = document.getElementById('icon2');
            const unit1 = document.getElementById('unit1');
            const unit2 = document.getElementById('unit2');

            // --- STATE (KONDISI AWAL) ---
            let isDistanceToFare = true; // true = Jarak -> Tarif, false = Tarif -> Jarak

            // --- FUNGSI ---

            // 1. Fungsi Sapaan Selamat Pagi/Siang/Sore/Malam
            function setGreeting() {
                const hour = new Date().getHours();
                let greetingText = 'Selamat Malam';
                if (hour >= 5 && hour < 12) {
                    greetingText = 'Selamat Pagi';
                } else if (hour >= 12 && hour < 15) {
                    greetingText = 'Selamat Siang';
                } else if (hour >= 15 && hour < 18) {
                    greetingText = 'Selamat Sore';
                }
                greetingEl.textContent = `${greetingText}, Semangat Cari Orderan!`;
            }
            
            // 2. Fungsi Kalkulasi Utama
            function calculate() {
                if (isDistanceToFare) {
                    // Mode: Jarak -> Tarif (Handle desimal dengan koma atau titik)
                    const standardizedValue = input1.value.replace(',', '.');
                    const distance = parseFloat(standardizedValue);
                    
                    if (isNaN(distance) || distance <= 0) {
                        input2.value = '';
                        return;
                    }

                    const calculatedFare = (distance * 2400) - 1800;
                    const finalFare = Math.max(calculatedFare, 8900);
                    const roundedFare = Math.ceil(finalFare / 100) * 100;
                    
                    input2.value = new Intl.NumberFormat('id-ID').format(roundedFare);

                } else {
                    // Mode: Tarif -> Jarak
                    const fare = parseFloat(input1.value.replace(/[^0-9]/g, ''));
                    
                    if (isNaN(fare)) {
                        input2.value = '';
                        return;
                    }

                    if (fare < 8900) {
                        input2.value = 'Tarif min. Rp 8.900';
                        return;
                    }
                    const calculatedDistance = (fare + 1800) / 2400;
                    input2.value = calculatedDistance.toFixed(1);
                }
            }

            // 3. Fungsi untuk menukar mode kalkulasi
            function swapCalculation() {
                isDistanceToFare = !isDistanceToFare;
                
                input1.value = '';
                input2.value = '';

                if (isDistanceToFare) {
                    label1.textContent = 'Jarak Perjalanan';
                    label2.textContent = 'Estimasi Tarif';
                    icon1.innerHTML = '<i class="bi bi-signpost-split-fill"></i>';
                    icon2.innerHTML = '<i class="bi bi-cash-coin"></i>';
                    unit1.textContent = 'KM';
                    unit2.textContent = 'Rp';
                    input1.placeholder = 'Contoh: 4.5 atau 4,5';
                    input2.readOnly = true;
                } else {
                    label1.textContent = 'Budget Tarif';
                    label2.textContent = 'Estimasi Jarak';
                    icon1.innerHTML = '<i class="bi bi-cash-coin"></i>';
                    icon2.innerHTML = '<i class="bi bi-signpost-split-fill"></i>';
                    unit1.textContent = 'Rp';
                    unit2.textContent = 'KM';
                    input1.placeholder = 'Contoh: 25000';
                    input2.readOnly = true;
                }
            }
            
            // --- EVENT LISTENERS ---
            setGreeting();
            input1.addEventListener('input', calculate);

             input1.addEventListener('keyup', function(e) {
                if (!isDistanceToFare) {
                    let value = parseInt(this.value.replace(/[^,\d]/g, ''));
                    if (isNaN(value)) {
                        this.value = "";
                    } else {
                        this.value = new Intl.NumberFormat('id-ID').format(value);
                    }
                }
            });
            swapButton.addEventListener('click', swapCalculation);
        });