const STORAGE_KEY = 'book_storage';

let todos = [];

function cekStorageBrowser() {
    if (typeof(Storage) === 'undefined') {
        alert('Storage tidak ditemukan');
        return false
    } else {
        return true
    }
}

function saveStorage() {
    const dataBukuJson = JSON.stringify(todos);
    localStorage.setItem(STORAGE_KEY, dataBukuJson)
    document.dispatchEvent(new Event('dataTersimpan'))
}

function memuatDataStorage() {
    const data = localStorage.getItem(STORAGE_KEY);
    const parseData = JSON.parse(data);

    if (data !== null) {
        todos = parseData;
    }
    document.dispatchEvent(new Event('dataDimuat'))
}

function mengubahDataKeObject(judulBuku, penulisBuku, tahunBuku, isCompleted) {
    return {
        id: +new Date(),
        judulBuku,
        penulisBuku,
        tahunBuku,
        isCompleted
    }
}

function findTodo(idBuku) {
    for (let buku of todos) {
        if (buku.id === idBuku) {
            return buku;
        }
    }
    return null;
}

function findTodoIndex(idBuku) {
    let index = 0;
    for (let buku of todos) {
        if (buku.id === idBuku) {
            return index;
        }
        index++
    }
    return null;
}

function perbaruiDataStorage() {
    if (cekStorageBrowser()) {
        saveStorage()
    }
}