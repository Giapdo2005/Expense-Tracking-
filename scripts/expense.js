let expenseLog = JSON.parse(localStorage.getItem('expenseLog'));


if (!expenseLog) {
  expenseLog = [{
    category: 'groceries',
    priceCents: 4399,
    date: 'June 14th 2024'
  }, {
    category: 'golf',
    priceCents: 5634,
    date: 'June 15th 2024'
  }]
  
} 

function saveExpenses() {
  localStorage.setItem('expenseLog', JSON.stringify(expenseLog));
}
function renderExpense() {
  let expenseHTML = '';

  expenseLog.forEach((purchase) => {
    expenseHTML += 
    `
      <div>${purchase.category}</div>
      <div>$${(purchase.priceCents / 100).toFixed(2)}</div>
      <div>${purchase.date}</div>
      <div><a href="">Delete</a></div>
      <div><a href="">Update</a></div>
    `;
  })
  document.querySelector('.js-logs').innerHTML = expenseHTML;
}

function addExpense(event) {
  event.preventDefault();
  const inputCategory = document.querySelector('.js-description')
  const category = inputCategory.value;
  const inputPrice = document.querySelector('.js-amount');
  const price = inputPrice.value;
  const inputDate = document.querySelector('.js-date');
  const date = inputDate.value;

  if (category === '' || isNaN(price) || date === '') {
    alert('Please fill in all fields correctly.');
    return;
  }

  expenseLog.push({
    category: category,
    priceCents: Math.round(price * 100),
    date: date
  })

  
  renderExpense();
  saveExpenses();
  document.getElementById('expense-form').reset();
}

document.querySelector('.js-add-btn').addEventListener('click', addExpense);

renderExpense();
