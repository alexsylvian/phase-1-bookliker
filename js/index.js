document.addEventListener('DOMContentLoaded', () => {
    const bookList = document.getElementById('list')

    function renderList(){
        fetch('http://localhost:3000/books')
        .then(res => res.json())
        .then(books => {
            books.forEach(book => {
                const bookLine = document.createElement('li')
                bookLine.innerHTML = `
                <li id='${book.id}'>${book.title}</li>
                `
                bookList.appendChild(bookLine)

                bookLine.addEventListener('click', () => {
                    fetch(`http://localhost:3000/books/${book.id}`)
                    .then(res => res.json())
                    .then(bookData => console.log(bookData))
                })
            })
        })
    }

    renderList()

    bookList.addEventListener('click', () => {
        console.log('click')
    })
})