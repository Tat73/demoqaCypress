describe("Api book store", () => {

    beforeEach(() => {
        cy.getToken(Cypress.env('user'), Cypress.env('userPassword'));
        cy.getAllBooks().then(booksArray => {
            cy.log(booksArray);
            if (booksArray.length > 0) {
                const randomIndex = Math.floor(Math.random() * booksArray.length);
                cy.log('Random index: ', randomIndex);
                cy.wrap(booksArray[randomIndex].isbn).as('bookIsbn');
            } else {
                throw new Error('No books found in the array');
            }
        })
    })

    it("Set random book to user account", () => {
        cy.get('@bookIsbn').then(bookIsbn => {
            cy.addBooks(`${Cypress.env('userID')}`, bookIsbn)
                .then(isbn => {
                    cy.log(isbn);
                    expect(isbn).to.equal(bookIsbn);
                })
        })
    })
})