// const axios = require('axios');
let allData=[];
const sideAngle=document.querySelector(".sidebar-slider");
const rightAngle =document.getElementById("side-angle");
// const leftAngle=document.getElementById("left-angle");
const hideTitle=document.querySelector(".title");
sideAngle.addEventListener("click",()=>{
    const sideBar=document.querySelector(".sidebar-content");
    sideBar.classList.toggle("hideSideBar-content");
    document.querySelector(".sideBar").classList.toggle("hideSideBar");
    if (rightAngle.innerText==='>') {
        
        rightAngle.innerText="<";
    }else{
        rightAngle.innerText=">";

    }
})
document.addEventListener("DOMContentLoaded",()=>{
    const data=JSON.parse(localStorage.getItem("questionList"))
    const parentElement=document.querySelector(".sidebar-content");
    let count=1;
    data.forEach(element => {
        const li=document.createElement("li");
        li.innerHTML=`<h1 class="recentChat"><span id="cnt">${count}</span> ${element.name.length>26?element.name.substr(0,27)+'...': element.name}</h1>`;
        parentElement.appendChild(li)
        count+=1
    });
    console.log(data);
})
// const API_KEY="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";
function setSideBarContent(){

}
function setQuestion(question){
    // document.getElementById("question").innerText=question;
    hideTitle.classList.add("hidetitle");
    const parentElement=document.getElementById("data-container");
    console.log("jewbsjfhsd");
    const div=document.createElement("div");
    div.className="search-question";
    div.innerHTML=`<div class="profile-logo">
       <img src="profile_1.png" alt="logo">
     </div>
    <div class="userInfo">
     <h2>You</h2>
     <p id="question">${question}</p>
    </div>`;
    parentElement.appendChild(div);

}
function addToList(question,answer){
    const questionObject={
        id:Math.floor(Math.random()*10000),
        name:question,
        result:answer
    }
    allData.push(questionObject);
    localStorage.setItem("questionList", JSON.stringify(allData));
}
function setResult(result){
    const parentElement=document.getElementById("data-container");
    const div=document.createElement("div");
    div.className="output";
    div.id="output"
    div.innerHTML=`<div class="ganesh-content">
    <div class="ganesh-img">
        <img src="pngegg.png" alt="ganesh">
        <h2>Bot</h2>
    </div>
    <div class="content">
    <p>${result}</p>
    </div>
</div>`;
    // div.innerText=`<p>${result}</p>`
    parentElement.appendChild(div);
    // addToList(prompt,result);

}
const API_KEY="Enter your API_KEY";
const getResponse=async ()=>{
    // let isError=false;
    // let resultData;
    const prompt=document.getElementById("query").value;
    setQuestion(prompt);
  
    const url="https://api.openai.com/v1/chat/completions";
    const requestOptions={
        method:"POST",
        headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            // prompt: "Say this is a test",
            messages: [{"role": "user", "content": prompt}],
            // max_tokens: 2048,
            // temperature: 0.2,
            // n:1,
            // stop:null
        })
    }
    try {
        await fetch(url, requestOptions)
        .then((res)=>(res.json()))
        .then((data)=>{
            // setResult(data.data.choices[0].message.content)
            data && data.choices ? setResult(data.choices[0].message.content):""
            // data && data.choices ? resultData=data.choices[0].message.content:isError=true;

            console.log(data);
            data && data.choices ? addToList(prompt,data.choices[0].message.content):""
            // addToList(prompt,data.choices[0].message.content)
        }).catch((err)=>{
            isError=true;
            console.log(err);
        })
        // const data=result.json();
        // console.log(data);
    } catch (error) {
        if (error.response && error.response.status === 429){
            await wait(5000);
        }
        console.log(error.message);
        alert("Something went wrong")
    }
    // return {
    //     result:data.choices[0].message.content,
    //     error:isError
    // }
}
const form =document.querySelector("form");
const btn=document.querySelector(".btn");
form.addEventListener("submit",(e)=>{e.preventDefault();
    form.reset();
});
btn.addEventListener("click",()=>{
    const {isError,result}=getResponse();
})
// Function to interact with the ChatGPT API
async function interactWithChatGPT(prompt) {
    const apiKey = 'YOUR_API_KEY'; // Replace with your actual API key
    const url = 'https://api.openai.com/v1/chat/completions';

    try {
        const response = await fetch(url, {
            model: 'text-davinci-002', // Choose the model you want to use
            messages: [
                {
                    role: 'user',
                    content: prompt
                }
            ]
        }, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            }
        });
        return response.data.choices[0].message.content; // Return the response text
    } catch (error) {
        console.error('Error interacting with ChatGPT:', error);
        return null;
    }
}




