import { SHORT_DELAY_IN_MS } from '../../src/constants/delays';

describe('Page with algorithm "Stack" is testing', () => {
  before(() => {
    cy.visit('http://localhost:3000/stack');
  });

  it('Submit button should be disabled', () => {
    cy.get('input').should('have.value', '');
    cy.get('button[name="add"]').should('be.disabled');
  });

  it('Should have correct visualization during elements adding', () => {
    cy.get('input').type('1').should('have.value', '1');
    cy.get('button[name="add"]').click();

    cy.get('[class*=circle_content]')
      .should('have.length', 1)
      .each((el, index) => {
        cy.wrap(el).contains('1');
        cy.wrap(el).get('[class*=circle_head]').should('contain.text', 'top');
        cy.wrap(el).find('[class*=circle_changing]');
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]').each((el, index) => {
      cy.wrap(el).contains('1');
      cy.wrap(el).find('[class*=circle_default]');
    });

    cy.get('input').type('2').should('have.value', '2');
    cy.get('button[name="add"]').click();

    cy.get('[class*=circle_content]')
      .should('have.length', 2)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('1');
          cy.wrap(el).should('not.have.html', '[class*=circle_head]');
          cy.wrap(el).find('[class*=circle_default]');
        }

        if (index === 1) {
          cy.wrap(el).contains('2');
          cy.wrap(el).get('[class*=circle_head]').should('contain.text', 'top');
          cy.wrap(el).find('[class*=circle_changing]');
        }
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 2)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('1');
          cy.wrap(el).should('not.have.html', '[class*=circle_head]');
          cy.wrap(el).find('[class*=circle_default]');
        }

        if (index === 1) {
          cy.wrap(el).contains('2');
          cy.wrap(el).get('[class*=circle_head]').should('contain.text', 'top');
          cy.wrap(el).find('[class*=circle_default]');
        }
      });

    cy.get('input').type('3').should('have.value', '3');
    cy.get('button[name="add"]').click();

    cy.get('[class*=circle_content]')
      .should('have.length', 3)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('1');
          cy.wrap(el).should('not.have.html', '[class*=circle_head]');
          cy.wrap(el).find('[class*=circle_default]');
        }

        if (index === 1) {
          cy.wrap(el).contains('2');
          cy.wrap(el).should('not.have.html', '[class*=circle_head]');
          cy.wrap(el).find('[class*=circle_default]');
        }

        if (index === 2) {
          cy.wrap(el).contains('3');
          cy.wrap(el).get('[class*=circle_head]').should('contain.text', 'top');
          cy.wrap(el).find('[class*=circle_changing]');
        }
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 3)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('1');
          cy.wrap(el).should('not.have.html', '[class*=circle_head]');
          cy.wrap(el).find('[class*=circle_default]');
        }

        if (index === 1) {
          cy.wrap(el).contains('2');
          cy.wrap(el).should('not.have.html', '[class*=circle_head]');
          cy.wrap(el).find('[class*=circle_default]');
        }

        if (index === 2) {
          cy.wrap(el).contains('3');
          cy.wrap(el).get('[class*=circle_head]').should('contain.text', 'top');
          cy.wrap(el).find('[class*=circle_default]');
        }
      });

    cy.get('input').should('have.value', '');
  });

  it('Should have correct visualization during elements deleting', () => {
    cy.get('button[name="delete"]').click();

    cy.get('[class*=circle_content]')
      .should('have.length', 3)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('1');
          cy.wrap(el).should('not.have.html', '[class*=circle_head]');
          cy.wrap(el).find('[class*=circle_default]');
        }

        if (index === 1) {
          cy.wrap(el).contains('2');
          cy.wrap(el).should('not.have.html', '[class*=circle_head]');
          cy.wrap(el).find('[class*=circle_default]');
        }

        if (index === 2) {
          cy.wrap(el).contains('3');
          cy.wrap(el).get('[class*=circle_head]').should('contain.text', 'top');
          cy.wrap(el).find('[class*=circle_changing]');
        }
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get('[class*=circle_content]')
      .should('have.length', 2)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('1');
          cy.wrap(el).should('not.have.html', '[class*=circle_head]');
          cy.wrap(el).find('[class*=circle_default]');
        }

        if (index === 1) {
          cy.wrap(el).contains('2');
          cy.wrap(el).get('[class*=circle_head]').should('contain.text', 'top');
          cy.wrap(el).find('[class*=circle_default]');
        }
      });
  });

  it('Should have correct range clearing', () => {
    cy.get('button[name="clear"]').click();
    cy.get('[class*=stack_results]').should(
      'not.have.html',
      '[class*=circle_content]'
    );
  });
});
