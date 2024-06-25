export function updateCategorySpending(expenseLog) {
  let categorySpending = {
    Groceries: 0,
    Bills: 0,
    Entertainment: 0,
    Travel: 0,
    Others: 0
  };

  expenseLog.forEach((expense) => {
    categorySpending[expense.category] += expense.priceCents / 100;
  });

  document.querySelector('.js-groceries-spending').innerText = `Groceries: $${categorySpending.Groceries.toFixed(2)}`;
  document.querySelector('.js-bills-spending').innerText = `Bills: $${categorySpending.Bills.toFixed(2)}`;
  document.querySelector('.js-entertainment-spending').innerText = `Entertainment: $${categorySpending.Entertainment.toFixed(2)}`;
  document.querySelector('.js-travel-spending').innerText = `Travel: $${categorySpending.Travel.toFixed(2)}`;
  document.querySelector('.js-others-spending').innerText = `Others: $${categorySpending.Others.toFixed(2)}`;
}

export function resetTracker() {
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
