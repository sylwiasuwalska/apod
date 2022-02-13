describe('Main', () => {
    it('should navigate to the favourites page', () => {
        // Start from the index page
        cy.visit('/')

        // Find a link with an href attribute containing "favourites" and click it
        cy.get('a[href*="favourites"]').click()

        // The new url should include "/favourite"
        cy.url().should('include', '/favourites')

        // The new page should contain an paragraph with "Add your favourites..."
        cy.get('p').contains('Add your favourites pictures using heart icons ').should('exist')
    })
})
