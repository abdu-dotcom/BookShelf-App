document.addEventListener("DOMContentLoaded", function() {
    const submitBuku = document.getElementById('inputBuku');
    const submitCari = document.getElementById('cariBuku');

    const inputUser = document.getElementById('_cariBuku');

    submitBuku.addEventListener("submit", function(event) {
        event.preventDefault()
        addTodo();
    })

    submitCari.addEventListener('submit', function(e) {
        e.preventDefault();
        cariBuku(inputUser);
    })

    if (cekStorageBrowser()) {
        memuatDataStorage();
    }
})

document.addEventListener('dataTersimpan', () => {
    console.log("Data berhasil disimpan");
})

document.addEventListener('dataDimuat', () => {
    cariBuku();
    mencetakDataStorage();
})