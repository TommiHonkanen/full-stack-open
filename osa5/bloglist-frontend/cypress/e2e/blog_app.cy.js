describe("Blog app", function() {
    beforeEach(function() {
        cy.request("POST", "http://localhost:3001/api/testing/reset")
        const user = {
            name: "test123",
            username: "test",
            password: "12345"
        }
        cy.request("POST", "http://localhost:3001/api/users/", user)
        cy.visit("http://localhost:3000")
    })

    it("Login form is shown", function() {
        cy.contains("login")
    })

    describe("Login",function() {
        it("succeeds with correct credentials", function() {
            cy.contains("login").click()
            cy.get("#username").type("test")
            cy.get("#password").type("12345")
            cy.get("#login-button").click()

            cy.contains("test123 logged in")
        })

        it("fails with wrong credentials", function() {
            cy.contains("login").click()
            cy.get("#username").type("test")
            cy.get("#password").type("123456")
            cy.get("#login-button").click()

            cy.get(".error").contains("wrong username or password")
        })
    })

    describe("When logged in", function() {
        beforeEach(function() {
            cy.contains("login").click()
            cy.get("#username").type("test")
            cy.get("#password").type("12345")
            cy.get("#login-button").click()
        })

        it("A blog can be created", function() {
            cy.contains("new blog").click()
            cy.get("#title").type("a test blog")
            cy.get("#author").type("Walter White")
            cy.get("#url").type("62.com")
            cy.get("#create").click()
            cy.contains("a test blog Walter White")
        })

        it("A blog can be liked", function () {
            cy.contains("new blog").click()
            cy.get("#title").type("a test blog")
            cy.get("#author").type("Walter White")
            cy.get("#url").type("62.com")
            cy.get("#create").click()
            cy.contains("view").click()
            cy.get("#likebutton").click()
            cy.contains("likes 1")
        })

        it("A blog can be deleted", function () {
            cy.contains("new blog").click()
            cy.get("#title").type("a test blog")
            cy.get("#author").type("Walter White")
            cy.get("#url").type("62.com")
            cy.get("#create").click()
            cy.contains("view").click()
            cy.get("#removebutton").click()
            cy.get("html").should("not.contain", "a test blog Walter White")
        })

        it("Blogs are ordered by likes", function () {
            cy.contains("new blog").click()
            cy.get("#title").type("first blog")
            cy.get("#author").type("Walter White")
            cy.get("#url").type("62.com")
            cy.get("#create").click()

            cy.contains("view").click()
            cy.get("#likebutton").click()

            cy.wait(3000)

            cy.contains("new blog").click()
            cy.get("#title").type("second blog")
            cy.get("#author").type("Walter White")
            cy.get("#url").type("62.com")
            cy.get("#create").click()

            cy.contains("view").click()
            cy.contains("hide").click()
            cy.get("#likebutton").click()
            cy.get("#likebutton").click()

            cy.get(".blog").eq(0).should("contain", "second blog")
            cy.get(".blog").eq(1).should("contain", "first blog")
        })
    })
})

