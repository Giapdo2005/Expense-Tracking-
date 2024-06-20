import { saveExpenses } from './localStorage.js';
import { renderHistoryLog } from './history.js';

export function displayBudget() {
  const inputBudget = document.querySelector('.js-budget');
  const budget = inputBudget.value;

  if (budget === '' || isNaN(budget) || budget <= 0) {
    alert('Please enter a valid budget amount.');
    return;
  }

  localStorage.setItem('budget', budget);
  document.querySelector('.js-budget-display').innerText += ` $${budget}`;
  renderHistoryLog();
}

export function getRemainingBudget(expenseLog) {
  let budget = parseFloat(localStorage.getItem('budget'));

  if (isNaN(budget)) {
    alert('Budget is not set');
    return 0;
  }

  let remainingBudget = budget;

  expenseLog.forEach((expense) => {
    remainingBudget -= expense.priceCents / 100;
  });

  const halfBudgetAlertShown = localStorage.getItem('halfBudgetAlertShown') === 'true';

  if (!halfBudgetAlertShown && remainingBudget < budget / 2) {
    alert('You have used up half your budget this month. Spend wisely!');
    localStorage.setItem('halfBudgetAlertShown', 'true');
  }

  if (remainingBudget <= 0) {
    alert('You have used up all your budget this month. Please add more funds!');
    document.querySelector('.js-budget-display').innerText = `Budget: $0`;
    expenseToHistory(expenseLog);
    localStorage.setItem('budget', 0);
  }

  document.querySelector('.js-budget-remaining').innerHTML = `Budget Remaining $${remainingBudget.toFixed(2)}`;
  localStorage.setItem('budget', budget);

  return remainingBudget;
}
