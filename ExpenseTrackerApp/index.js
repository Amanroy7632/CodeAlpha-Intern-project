

document.addEventListener('DOMContentLoaded', function() {
  const totalAmount=document.querySelector("#total-amt");
  const form = document.querySelector('form');
  // const expensesList = document.getElementById('expenses-list');
  const totalExpense = document.getElementById('total-expense');
  const totalIncome=document.getElementById('total-income');
  let totalExp = 0;
  let totalInc=0;
  let expenses = [];

  // Check if there are any expenses stored in local storage
  if (localStorage.getItem('expenses')) {
      expenses = JSON.parse(localStorage.getItem('expenses'));
      // Loop through the stored expenses and display them
      expenses.forEach(expense => {
          addExpenseToList(expense.name, expense.amount, expense.date);
          if(expense.amount>0){
            totalInc+=expense.amount;
          }else{
            totalExp -= expense.amount;
          }
      });
      updateTotalExpense();
  }

  form.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('expense-name').value;
      const amount = parseFloat(document.getElementById('expense-amount').value);
      const date = document.getElementById('expense-date').value;
      const expenseId=Math.floor(Math.random()*10000);

      if (name && amount && date) {
          addExpenseToList(name, amount, date,expenseId);
          if (amount>0) {
            
            totalInc += amount;
          }else{
            totalExp-=amount;
          }
          totalAmount.innerText=parseFloat(totalAmount.value)+amount;
          updateTotalExpense();
          saveExpense(name, amount, date,expenseId);
      }

      form.reset();
  });

  function addExpenseToList(name, amount, date,expenseId) {
      // const expenseItem = document.createElement('div');
      // expenseItem.classList.add('expense');
      // expenseItem.innerHTML = `
      //     <strong>${name}</strong> - $${amount.toFixed(2)} - ${date}
      // `;
      const div=document.createElement("div");
      div.innerHTML=`
                     <div class="item history-common">
                        
                        <input type="text" readonly value="${name}"><input type="date" readonly value="${date}"><input type="number" readonly value="${amount}">
                        <input type="text" readonly value="${expenseId}" style="display:none;">
                        <button class="" id="subBtn">✏️</button>
                     </div>`
      document.querySelector(".history-container").appendChild(div);
      // expensesList.appendChild(expenseItem);
  }

  function updateTotalExpense() {
      totalExpense.innerText = `🪙 ${totalExp.toFixed(2)}`;
      totalIncome.innerText=`🪙 ${totalInc.toFixed(2)}`
      totalAmount.innerText=`${(totalInc-totalExp).toFixed(2)}`
  }

  function saveExpense(name, amount, date,expenseId) {
      const expense = {
          name: name,
          amount: amount,
          date: date,
          id:expenseId
      };
      console.log(expenses);
      expenses.push(expense);
      localStorage.setItem('expenses', JSON.stringify(expenses));
  }
});