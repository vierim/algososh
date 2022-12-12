import { CSS_SELECTORS, BASIC_LABELS, STATE_COLORS } from './e2e-constants';
import { MIN_LIST_LEN, MAX_LIST_LEN, DELAY_IN_MS } from '../../src/constants';

describe('Page with data structure "LinkedList" is testing', () => {
  beforeEach(() => {
    cy.visit('/list');
  });

  it('Buttons should be disabled', () => {
    cy.get(CSS_SELECTORS.valueInput).should('be.empty');
    cy.get(CSS_SELECTORS.indexInput).should('be.empty');

    cy.get(CSS_SELECTORS.addToHeadButton).should('be.disabled');
    cy.get(CSS_SELECTORS.addToTailButton).should('be.disabled');

    cy.get(CSS_SELECTORS.addByIndexButton).should('be.disabled');
    cy.get(CSS_SELECTORS.deleteByIndexButton).should('be.disabled');
  });

  it('Should render default LinkedList with random values', () => {
    let list: JQuery<HTMLElement>[] = [];

    cy.get(CSS_SELECTORS.circle).as('circles');

    cy.get('@circles')
      .its('length')
      .should('be.gte', MIN_LIST_LEN)
      .and('be.lte', MAX_LIST_LEN);

    cy.get('@circles').each(($el) => {
      list.push($el);
    });

    cy.get('@circles').each((el, index) => {
      cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);
      cy.wrap(el).find(CSS_SELECTORS.circleLetter).should('not.be.empty');
    });

    cy.get('@circles').each((el, index) => {
      console.log(list.length);
      if (index === 0) {
        cy.wrap(el).find(CSS_SELECTORS.circleHead)
          .should('contain.text', BASIC_LABELS.headText);
      } else if (index === list.length - 1) {
        cy.wrap(el).find(CSS_SELECTORS.circleTail)
          .should('contain.text', BASIC_LABELS.tailText);
      } else {
        cy.wrap(el).find(CSS_SELECTORS.circleHead).should('be.empty');
        cy.wrap(el).find(CSS_SELECTORS.circleTail).should('be.empty');
      }
    });
  });

  it('Should render adding element to the head position', () => {
    const list: JQuery<HTMLElement>[] = [];
    const newElement = '333';
    let len = 0;

    cy.get(CSS_SELECTORS.circle).as('circles');

    cy.get('@circles')
      .each(($el) => {
        list.push($el);
      })
      .then((elements) => {
        len = elements.length + 1;

        cy.get(CSS_SELECTORS.valueInput)
          .type(newElement)
          .should('have.value', newElement);
        cy.get(CSS_SELECTORS.addToHeadButton).should('be.enabled');
        cy.get(CSS_SELECTORS.addToHeadButton).click();

        cy.get(CSS_SELECTORS.circle)
          .first()
          .find(CSS_SELECTORS.circleHead)
          .should('be.empty');
        cy.get(CSS_SELECTORS.circle)
          .first()
          .find(CSS_SELECTORS.smallCircle)
          .as('smallCircle');

        cy.get('@smallCircle').should(($div) => {
          expect($div[0].className).to.match(/circle_changing/gm);
        });
        cy.get('@smallCircle').should('contain.text', newElement);

        cy.wait(DELAY_IN_MS);

        cy.get(CSS_SELECTORS.circle).should('have.length', len);

        cy.get(CSS_SELECTORS.circle)
          .first()
          .find(CSS_SELECTORS.circleModifiedState);
        cy.get(CSS_SELECTORS.circle)
          .first()
          .find(CSS_SELECTORS.circleHead)
          .should('contain.text', BASIC_LABELS.headText);
        cy.get(CSS_SELECTORS.circle)
          .first()
          .should('contain.text', newElement);

        cy.wait(DELAY_IN_MS);

        cy.get(CSS_SELECTORS.circle).each((el) => {
          cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);
        });
      });
  });

  it('Should render adding element to the tail position', () => {
    const list: JQuery<HTMLElement>[] = [];
    const newElement = '444';
    let len = 0;

    cy.get(CSS_SELECTORS.circle).as('circles');

    cy.get('@circles')
      .each(($el) => {
        list.push($el);
      })
      .then((elements) => {
        len = elements.length + 1;

        cy.get(CSS_SELECTORS.valueInput)
          .type(newElement)
          .should('have.value', newElement);
        cy.get(CSS_SELECTORS.addToTailButton).should('be.enabled');
        cy.get(CSS_SELECTORS.addToTailButton).click();

        cy.get(CSS_SELECTORS.circle)
          .last()
          .find(CSS_SELECTORS.circleHead)
          .should('be.empty');
        cy.get(CSS_SELECTORS.circle)
          .last()
          .find(CSS_SELECTORS.smallCircle)
          .as('smallCircle');

        cy.get('@smallCircle').should(($div) => {
          expect($div[0].className).to.match(/circle_changing/gm);
        });
        cy.get('@smallCircle').should('contain.text', newElement);

        cy.wait(DELAY_IN_MS);

        cy.get(CSS_SELECTORS.circle).should('have.length', len);

        cy.get(CSS_SELECTORS.circle)
          .last()
          .find(CSS_SELECTORS.circleModifiedState);
        cy.get(CSS_SELECTORS.circle)
          .last()
          .find(CSS_SELECTORS.circleTail)
          .should('contain.text', BASIC_LABELS.tailText);
        cy.get(CSS_SELECTORS.circle)
          .last()
          .should('contain.text', newElement);

        cy.wait(DELAY_IN_MS);

        cy.get(CSS_SELECTORS.circle).each((el) => {
          cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);
        });
      });
  });

  it('Should render adding element to the index position', () => {
    const originalList: JQuery<HTMLElement>[] = [];
    const newListElement = '555';
    const addingPositionIndex = 1;
    let newListLength = 0;

    cy.get(CSS_SELECTORS.circle).as('originalCircles');

    cy.get('@originalCircles')
      .each(($el) => {
        originalList.push($el);
      })
      .then((elements) => {
        newListLength = elements.length + 1;

        cy.get(CSS_SELECTORS.valueInput)
          .type(newListElement)
          .should('have.value', newListElement);
        cy.get(CSS_SELECTORS.indexInput)
          .type(addingPositionIndex.toString())
          .should('have.value', addingPositionIndex.toString());
        cy.get(CSS_SELECTORS.addByIndexButton).should('be.enabled');
        cy.get(CSS_SELECTORS.addByIndexButton).click();

        cy.get(CSS_SELECTORS.circle)
          .first()
          .find(CSS_SELECTORS.circleChangingState);
        cy.wait(DELAY_IN_MS);

        cy.get(CSS_SELECTORS.circle).as('circles');
        cy.get('@circles').first().find(CSS_SELECTORS.circleChangingState);
        cy.get('@circles').eq(1).find(CSS_SELECTORS.circleChangingState);

        cy.get(CSS_SELECTORS.listItem)
          .first()
          .find('svg')
          .find('path')
          .should('have.attr', 'fill', STATE_COLORS.modified);
        cy.wait(DELAY_IN_MS);

        cy.get(CSS_SELECTORS.circle).as('circles');
        cy.get('@circles').first().find(CSS_SELECTORS.circleChangingState);
        cy.get('@circles').eq(1).find(CSS_SELECTORS.circleChangingState);
        cy.get('@circles')
          .eq(1)
          .find(CSS_SELECTORS.smallCircle)
          .as('smallCircle');
        cy.get('@smallCircle').should(($div) => {
          expect($div[0].className).to.match(/circle_changing/gm);
        });
        cy.get('@smallCircle').should('contain.text', newListElement);
        cy.get(CSS_SELECTORS.listItem)
          .first()
          .find('svg')
          .find('path')
          .should('have.attr', 'fill', STATE_COLORS.modified);
        cy.wait(DELAY_IN_MS);

        cy.get(CSS_SELECTORS.circle).each((el, index) => {
          if (index === 0) {
            cy.wrap(el).find(CSS_SELECTORS.circleChangingState);
          }

          if (index === 1) {
            cy.wrap(el).should('contain.text', newListElement);
            cy.wrap(el).find(CSS_SELECTORS.circleModifiedState);
          }

          if (index > 1) {
            cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);
          }
        });
        cy.get(CSS_SELECTORS.listItem)
          .first()
          .find('svg')
          .find('path')
          .should('have.attr', 'fill', STATE_COLORS.modified);
        cy.wait(DELAY_IN_MS);

        cy.get(CSS_SELECTORS.circle).should('have.length', newListLength);
        cy.get(CSS_SELECTORS.circle).each((el) => {
          cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);
        });
        cy.get(CSS_SELECTORS.listItem).each((el, index) => {
          if (index < newListLength - 1) {
            cy.wrap(el)
              .find('svg')
              .find('path')
              .should('have.attr', 'fill', STATE_COLORS.default);
          }
        });
      });
  });

  it('Should render deleting element from the head position', () => {
    const originalList: JQuery<HTMLElement>[] = [];
    let newListLength = 0;

    cy.get(CSS_SELECTORS.circle).as('circles');

    cy.get('@circles')
      .each(($el) => {
        originalList.push($el);
      })
      .then((elements) => {
        newListLength = elements.length - 1;

        cy.get(CSS_SELECTORS.deleteFromHeadButton).click();

        cy.get('@circles')
          .first()
          .find(CSS_SELECTORS.circleLetter)
          .should('be.empty');

        cy.get(CSS_SELECTORS.circle)
          .first()
          .find(CSS_SELECTORS.smallCircle)
          .as('smallCircle');

        cy.get('@smallCircle').should(($div) => {
          expect($div[0].className).to.match(/circle_changing/gm);
        });

        cy.get(CSS_SELECTORS.circle)
          .first()
          .find(CSS_SELECTORS.circleHead)
          .should('contain.text', BASIC_LABELS.headText);

        cy.wait(DELAY_IN_MS);

        cy.get(CSS_SELECTORS.circle).should('have.length', newListLength);

        cy.get(CSS_SELECTORS.circle).each((el) => {
          cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);
        });
      });
  });

  it('Should render deleting element from the tail position', () => {
    const originalList: JQuery<HTMLElement>[] = [];
    let newListLength = 0;

    cy.get(CSS_SELECTORS.circle).as('circles');

    cy.get('@circles')
      .each(($el) => {
        originalList.push($el);
      })
      .then((elements) => {
        newListLength = elements.length - 1;

        cy.get(CSS_SELECTORS.deleteFromTailButton).click();

        cy.get('@circles')
          .last()
          .find(CSS_SELECTORS.circleLetter)
          .should('be.empty');

        cy.get(CSS_SELECTORS.circle)
          .last()
          .find(CSS_SELECTORS.circleTail)
          .should('not.contain.text', BASIC_LABELS.tailText);

        cy.get(CSS_SELECTORS.circle)
          .last()
          .find(CSS_SELECTORS.smallCircle)
          .as('smallCircle');

        cy.get('@smallCircle').should(($div) => {
          expect($div[0].className).to.match(/circle_changing/gm);
        });

        cy.wait(DELAY_IN_MS);

        cy.get(CSS_SELECTORS.circle).should('have.length', newListLength);

        cy.get(CSS_SELECTORS.circle).each((el) => {
          cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);
        });
      });
  });

  it('Should render deleting element from the index position', () => {
    const originalList: JQuery<HTMLElement>[] = [];
    const deletingPositionIndex = 1;
    let newListLength = 0;

    cy.get(CSS_SELECTORS.circle).as('originalCircles');

    cy.get('@originalCircles')
      .each(($el) => {
        originalList.push($el);
      })
      .then((elements) => {
        newListLength = elements.length - 1;

        cy.get(CSS_SELECTORS.indexInput)
          .type(deletingPositionIndex.toString())
          .should('have.value', deletingPositionIndex.toString());
        cy.get(CSS_SELECTORS.deleteByIndexButton).should('be.enabled');
        cy.get(CSS_SELECTORS.deleteByIndexButton).click();

        cy.get(CSS_SELECTORS.circle)
          .first()
          .find(CSS_SELECTORS.circleChangingState);
        cy.wait(DELAY_IN_MS);

        cy.get(CSS_SELECTORS.circle).as('circles');
        cy.get('@circles').first().find(CSS_SELECTORS.circleChangingState);
        cy.get('@circles').eq(1).find(CSS_SELECTORS.circleChangingState);

        cy.get(CSS_SELECTORS.listItem)
          .first()
          .find('svg')
          .find('path')
          .should('have.attr', 'fill', STATE_COLORS.modified);
        cy.wait(DELAY_IN_MS);

        cy.get(CSS_SELECTORS.circle).as('circles');
        cy.get('@circles').first().find(CSS_SELECTORS.circleChangingState);
        cy.get('@circles').eq(1).find(CSS_SELECTORS.circleChangingState);
        cy.get('@circles')
          .eq(1)
          .find(CSS_SELECTORS.circleLetter)
          .should('be.empty');

        cy.get(CSS_SELECTORS.listItem)
          .first()
          .find('svg')
          .find('path')
          .should('have.attr', 'fill', STATE_COLORS.modified);

        cy.get('@circles')
          .eq(1)
          .find(CSS_SELECTORS.smallCircle)
          .as('smallCircle');
        cy.get('@smallCircle').should(($div) => {
          expect($div[0].className).to.match(/circle_changing/gm);
        });

        cy.wait(DELAY_IN_MS);

        cy.get(CSS_SELECTORS.circle).should('have.length', newListLength);
        cy.get(CSS_SELECTORS.circle).each((el) => {
          cy.wrap(el).find(CSS_SELECTORS.circleDefaultState);
        });
        cy.get(CSS_SELECTORS.listItem).each((el, index) => {
          if (index < newListLength - 1) {
            cy.wrap(el)
              .find('svg')
              .find('path')
              .should('have.attr', 'fill', STATE_COLORS.default);
          }
        });
      });
  });
});

export { };
