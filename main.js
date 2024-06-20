import { loadExpenseLog, loadHistoryLog, loadBudget } from './scripts/localStorage.js';
import { renderExpense, addExpense } from './scripts/expense.js';
import { renderHistoryLog } from './scripts/history.js';
import { displayBudget } from './scripts/budget.js';
import { updateCategorySpending } from './scripts/ui.js';

let expenseLog = loadExpenseLog();
let historyLog = loadHistoryLog();

document.addEventListener('DOMContentLoaded', () => {
  loadBudget();
  renderExpense(expenseLog);
  renderHistoryLog(historyLog);
  updateCategorySpending(expenseLog, historyLog);

  document.querySelector('.js-add-btn').addEventListener('click', (event) => addExpense(event, expenseLog));
  document.querySelector('.js-set-budget-btn').addEventListener('click', displayBudget);
});
