let nextId = 1;

function generateUniqueId() {
  const timestamp = Date.now();
  return `id-${timestamp}-${nextId++}`;
}


let expenseLog = JSON.parse(localStorage.getItem('expenseLog'));


if (!expenseLog) {
  expenseLog = [{
    id: generateUniqueId(),
    category: 'Groceries',
    priceCents: 4399,
    date: 'June 14th 2024'
  }, {
    id: generateUniqueId(),
    category: 'golf',
    priceCents: 5634,
    date: 'June 15th 2024'
  }]
} else {
  expenseLog = expenseLog.map(expense => {
    if (!expense.id) {
      expense.id = generateUniqueId();
    }
    return expense;
  });
  saveExpenses();
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
      <div><button class="js-delete-button" data-expense-id="${purchase.id}">Delete</button></div>
    `;
  })
  document.querySelector('.js-logs').innerHTML = expenseHTML;

  saveExpenses();

  document.querySelectorAll('.js-delete-button').forEach((button) => {
    button.addEventListener('click', () => {
      const expenseId = button.getAttribute('data-expense-id');
      console.log(expenseId);
      deleteExpense(expenseId);
    })
  })
}

function deleteExpense(id) {
  expenseLog = expenseLog.filter(expense => expense.id !== id);
  saveExpenses();
  renderExpense();
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
    id: generateUniqueId(),
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
