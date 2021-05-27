/// <reference types="Cypress" />

Cypress.Commands.add('api_request', (structure) =>{
    cy.request({
        method: 'POST',
        url: '/graphql',
        headers: {
            'Content-Type': 'application/json',
        },
        auth: {
            bearer: Cypress.env('TOKEN'),
          },
        body:{
            query: structure.body
        }
    })
})

Cypress.Commands.add('api_unauthorized', (structure) =>{
    cy.request({
        method: 'POST',
        url: '/graphql',
        failOnStatusCode: false,
        headers: {
            'Content-Type': 'application/json',
        },
        body:{
            query: structure.body
        }
    })
})
