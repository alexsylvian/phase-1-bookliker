document.addEventListener('DOMContentLoaded', () => {
    const bookList = document.getElementById('list')

    function renderList(){
        fetch('http://localhost:3000/books')
        .then(res => res.json())
        .then(books => {
            books.forEach(book => {
                const bookLine = document.createElement('li')
                bookLine.innerText = book.title
                bookList.appendChild(bookLine)
            })
        })
    }

    renderList()
})