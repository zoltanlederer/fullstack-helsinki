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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('billy')
      cy.get('#password').type('bob')
      cy.get('#login-btn').click()
    })

    it('A blog can be created', function() {
      cy.contains('Create New Blog').click()
      cy.get('#title').type('Superman')
      cy.get('#author').type('Clark Kent')
      cy.get('#url').type('https://www.superman.com')
      cy.contains('Submit New Blog').click()
      cy.get('.notification')
        .should('contain', 'A new blog: Superman by Clark Kent added')
        .and('have.css', 'background-color', 'rgb(61, 185, 110)')
    })

    it.only('User can like a blog', function() {
      cy.contains('Create New Blog').click()
      cy.get('#title').type('Superman')
      cy.get('#author').type('Clark Kent')
      cy.get('#url').type('https://www.superman.com')
      cy.contains('Submit New Blog').click()
      cy.contains('View').click()
      cy.contains('Like').click()
      cy.contains('Likes: 1')
    })

  })

})