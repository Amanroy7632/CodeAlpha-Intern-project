document.addEventListener('DOMContentLoaded', function() {
  const totalAmount=document.querySelector("#total-amt");
  const form = document.querySelector('form');
  // const expensesList = document.getElementById('expenses-list');
  const totalExpense = document.getElementById('total-expense');
  const totalIncome=document.getElementById('total-income');
  let totalExp = 0;
  let totalInc=0;
  let expenses = [];
  let allList;
  // Check if there are any expenses stored in local storage
  if (localStorage.getItem('expenses')) {
      expenses = JSON.parse(localStorage.getItem('expenses'));
      // Loop through the stored expenses and display them
      expenses.forEach(expense => {
          addExpenseToList(expense.name, expense.amount, expense.date,expense.id,expense.expType);
          if(expense.expType==="+"){
            totalInc+=expense.amount;
          }else{
            totalExp += expense.amount;
          }
      });
      updateTotalExpense();
  }

  form.addEventListener('submit', function(e) {
      e.preventDefault();

      const name = document.getElementById('expense-name').value;
      const amount = parseFloat(document.getElementById('expense-amount').value);
      const date = document.getElementById('expense-date').value;
      const transType=document.getElementById('trans-type').value;
      const errprMsg=document.querySelector(".error");
      // console.log(transType==="+");
      const expenseId=Math.floor(Math.random()*10000);

      if (name && amount>0 && date) {
          addExpenseToList(name, amount, date,expenseId,transType);
          if (amount>0 && transType==="+") {
            
            totalInc += amount;
            totalAmount.innerText=parseFloat(totalAmount.value)+amount;
          }else{
            totalExp+=amount;
            totalAmount.innerText=parseFloat(totalAmount.value)-amount;
          }
          saveExpense(name, amount, date,expenseId,transType);
          updateTotalExpense();
      }else{
        errprMsg.innerText="Please enter valid information ..."
        setInterval(()=>{
           errprMsg.innerText="";
        },1500)
      }
      allList=document.querySelectorAll("#delbtn");
      form.reset();
  });

  function addExpenseToList(name, amount, date,expenseId,transType) {
      // const expenseItem = document.createElement('div');
      // expenseItem.classList.add('expense');
      // expenseItem.innerHTML = `
      //     <strong>${name}</strong> - $${amount.toFixed(2)} - ${date}
      // `;
      // console.log(expenseId);
      const div=document.createElement("div");
      div.innerHTML=`
                     <div class="item history-common">
                        
                        <input type="text" readonly value="${name}"><input type="date" readonly value="${date}">${transType==="+"?`<input type="text" style="color:blue;" readonly value="+${amount}">`:`<input type="number" style="color:red;" readonly value="-${amount}">`} 
                        <input type="text" readonly value="${expenseId}" style="display:none; id="expId"">
                        <div> 
                              <span class="" id="delbtn">❌</span>
                        </div>
                     </div>`
      document.querySelector(".history-container").appendChild(div);
      
      
      // expensesList.appendChild(expenseItem);
    }
    
    function updateTotalExpense() {
      // window.location.reload();
      allList=document.querySelectorAll("#delbtn");
      if((totalInc-totalExp)<0){
        totalAmount .style.color="red";
      }else{
        totalAmount.style.color="#0ef"
      }
      totalExpense.innerText = `🪙 ${totalExp.toFixed(2)}`;

      totalIncome.innerText=`🪙 ${totalInc.toFixed(2)}`
      totalAmount.innerText=`${(totalInc-totalExp).toFixed(2)}`
  }

  function saveExpense(name, amount, date,expenseId,transType) {
      const expense = {
          name: name,
          amount: amount,
          date: date,
          id:expenseId,
          expType:transType
      };
      // console.log(expenses);
      expenses.push(expense);
      localStorage.setItem('expenses', JSON.stringify(expenses));
  }
  allList=document.querySelectorAll("#delbtn");
    allList.forEach((item)=>{
      item.addEventListener('click',()=>{
        item.parentNode.parentNode.remove()
        // console.log(item.parentNode.parentNode);
        expenses= expenses.filter((element)=>{
          return element.id!=parseInt(item.parentNode.parentNode.children[3].value)
        })
        localStorage.setItem('expenses', JSON.stringify(expenses));
      })
    })
  // function deleteExpense(id){
  //   const allList=document.querySelectorAll("#delbtn");
  //   allList.forEach((item)=>{
  //     item.addEventListener('click',()=>{
  //       const expenseid=item.parentNode.parentNode.childNodes(0);
  //     })
  //   })
  // }
});