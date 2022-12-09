import { DELAY_IN_MS } from '../../src/constants';

describe('Page with algorithm "String" is testing', () => {
  before(() => {
    cy.visit('http://localhost:3000/recursion');
  });

  it('Submit button should be disabled', () => {
    cy.get('input').should('have.value', '');
    cy.get('button[type="submit"]').should('be.disabled');
  });

  it('Should have correct steps to result', () => {
    const sampleString = '12345';
    const steps = [
      '12345',
      '12345',
      '52341',
      '54321'
    ];
    
    cy.get('input').type(sampleString).should('have.value', sampleString);
    cy.get('button[type="submit"]').click();

    cy.get('[class*=circle_content]')
      .should('have.length', 5)
      .each((el, index) => {
        cy.wrap(el).contains(steps[0][index]);
        cy.wrap(el).find('[class*=circle_default]');
      });

    cy.wait(DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 5)
      .each((el, index) => {
        cy.wrap(el).contains(steps[1][index]);
      });

    cy.get('[class*=circle_content]').first().find('[class*=circle_changing]');
    cy.get('[class*=circle_content]').last().find('[class*=circle_changing]');

    cy.wait(DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 5)
      .each((el, index) => {
        cy.wrap(el).contains(steps[2][index]);

        if(index === 0 || index === 4) {
          cy.wrap(el).find('[class*=circle_modified]');
        } else if(index === 1 || index === 3) {
          cy.wrap(el).find('[class*=circle_changing]');
        } else {
          cy.wrap(el).find('[class*=circle_default]');
        }
      });
    
    cy.wait(DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 5)
      .each((el, index) => {
        cy.wrap(el).contains(steps[3][index]);
        cy.wrap(el).find('[class*=circle_modified]');
      });
  });

  it('Should correctly clean envirenment', () => {
    cy.get('input').should('have.value', '');
    cy.get('button[type="submit"]').should('be.disabled');
  });
});

export { };
