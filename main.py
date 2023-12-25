import eel
import json

eel.init('web', allowed_extensions=['.js', '.html'])

# Menyimpan data pemesanan film yang nantinya akan dipilih oleh user
data_pemesanan = {
    'film': '',
    'tempat': 'Tasikmalaya XXI',
    'jadwal': '',
    'tempat_duduk': [],
    'harga': 0,
}
# =============================================================================#
# Mengekspos fungsi pilih film 
@eel.expose
def pilih_film(film):
    global data_pemesanan
    data_pemesanan['film'] = film

    with open('web/database/data_pemesanan.json', 'w') as file:
        json.dump(data_pemesanan, file, indent=4)
# =============================================================================#
@eel.expose
def pilih_hari_jadwal(hari,jam_tayang):
    # Memanggil variabel data pemesanan diluar function
    global data_pemesanan
    # Memilih data mana yang akan ditambahkan
    data_pemesanan['jadwal'] = hari, jam_tayang

    # Merekam data dalam database
    with open('web/database/data_pemesanan.json', 'w') as file:
        json.dump(data_pemesanan, file, indent=4)
    # Membaca data dalam database
    with open('web/database/data_pemesanan.json', 'r') as file:
        data = json.load(file)
    # Print data yang dipilih diterminal vscode
    print("Ini adalah data yang dipilih user = ", data)
# =============================================================================#
@eel.expose

def load_data_kursi():
    with open('web/database/data_kursi.json', 'r') as file:
        daftar_kursi = json.load(file)
    return daftar_kursi
# =============================================================================#
@eel.expose
def rincian_order(tempat_duduk, harga):
    global data_pemesanan
    data_pemesanan['tempat_duduk'] = tempat_duduk
    data_pemesanan['harga'] = harga

    with open('web/database/data_pemesanan.json', 'w') as file:
        json.dump(data_pemesanan, file, indent=4)
    with open('web/database/data_pemesanan.json', 'r') as file:
        data = json.load(file)
    print("Ini rincian pembelian film = ", data)
# =============================================================================#
@eel.expose
def load_detail_pemesanan():
    with open('web/database/data_pemesanan.json', 'r') as file:
        data = json.load(file)
    return data
# =============================================================================#
@eel.expose
def arahkan_ke_halaman(film):
    # Redirect ke film 1 jika user memilih film pertama
    if film == '172 days':
        print('Redirect ke film 172 days')
        # Akan membuka file data pemesanan.json kemudian akan mengambil
        # Data film apa yang dipilih user
        with open('web/database/data_pemesanan.json', 'r') as file:
            data = json.load(file)
        # Ketika user sudah memilih film, data dari database akan ditampilkan dalam terminal vscode
        print("Ini adalah data film 1 = ", data)
        # Kemudian, setelah semua kondisi diatas terpenuhi user akan langsung diarahkan ke halaman
        # Detail film 1 dengan mengetikan sintaks seperti dibawah 
        eel.show('movie/film1.html')

    # Redirect ke film 2 jika user memilih film kedua
    elif film == 'Gampang Cuan':
        print('Redirect ke film Gampang cuan')
        with open('web/database/data_pemesanan.json', 'r') as file:
            data = json.load(file)
        print(data)
        eel.show('movie/film2.html')

    elif film == 'Rumah Iblis':
        print('Redirect ke film Rumah Iblis')
        with open('web/database/data_pemesanan.json', 'r') as file:
            data = json.load(file)
        print(data)
        eel.show('movie/film3.html')
    
    elif film == 'Sijjin':
        print('Redirect ke film Sijjin')
        with open('web/database/data_pemesanan.json', 'r') as file:
            data = json.load(file)
        print(data)
        eel.show('movie/film4.html')

# =============================================================================#
eel.start('index.html', mode='chrome-app', block='false')