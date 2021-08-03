window.onload = () => {

    for (let i = 0; i < localStorage.length; i++) {
        const book = localStorage.key(i);
        const author = localStorage[localStorage.key(i)].split(",")[0];
        const status = localStorage[localStorage.key(i)].split(",")[1];
        // Load all the books in localStorage
        const booksTable = document.querySelector('#BooksTable');
        booksTable.insertAdjacentHTML('beforeend',`
                                                <tr>
                                                    <td>${book}</td>
                                                    <td>${author}</td>
                                                    <td>${status}</td>
                                                    <td><span class="badge bg-danger">Delete</span></td>
                                                </tr>
        `);
    };

    const statusColumn = document.querySelectorAll('td:nth-child(3)');
    // Change Read to Not Read, or Not Read to Read when clicking a row in the 3rd column
    for (let status of statusColumn) {
        status.addEventListener('click', readNotRead);
    }

    const eraseColumn = document.querySelectorAll('td:nth-child(4)');
    // Erase the row when clicking in the 4th column
    for (let erase of eraseColumn) {
        erase.addEventListener('click', eraseRow);
    }

    // I am not using FORM with EventListener SUBMIT because I don't want page to reload when clicking submit
    const submitButton = document.querySelector('#submitButton');
    submitButton.addEventListener('click', addBook);

    // Here the functions used sorted alphabetically
    function addBook() {
        const book = this.parentElement.querySelector('#book').value;
        const author = this.parentElement.querySelector('#author').value;
        const status = this.parentElement.querySelector('#status').value;

        // add info to Local Storage
        localStorage.setItem(book,[author,status]);
        console.log(localStorage);
        // add Row HTML
        const booksTable = document.querySelector('#BooksTable');
        booksTable.insertAdjacentHTML('beforeend',`
                                                <tr>
                                                    <td>${book}</td>
                                                    <td>${author}</td>
                                                    <td>${status}</td>
                                                    <td><span class="badge bg-danger">Delete</span></td>
                                                </tr>
        `);
        // add Row JS
        const newRead = booksTable.lastElementChild.querySelector('td:nth-child(3)');
        const newErase = booksTable.lastElementChild.querySelector('td:nth-child(4)');
        newRead.addEventListener('click', readNotRead);
        newErase.addEventListener('click', eraseRow);

        // Return input values to default values
        this.parentElement.querySelector('#book').value = "";
        this.parentElement.querySelector('#author').value = "";
        this.parentElement.querySelector('#status').value = "Read";
    }

    function eraseRow() {
        const eraseRow = confirm("Are you sure you want to delete this book from the list?");
        if (eraseRow) {
            localStorage.removeItem(this.parentElement.querySelector('td:nth-child(1)').innerHTML);
            this.parentElement.remove();
        }
    }

    function readNotRead() {
        if (this.innerHTML === 'Read') {
            this.innerHTML = 'Not Read';
            localStorage[this.parentElement.querySelector('td:nth-child(1)').innerHTML] = localStorage[this.parentElement.querySelector('td:nth-child(1)').innerHTML].split(",")[0] + ',Not Read';
        } else {
            this.innerHTML = 'Read';
            localStorage[this.parentElement.querySelector('td:nth-child(1)').innerHTML] = localStorage[this.parentElement.querySelector('td:nth-child(1)').innerHTML].split(",")[0] + ',Read';
        }
    }
}
