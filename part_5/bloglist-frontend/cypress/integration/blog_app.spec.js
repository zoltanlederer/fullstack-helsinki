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
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'billy',
        password: 'bob'
      }).then(response => {
        localStorage.setItem('loggedInUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })
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

    it('User can like a blog', function() {
      cy.contains('Create New Blog').click()
      cy.get('#title').type('Superman')
      cy.get('#author').type('Clark Kent')
      cy.get('#url').type('https://www.superman.com')
      cy.contains('Submit New Blog').click()
      cy.contains('View').click()
      cy.contains('Like').click()
      cy.contains('Likes: 1')
    })

    it('User can delete a blog', function() {
      cy.contains('Create New Blog').click()
      cy.get('#title').type('Superman')
      cy.get('#author').type('Clark Kent')
      cy.get('#url').type('https://www.superman.com')
      cy.contains('Submit New Blog').click()
      cy.contains('View').click()
      cy.get('#remove-btn').click()
      cy.get('.notification')
        .should('contain', 'You successfully deleted "Superman" blog.')
        .and('have.css', 'background-color', 'rgb(61, 185, 110)')
    })

    it('Checks that the blogs are ordered according to likes with the blog with the most likes being first', function() {
      const blog1 = {
        title: 'Batman',
        author: 'Bruce Wayne',
        url: 'https://www.batman.com',
        likes: 15
      }
      const blog2 = {
        title: 'Ironman',
        author: 'Tony Stark',
        url: 'https://www.ironman.com',
        likes: 45
      }
      const blog3 = {
        title: 'Black Widow',
        author: 'Natasha Romanoff',
        url: 'https://www.ironman.com',
        likes: 23
      }

      cy.saveBlog(blog1)
      cy.saveBlog(blog2)
      cy.saveBlog(blog3)

      cy.contains('Ironman').contains('View').click()
      cy.contains('Ironman').parent().should('contain', 'Likes: 45')

      cy.contains('Black Widow').contains('View').click()
      cy.contains('Black Widow').parent().should('contain', 'Likes: 23')

      cy.contains('Batman').contains('View').click()
      cy.contains('Batman').parent().should('contain', 'Likes: 15')

    })

  })

})
