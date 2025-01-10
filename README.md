# Dokumentasi: Aplikasi dengan Python dan EEL untuk GUI Modern

## Pendahuluan
EEL adalah library Python yang memungkinkan pengembangan aplikasi desktop dengan menggunakan teknologi web seperti HTML, CSS, dan JavaScript. Library ini menggabungkan kemudahan Python dengan fleksibilitas visualisasi web untuk menciptakan GUI yang modern dan interaktif.

---

## Instalasi

Sebelum memulai, pastikan Python sudah terpasang di perangkat Anda. Langkah-langkah instalasi:

1. **Install Library EEL**
   ```bash
   pip install eel
   ```

2. **Cek Instalasi**
   Pastikan library terpasang dengan menjalankan perintah berikut:
   ```bash
   pip show eel
   ```

---

## Struktur Proyek
Berikut adalah struktur direktori untuk proyek Anda:
```
my_project/
├── web/
│   ├── assets/        # Folder untuk file aset seperti gambar atau ikon
│   ├── database/      # Folder untuk file database (opsional)
│   ├── movie/         # Folder untuk halaman HTML khusus
│   │   └── index.html # Halaman utama GUI
├── main_script.js     # File JavaScript utama untuk interaktivitas
├── README.md          # Dokumentasi proyek
├── generate_kursi.py  # Script Python tambahan untuk logika khusus
├── main.py            # File utama Python untuk menjalankan aplikasi
```

---

## Cara Penggunaan

### 1. Membuat File Utama (`main.py`)
Buat file bernama `main.py`, kemudian import library EEL:

```python
import eel
```

### 2. Inisialisasi Folder Web
Inisialisasi folder tempat file HTML, CSS, dan JavaScript Anda berada. Misalnya, jika folder bernama `web`:

```python
eel.init('web')
```

### 3. Memulai GUI
Gunakan fungsi `eel.start` untuk menampilkan halaman awal GUI. Sebagai contoh, jika file awal adalah `index.html` yang berada dalam folder `movie`:

```python
eel.start('movie/index.html')
```

### 4. Mengekspos Fungsi Python ke JavaScript
Gunakan dekorator `@eel.expose` untuk membuat fungsi Python dapat dipanggil dari JavaScript. Contoh:

```python
@eel.expose
def say_hello(name):
    return f"Hello, {name}!"
```

---

## Contoh Implementasi

### File Python: `main.py`
```python
import eel

# Inisialisasi folder tempat file HTML berada
eel.init('web')

# Fungsi Python yang diekspos ke JavaScript
@eel.expose
def greet_user(name):
    return f"Hello, {name}!"

# Memulai GUI dengan file HTML utama
eel.start('movie/index.html')
```

### File HTML: `web/movie/index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EEL GUI</title>
</head>
<body>
    <h1>Selamat Datang di EEL GUI</h1>
    <input type="text" id="name" placeholder="Masukkan nama">
    <button onclick="sendName()">Kirim</button>
    <p id="response"></p>

    <script src="../main_script.js"></script>
</body>
</html>
```

### File JavaScript: `web/main_script.js`
```javascript
function sendName() {
    const name = document.getElementById('name').value;

    eel.greet_user(name)((response) => {
        document.getElementById('response').innerText = response;
    });
}
```

---

## File Pendukung

### File Python: `generate_kursi.py`
Jika Anda memiliki script tambahan seperti `generate_kursi.py`, pastikan untuk menjelaskan fungsinya. Misalnya:

```python
# generate_kursi.py
# Script untuk menghasilkan data kursi bioskop
def generate_seats(rows, columns):
    return [[f"R{r}C{c}" for c in range(1, columns+1)] for r in range(1, rows+1)]
```

## Penutup
Dengan mengikuti langkah-langkah di atas, Anda dapat mengembangkan aplikasi desktop berbasis Python dengan GUI modern menggunakan EEL. Untuk informasi lebih lanjut, kunjungi [dokumentasi resmi EEL](https://github.com/ChrisKnott/Eel).
