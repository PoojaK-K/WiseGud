const questions = [
{
question: "1. How do you usually respond to stressful situations?",
options: [
    { text: "Stay calm and solve it step by step", score: 1 },
    { text: "Feel stressed but try to manage", score: 2 },
    { text: "Become anxious and overwhelmed", score: 3 },
    { text: "Avoid or completely shut down", score: 4 }
]
},
{
question: "2. How often do you experience negative thoughts?",
options: [
    { text: "Rarely", score: 1 },
    { text: "Occasionally", score: 2 },
    { text: "Frequently", score: 3 },
    { text: "Almost constantly", score: 4 }
]
},
{
question: "3. How would you describe your sleep pattern?",
options: [
    { text: "Consistent and restful", score: 1 },
    { text: "Slightly irregular", score: 2 },
    { text: "Disturbed or insufficient", score: 3 },
    { text: "Very poor and exhausting", score: 4 }
]
},
{
question: "4. How supported do you feel emotionally?",
options: [
    { text: "Strongly supported", score: 1 },
    { text: "Somewhat supported", score: 2 },
    { text: "Rarely supported", score: 3 },
    { text: "Completely alone", score: 4 }
]
},
{
question: "5. How often do you feel mentally exhausted?",
options: [
    { text: "Rarely", score: 1 },
    { text: "Sometimes", score: 2 },
    { text: "Often", score: 3 },
    { text: "Almost daily", score: 4 }
]
},
{
question: "6. How do you handle criticism?",
options: [
    { text: "Reflect calmly", score: 1 },
    { text: "Feel uncomfortable but accept it", score: 2 },
    { text: "Take it personally", score: 3 },
    { text: "Feel deeply hurt or upset", score: 4 }
]
},
{
question: "7. How often do you feel genuinely happy?",
options: [
    { text: "Very often", score: 1 },
    { text: "Sometimes", score: 2 },
    { text: "Rarely", score: 3 },
    { text: "Almost never", score: 4 }
]
},
{
question: "8. When facing problems, you:",
options: [
    { text: "Seek solutions immediately", score: 1 },
    { text: "Delay but eventually handle it", score: 2 },
    { text: "Procrastinate often", score: 3 },
    { text: "Avoid completely", score: 4 }
]
},
{
question: "9. How often do you feel anxious without clear reason?",
options: [
    { text: "Rarely", score: 1 },
    { text: "Occasionally", score: 2 },
    { text: "Frequently", score: 3 },
    { text: "Almost all the time", score: 4 }
]
},
{
question: "10. How well can you relax during free time?",
options: [
    { text: "Very easily", score: 1 },
    { text: "With some effort", score: 2 },
    { text: "Rarely able to relax", score: 3 },
    { text: "Never feel relaxed", score: 4 }
]
}
];

let currentQuestion = 0;
let totalScore = 0;

function startQuiz() {
const name = document.getElementById("name").value;
const email = document.getElementById("email").value;
const error = document.getElementById("error");

if (!name || !email) {
    error.textContent = "Please enter both Name and Email to continue.";
    return;
}

error.textContent = "";
document.getElementById("intro").style.display = "none";
document.getElementById("quiz").style.display = "block";
loadQuestion();
}

function loadQuestion() {
const q = questions[currentQuestion];
document.getElementById("question").innerText = q.question;

const optionsDiv = document.getElementById("options");
optionsDiv.innerHTML = "";

q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.classList.add("option-btn");
    btn.innerText = option.text;
    btn.onclick = () => selectAnswer(option.score);
    optionsDiv.appendChild(btn);
});
}

function selectAnswer(score) {
totalScore += score;
currentQuestion++;

if (currentQuestion < questions.length) {
    loadQuestion();
} else {
    showResult();
}
}

function showResult() {
    document.getElementById("quiz").style.display = "none";
    document.getElementById("resultCard").style.display = "block";

    let resultText = "";

    if (totalScore <= 18) {
        resultText = `
        <h3>🌿 Healthy Emotional State</h3>
        <p>You demonstrate strong emotional balance and effective coping skills.</p>
        <p>✨ You are able to manage stress constructively.<br>
        💚 You maintain positive emotional stability.<br>
        🌸 Keep nurturing your mental wellness habits.</p>
        `;
    }
    else if (totalScore <= 28) {
        resultText = `
        <h3>🌼 Moderate Stress Level</h3>
        <p>You are managing, but certain areas may need attention.</p>
        <p>⚖️ Some emotional strain is present.<br>
        🧠 Consider improving relaxation and sleep habits.<br>
        🤝 Talking to someone you trust may help.</p>
        `;
    }
    else if (totalScore <= 40) {
        resultText = `
        <h3>⚠️ High Stress Level</h3>
        <p>You may be experiencing significant emotional pressure.</p>
        <p>😟 Frequent stress indicators detected.<br>
        💤 Rest and recovery are important.<br>
        💬 Seeking emotional support is strongly recommended.</p>
        `;
    }
    else {
        resultText = `
        <h3>🚨 Significant Emotional Distress</h3>
        <p>Your responses indicate elevated distress levels.</p>
        <p>💔 Emotional overload may be present.<br>
        📞 Consider speaking with a mental health professional.<br>
        🌟 Support and guidance can make a difference.</p>
        `;
    }

    document.getElementById("result").innerHTML =
        resultText +
        `<br><small>This assessment is for awareness purposes only and not a clinical diagnosis.</small>`;
}
function sendToGoogleSheets(name, email, score, resultText) {

    fetch("https://script.googleusercontent.com/macros/echo?user_content_key=AY5xjrQ4cZVHL7HPvRQnZQH7ab9-O5g0X04DDT8su0R_IKw5GqBcQOm-q8t79NG3GOzhBIGMiVpWl5pn_NFfah3aXvHMRX7f_24rtWk822UTaQ5DJpuoydvd0i-5azmw7WwBoQ3YUWpaqX-KH-hZiYqlIXJjlACj8zzDGU5OxP5uoIbwUUAHtQ-4meYgDZdzdDLxmi6ckYXql5uIqlS3Ycqx7KHCEZcUoXWs8yLqQAoMP-KIzeQdi_W4yrENNOQjnI3hqGjxVUJhKYHgHkjz_vN_boUM2jhCjLeFbbEtrzQc&lib=MOi3pFzyo71YeiUSPs4xOK8vUpigpoChT", {
        method: "POST",
        mode: "no-cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            score: score,
            result: resultText
        })
    });

}
