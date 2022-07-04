let myLibrary = [];
let library = document.getElementById('library');
let newBook = document.getElementById('newBook');
let addBook = document.getElementById('addBook');

let form = document.querySelector('form');


function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.index = 0;
    this.info = function() {
        return `${title} by ${author}, ${pages} pages, ${read ? `read` : `not read yet`}.`;
    }
    this.changeRead = function() {
        this.read = !this.read;
    }
}

newBook.addEventListener('click', () => {
    form.style.display = 'block';
});

addBook.addEventListener('click', (e) => {
    
    let temp = new Book;

    let title = document.getElementById('title');
    temp.title = title.value;

    let author = document.getElementById('author');
    temp.author = author.value;

    let pages = document.getElementById('pages');
    temp.pages = pages.value;

    let read = document.getElementById('read');
    temp.read = read.checked;

    addBookToLibrary(temp);
    e.preventDefault();
    form.style.display = 'none';
    form.reset();
});    


function displayBooks() {
    while (library.firstChild) {
        library.removeChild(library.firstChild);
    }
    myLibrary.forEach(book => {
        let div = document.createElement('div');
        div.setAttribute('class', 'card');

        let title = document.createElement('h2');
        title.textContent = book.title;
        div.appendChild(title);

        let author = document.createElement('p');
        author.textContent = book.author;
        div.appendChild(author);

        let pages = document.createElement('p');
        pages.textContent = book.pages;
        div.appendChild(pages);

        let read = document.createElement('button');
        read.setAttribute('class', 'readButton');

        if (book.read) {
            read.textContent = "Read";
            read.style.backgroundColor = "green";
        }
        else {
            read.textContent = "Not Read"
            read.style.backgroundColor = "darkRed";
        }
        
        div.appendChild(read);

        let removeButton = document.createElement('button');
        removeButton.textContent = 'x';
        removeButton.setAttribute('class', 'removeButton');
        div.appendChild(removeButton);

        let index = document.createElement('p');
        index.textContent = book.index;
        index.style.display = "none";
        div.appendChild(index);
        
        library.appendChild(div);
    })
    
    let removeButtons = document.getElementsByClassName('removeButton');
    for(let i = 0; i < removeButtons.length; i++) {
        removeButtons[i].addEventListener('click', () => {
            let index = removeButtons[i].parentElement.lastChild.textContent;
            removeBook(index);
            displayBooks();
        })
    }
    let readButtons = document.getElementsByClassName('readButton');
    for(let i = 0; i < readButtons.length; i++) {
        readButtons[i].addEventListener('click', () => {
            let index = readButtons[i].parentElement.lastChild.textContent;
            myLibrary[index].changeRead();
            displayBooks();
        })
    }

    
}
function addBookToLibrary(Book) {
    myLibrary.push(Book);
    Book.index = myLibrary.length-1;
    displayBooks();
}

function removeBook(index) {
    myLibrary.splice(index,1);
}