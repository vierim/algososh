describe('Тестирование роутинга приложения', () => {
  it('Page with algorithm "String" should be available', () => {
    cy.visit('/recursion');
    cy.get('h3').should('have.text', 'Строка');
  });

  it('Page with algorithm "Fibonacci" should be available', () => {
    cy.visit('/fibonacci');
    cy.get('h3').should('have.text', 'Последовательность Фибоначчи');
  });

  it('Page with algorithm "Sorting range" should be available', () => {
    cy.visit('/sorting');
    cy.get('h3').should('have.text', 'Сортировка массива');
  });

  it('Page with data structure "Stack" should be available', () => {
    cy.visit('/stack');
    cy.get('h3').should('have.text', 'Стек');
  });

  it('Page with data structure "Queue" should be available', () => {
    cy.visit('/queue');
    cy.get('h3').should('have.text', 'Очередь');
  });

  it('Page with data structure "LinkedList" should be available', () => {
    cy.visit('/list');
    cy.get('h3').should('have.text', 'Связный список');
  });
})

export { };
