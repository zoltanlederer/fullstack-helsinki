describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Billy Bob',
      username: 'billy',
      password: 'bob'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('billy')
      cy.get('#password').type('bob')
      cy.get('#login-btn').click()
      cy.contains('Billy Bob logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('wrong')
      cy.get('#password').type('wrong')
      cy.get('#login-btn').click()
      cy.get('.warning')
        .should('contain', 'Wrong username or password. Please try again.')
        .and('have.css', 'background-color', 'rgb(255, 0, 0)')
    })
  })

})