import { CSS_SELECTORS } from './e2e-constants';
import { DELAY_IN_MS } from '../../src/constants';

describe('Page with algorithm "String" is testing', () => {
  before(() => {
    cy.visit('/recursion');
  });

  it('Submit button should be disabled', () => {
    cy.get(CSS_SELECTORS.singleInput).should('have.value', '');
    cy.get(CSS_SELECTORS.submitButton).should('be.disabled');
  });

  it('Should have correct steps to result', () => {
    const sampleString = '12345';
    const steps = [
      '12345',
      '12345',
      '52341',
      '54321'
    ];
    
    cy.get(CSS_SELECTORS.singleInput).type(sampleString).should('have.value', sampleString);
    cy.get(CSS_SELECTORS.submitButton).click();

    cy.get(CSS_SELECTORS.circle)
      .should('have.length', 5)
      .each((el, index) => {
        cy.wrap(el).contains(steps[0][index]);
        cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);
      });

    cy.wait(DELAY_IN_MS);

    cy.get(CSS_SELECTORS.circle)
      .should('have.length', 5)
      .each((el, index) => {
        cy.wrap(el).contains(steps[1][index]);
      });

    cy.get(CSS_SELECTORS.circle).first()
      .find(CSS_SELECTORS.circleChangingState);
    cy.get(CSS_SELECTORS.circle).last()
      .find(CSS_SELECTORS.circleChangingState);

    cy.wait(DELAY_IN_MS);

    cy.get(CSS_SELECTORS.circle)
      .should('have.length', 5)
      .each((el, index) => {
        cy.wrap(el).contains(steps[2][index]);

        if(index === 0 || index === 4) {
          cy.wrap(el).find(CSS_SELECTORS.circleModifiedState);
        } else if(index === 1 || index === 3) {
          cy.wrap(el).find(CSS_SELECTORS.circleChangingState);
        } else {
          cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);
        }
      });
    
    cy.wait(DELAY_IN_MS);

    cy.get(CSS_SELECTORS.circle)
      .should('have.length', 5)
      .each((el, index) => {
        cy.wrap(el).contains(steps[3][index]);
        cy.wrap(el).find(CSS_SELECTORS.circleModifiedState);
      });
  });

  it('Should correctly clean envirenment', () => {
    cy.get(CSS_SELECTORS.singleInput).should('have.value', '');
    cy.get(CSS_SELECTORS.submitButton).should('be.disabled');
  });
});

export { };
