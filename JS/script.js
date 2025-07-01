// ===== v10.0 =====

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

    // --- STATE (KONDISI AWAL) ---
    let currentService = 'bike';
    let isDistanceToFare = true;

    // --- FUNGSI ---
    function setGreeting() {
        const hour = new Date().getHours();
        const greetingText = hour >= 5 && hour < 12 ? 'Selamat Pagi' : hour >= 12 && hour < 15 ? 'Selamat Siang' : hour >= 15 && hour < 18 ? 'Selamat Sore' : 'Selamat Malam';
        greetingEl.textContent = `${greetingText}, Semangat Cari Orderan!`;
    }

    function updateNote() {
        let noteContent = `<p class="small text-secondary mb-0"><strong>Penting:</strong> Kalkulator ini adalah <i>tool independen</i> & bukan aplikasi resmi Maxim. Perhitungan adalah <strong>hasil estimasi</strong> berdasarkan analisis data nyata di Yogyakarta.</p><hr class="my-2"><p class="small text-secondary mb-1">`;
        switch (currentService) {
            case 'bike':
                noteContent += `Layanan <strong>Bike</strong> diestimasi menggunakan <strong>model presisi 2-lapis</strong>:<ul class="mb-0 ps-3"><li><strong>0-7 km:</strong> <code>Rp 900 + (Jarak &times; Rp 1.750)</code></li><li><strong>>7 km:</strong> <code>Rp 3.500 + (Jarak &times; Rp 1.550)</code></li></ul>Dengan tarif minimal <strong>Rp 6.000</strong>.`;
                break;
            case 'delivery':
                 noteContent += `Layanan <strong>Bike Delivery</strong> diestimasi menggunakan <strong>model 2-lapis</strong>:<ul class="mb-0 ps-3"><li><strong>0-3 km:</strong> Tarif flat <strong>Rp 4.100</strong>.</li><li><strong>>3 km:</strong> <code>Rp 50 + (Jarak &times; Rp 1.650)</code>.</li></ul>`;
                break;  
            case 'car':
                noteContent += `Layanan <strong>Car</strong> diestimasi menggunakan <strong>model presisi 3-lapis</strong>:<ul class="mb-0 ps-3"><li><strong>0-3 km:</strong> Tarif flat <strong>Rp 12.100</strong>.</li><li><strong>3.1-9 km:</strong> <code>Rp 625 + (Jarak &times; Rp 4.200)</code>.</li><li><strong>>9 km:</strong> <code>Rp 3.200 + (Jarak &times; Rp 4.140)</code>.</li></ul>`;
                break;
        }
        noteContent += `</p><p class="small text-danger mt-2 fst-italic">*Tarif final dapat berbeda karena faktor jam sibuk (surge price).</p>`;
        noteSection.innerHTML = noteContent;
    }

    function calculate() {
        if (isDistanceToFare) {
            const standardizedValue = input1.value.replace(',', '.');
            const distance = parseFloat(standardizedValue);
            if (isNaN(distance) || distance <= 0) { input2.value = ''; return; }

            let finalFare = 0;
            switch (currentService) {
                case 'bike':
                    let calculatedBikeFare;
                    if (distance <= 7) {
                        calculatedBikeFare = 900 + (distance * 1750);
                    } else {
                        calculatedBikeFare = 3500 + (distance * 1550);
                    }
                    finalFare = Math.max(6000, calculatedBikeFare);
                    break;
                case 'car':
                    if (distance <= 3) { finalFare = 12100; } 
                    else if (distance <= 9) { finalFare = 625 + (distance * 4200); } 
                    else { finalFare = 3200 + (distance * 4140); }
                    break;
                case 'delivery':
                     if (distance <= 3) { finalFare = 4100; } 
                     else { finalFare = 50 + (distance * 1650); }
                    break;
            }
            const roundedFare = Math.ceil(finalFare / 100) * 100;
            input2.value = new Intl.NumberFormat('id-ID').format(roundedFare);
        } else { // Mode Tarif -> Jarak
            const fare = parseFloat(input1.value.replace(/[^0-9]/g, ''));
            if (isNaN(fare)) { input2.value = ''; return; }
            
            let estimatedDistance = 0;
            switch (currentService) {
                case 'bike':
                     if (fare < 6000) { input2.value = 'Tarif min.'; return; }
                     if (fare <= 13150) { // Batas perkiraan antara lapis 1 dan 2
                         estimatedDistance = (fare - 900) / 1750;
                     } else { 
                         estimatedDistance = (fare - 3500) / 1550;
                     }
                     break;
                case 'car':
                    if (fare < 12100) { input2.value = 'Tarif min.'; return; }
                    if (fare === 12100) { input2.value = '~ 0-3'; return; }
                    if (fare <= 40000) { estimatedDistance = (fare - 625) / 4200; } 
                    else { estimatedDistance = (fare - 3200) / 4140; }
                    break;
                case 'delivery':
                     if (fare < 4100) { input2.value = 'Tarif min.'; return; }
                     if (fare === 4100) { input2.value = '~ 0-3'; return; }
                     estimatedDistance = (fare - 50) / 1650;
                     break;
            }
            input2.value = Math.max(0, estimatedDistance).toFixed(1);
        }
    }
    
    // --- Event Listeners dan fungsi lainnya (Tetap Sama) ---
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