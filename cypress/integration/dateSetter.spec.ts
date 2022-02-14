describe('Date Setter', () => {
    beforeEach(() => {
        cy.visit('/')
    })
    it('should allow using date picker and  opens dialog', () => {
        cy.get('#mui-4').clear()
        cy.get('#mui-4').type('2022/02/12')
        //Open dialog
        cy.get('.MuiDialogContent-root').should('be.visible')
    })
    it('should allow using date picker calendar and opens dialog', () => {
        cy.get('[data-testid="CalendarIcon"]').should('be.visible')
        cy.get('[data-testid="CalendarIcon"]').click()
        cy.get(':nth-child(2) > :nth-child(6) > .MuiButtonBase-root').click()
        cy.get('.MuiDialogContent-root').should('be.visible')
    })
    it('should close dialog after clicking "Close" button', () => {
        cy.get('[data-testid="CalendarIcon"]').should('be.visible')
        cy.get('[data-testid="CalendarIcon"]').click()
        cy.get(':nth-child(2) > :nth-child(6) > .MuiButtonBase-root').click()
        cy.get('.MuiDialogContent-root').should('be.visible')
        cy.findByText('Close').should('be.enabled').click()
        cy.get('.MuiDialogContent-root').should('not.be.visible')
    })
})
