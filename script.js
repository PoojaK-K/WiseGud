// Floating stars
for(let i=0;i<25;i++){
  let star=document.createElement("div");
  star.className="star";
  star.innerHTML="★";
  star.style.left=Math.random()*100+"vw";
  star.style.animationDuration=(3+Math.random()*5)+"s";
  star.style.fontSize=(10+Math.random()*20)+"px";
  document.body.appendChild(star);
}

const questions = [
{
  question: "How often do you feel stressed?",
  options: ["Rarely", "Sometimes", "Often", "Almost always"],
  scores: [1,2,3,4]
},
{
  question: "How well do you sleep?",
  options: ["Very well", "Okay", "Poorly", "Barely sleep"],
  scores: [1,2,3,4]
},
{
  question: "Do you enjoy your daily activities?",
  options: ["Always", "Mostly", "Sometimes", "Rarely"],
  scores: [1,2,3,4]
},
{
  question: "How often do you feel anxious?",
  options: ["Rarely", "Sometimes", "Often", "Always"],
  scores: [1,2,3,4]
},
{
  question: "Do you feel supported by people around you?",
  options: ["Always", "Often", "Sometimes", "Never"],
  scores: [1,2,3,4]
}
];

let currentQuestion=0;
let totalScore=0;
let selectedScore=0;

const startBtn=document.getElementById("startBtn");
const quiz=document.getElementById("quiz");
const questionEl=document.getElementById("question");
const optionsEl=document.getElementById("options");
const nextBtn=document.getElementById("nextBtn");
const result=document.getElementById("result");
const resultText=document.getElementById("resultText");
const scoreDisplay=document.getElementById("scoreDisplay");
const submitBtn=document.getElementById("submitBtn");

startBtn.addEventListener("click",()=>{
  startBtn.classList.add("hidden");
  quiz.classList.remove("hidden");
  loadQuestion();
});

function loadQuestion(){
  const q=questions[currentQuestion];
  questionEl.textContent=q.question;
  optionsEl.innerHTML="";
  selectedScore=0;
  nextBtn.disabled=true;

  q.options.forEach((opt,index)=>{
    const btn=document.createElement("button");
    btn.textContent=opt;

    btn.addEventListener("click",()=>{
      document.querySelectorAll("#options button").forEach(b=>b.classList.remove("active"));
      btn.classList.add("active");
      selectedScore=q.scores[index];
      nextBtn.disabled=false;
    });

    optionsEl.appendChild(btn);
  });
}

nextBtn.addEventListener("click",()=>{
  totalScore+=selectedScore;
  currentQuestion++;

  if(currentQuestion<questions.length){
    loadQuestion();
  } else {
    showResult();
  }
});

function showResult(){
  quiz.classList.add("hidden");
  result.classList.remove("hidden");

  let percentage=Math.round((totalScore/20)*100);
  let msg="";

  if(totalScore<=7){
    msg="Strong emotional balance and healthy coping mechanisms.";
  }
  else if(totalScore<=12){
    msg="Mild stress levels detected. Practice relaxation strategies.";
  }
  else if(totalScore<=16){
    msg="Noticeable stress detected. Consider structured stress management.";
  }
  else{
    msg="High stress levels. Professional guidance is recommended.";
  }

  scoreDisplay.innerHTML=`Total Score: ${totalScore}/20 <br> Wellness Percentage: ${percentage}%`;
  resultText.textContent=msg;
}

submitBtn.addEventListener("click",()=>{

  const name=document.getElementById("username").value;
  const email=document.getElementById("email").value;

  if(!name || !email){
    alert("Please enter your name and email.");
    return;
  }

  let percentage=Math.round((totalScore/20)*100);

  fetch("https://script.google.com/macros/s/AKfycbxGe_CpyeMjQ70LdcuBl6BsTFJIG6cz7fUQ_zUpsQ1kso63JZxlJqgdYBTHD5ZkVjo8Eg/exec",{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify({
      name:name,
      email:email,
      score:totalScore,
      percent:percentage,
      feedback:resultText.textContent
    })
  })
  .then(res=>res.text())
  .then(data=>{
    alert("Report saved and PDF sent to your email.");
  })
  .catch(err=>{
    alert("Error sending report.");
  });

});

