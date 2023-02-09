/// <reference types='cypress' />

const { generateUser } = require("../support/generate");

describe('STORE shop', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should sign up', () => {
    const { username, password } = generateUser();
    cy.intercept('GET', 'https://hls.demoblaze.com/index.m3u8')
      .as('request');

    cy.contains('a', 'Sign up')
      .click();
    
    cy.wait('@request');
    
    cy.get('#sign-username')
      .type(username);
    
    cy.get('#sign-password')
      .type(password);
    
    cy.contains('button', 'Sign up')
      .click();
    
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Sign up successful.`);
    });
  });

  it('should sign in', () => {
    const { username, password } = generateUser();
    cy.intercept('GET', 'https://hls.demoblaze.com/about_demo_hls_600k00000.ts')
      .as('request');

    cy.signup(username, password)

    cy.contains('a', 'Log in')
      .click();
    
    cy.wait('@request')
    
    cy.get('#loginusername')
      .type(username);
    
    cy.get('#loginpassword')
      .type(password);
    
    cy.contains('button', 'Log in')
      .click();
    
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`User is logged in`)
    });
  });
  
  it('should add product in the cart', () => {
    cy.contains('a', 'Samsung galaxy s6')
      .click();
    
    cy.contains('a', 'Add to cart')
      .click();
    
    cy.on('window:alert', (str) => {
      expect(str).to.equal(`Product added`)
    });
  });
});
