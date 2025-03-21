import { API_ENDPOINTS } from "./apiEndpointPath";

Cypress.Commands.add('getAllBooks', () => {
    cy.sendRequest('GET', API_ENDPOINTS.GET_BOOKS)
        .then(response => {
            expect(response.status).to.equal(200);
            expect(response.body.books).to.have.length.greaterThan(0);
            return response.body.books;
        })
})

Cypress.Commands.add('addBooks', (userId, isbn) => {
    const book = {
        userId,
        "collectionOfIsbns": [
            {
                isbn
            }
        ]
    }
    cy.sendRequest('POST', API_ENDPOINTS.ADD_BOOK, book)
        .then(response => {
            expect(response.status).to.equal(201);
            return response.body.books[0].isbn;
        })
})

Cypress.Commands.add('getBookByIsbn', (isbn) => {
    cy.sendRequest('GET', API_ENDPOINTS.GET_BOOK_BY_ISBN, null, `ISBN=${(isbn)}`)
        .then(response => {
            expect(response.status).to.equal(200)
            expect(response.body).to.have.property('isbn')
            return response.body.isbn

        })
})

Cypress.Commands.add('deleteBookByIsbn', (userID) => {
    cy.sendRequest('DELETE', API_ENDPOINTS.DELETE_BOOK_BY_USERID, null, `UserId=${(userID)}`)
        .then(response => {
            expect(response.status).to.equal(204)

        })
})