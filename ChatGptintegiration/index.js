// const axios = require('axios');
let allData=[];
const sideAngle=document.getElementById("side-angle");
sideAngle.addEventListener("click",()=>{
    const sideBar=document.querySelector(".sidebar-content");
    sideBar.classList.toggle("hideSideBar-content");
    document.querySelector(".sideBar").classList.toggle("hideSideBar");
})
document.addEventListener("DOMContentLoaded",()=>{
    const data=JSON.parse(localStorage.getItem("questionList"))
    const parentElement=document.querySelector(".sidebar-content");
    let count=1;
    data.forEach(element => {
        const li=document.createElement("li");
        li.innerHTML=count +" "+element.name;
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
        <img src="ganesh.png" alt="ganesh">
        <h2>Ganesh</h2>
    </div>
    <div class="content">
        <p>${result}</p>
    </div>

</div>`;
    // div.innerText=`<p>${result}</p>`
    parentElement.appendChild(div);
    // addToList(prompt,result);

}
const API_KEY="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";
const getResponse=async ()=>{
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
        const result=await fetch(url, requestOptions)
        .then((res)=>(res.json()))
        .then((data)=>{
            // setResult(data.data.choices[0].message.content)
            data && data.choices ? setResult(data.choices[0].message.content):""
            console.log(data);
            data && data.choices ? addToList(prompt,data.choices[0].message.content):""
            // addToList(prompt,data.choices[0].message.content)
        }).catch((err)=>{
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
}
const form =document.querySelector("form");
const btn=document.querySelector(".btn");
form.addEventListener("submit",(e)=>{e.preventDefault();
    form.reset();
});
btn.addEventListener("click",getResponse)


// const axios = require('axios');

// Function to make a request to the OpenAI API
// const axios = require('axios');

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

// Example usage
async function main() {
    const prompt = 'Tell me about yourself.';
    const response = await interactWithChatGPT(prompt);
    console.log('Response from ChatGPT:', response);
}

// Call the main function
// main();

