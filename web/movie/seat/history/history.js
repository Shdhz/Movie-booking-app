async function tampilkanPemesanan() {
    const data = await eel.load_detail_pemesanan()();
    const containerPemesanan = document.getElementById('container-pemesanan');
    containerPemesanan.innerHTML = '';

    // Pengecekan apakah data adalah sebuah array
    if (Array.isArray(data)) {
        data.forEach(pemesanan => {
            const pemesananDiv = document.createElement('div');
            tampilkanInfoPemesanan(pemesananDiv, pemesanan);
            containerPemesanan.appendChild(pemesananDiv);
        });
    } else if (typeof data === 'object') { // Jika data bukanlah sebuah array tetapi sebuah objek tunggal
        const pemesananDiv = document.createElement('div');
        tampilkanInfoPemesanan(pemesananDiv, data);
        containerPemesanan.appendChild(pemesananDiv);
    } else {
        console.error('Data yang diterima tidak dalam format yang diharapkan.');
    }
}

function tampilkanInfoPemesanan(element, pemesanan) {
    element.innerHTML = `
        <h3>${pemesanan.film}</h3>
        <p>Jadwal : ${pemesanan.jadwal[0]}, Jam ${pemesanan.jadwal[1]} WIB</p>
        <p>Bioskop : ${pemesanan.tempat}</p>
        <p>Tempat Duduk : ${pemesanan.tempat_duduk.join(', ')}</p>
        <p>Harga : ${pemesanan.harga}</p>
        
    `;
}

tampilkanPemesanan();

async function bayarSekarang() {
    try {
        const data = await eel.load_detail_pemesanan()(); // Memanggil fungsi Python menggunakan Eel

        if (data) {
            const pesanWhatsApp = `Halo, saya ingin melakukan pembayaran untuk pemesanan tiket: 
                Film: ${data.film}, 
                Jadwal: ${data.jadwal[0]}, Jam ${data.jadwal[1]} WIB , 
                Bioskop: ${data.tempat}, 
                Tempat Duduk: ${data.tempat_duduk.join(', ')}, 
                Harga: ${data.harga}.`;
            
            const urlWhatsApp = `https://wa.me/6287737709694?text=${encodeURIComponent(pesanWhatsApp)}`;
            
            window.open(urlWhatsApp, '_blank');
        } else {
            console.error('Data pemesanan tidak tersedia atau kosong.');
        }
    } catch (error) {
        console.error('Terjadi kesalahan dalam memuat atau memproses data pemesanan:', error);
    }
}

// memilih cover berdasarkan film yang dipilih

function tampilkanCover() {
    eel.load_detail_pemesanan()(function(dataPemesanan) {
        const cover = document.getElementById('coverFilm');
        const filmPemesanan = dataPemesanan.film;

        const coverFilm = {
            "172 days": "../../../assets/172days.jpeg",
            "Gampang Cuan": "../../../assets/gampangcuan.jpeg",
            "Rumah Iblis": "../../../assets/rumahIblis.jpeg",
            "Sijjin": "../../../assets/sijin.jpeg"
            // tambahkan cover film lain jika ada
        };

        if (coverFilm[filmPemesanan]) {
            cover.src = coverFilm[filmPemesanan];
            cover.alt = "Cover Film " + filmPemesanan;
        } else {
            // Jika cover tidak tersedia, Anda bisa menampilkan cover default atau pesan error
            cover.src = "cover erorr";
            cover.alt = "Cover Film Default";
            console.error('Cover film tidak tersedia.');
        }
    });
}

// Panggil fungsi tampilkanCover() saat halaman dimuat
window.onload = tampilkanCover;