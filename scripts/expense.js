import { generateUniqueId } from './utils.js';
import { saveExpenses } from './localStorage.js';
import { getRemainingBudget } from './budget.js';
import { updateCategorySpending } from './ui.js';

document.querySelector('.js-welcome').innerHTML += ``

export function logOut() {
  document.querySelector('.js-logout-btn').addEventListener('click', () => {
    window.location.href = 'auth.html'
  })
}

export function renderExpense(expenseLog) {
  let expenseHTML = '';

  expenseLog.forEach((purchase) => {
    expenseHTML += `
      <div>${purchase.category}</div>
      <div>$${(purchase.priceCents / 100).toFixed(2)}</div>
      <div>${purchase.date}</div>
      <div><button class="delete-btn js-delete-button" data-expense-id="${purchase.id}">Delete</button></div>
      <div><button class="edit-btn js-edit-button" data-expense-id="${purchase.id}">Edit</button></div>
    `;
  });

  document.querySelector('.js-logs').innerHTML = expenseHTML;

  saveExpenses(expenseLog);

  document.querySelectorAll('.js-delete-button').forEach((button) => {
    button.addEventListener('click', () => {
      const expenseId = button.getAttribute('data-expense-id');
      deleteExpense(expenseId, expenseLog);
      updateCategorySpending(expenseLog, historyLog);
    });
  });

  document.querySelectorAll('.js-edit-button').forEach((button) => {
    button.addEventListener('click', () => {
      const expenseId = button.getAttribute('data-expense-id');
      editExpense(expenseId, expenseLog);
      updateCategorySpending(expenseLog, historyLog);
    });
  });

  getRemainingBudget(expenseLog);
}

export function addExpense(event, expenseLog) {
  event.preventDefault();
  const inputCategory = document.querySelector('.js-category');
  const category = inputCategory.value;

  const inputPrice = document.querySelector('.js-amount');
  const price = inputPrice.value;

  const inputDate = document.querySelector('.js-date');
  const date = inputDate.value;

  if (category === '' || isNaN(price) || date === '') {
    alert('Please fill in all fields correctly.');
    return;
  }

  if (getRemainingBudget(expenseLog) - price >= 0) {
    expenseLog.unshift({
      id: generateUniqueId(),
      category: category,
      priceCents: Math.round(price * 100),
      date: date
    });
  } else {
    alert('This will exceed your budget. Please add more funds!');
    return;
  }

  renderExpense(expenseLog);
  saveExpenses(expenseLog);
  updateCategorySpending(expenseLog);
}
