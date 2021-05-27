/// <reference types="Cypress" />

describe('GraphQL requests regarding organization', () => {

    const structure = {
        body: "{ organization ( id: 300527188 ){ name created_at members { user { id name } role_name } only_admin_can_create_pipes only_admin_can_invite_users pipes { id name } tables { edges { node { id name } } } } }"
    }

    it('Should get an organization by identifier', ()=>{

        cy.api_request(structure).then((response) =>{
            expect(response.status).to.equal(200)
            expect(response.headers['content-type']).to.eq('application/json; charset=utf-8')
            expect(response.body.data.organization).to.have.property('name', 'company Teste')
            expect(response.body.data.organization.members[0].user).to.have.property('id', '301243391')
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