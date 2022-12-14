import { CSS_SELECTORS } from './e2e-constants';
import { SHORT_DELAY_IN_MS } from '../../src/constants';

describe('Page with algorithm "Fibonacci" is testing', () => {
  before(() => {
    cy.visit('/fibonacci');
  });

  it('Submit button should be disabled', () => {
    cy.get(CSS_SELECTORS.singleInput).should('have.value', '0');
    cy.get(CSS_SELECTORS.submitButton).should('be.disabled');
  });

  it('Submit button should be disabled on typed empty string in input (clear it)', () => {
    cy.get(CSS_SELECTORS.singleInput).clear();
    cy.get(CSS_SELECTORS.submitButton).should('be.disabled');
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

    cy.get(CSS_SELECTORS.singleInput).clear().type(startValue).should('have.value', startValue);
    cy.get(CSS_SELECTORS.submitButton).should('be.enabled').click();

    cy.get(CSS_SELECTORS.circle)
      .should('have.length', 1);

    cy.get(CSS_SELECTORS.circleLetter)
      .each((el, index) => {
        cy.wrap(el).contains(resultSteps[0][index]);
      });

    cy.get(CSS_SELECTORS.circleIndex)
      .each((el, index) => {
        cy.wrap(el).contains(index);
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CSS_SELECTORS.circle)
      .should('have.length', 2);

    cy.get(CSS_SELECTORS.circleLetter)
      .each((el, index) => {
        cy.wrap(el).contains(resultSteps[1][index]);
      });

    cy.get(CSS_SELECTORS.circleIndex)
      .each((el, index) => {
        cy.wrap(el).contains(index);
      });
      
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CSS_SELECTORS.circle)
      .should('have.length', 3);

    cy.get(CSS_SELECTORS.circleLetter)
      .each((el, index) => {
        cy.wrap(el).contains(resultSteps[2][index]);
      });

    cy.get(CSS_SELECTORS.circleIndex)
      .each((el, index) => {
        cy.wrap(el).contains(index);
      });
      
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CSS_SELECTORS.circle)
      .should('have.length', 4);

    cy.get(CSS_SELECTORS.circleLetter)
      .each((el, index) => {
        cy.wrap(el).contains(resultSteps[3][index]);
      });

    cy.get(CSS_SELECTORS.circleIndex)
      .each((el, index) => {
        cy.wrap(el).contains(index);
      });
      
    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CSS_SELECTORS.circle)
      .should('have.length', 5);

    cy.get(CSS_SELECTORS.circleLetter)
      .each((el, index) => {
        cy.wrap(el).contains(resultSteps[4][index]);
      });

    cy.get(CSS_SELECTORS.circleIndex)
      .each((el, index) => {
        cy.wrap(el).contains(index);
      });
  });
});

export { };
