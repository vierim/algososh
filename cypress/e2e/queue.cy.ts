import { SHORT_DELAY_IN_MS, QUEUE_LEN } from '../../src/constants';

describe('Page with algorithm "String" is testing', () => {
  before(() => {
    cy.visit('http://localhost:3000/queue');
  });

  it('Submit button should be disabled', () => {
    cy.get('input').should('have.value', '');
    cy.get('button[name="add"]').should('be.disabled');
  });

  it('Should have correct visualization during elements adding', () => {

    // Add first element to queue
    cy.get('input').type('1').should('have.value', '1');
    cy.get('button[name="add"]').click();

    cy.get('[class*=circle_content]').first()
      .find('[class*=circle_changing]');

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', QUEUE_LEN)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).get('[class*=circle_letter]').contains('1');
          cy.wrap(el).get('[class*=circle_head]').should('contain.text', 'head');
          cy.wrap(el).get('[class*=circle_tail]').should('contain.text', 'tail');
          cy.wrap(el).find('[class*=circle_changing]');
        }
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', QUEUE_LEN)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).get('[class*=circle_letter]').contains('1');
          cy.wrap(el).get('[class*=circle_head]').should('contain.text', 'head');
          cy.wrap(el).get('[class*=circle_tail]').should('contain.text', 'tail');
        }
        else {
          cy.wrap(el).get('[class*=circle_letter]').should('be.empty');
          cy.wrap(el).get('[class*=circle_head]').should('be.empty');
          cy.wrap(el).get('[class*=circle_tail]').should('be.empty');
          
        }
        cy.wrap(el).find('[class*=circle_default]');  
      });

    cy.get('input').should('have.value', '');
    cy.get('button[name="delete"]').should('be.enabled');
    cy.get('button[name="clear"]').should('be.enabled');

    // Add second element to queue
    cy.get('input').type('2').should('have.value', '2');
    cy.get('button[name="add"]').click();

    cy.get('[class*=circle_content]').first()
      .find('[class*=circle_default]');

      cy.get('[class*=circle_content]').eq(1)
      .find('[class*=circle_changing]');

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]').eq(1)
      .contains('2');
    cy.get('[class*=circle_content]').eq(1)
      .get('[class*=circle_head]').should('be.empty');
    cy.get('[class*=circle_content]').eq(1)
      .get('[class*=circle_tail]').should('contain.text', 'tail');

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
    .should('have.length', QUEUE_LEN)
    .each((el, index) => {
      if (index === 0) {
        cy.wrap(el).get('[class*=circle_letter]').contains('1');
        cy.wrap(el).get('[class*=circle_head]').should('contain.text', 'head');
        cy.wrap(el).get('[class*=circle_tail]').should('be.empty');
      }

      if(index === 1) {
        cy.wrap(el).get('[class*=circle_letter]').contains('2');
        cy.wrap(el).get('[class*=circle_head]').should('be.empty');
        cy.wrap(el).get('[class*=circle_tail]').should('contain.text', 'tail');
      }

      if(index > 1) {
        cy.wrap(el).get('[class*=circle_letter]').should('be.empty');
        cy.wrap(el).get('[class*=circle_head]').should('be.empty');
        cy.wrap(el).get('[class*=circle_tail]').should('be.empty');
      }

      cy.wrap(el).find('[class*=circle_default]');  
    });

    cy.get('input').should('have.value', '');
    cy.get('button[name="delete"]').should('be.enabled');
    cy.get('button[name="clear"]').should('be.enabled');

    // Add third element to queue
    cy.get('input').type('3').should('have.value', '3');
    cy.get('button[name="add"]').click();

    cy.get('[class*=circle_content]').first()
      .find('[class*=circle_default]');

    cy.get('[class*=circle_content]').eq(1)
      .find('[class*=circle_default]');

    cy.get('[class*=circle_content]').eq(2)
      .find('[class*=circle_changing]');

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]').eq(2)
      .contains('3');
    cy.get('[class*=circle_content]').eq(1)
      .get('[class*=circle_head]').should('be.empty');
    cy.get('[class*=circle_content]').eq(2)
      .get('[class*=circle_head]').should('be.empty');
    cy.get('[class*=circle_content]').eq(1)
      .get('[class*=circle_tail]').should('be.empty');
    cy.get('[class*=circle_content]').eq(2)
      .get('[class*=circle_tail]').should('contain.text', 'tail');

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', QUEUE_LEN)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).get('[class*=circle_letter]').contains('1');
          cy.wrap(el).get('[class*=circle_head]').should('contain.text', 'head');
          cy.wrap(el).get('[class*=circle_tail]').should('be.empty');
        }

        if (index === 2) {
          cy.wrap(el).get('[class*=circle_letter]').contains('2');
          cy.wrap(el).get('[class*=circle_head]').should('be.empty');
          cy.wrap(el).get('[class*=circle_tail]').should('be.empty');
        }

        if(index === 2) {
          cy.wrap(el).get('[class*=circle_letter]').contains('3');
          cy.wrap(el).get('[class*=circle_head]').should('be.empty');
          cy.wrap(el).get('[class*=circle_tail]').should('contain.text', 'tail');
        }

        if(index > 2) {
          cy.wrap(el).get('[class*=circle_letter]').should('be.empty');
          cy.wrap(el).get('[class*=circle_head]').should('be.empty');
          cy.wrap(el).get('[class*=circle_tail]').should('be.empty');
        }

        cy.wrap(el).find('[class*=circle_default]');  
      });
  });

  it('Should have correct visualization during elements deleting', () => {
    cy.get('button[name="delete"]').click();

    cy.get('[class*=circle_content]').first()
      .find('[class*=circle_changing]');

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]').first()
      .find('[class*=circle_default]');

    cy.get('[class*=circle_content]').first()
      .get('[class*=circle_letter]').should('be.empty');

    cy.get('[class*=circle_content]').first()
      .get('[class*=circle_head]').should('be.empty');

    cy.get('[class*=circle_content]').eq(1)
      .find('[class*=circle_changing]');

    cy.get('[class*=circle_content]').eq(1)
      .get('[class*=circle_head]').should('contain.text', 'head');

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]').eq(1)
      .find('[class*=circle_default]');
  });

  it('Should have correct range clearing', () => {
    cy.get('button[name="clear"]').click();

    cy.get('[class*=circle_content]')
      .should('have.length', QUEUE_LEN)
      .each((el, index) => {
        cy.wrap(el).get('[class*=circle_letter]').should('be.empty');
        cy.wrap(el).get('[class*=circle_head]').should('be.empty');
        cy.wrap(el).get('[class*=circle_tail]').should('be.empty');
        cy.wrap(el).find('[class*=circle_default]');  
      });

    cy.get('button[name="delete"]').should('be.disabled');
    cy.get('button[name="clear"]').should('be.disabled');
  });
});

export { };
