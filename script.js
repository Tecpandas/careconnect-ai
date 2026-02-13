function scrollToSupport(){
document.getElementById("support").scrollIntoView({behavior:"smooth"});
}

/* AI PRIORITY SYSTEM WITH LOADING */
const form = document.getElementById("supportForm");
const result = document.getElementById("aiResult");

form.addEventListener("submit", function(e){
e.preventDefault();

const name = form.querySelector("input").value;
const issueText = document.getElementById("issue").value;
const issue = issueText.toLowerCase();

result.innerHTML = `
<div class="ai-panel">
<div class="loader"></div>
<p>AI Analyzing Request...</p>
</div>
`;

setTimeout(() => {

let priority="", badge="", response="";

if(issue.includes("emergency")){
priority="High";
badge="badge-high";
response="Immediate medical attention required.";
}
else if(issue.includes("serious")){
priority="Medium";
badge="badge-medium";
response="Doctor review within 24 hours.";
}
else{
priority="Low";
badge="badge-low";
response="Standard follow-up process.";
}

result.innerHTML=`
<div class="ai-panel">
<div class="ai-badge ${badge}">${priority} Priority</div>
<p><strong>🧠 AI Analysis</strong></p>
<p>✔ Suggested Response: ${response}</p>
<p>✔ Department Assigned Automatically</p>
</div>
`;

/* STORE REQUEST DATA */
let requests = JSON.parse(localStorage.getItem("requestData")) || [];
requests.push({
name:name,
issue:issueText,
priority:priority,
date:new Date().toLocaleString()
});
localStorage.setItem("requestData", JSON.stringify(requests));
localStorage.setItem("requests", requests.length);

form.reset();

},1500);
});

/* VOLUNTEER FORM */
document.getElementById("volunteerForm").addEventListener("submit",function(e){
e.preventDefault();
document.getElementById("volMsg").innerText="✅ Volunteer Registered Successfully!";
let count=localStorage.getItem("volunteers")||0;
localStorage.setItem("volunteers",++count);
this.reset();
});

/* CHATBOT */
const toggle=document.querySelector(".chat-toggle");
const chatbot=document.querySelector(".chatbot");
const chatInput=document.getElementById("chatInput");
const chatBody=document.getElementById("chatBody");

toggle.addEventListener("click",()=>{
chatbot.style.display=chatbot.style.display==="flex"?"none":"flex";
});

chatInput.addEventListener("keypress",function(e){
if(e.key==="Enter"){
let userText=chatInput.value;
chatBody.innerHTML+=`<div class="user-msg">${userText}</div>`;

let reply="Please contact NGO support for help.";
if(userText.toLowerCase().includes("volunteer"))
reply="You can register in the Volunteer section.";
if(userText.toLowerCase().includes("emergency"))
reply="Call local emergency services immediately.";

chatBody.innerHTML+=`<div class="bot-msg">${reply}</div>`;
chatInput.value="";
chatBody.scrollTop=chatBody.scrollHeight;
}
});
