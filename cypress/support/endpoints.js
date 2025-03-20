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