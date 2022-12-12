import { CSS_SELECTORS, BASIC_LABELS } from './e2e-constants';
import { SHORT_DELAY_IN_MS } from '../../src/constants';

describe('Page with data structure "Stack" is testing', () => {
  before(() => {
    cy.visit('/stack');
  });

  it('Submit button should be disabled', () => {
    cy.get(CSS_SELECTORS.singleInput).should('have.value', '');
    cy.get(CSS_SELECTORS.addButton).should('be.disabled');
  });

  it('Should have correct visualization during elements adding', () => {
    cy.get(CSS_SELECTORS.singleInput).type('1').should('have.value', '1');
    cy.get(CSS_SELECTORS.addButton).click();

    cy.get(CSS_SELECTORS.circle)
      .should('have.length', 1)
      .each((el) => {
        cy.wrap(el).contains('1');
        cy.wrap(el).get(CSS_SELECTORS.circleHead).should('contain.text', BASIC_LABELS.topText);
        cy.wrap(el).find(CSS_SELECTORS.circleChangingState);
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CSS_SELECTORS.circle).each((el) => {
      cy.wrap(el).contains('1');
      cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);
    });

    cy.get(CSS_SELECTORS.singleInput).type('2').should('have.value', '2');
    cy.get(CSS_SELECTORS.addButton).click();

    cy.get(CSS_SELECTORS.circle)
      .should('have.length', 2)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('1');
          cy.wrap(el).should('not.have.html', CSS_SELECTORS.circleHead);
          cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);
        }

        if (index === 1) {
          cy.wrap(el).contains('2');
          cy.wrap(el).get(CSS_SELECTORS.circleHead).should('contain.text', BASIC_LABELS.topText);
          cy.wrap(el).find(CSS_SELECTORS.circleChangingState);
        }
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CSS_SELECTORS.circle)
      .should('have.length', 2)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('1');
          cy.wrap(el).should('not.have.html', CSS_SELECTORS.circleHead);
          cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);
        }

        if (index === 1) {
          cy.wrap(el).contains('2');
          cy.wrap(el).get(CSS_SELECTORS.circleHead).should('contain.text', BASIC_LABELS.topText);
          cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);
        }
      });

    cy.get(CSS_SELECTORS.singleInput).type('3').should('have.value', '3');
    cy.get(CSS_SELECTORS.addButton).click();

    cy.get(CSS_SELECTORS.circle)
      .should('have.length', 3)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('1');
          cy.wrap(el).should('not.have.html', CSS_SELECTORS.circleHead);
          cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);
        }

        if (index === 1) {
          cy.wrap(el).contains('2');
          cy.wrap(el).should('not.have.html', CSS_SELECTORS.circleHead);
          cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);
        }

        if (index === 2) {
          cy.wrap(el).contains('3');
          cy.wrap(el).get(CSS_SELECTORS.circleHead).should('contain.text', BASIC_LABELS.topText);
          cy.wrap(el).find(CSS_SELECTORS.circleChangingState);
        }
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CSS_SELECTORS.circle)
      .should('have.length', 3)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('1');
          cy.wrap(el).should('not.have.html', CSS_SELECTORS.circleHead);
          cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);
        }

        if (index === 1) {
          cy.wrap(el).contains('2');
          cy.wrap(el).should('not.have.html', CSS_SELECTORS.circleHead);
          cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);
        }

        if (index === 2) {
          cy.wrap(el).contains('3');
          cy.wrap(el).get(CSS_SELECTORS.circleHead).should('contain.text', BASIC_LABELS.topText);
          cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);
        }
      });

    cy.get(CSS_SELECTORS.singleInput).should('have.value', '');
  });

  it('Should have correct visualization during elements deleting', () => {
    cy.get(CSS_SELECTORS.deleteButton).click();

    cy.get(CSS_SELECTORS.circle)
      .should('have.length', 3)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('1');
          cy.wrap(el).should('not.have.html', CSS_SELECTORS.circleHead);
          cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);
        }

        if (index === 1) {
          cy.wrap(el).contains('2');
          cy.wrap(el).should('not.have.html', CSS_SELECTORS.circleHead);
          cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);
        }

        if (index === 2) {
          cy.wrap(el).contains('3');
          cy.wrap(el).get(CSS_SELECTORS.circleHead).should('contain.text', BASIC_LABELS.topText);
          cy.wrap(el).find(CSS_SELECTORS.circleChangingState);
        }
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CSS_SELECTORS.circle)
      .should('have.length', 2)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).contains('1');
          cy.wrap(el).should('not.have.html', CSS_SELECTORS.circleHead);
          cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);
        }

        if (index === 1) {
          cy.wrap(el).contains('2');
          cy.wrap(el).get(CSS_SELECTORS.circleHead).should('contain.text', BASIC_LABELS.topText);
          cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);
        }
      });
  });

  it('Should have correct range clearing', () => {
    cy.get(CSS_SELECTORS.clearButton).click();
    cy.get('[class*=stack_results]').should(
      'not.have.html',
      CSS_SELECTORS.circle
    );
  });
});

export { };
