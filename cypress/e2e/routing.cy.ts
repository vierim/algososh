describe('Тестирование роутинга приложения', () => {
  it('Доступность страницы алгоритма "Строка"', () => {
    cy.visit('http://localhost:3000/recursion');
    cy.get('h3').should('have.text', 'Строка');
  });

  it('Доступность страницы алгоритма "Последовательность Фибоначчи"', () => {
    cy.visit('http://localhost:3000/fibonacci');
    cy.get('h3').should('have.text', 'Последовательность Фибоначчи');
  });

  it('Доступность страницы алгоритма "Сортировка массива"', () => {
    cy.visit('http://localhost:3000/sorting');
    cy.get('h3').should('have.text', 'Сортировка массива');
  });

  it('Доступность страницы алгоритма "Стек"', () => {
    cy.visit('http://localhost:3000/stack');
    cy.get('h3').should('have.text', 'Стек');
  });

  it('Доступность страницы алгоритма "Очередь"', () => {
    cy.visit('http://localhost:3000/queue');
    cy.get('h3').should('have.text', 'Очередь');
  });

  it('Доступность страницы алгоритма "Связный список"', () => {
    cy.visit('http://localhost:3000/list');
    cy.get('h3').should('have.text', 'Связный список');
  });
})

export { };
