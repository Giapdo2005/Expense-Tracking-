import { saveHistory } from './localStorage.js';

export function renderHistoryLog(historyLog) {
  let historyHTML = ' ';

  historyLog.forEach((purchase) => {
    historyHTML += `
      <div>${purchase.category}</div>
      <div>$${(purchase.priceCents / 100).toFixed(2)}</div>
      <div>${purchase.date}</div>
    `;
  });

  document.querySelector('.js-history-logs').innerHTML = historyHTML;
  saveHistory(historyLog);
}

export function expenseToHistory(expenseLog, historyLog) {
  historyLog = historyLog.concat(expenseLog);
  expenseLog = [];
  saveExpenses(expenseLog);
  renderExpense(expenseLog);
  renderHistoryLog(historyLog);
}