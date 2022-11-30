describe('my tests', () => {
  it('takes a screenshot', () => {
    // screenshot will be saved as
    // cypress/screenshots/users.cy.js/my tests -- takes a screenshot.png
    cy.visit('http://localhost:3000');
    // cy.screenshot(); - эта команда хорошо работает - создает скришоты. А вот следующая - для сравнения скриншотов - не работает.

    cy.matchImageSnapshot();
  })
});

export { }