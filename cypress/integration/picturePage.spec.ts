describe('Picture Page', () => {
    const testedItem = {
        title: 'Terminator Moon',
        date: '2022-02-15',
    }
    beforeEach(() => {
        cy.visit('/2022-02-15')
    })
    it('should allow using date picker and  opens dialog', () => {
        cy.get('#mui-4').clear()
        cy.get('#mui-4').type('2022/02/12')
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
        cy.findByText('Close').should('be.enabled')
        cy.findByText('Close').click()
        cy.get('.MuiDialogContent-root').should('not.exist')
    })
    it('should display picture with magnifier', () => {
        cy.get('.magnifier-image').should('be.visible')
    })
    it('should display picture info after click on info icon', () => {
        cy.get('[data-testid="InfoOutlinedIcon"]').should('be.visible')
        cy.get('[data-testid="InfoOutlinedIcon"]').click()
        cy.get('.MuiDialogContent-root').should('be.visible')
        cy.findByText(testedItem.title).should('be.visible')
        cy.findByText(testedItem.date).should('be.visible')
        cy.findByText('Close').click()
        cy.get('.MuiDialogContent-root').should('not.exist')
    })
    it('should navigate to the favourites page after click on heart icon', () => {
        cy.get('a[href*="favourites"]').click()
        cy.url().should('include', '/favourites')
        cy.get('p').contains('Add your favourites pictures using heart icons ').should('exist')
    })
})
