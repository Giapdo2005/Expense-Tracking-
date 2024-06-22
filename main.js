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

function resetTracker() {
  localStorage.removeItem('expenseLog');
  localStorage.removeItem('historyLog');
  localStorage.removeItem('budget');

  expenseLog = [];
  historyLog = [];
  
  document.querySelector('.js-budget-display').textContent = '';
  document.querySelector('.js-budget-remaining').textContent = '';
  
  document.querySelector('.js-logs').innerHTML = '';
  
  document.querySelector('.js-history-logs').innerHTML = '';
  
  document.querySelector('.js-groceries-spending').textContent = '';
  document.querySelector('.js-bills-spending').textContent = '';
  document.querySelector('.js-entertainment-spending').textContent = '';
  document.querySelector('.js-travel-spending').textContent = '';
  document.querySelector('.js-others-spending').textContent = '';
  
  document.querySelector('.js-category').value = '';
  document.querySelector('.js-amount').value = '';
  document.querySelector('.js-date').value = '';
  document.querySelector('.js-budget').value = '';

  alert('Expense tracker has been reset.');
}

document.querySelector('.js-reset-btn').addEventListener('click', resetTracker);