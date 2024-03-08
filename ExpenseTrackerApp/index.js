// let totalAmount=8000.0;
// const total=document.querySelector("#total-amt");
// total.innerHTML=totalAmount;
// const form =document.querySelectorAll('input');
// let expenses=[]
// const addExpense=(data)=>{
//   expenses=[data,...expenses];
//   localStorage.setItem("expenseData",JSON.stringify(data))
  // const div=document.createElement("div");
  // div.innerHTML=`
  //                <div class="item history-common">
  //                   <span>${data.name}</span><span>${data.date}</span><span class="amt">${data.amount}</span>
  //                </div>`
  // document.querySelector(".history-container").appendChild(div);
//   const amt=document.querySelector(".amt");
//   console.log(amt);
//   // if(parseFloat(data.amount)<0)
//   parseFloat(data.amount)<0 ?amt.style.color='red':amt.style.color='blue'
// }
// const subBtn=document.getElementById("subBtn");
// subBtn.addEventListener("click",(e)=>{
//   const expDetail={
//     id:"",
//     name:"def",
//     amount:0,
//     date:"date"
// }
//    e.preventDefault();
//    const date=new Date();
   
//    expDetail.id=Math.floor(Math.random()*1000).toString();
//    expDetail.name=form.item(0).value;
//    expDetail.amount=parseFloat(form.item(1).value)>0?"+"+parseFloat(form.item(1).value):form.item(1).value;
//    expDetail.date=date.toLocaleDateString();
//    addExpense(expDetail)
//    console.log(expenses);
//    addAmount(parseFloat(form.item(1).value));
//    document.querySelector('form').reset();
//   //  reset();
// })
// function reset(){
//   form.item(0).value='';
//   form.item(1).value=0;
// }
// function addAmount(amount){
//  totalAmount+=amount
//  total.innerHTML=totalAmount;
// }


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

      if (name && amount && date) {
          addExpenseToList(name, amount, date);
          if (amount>0) {
            
            totalInc += amount;
          }else{
            totalExp-=amount;
          }
          totalAmount.innerText=parseFloat(totalAmount.value)+amount;
          updateTotalExpense();
          saveExpense(name, amount, date);
      }

      form.reset();
  });

  function addExpenseToList(name, amount, date) {
      // const expenseItem = document.createElement('div');
      // expenseItem.classList.add('expense');
      // expenseItem.innerHTML = `
      //     <strong>${name}</strong> - $${amount.toFixed(2)} - ${date}
      // `;
      const div=document.createElement("div");
      div.innerHTML=`
                     <div class="item history-common">
                        <span>${name}</span><span>${date}</span><span class="amt">${amount}</span>
                     </div>`
      document.querySelector(".history-container").appendChild(div);
      // expensesList.appendChild(expenseItem);
  }

  function updateTotalExpense() {
      totalExpense.innerText = `$ ${totalExp.toFixed(2)}`;
      totalIncome.innerText=`$ ${totalInc.toFixed(2)}`
      totalAmount.innerText=`${(totalInc-totalExp).toFixed(2)}`
  }

  function saveExpense(name, amount, date) {
      const expense = {
          name: name,
          amount: amount,
          date: date,
          id:Math.floor(Math.random()*10000)
      };
      console.log(expenses);
      expenses.push(expense);
      localStorage.setItem('expenses', JSON.stringify(expenses));
  }
});