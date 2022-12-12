import { CSS_SELECTORS, BASIC_LABELS } from './e2e-constants';
import { SHORT_DELAY_IN_MS, QUEUE_LEN } from '../../src/constants';

describe('Page with data structure "Queue" is testing', () => {
  before(() => {
    cy.visit('/queue');
  });

  it('Submit button should be disabled', () => {
    cy.get(CSS_SELECTORS.singleInput).should('have.value', '');
    cy.get(CSS_SELECTORS.addButton).should('be.disabled');
  });

  it('Should have correct visualization during elements adding', () => {

    // Add first element to queue
    cy.get(CSS_SELECTORS.singleInput).type('1').should('have.value', '1');
    cy.get(CSS_SELECTORS.addButton).click();

    cy.get(CSS_SELECTORS.circle).first()
      .find(CSS_SELECTORS.circleChangingState);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CSS_SELECTORS.circle)
      .should('have.length', QUEUE_LEN)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).get(CSS_SELECTORS.circleLetter).contains('1');
          cy.wrap(el).get(CSS_SELECTORS.circleHead).should('contain.text', BASIC_LABELS.headText);
          cy.wrap(el).get(CSS_SELECTORS.circleTail).should('contain.text', BASIC_LABELS.tailText);
          cy.wrap(el).find(CSS_SELECTORS.circleChangingState);
        }
      });

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CSS_SELECTORS.circle)
      .should('have.length', QUEUE_LEN)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).get(CSS_SELECTORS.circleLetter).contains('1');
          cy.wrap(el).get(CSS_SELECTORS.circleHead).should('contain.text', BASIC_LABELS.headText);
          cy.wrap(el).get(CSS_SELECTORS.circleTail).should('contain.text', BASIC_LABELS.tailText);
        }
        else {
          cy.wrap(el).get(CSS_SELECTORS.circleLetter).should('be.empty');
          cy.wrap(el).get(CSS_SELECTORS.circleHead).should('be.empty');
          cy.wrap(el).get(CSS_SELECTORS.circleTail).should('be.empty');
          
        }
        cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);  
      });

    cy.get(CSS_SELECTORS.singleInput).should('have.value', '');
    cy.get(CSS_SELECTORS.deleteButton).should('be.enabled');
    cy.get(CSS_SELECTORS.clearButton).should('be.enabled');

    // Add second element to queue
    cy.get(CSS_SELECTORS.singleInput).type('2').should('have.value', '2');
    cy.get(CSS_SELECTORS.addButton).click();

    cy.get(CSS_SELECTORS.circle).first()
      .find(CSS_SELECTORS.circleDefaultState);

      cy.get(CSS_SELECTORS.circle).eq(1)
      .find(CSS_SELECTORS.circleChangingState);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CSS_SELECTORS.circle).eq(1)
      .contains('2');
    cy.get(CSS_SELECTORS.circle).eq(1)
      .get(CSS_SELECTORS.circleHead).should('be.empty');
    cy.get(CSS_SELECTORS.circle).eq(1)
      .get(CSS_SELECTORS.circleTail).should('contain.text', BASIC_LABELS.tailText);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CSS_SELECTORS.circle)
    .should('have.length', QUEUE_LEN)
    .each((el, index) => {
      if (index === 0) {
        cy.wrap(el).get(CSS_SELECTORS.circleLetter).contains('1');
        cy.wrap(el).get(CSS_SELECTORS.circleHead).should('contain.text', BASIC_LABELS.headText);
        cy.wrap(el).get(CSS_SELECTORS.circleTail).should('be.empty');
      }

      if(index === 1) {
        cy.wrap(el).get(CSS_SELECTORS.circleLetter).contains('2');
        cy.wrap(el).get(CSS_SELECTORS.circleHead).should('be.empty');
        cy.wrap(el).get(CSS_SELECTORS.circleTail).should('contain.text', BASIC_LABELS.tailText);
      }

      if(index > 1) {
        cy.wrap(el).get(CSS_SELECTORS.circleLetter).should('be.empty');
        cy.wrap(el).get(CSS_SELECTORS.circleHead).should('be.empty');
        cy.wrap(el).get(CSS_SELECTORS.circleTail).should('be.empty');
      }

      cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);  
    });

    cy.get(CSS_SELECTORS.singleInput).should('have.value', '');
    cy.get(CSS_SELECTORS.deleteButton).should('be.enabled');
    cy.get(CSS_SELECTORS.clearButton).should('be.enabled');

    // Add third element to queue
    cy.get(CSS_SELECTORS.singleInput).type('3').should('have.value', '3');
    cy.get(CSS_SELECTORS.addButton).click();

    cy.get(CSS_SELECTORS.circle).first()
      .find(CSS_SELECTORS.circleDefaultState);

    cy.get(CSS_SELECTORS.circle).eq(1)
      .find(CSS_SELECTORS.circleDefaultState);

    cy.get(CSS_SELECTORS.circle).eq(2)
      .find(CSS_SELECTORS.circleChangingState);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CSS_SELECTORS.circle).eq(2)
      .contains('3');
    cy.get(CSS_SELECTORS.circle).eq(1)
      .get(CSS_SELECTORS.circleHead).should('be.empty');
    cy.get(CSS_SELECTORS.circle).eq(2)
      .get(CSS_SELECTORS.circleHead).should('be.empty');
    cy.get(CSS_SELECTORS.circle).eq(1)
      .get(CSS_SELECTORS.circleTail).should('be.empty');
    cy.get(CSS_SELECTORS.circle).eq(2)
      .get(CSS_SELECTORS.circleTail).should('contain.text', BASIC_LABELS.tailText);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CSS_SELECTORS.circle)
      .should('have.length', QUEUE_LEN)
      .each((el, index) => {
        if (index === 0) {
          cy.wrap(el).get(CSS_SELECTORS.circleLetter).contains('1');
          cy.wrap(el).get(CSS_SELECTORS.circleHead).should('contain.text', BASIC_LABELS.headText);
          cy.wrap(el).get(CSS_SELECTORS.circleTail).should('be.empty');
        }

        if (index === 2) {
          cy.wrap(el).get(CSS_SELECTORS.circleLetter).contains('2');
          cy.wrap(el).get(CSS_SELECTORS.circleHead).should('be.empty');
          cy.wrap(el).get(CSS_SELECTORS.circleTail).should('be.empty');
        }

        if(index === 2) {
          cy.wrap(el).get(CSS_SELECTORS.circleLetter).contains('3');
          cy.wrap(el).get(CSS_SELECTORS.circleHead).should('be.empty');
          cy.wrap(el).get(CSS_SELECTORS.circleTail).should('contain.text', BASIC_LABELS.tailText);
        }

        if(index > 2) {
          cy.wrap(el).get(CSS_SELECTORS.circleLetter).should('be.empty');
          cy.wrap(el).get(CSS_SELECTORS.circleHead).should('be.empty');
          cy.wrap(el).get(CSS_SELECTORS.circleTail).should('be.empty');
        }

        cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);  
      });
  });

  it('Should have correct visualization during elements deleting', () => {
    cy.get(CSS_SELECTORS.deleteButton).click();

    cy.get(CSS_SELECTORS.circle).first()
      .find(CSS_SELECTORS.circleChangingState);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CSS_SELECTORS.circle).first()
      .find(CSS_SELECTORS.circleDefaultState);

    cy.get(CSS_SELECTORS.circle).first()
      .get(CSS_SELECTORS.circleLetter).should('be.empty');

    cy.get(CSS_SELECTORS.circle).first()
      .get(CSS_SELECTORS.circleHead).should('be.empty');

    cy.get(CSS_SELECTORS.circle).eq(1)
      .find(CSS_SELECTORS.circleChangingState);

    cy.get(CSS_SELECTORS.circle).eq(1)
      .get(CSS_SELECTORS.circleHead).should('contain.text', BASIC_LABELS.headText);

    cy.wait(SHORT_DELAY_IN_MS);

    cy.get(CSS_SELECTORS.circle).eq(1)
      .find(CSS_SELECTORS.circleDefaultState);
  });

  it('Should have correct range clearing', () => {
    cy.get(CSS_SELECTORS.clearButton).click();

    cy.get(CSS_SELECTORS.circle)
      .should('have.length', QUEUE_LEN)
      .each((el, index) => {
        cy.wrap(el).get(CSS_SELECTORS.circleLetter).should('be.empty');
        cy.wrap(el).get(CSS_SELECTORS.circleHead).should('be.empty');
        cy.wrap(el).get(CSS_SELECTORS.circleTail).should('be.empty');
        cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);  
      });

    cy.get(CSS_SELECTORS.deleteButton).should('be.disabled');
    cy.get(CSS_SELECTORS.clearButton).should('be.disabled');
  });
});

export { };
