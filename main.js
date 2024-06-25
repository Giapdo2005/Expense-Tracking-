import { loadExpenseLog, loadHistoryLog, loadBudget } from './scripts/localStorage.js';
import { renderExpense, addExpense, logOut } from './scripts/expense.js';
import { renderHistoryLog } from './scripts/history.js';
import { displayBudget } from './scripts/budget.js';
import { updateCategorySpending, resetTracker } from './scripts/ui.js';

let expenseLog = loadExpenseLog();
let historyLog = loadHistoryLog();

document.addEventListener('DOMContentLoaded', () => {
  loadBudget();
  renderExpense(expenseLog);
  renderHistoryLog(historyLog);
  updateCategorySpending(expenseLog, historyLog);
  logOut();

  document.querySelector('.js-add-btn').addEventListener('click', (event) => addExpense(event, expenseLog));
  document.querySelector('.js-set-budget-btn').addEventListener('click', displayBudget);
  document.querySelector('.js-reset-btn').addEventListener('click', resetTracker);
});  


