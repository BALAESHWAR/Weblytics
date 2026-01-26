# ⏱️ Website Time Tracker  
### Chrome Extension + Node.js + MongoDB

A full-stack **Website Time Tracking system** that tracks time spent on websites using a **Chrome Extension**, stores data in **MongoDB**, and provides analytics via a **Node.js backend**.

---

## 🚀 Features

- ⏳ Track active tab time automatically
- 🔁 Detect tab switches and window focus changes
- 🌐 Track domain-wise usage (YouTube, LinkedIn, etc.)
- 🧠 Idle detection support
- 🗄️ MongoDB session storage
- 📊 Analytics API
- 🧩 Chrome Extension (Manifest V3)
- ⚡ Real-time logging from background service worker

---

## 🛠️ Tech Stack

- **Frontend**: Chrome Extension (HTML, JS)
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **ODM**: Mongoose
- **Tools**: Nodemon, MongoDB Compass

---
✅ System Requirements
node -v
npm -v
mongod --version

📦 Backend Setup
cd backend
npm install

🔐 Environment Variables
touch .env

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/time_tracker

🗄️ Start MongoDB Server
mongod

🚀 Start Backend Server
npm run dev


or

npm start

🔎 Verify Backend APIs
curl http://localhost:5000/api/analytics

curl -X POST http://localhost:5000/api/track \
-H "Content-Type: application/json" \
-d '{
  "url": "https://youtube.com",
  "domain": "youtube.com",
  "websiteName": "YouTube",
  "duration": 20
}'

🧠 MongoDB Compass Connection
mongodb://127.0.0.1:27017

Database Name: time_tracker
Collection Name: sessions

🧩 Chrome Extension Installation
Open Chrome Browser

Go to chrome://extensions

Enable Developer Mode

Click "Load unpacked"

Select folder: chrome-extension/

🧪 Extension Testing Steps
Open any website (YouTube, LinkedIn, etc.)

Switch tabs or windows

Wait at least 2 seconds per tab

Open:
chrome://extensions → Inspect Service Worker

Expected logs:
📤 Sending payload
✅ Session stored successfully

## 📸 Screenshots

<img src="https://raw.githubusercontent.com/BALAESHWAR/Chromalytics/refs/heads/main/screenshots/Screenshot%202026-01-26%20114737.png" width="900">

<img src="https://raw.githubusercontent.com/BALAESHWAR/Chromalytics/refs/heads/main/screenshots/Screenshot%202026-01-26%20114945.png" width="900">

<img src=""="900">



