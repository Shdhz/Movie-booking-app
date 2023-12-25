async function pesanTiket(halamanTujuan) {
    const hari = document.querySelector('input[name="options-base"]:checked').id;
    const jam_tayang = document.querySelector('input[name="jam_ty"]:checked').nextElementSibling.textContent;

    await eel.pilih_hari_jadwal(hari, jam_tayang)();

    window.location.href = halamanTujuan;
}
