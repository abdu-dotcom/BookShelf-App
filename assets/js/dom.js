const BELUM_SELESAI_DIBACA = 'Belum-selesai-dibaca';
const SELESAI_DIBACA = 'selesai-dibaca';
const BUKU_ITEMID = 'itemid';

function addTodo() {
    const belumSelesaiDibaca = document.getElementById(BELUM_SELESAI_DIBACA);
    const selesaiDibaca = document.getElementById(SELESAI_DIBACA);
    const judulBuku = document.getElementById('inputBookTitle').value
    const penulisBuku = document.getElementById('inputBookAuthor').value
    const tahunBuku = document.getElementById('inputBookYear').value
    const isCompleted = document.getElementById('inputBookIsComplete').checked

    const buku = makeTodo(judulBuku, penulisBuku, tahunBuku, isCompleted);
    if (isCompleted) {
        selesaiDibaca.append(buku);

    } else {
        belumSelesaiDibaca.append(buku);

    }
    let dataObject = mengubahDataKeObject(judulBuku, penulisBuku, tahunBuku, isCompleted);
    buku[BUKU_ITEMID] = dataObject.id;

    todos.push(dataObject);
    perbaruiDataStorage();

}

function makeTodo(judulBuku, penulisBuku, tahunBuku, isCompleted) {

    const tagJudulBuku = document.createElement('h2');
    const tagPTahun = document.createElement('p');
    const tagPPenulis = document.createElement('p');
    const tagSpanTahun = document.createElement('span');
    const tagSpanPenulis = document.createElement('span');
    const tagContainerIsiBuku = document.createElement('div')
    tagContainerIsiBuku.classList.add('isi-buku')

    const tagContainerButton = document.createElement('div');
    tagContainerButton.classList.add('action');

    const tagContainerArticle = document.createElement('article');
    tagContainerArticle.classList.add('container-buku')

    tagJudulBuku.innerText = judulBuku;
    tagPPenulis.innerText = 'Penulis: ';
    tagSpanPenulis.innerText = penulisBuku;
    tagPPenulis.append(tagSpanPenulis);

    tagPTahun.innerText = 'Tahun: ';
    tagSpanTahun.innerText = tahunBuku
    tagPTahun.append(tagSpanTahun);

    if (isCompleted) {
        tagContainerButton.append(createButtonBelumSelesai(),
            createButtonHapus());
    } else {
        tagContainerButton.append(createButtonSelesai(),
            createButtonHapus())
    }
    tagContainerIsiBuku.append(tagPPenulis, tagPTahun)
    tagContainerArticle.append(tagJudulBuku, tagContainerIsiBuku, tagContainerButton)

    return tagContainerArticle;
}

function createButton(classButton, textButton, eventListener) {
    const tagButton = document.createElement('Button');
    tagButton.classList.add(classButton);
    tagButton.textContent = textButton;
    tagButton.addEventListener("click", function(e) {
        eventListener(e);
    });
    return tagButton;
}

function createButtonSelesai() {
    return createButton('blue', 'selesai dibaca', function(event) {
        pindahKeRakSelesai(event.target.parentElement.parentElement);
    })
}

function createButtonHapus() {
    return createButton('red', 'Hapus Buku', function(e) {
        openModal(e.target.parentElement.parentElement);
    })
}

function createButtonBelumSelesai() {
    return createButton('green', 'Belum selesai dibaca', function(e) {
        kembaliDibaca(e.target.parentElement.parentElement);
    })
}

function pindahKeRakSelesai(elementBuku) {
    const judulBuku = elementBuku.querySelector('article  > h2').innerText
    const penulisBuku = elementBuku.querySelector('article > .isi-buku > p:nth-child(1) > span').innerText
    const tahunBuku = elementBuku.querySelector('article > .isi-buku > p:nth-child(2) > span').innerText

    let bukuPindahan = makeTodo(judulBuku, penulisBuku, tahunBuku, true);

    const selesaiDibaca = document.getElementById(SELESAI_DIBACA);
    selesaiDibaca.append(bukuPindahan);

    const satuBuku = findTodo(elementBuku[BUKU_ITEMID]);
    satuBuku.isCompleted = true;

    bukuPindahan[BUKU_ITEMID] = satuBuku.id;

    elementBuku.remove();
    perbaruiDataStorage();

}

function kembaliDibaca(elementBuku) {
    const judulBuku = elementBuku.querySelector('article  > h2').innerText
    const penulisBuku = elementBuku.querySelector('article > .isi-buku > p:nth-child(1) > span').innerText
    const tahunBuku = elementBuku.querySelector('article > .isi-buku > p:nth-child(2) > span').innerText

    let bukuPindahan = makeTodo(judulBuku, penulisBuku, tahunBuku, false);
    const belumSelesaiDibaca = document.getElementById(BELUM_SELESAI_DIBACA);
    belumSelesaiDibaca.append(bukuPindahan);

    const satuBuku = findTodo(elementBuku[BUKU_ITEMID])
    satuBuku.isCompleted = false;

    bukuPindahan[BUKU_ITEMID] = satuBuku.id;

    elementBuku.remove();
    perbaruiDataStorage();
}

function hapusbuku(elementBuku) {

    const todoPosition = findTodoIndex(elementBuku[BUKU_ITEMID]);
    todos.splice(todoPosition, 1);
    perbaruiDataStorage();
    return elementBuku.remove();
}

function openModal(elementBuku) {
    let modal = document.getElementById('modal');
    let buttonDelete = document.getElementById('delete');
    let buttonCancel = document.getElementById('grey');
    let nameList = document.querySelector('#modal > p:nth-child(1) > span');

    nameList.innerText = elementBuku.querySelector('article  > h2').innerText;
    modal.style.display = "block";

    buttonCancel.addEventListener('click', function() {
        modal.style.display = "none";
    })
    buttonDelete.addEventListener('click', function() {
        modal.style.display = "none";
        hapusbuku(elementBuku);
    })

}

function mencetakDataStorage() {
    const belumSelesaiDibaca = document.getElementById(BELUM_SELESAI_DIBACA);
    const selesaiDibaca = document.getElementById(SELESAI_DIBACA);

    for (let todo of todos) {
        const newTodo = makeTodo(todo.judulBuku, todo.penulisBuku, todo.tahunBuku, todo.isCompleted)
        newTodo[BUKU_ITEMID] = todo.id;

        if (todo.isCompleted) {
            selesaiDibaca.append(newTodo);

        } else {
            belumSelesaiDibaca.append(newTodo);
        }
    }
}

function cariBuku(inputUser) {
    const listArticle = document.querySelectorAll('article');

    for (let index = 0; index < listArticle.length; index++) {
        if (inputUser.value !== '') {
            if (listArticle[index].children[0].textContent === inputUser.value) {
                listArticle[index].style.display = "block";

            } else {
                listArticle[index].style.display = "none";
            }
        } else {
            listArticle[index].style.display = "block";

        }
    }
}