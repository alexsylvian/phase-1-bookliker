document.addEventListener('DOMContentLoaded', () => {
    const bookList = document.getElementById('list')
    const bookPanel = document.getElementById('show-panel')

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
                    .then(bookData => {
                        const userList = bookData.users.map(user => `<li>${user.username}</li>`).join('');
                        bookPanel.innerHTML = `
                        <img src=${bookData.img_url}></img>
                        <h4>${bookData.title}</h4>
                        <h4>${bookData.subtitle}</h4>
                        <h4>${bookData.author}</h4>
                        <div>${bookData.description}</div>
                        <ul id='like-list'>${userList}</ul>
                        `

                        const likeButton = document.createElement('button')
                        likeButton.textContent = 'LIKE'
                        bookPanel.appendChild(likeButton)

                        likeButton.addEventListener('click', () => {
                            const currentUser = {"id": 1, "username": "pouros"}
                            const userExists = bookData.users.some(user => user.id === currentUser.id);

                            if (!userExists){
                            bookData.users.push(currentUser)
                            fetch(`http://localhost:3000/books/${book.id}`, {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify({ users: bookData.users })
                                })
                                .then(res => res.json())
                                .then(newBookData => {
                                    const updatedLikeList = newBookData.users.map(user => `<li>${user.username}</li>`).join('');
                                    bookPanel.querySelector('ul').innerHTML = updatedLikeList
                            })
                        }else{
                            console.log('nope')
                        }
                        })

                        likeButton.addEventListener('click', () => {
                            const likeList = document.getElementById('like-list')
                            if (likeList){
                                console.log('like?')
                            }
                        })
                    })
                })
            })
        })
    }

    renderList()

})