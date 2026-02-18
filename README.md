# WiseGud 💙  
A Mental Health Self-Assessment Web Application

## 📌 Project Overview

WiseGud is a simple full-stack web application that allows users to take a short mental health self-assessment quiz.  
The responses are automatically stored in Google Sheets using Google Apps Script as the backend.

This project demonstrates:

- Frontend Development (HTML, CSS, JavaScript)
- Backend Integration (Google Apps Script)
- Database Storage (Google Sheets)
- API Communication using Fetch

---

## 🚀 Features

- Interactive MCQ-based mental health quiz
- Score calculation logic
- Personalized feedback based on score
- Automatic data storage in Google Sheets
- Timestamp recording for each submission

---

## 🛠️ Tech Stack

Frontend:
- HTML
- CSS
- JavaScript

Backend:
- Google Apps Script (Web App)

Database:
- Google Sheets
  
---

## 🔗 How It Works

1. User completes the quiz.
2. JavaScript calculates total score.
3. Based on score, feedback is generated.
4. `fetch()` sends data to Google Apps Script.
5. Google Apps Script appends data to Google Sheet.

---

## ⚙️ Setup Instructions

### Step 1: Create Google Sheet
- Create a new Google Sheet
- Add headers:
  - Timestamp
  - Score
  - Result

### Step 2: Create Google Apps Script
- Open Extensions → Apps Script from Google Sheets
- Paste backend code
- Deploy as Web App
- Set:
  - Execute as: Me
  - Who has access: Anyone

### Step 3: Update Web App URL
Replace the `scriptURL` inside `index.html` with your deployed Web App URL.

---

## 🧪 Testing

1. Open `index.html`
2. Complete the quiz
3. Check Google Sheet
4. New row should be added automatically

---

## 📊 Sample Stored Data

| Timestamp | Score | Result |
|-----------|-------|--------|
| DateTime  | 7     | Moderate Stress |

---

## 🎯 Learning Outcomes

- Understanding client-server architecture
- Working with APIs
- Handling POST requests
- Using Google Apps Script as backend
- Real-world project deployment

---

## 📌 Future Improvements

- Add user name field
- Add percentage calculation
- Add admin dashboard
- Add data visualization chart
- Deploy using Netlify / GitHub Pages

---

## 👩‍💻 Developed By

Pooja K K  
Computer Science Student  
Interested in AI & Web Development

---

## 📄 License

This project is developed for academic and educational purposes.


