const questions = [
{
    question: "How often do you feel stressed?",
    options: ["Rarely", "Sometimes", "Often", "Almost always"],
    scores: [1, 2, 3, 4]
},
{
    question: "How well do you sleep?",
    options: ["Very well", "Okay", "Poorly", "Barely sleep"],
    scores: [1, 2, 3, 4]
},
{
    question: "Do you enjoy your daily activities?",
    options: ["Always", "Mostly", "Sometimes", "Rarely"],
    scores: [1, 2, 3, 4]
},
{
    question: "How often do you feel anxious?",
    options: ["Rarely", "Sometimes", "Often", "Always"],
    scores: [1, 2, 3, 4]
},
{
    question: "Do you feel supported by people around you?",
    options: ["Always", "Often", "Sometimes", "Never"],
    scores: [1, 2, 3, 4]
}
];

let currentQuestion = 0;
let totalScore = 0;
let selectedScore = 0;

const startBtn = document.getElementById("startBtn");
const quiz = document.getElementById("quiz");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const result = document.getElementById("result");
const resultText = document.getElementById("resultText");

startBtn.addEventListener("click", () => {
    startBtn.classList.add("hidden");
    quiz.classList.remove("hidden");
    loadQuestion();
});

function loadQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = "";
    selectedScore = 0;
    nextBtn.disabled = true;

    q.options.forEach((opt, index) => {
        const btn = document.createElement("button");
        btn.textContent = opt;

        btn.addEventListener("click", () => {

            // Remove active from all buttons
            document.querySelectorAll("#options button").forEach(b => {
                b.style.background = "";
                b.style.color = "";
            });

            // Highlight selected
            btn.style.background = "#6ec1e4";
            btn.style.color = "white";

            selectedScore = q.scores[index];
            nextBtn.disabled = false;
        });

        optionsEl.appendChild(btn);
    });
}

nextBtn.addEventListener("click", () => {
    totalScore += selectedScore;
    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    quiz.classList.add("hidden");
    result.classList.remove("hidden");

    let msg = "";
    let percentage = Math.round((totalScore / 20) * 100);

    if (totalScore <= 7) {
        msg = "💖 You're doing great! Keep maintaining your mental health.";
    } else if (totalScore <= 12) {
        msg = "🙂 You're mostly fine, but occasional stress is normal. Take breaks!";
    } else if (totalScore <= 16) {
        msg = "😟 You might be experiencing stress. Try mindfulness or talk to someone.";
    } else {
        msg = "💔 You may need support. Consider speaking to a professional.";
    }

    resultText.innerHTML = `
        <p><strong>Total Score:</strong> ${totalScore}/20</p>
        <p><strong>Health Score:</strong> ${percentage}%</p>
        <p>${msg}</p>
    `;

    let username = prompt("Enter your name:");

    if (username) {
        saveResult(username, totalScore, percentage, msg);
    }
}

// 🌿 Send data to Google Sheets
function saveResult(name, score, percent, feedback) {

    fetch("https://script.google.com/macros/s/AKfycbw9LIm_9DroG7wp3l0EAlw8luVYIbPDEVodDHUsR32arKN6aYODxzhlYeBSAozBy3yZ/exec", {
        method: "POST",
        body: JSON.stringify({
            name: name,
            score: score,
            percent: percent,
            feedback: feedback,
            date: new Date().toLocaleString()
        }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    .then(response => response.text())
    .then(data => console.log("Saved:", data))
    .catch(error => console.error("Error:", error));
}
