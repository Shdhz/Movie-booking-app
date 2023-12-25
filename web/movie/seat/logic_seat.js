
async function load_data_kursi() {
    let dataKursi = await eel.load_data_kursi()();

    let kursiContainer = document.getElementById('kursi-container');
    let totalHarga = document.getElementById('total-harga');

    dataKursi.forEach(kursi => {
        let checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = kursi.Kursi;
        checkbox.value = kursi.harga;
        checkbox.disabled = !kursi.tersedia;
        checkbox.className = 'form-check-input';
        checkbox.onclick = function () {
            hitungTotal();
        };

        let label = document.createElement('label');
        label.htmlFor = kursi.Kursi;
        label.className = 'btn btn-outline-primary';
        label.appendChild(document.createTextNode(kursi.Kursi));

        let formCheck = document.createElement('div');
        formCheck.className = 'form-check';
        formCheck.style.display = 'inline-block';
        formCheck.appendChild(checkbox);
        formCheck.appendChild(label);

        kursiContainer.appendChild(formCheck);
    });

    function hitungTotal() {
        let checkboxes = document.querySelectorAll('.form-check-input:checked');
        let total = 0;

        checkboxes.forEach(checkbox => {
            total += parseInt(checkbox.value);
        });

        totalHarga.textContent = 'Total Harga: Rp ' + total;
    }
}
function rekamPemesanan() {
    let checkboxes = document.querySelectorAll('.form-check-input:checked');
    let total = 0;
    let kursiDipilih = [];
    
    checkboxes.forEach(checkbox => {
        total += parseInt(checkbox.value);
        kursiDipilih.push(checkbox.id);

        eel.rincian_order(kursiDipilih, total)();
        window.location.href = 'history/rincian_order.html'
    });
}
