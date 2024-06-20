export function updateCategorySpending(expenseLog, historyLog) {
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

  historyLog.forEach((purchase) => {
    categorySpending[purchase.category] += purchase.priceCents / 100;
  });

  document.querySelector('.js-groceries-spending').innerText = `Groceries: $${categorySpending.Groceries.toFixed(2)}`;
  document.querySelector('.js-bills-spending').innerText = `Bills: $${categorySpending.Bills.toFixed(2)}`;
  document.querySelector('.js-entertainment-spending').innerText = `Entertainment: $${categorySpending.Entertainment.toFixed(2)}`;
  document.querySelector('.js-travel-spending').innerText = `Travel: $${categorySpending.Travel.toFixed(2)}`;
  document.querySelector('.js-others-spending').innerText = `Others: $${categorySpending.Others.toFixed(2)}`;
}
