/// <reference types="Cypress" />

describe('GraphQL requests regarding yourself', () => {

    const structure = {
        body: "{ me { id name username email avatar_url created_at locale time_zone } }"
    }

    it('Should get information about yourself', ()=>{

        cy.api_request(structure).then((response) =>{
            expect(response.status).to.equal(200)
            expect(response.headers['content-type']).to.eq('application/json; charset=utf-8')
            expect(response.body.data.me).to.have.property('id', '301243391')
            expect(response.body.data.me).to.have.property('username', 'marcio-fva87')
        })
    })

    it('Should show unauthorized error', ()=>{
        cy.api_unauthorized(structure).then((response) =>{
            expect(response.status).to.equal(401)
            expect(response.body.errors[0]).to.have.property('title', 'Unauthorized')
            expect(response.body.errors[0]).to.have.property('detail', 'You are not authorized to access this page')
        })
    })
})