describe('Main', () => {
    beforeEach(() => {
        cy.visit('/')
    })

    it('should navigate to the favourites page after click on heart icon', () => {
        cy.get('a[href*="favourites"]').click()
        cy.url().should('include', '/favourites')
        cy.get('p').contains('Add your favourites pictures using heart icons ').should('exist')
    })
})
