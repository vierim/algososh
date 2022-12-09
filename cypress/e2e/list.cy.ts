import { MIN_LIST_LEN, MAX_LIST_LEN, DELAY_IN_MS } from '../../src/constants';

describe('Page with DS "Linked List" is testing', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/list');
  });

  it('Buttons should be disabled', () => {
    cy.get('input[name=value]').should('be.empty');
    cy.get('input[name=index]').should('be.empty');

    cy.get('button[name=addToHeadButton]').should('be.disabled');
    cy.get('button[name=addToTailButton]').should('be.disabled');

    cy.get('button[name=addByIndexButton]').should('be.disabled');
    cy.get('button[name=deleteByIndexButton]').should('be.disabled');
  });

  it('Should render default LinkedList with random values', () => {
    let list: JQuery<HTMLElement>[] = [];

    cy.get('[class*=circle_content]').as('circles');

    cy.get('@circles')
      .its('length')
      .should('be.gte', MIN_LIST_LEN)
      .and('be.lte', MAX_LIST_LEN);

    cy.get('@circles').each(($el) => {
      list.push($el);
    });

    cy.get('@circles').each((el, index) => {
      cy.wrap(el).find('[class*=circle_default]');
      cy.wrap(el).find('[class*=circle_letter]').should('not.be.empty');
    });

    cy.get('@circles').each((el, index) => {
      console.log(list.length);
      if (index === 0) {
        cy.wrap(el).find('[class*=circle_head]').should('contain.text', 'head');
      } else if (index === list.length - 1) {
        cy.wrap(el).find('[class*=circle_tail]').should('contain.text', 'tail');
      } else {
        cy.wrap(el).find('[class*=circle_head]').should('be.empty');
        cy.wrap(el).find('[class*=circle_tail]').should('be.empty');
      }
    });
  });

  it('Should render adding element to the head position', () => {
    const list: JQuery<HTMLElement>[] = [];
    const newElement = '333';
    let len = 0;

    cy.get('[class*=circle_content]').as('circles');

    cy.get('@circles')
      .each(($el) => {
        list.push($el);
      })
      .then((elements) => {
        len = elements.length + 1;

        cy.get('input[name=value]')
          .type(newElement)
          .should('have.value', newElement);
        cy.get('button[name=addToHeadButton]').should('be.enabled');
        cy.get('button[name=addToHeadButton]').click();

        cy.get('[class*=circle_content]')
          .first()
          .find('[class*=circle_head]')
          .should('be.empty');
        cy.get('[class*=circle_content]')
          .first()
          .find('[class*=circle_small]')
          .as('smallCircle');

        cy.get('@smallCircle').should(($div) => {
          expect($div[0].className).to.match(/circle_changing/gm);
        });
        cy.get('@smallCircle').should('contain.text', newElement);

        cy.wait(DELAY_IN_MS);

        cy.get('[class*=circle_content]').should('have.length', len);

        cy.get('[class*=circle_content]')
          .first()
          .find('[class*=circle_modified]');
        cy.get('[class*=circle_content]')
          .first()
          .find('[class*=circle_head]')
          .should('contain.text', 'head');
        cy.get('[class*=circle_content]')
          .first()
          .should('contain.text', newElement);

        cy.wait(DELAY_IN_MS);

        cy.get('[class*=circle_content]').each((el) => {
          cy.wrap(el).find('[class*=circle_default]');
        });
      });
  });

  it('Should render adding element to the tail position', () => {
    const list: JQuery<HTMLElement>[] = [];
    const newElement = '444';
    let len = 0;

    cy.get('[class*=circle_content]').as('circles');

    cy.get('@circles')
      .each(($el) => {
        list.push($el);
      })
      .then((elements) => {
        len = elements.length + 1;

        cy.get('input[name=value]')
          .type(newElement)
          .should('have.value', newElement);
        cy.get('button[name=addToTailButton]').should('be.enabled');
        cy.get('button[name=addToTailButton]').click();

        cy.get('[class*=circle_content]')
          .last()
          .find('[class*=circle_head]')
          .should('be.empty');
        cy.get('[class*=circle_content]')
          .last()
          .find('[class*=circle_small]')
          .as('smallCircle');

        cy.get('@smallCircle').should(($div) => {
          expect($div[0].className).to.match(/circle_changing/gm);
        });
        cy.get('@smallCircle').should('contain.text', newElement);

        cy.wait(DELAY_IN_MS);

        cy.get('[class*=circle_content]').should('have.length', len);

        cy.get('[class*=circle_content]')
          .last()
          .find('[class*=circle_modified]');
        cy.get('[class*=circle_content]')
          .last()
          .find('[class*=circle_tail]')
          .should('contain.text', 'tail');
        cy.get('[class*=circle_content]')
          .last()
          .should('contain.text', newElement);

        cy.wait(DELAY_IN_MS);

        cy.get('[class*=circle_content]').each((el) => {
          cy.wrap(el).find('[class*=circle_default]');
        });
      });
  });

  it('Should render adding element to the index position', () => {
    const originalList: JQuery<HTMLElement>[] = [];
    const newListElement = '555';
    const addingPositionIndex = 1;
    let newListLength = 0;

    cy.get('[class*=circle_content]').as('originalCircles');

    cy.get('@originalCircles')
      .each(($el) => {
        originalList.push($el);
      })
      .then((elements) => {
        newListLength = elements.length + 1;

        cy.get('input[name=value]')
          .type(newListElement)
          .should('have.value', newListElement);
        cy.get('input[name=index]')
          .type(addingPositionIndex.toString())
          .should('have.value', addingPositionIndex.toString());
        cy.get('button[name=addByIndexButton]').should('be.enabled');
        cy.get('button[name=addByIndexButton]').click();

        cy.get('[class*=circle_content]')
          .first()
          .find('[class*=circle_changing]');
        cy.wait(DELAY_IN_MS);

        cy.get('[class*=circle_content]').as('circles');
        cy.get('@circles').first().find('[class*=circle_changing]');
        cy.get('@circles').eq(1).find('[class*=circle_changing]');

        cy.get('[class*=list_item]')
          .first()
          .find('svg')
          .find('path')
          .should('have.attr', 'fill', '#d252e1');
        cy.wait(DELAY_IN_MS);

        cy.get('[class*=circle_content]').as('circles');
        cy.get('@circles').first().find('[class*=circle_changing]');
        cy.get('@circles').eq(1).find('[class*=circle_changing]');
        cy.get('@circles')
          .eq(1)
          .find('[class*=circle_small]')
          .as('smallCircle');
        cy.get('@smallCircle').should(($div) => {
          expect($div[0].className).to.match(/circle_changing/gm);
        });
        cy.get('@smallCircle').should('contain.text', newListElement);
        cy.get('[class*=list_item]')
          .first()
          .find('svg')
          .find('path')
          .should('have.attr', 'fill', '#d252e1');
        cy.wait(DELAY_IN_MS);

        cy.get('[class*=circle_content]').each((el, index) => {
          if (index === 0) {
            cy.wrap(el).find('[class*=circle_changing]');
          }

          if (index === 1) {
            cy.wrap(el).should('contain.text', newListElement);
            cy.wrap(el).find('[class*=circle_modified]');
          }

          if (index > 1) {
            cy.wrap(el).find('[class*=circle_default]');
          }
        });
        cy.get('[class*=list_item]')
          .first()
          .find('svg')
          .find('path')
          .should('have.attr', 'fill', '#d252e1');
        cy.wait(DELAY_IN_MS);

        cy.get('[class*=circle_content]').should('have.length', newListLength);
        cy.get('[class*=circle_content]').each((el) => {
          cy.wrap(el).find('[class*=circle_default]');
        });
        cy.get('[class*=list_item]').each((el, index) => {
          if (index < newListLength - 1) {
            cy.wrap(el)
              .find('svg')
              .find('path')
              .should('have.attr', 'fill', '#0032FF');
          }
        });
      });
  });

  it('Should render deleting element from the head position', () => {
    const originalList: JQuery<HTMLElement>[] = [];
    let newListLength = 0;

    cy.get('[class*=circle_content]').as('circles');

    cy.get('@circles')
      .each(($el) => {
        originalList.push($el);
      })
      .then((elements) => {
        newListLength = elements.length - 1;

        cy.get('button[name=deleteFromHeadButton]').click();

        cy.get('@circles')
          .first()
          .find('[class*=circle_letter]')
          .should('be.empty');

        cy.get('[class*=circle_content]')
          .first()
          .find('[class*=circle_small]')
          .as('smallCircle');

        cy.get('@smallCircle').should(($div) => {
          expect($div[0].className).to.match(/circle_changing/gm);
        });

        cy.get('[class*=circle_content]')
          .first()
          .find('[class*=circle_head]')
          .should('contain.text', 'head');

        cy.wait(DELAY_IN_MS);

        cy.get('[class*=circle_content]').should('have.length', newListLength);

        cy.get('[class*=circle_content]').each((el) => {
          cy.wrap(el).find('[class*=circle_default]');
        });
      });
  });

  it('Should render deleting element from the tail position', () => {
    const originalList: JQuery<HTMLElement>[] = [];
    let newListLength = 0;

    cy.get('[class*=circle_content]').as('circles');

    cy.get('@circles')
      .each(($el) => {
        originalList.push($el);
      })
      .then((elements) => {
        newListLength = elements.length - 1;

        cy.get('button[name=deleteFromTailButton]').click();

        cy.get('@circles')
          .last()
          .find('[class*=circle_letter]')
          .should('be.empty');

        cy.get('[class*=circle_content]')
          .last()
          .find('[class*=circle_tail]')
          .should('not.contain.text', 'tail');

        cy.get('[class*=circle_content]')
          .last()
          .find('[class*=circle_small]')
          .as('smallCircle');

        cy.get('@smallCircle').should(($div) => {
          expect($div[0].className).to.match(/circle_changing/gm);
        });

        cy.wait(DELAY_IN_MS);

        cy.get('[class*=circle_content]').should('have.length', newListLength);

        cy.get('[class*=circle_content]').each((el) => {
          cy.wrap(el).find('[class*=circle_default]');
        });
      });
  });

  it('Should render deleting element from the index position', () => {
    const originalList: JQuery<HTMLElement>[] = [];
    const deletingPositionIndex = 1;
    let newListLength = 0;

    cy.get('[class*=circle_content]').as('originalCircles');

    cy.get('@originalCircles')
      .each(($el) => {
        originalList.push($el);
      })
      .then((elements) => {
        newListLength = elements.length - 1;

        cy.get('input[name=index]')
          .type(deletingPositionIndex.toString())
          .should('have.value', deletingPositionIndex.toString());
        cy.get('button[name=deleteByIndexButton]').should('be.enabled');
        cy.get('button[name=deleteByIndexButton]').click();

        cy.get('[class*=circle_content]')
          .first()
          .find('[class*=circle_changing]');
        cy.wait(DELAY_IN_MS);

        cy.get('[class*=circle_content]').as('circles');
        cy.get('@circles').first().find('[class*=circle_changing]');
        cy.get('@circles').eq(1).find('[class*=circle_changing]');

        cy.get('[class*=list_item]')
          .first()
          .find('svg')
          .find('path')
          .should('have.attr', 'fill', '#d252e1');
        cy.wait(DELAY_IN_MS);

        cy.get('[class*=circle_content]').as('circles');
        cy.get('@circles').first().find('[class*=circle_changing]');
        cy.get('@circles').eq(1).find('[class*=circle_changing]');
        cy.get('@circles')
          .eq(1)
          .find('[class*=circle_letter]')
          .should('be.empty');

        cy.get('[class*=list_item]')
          .first()
          .find('svg')
          .find('path')
          .should('have.attr', 'fill', '#d252e1');

        cy.get('@circles')
          .eq(1)
          .find('[class*=circle_small]')
          .as('smallCircle');
        cy.get('@smallCircle').should(($div) => {
          expect($div[0].className).to.match(/circle_changing/gm);
        });

        cy.wait(DELAY_IN_MS);

        cy.get('[class*=circle_content]').should('have.length', newListLength);
        cy.get('[class*=circle_content]').each((el) => {
          cy.wrap(el).find('[class*=circle_default]');
        });
        cy.get('[class*=list_item]').each((el, index) => {
          if (index < newListLength - 1) {
            cy.wrap(el)
              .find('svg')
              .find('path')
              .should('have.attr', 'fill', '#0032FF');
          }
        });
      });
  });
});

export { };
