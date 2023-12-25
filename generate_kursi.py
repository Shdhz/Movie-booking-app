import json

def generate_daftar_kursi(jumlah_baris, jumlah_kolom, harga_tiket):
    daftar_kursi = []
    for baris in range(1, jumlah_baris + 1):
        for kolom in range(1, jumlah_kolom + 1):
            label_kursi = f"{chr(64 + baris)}{kolom}"
            kursi = {"Kursi": label_kursi, "tersedia": True, "harga": harga_tiket}  # Inisialisasi kursi sebagai tersedia
            daftar_kursi.append(kursi)

    # Menyimpan data kursi ke dalam file JSON
    with open('data_kursi.json', 'w') as file:
        json.dump(daftar_kursi, file, indent=4)

# Panggil fungsi generate_daftar_kursi dengan jumlah baris dan kolom yang diinginkan
generate_daftar_kursi(7, 8, 30_000)  # Ganti angka sesuai kebutuhan