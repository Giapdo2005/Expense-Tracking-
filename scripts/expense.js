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
    date: '06/24/2024'
  }, {
    id: generateUniqueId(),
    category: 'golf',
    priceCents: 5634,
    date: '06/15/2024'
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
      <div><button class="delete-btn js-delete-button" data-expense-id="${purchase.id}">Delete</button></div>
      <div><button class="edit-btn js-edit-button" data-expense-id="${purchase.id}">Edit</button></div>
    `;
  })
  document.querySelector('.js-logs').innerHTML = expenseHTML;

  saveExpenses();

  document.querySelectorAll('.js-delete-button').forEach((button) => {
    button.addEventListener('click', () => {
      const expenseId = button.getAttribute('data-expense-id');
      console.log(expenseId);
      deleteExpense(expenseId);
      updateCategorySpending();
    })
  })
  
  document.querySelectorAll('.js-edit-button').forEach((button) => {
    button.addEventListener('click', () => {
      const expenseId = button.getAttribute('data-expense-id');
      console.log(expenseId)
      editExpense(expenseId);
      updateCategorySpending();
    })
  });

  getRemainingBudget();
}

function editExpense(id) {
  const expense = expenseLog.find(expense => expense.id === id);
  if (expense) {
    document.querySelector('.js-category').value = expense.category;
    document.querySelector('.js-amount').value = (expense.priceCents / 100).toFixed(2);
    document.querySelector('.js-date').value = expense.date;
    deleteExpense(id); 
  }
}

function deleteExpense(id) {
  expenseLog = expenseLog.filter(expense => expense.id !== id);
  saveExpenses();
  renderExpense();
}


function addExpense(event) {
  event.preventDefault();
  const inputCategory = document.querySelector('.js-category');
  const category = inputCategory.value

  const inputPrice = document.querySelector('.js-amount');
  const price = inputPrice.value;

  const inputDate = document.querySelector('.js-date');
  const date = inputDate.value;

  if (category === '' || isNaN(price) || date === '') {
    alert('Please fill in all fields correctly.');
    return;
  }

  if(getRemainingBudget() - price >= 0) {
    expenseLog.unshift({
      id: generateUniqueId(),
      category: category,
      priceCents: Math.round(price * 100),
      date: date
    })
  } else {
    alert('This will exceed your budget. Please add more funds!')
    return;
  }

  

  renderExpense();
  saveExpenses();
  updateCategorySpending();
}

document.querySelector('.js-add-btn').addEventListener('click', addExpense);

function displayBudget() {
  const inputBudget = document.querySelector('.js-budget');
  const budget = inputBudget.value;

  if (budget === '' || isNaN(budget) || budget <= 0) {
    alert('Please enter a valid budget amount.');
    return;
  }

  localStorage.setItem('budget', budget);
  document.querySelector('.js-budget-display').innerText += ` $${budget}`;
}



function loadBudget() {
  const budget = localStorage.getItem('budget');
  if (budget) {
    document.querySelector('.js-budget-display').innerText = `Budget: $${budget}`;
  }
}

function getRemainingBudget() {
  let budget = parseFloat(localStorage.getItem('budget'));

  if(isNaN(budget)) {
    alert('Budget is not set');
    return;
  }

  let remainingBudget = budget;

  expenseLog.forEach((expense) => {
    remainingBudget -= expense.priceCents / 100;
  })

  console.log(remainingBudget);
  document.querySelector('.js-budget-remaining').innerHTML = `Budget Remaining $${remainingBudget.toFixed(2)}`
  localStorage.setItem('budget',budget);

  if (remainingBudget < budget / 2) {
    alert('You have used up half your budget this month. Spend wisely!');
  }

  if (remainingBudget <= 0) {
    alert('You have used up all your budget this month. Please add more funds!')
  }

  return remainingBudget;
}



function updateCategorySpending() {
  
  let categorySpending = {
    Groceries: 0,
    Bills: 0,
    Entertainment: 0,
    Travel: 0,
    Others: 0
  }
  expenseLog.forEach((expense) => {
   categorySpending[expense.category] += expense.priceCents / 100;
  })

  document.querySelector('.js-groceries-spending').innerText = `Groceries: $${categorySpending.Groceries.toFixed(2)}`
  document.querySelector('.js-bills-spending').innerText = `Bills: $${categorySpending.Bills.toFixed(2)}`
  document.querySelector('.js-entertainment-spending').innerText = `Entertainment: $${categorySpending.Entertainment.toFixed(2)}`
  document.querySelector('.js-travel-spending').innerText = `Travel: $${categorySpending.Travel.toFixed(2)}`
  document.querySelector('.js-others-spending').innerText = `Others: $${categorySpending.Others.toFixed(2)}`
}

loadBudget();
renderExpense();
updateCategorySpending();

document.querySelector('.js-set-budget-btn').addEventListener('click', displayBudget);
