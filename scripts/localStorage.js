export function saveExpenses(expenseLog) {
  localStorage.setItem('expenseLog', JSON.stringify(expenseLog));
}

export function saveHistory(historyLog) {
  localStorage.setItem('historyLog', JSON.stringify(historyLog));
}

export function loadBudget() {
  const budget = localStorage.getItem('budget');
  if (budget) {
    document.querySelector('.js-budget-display').innerText = `Budget: $${budget}`;
  }
}

export function loadExpenseLog() {
  return JSON.parse(localStorage.getItem('expenseLog')) || [];
}

export function loadHistoryLog() {
  return JSON.parse(localStorage.getItem('historyLog')) || [];
}