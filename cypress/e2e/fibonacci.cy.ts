import { SHORT_DELAY_IN_MS } from '../../src/constants';

describe('Page with algorithm "Fibonacci" is testing', () => {
  before(() => {
    cy.visit('http://localhost:3000/fibonacci');
  });

  it('Submit button should be disabled', () => {
    cy.get('input').should('have.value', '0');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('Submit button should be disabled on typed empty string in input (clear it)', () => {
    cy.get('input').clear();
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('Should have correct fibonacci numbers and its indexes', () => {
    const startValue = '4';
    const resultSteps = [
      [1],
      [1, 1],
      [1, 1, 2],
      [1, 1, 2, 3],
      [1, 1, 2, 3, 5]
    ];

    cy.get('input').clear().type(startValue).should('have.value', startValue);
    cy.get('button[type="submit"]').should('be.enabled').click();

    cy.get('[class*=circle_content]')
      .should('have.length', 1);

    cy.get('[class*=circle_letter]')
      .each((el, index) => {
        cy.wrap(el).contains(resultSteps[0][index]);
      });

    cy.get('[class*=circle_index]')
      .each((el, index) => {
        cy.wrap(el).contains(index);
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 2);

    cy.get('[class*=circle_letter]')
      .each((el, index) => {
        cy.wrap(el).contains(resultSteps[1][index]);
      });

    cy.get('[class*=circle_index]')
      .each((el, index) => {
        cy.wrap(el).contains(index);
      });
      
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 3);

    cy.get('[class*=circle_letter]')
      .each((el, index) => {
        cy.wrap(el).contains(resultSteps[2][index]);
      });

    cy.get('[class*=circle_index]')
      .each((el, index) => {
        cy.wrap(el).contains(index);
      });
      
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 4);

    cy.get('[class*=circle_letter]')
      .each((el, index) => {
        cy.wrap(el).contains(resultSteps[3][index]);
      });

    cy.get('[class*=circle_index]')
      .each((el, index) => {
        cy.wrap(el).contains(index);
      });
      
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 5);

    cy.get('[class*=circle_letter]')
      .each((el, index) => {
        cy.wrap(el).contains(resultSteps[4][index]);
      });

    cy.get('[class*=circle_index]')
      .each((el, index) => {
        cy.wrap(el).contains(index);
      });
  });
});

export { };
