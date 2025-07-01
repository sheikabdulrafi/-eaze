# 📦 @Ease – Local Services Booking Web App

> Connecting customers with local service providers, fast and hassle-free.

---

## 🚀 Overview

**@Ease** is a MERN stack web application that helps users discover, book, and chat with nearby service providers based on their selected location (district, mandal, village). It uses a clean and scalable architecture with OTP-based authentication, real-time chat (planned), and support for service provider onboarding.

---

## 🧩 Features

- ✅ OTP-based user registration & login  
- ✅ Customer & service provider roles  
- ✅ Location filtering (District → Mandal → Village)  
- ✅ Lightweight MongoDB location schema  
- ✅ Dynamic profile completion for users  
- ✅ Profile-based service discovery with ratings & reviews *(coming soon)*  
- ✅ JWT authentication  
- ✅ Clean modular backend (Mongoose, Express)

---

## 🛠 Tech Stack

| Layer        | Stack                      |
|--------------|----------------------------|
| Frontend     | React + Sass + Framer Motion |
| Backend      | Node.js + Express.js       |
| Database     | MongoDB + Mongoose         |
| Auth         | JWT + OTP via Email        |
| Hosting      | Free (Planned: Render / Vercel) |

---

## 📁 Project Structure

```
@ease/
│
├── controller/
│   └── auth/
│   └── location/
│
├── routes/
│
├── Schemas/
│   └── User.js
│   └── District.js
│   └── Mandal.js
│   └── Village.js
│
├── utils/
│   └── sendEmail.js
│
├── config/
│   └── db.js
│
├── .env
├── .gitignore
├── package.json
└── index.js
```

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/at-ease.git
cd at-ease/backend
npm install
```

---

## 🔐 Environment Variables

Create a `.env` file in the root of `backend`:

```env
PORT=5000
MONGO_URI=mongodb+srv://<your-mongo-uri>
JWT_SECRET=yourSuperSecretJWTKey
JWT_EXPIRES_IN=1d
```

---

## 🧪 Run the App

```bash
# Run backend
npm start
```

---

## 📝 Future Improvements

- ✨ Admin Dashboard  
- 🧠 AI-powered provider recommendation  
- 📱 Mobile app (React Native)  
- 🧾 In-app payment support  
- 📷 Profile pictures & service photos  
- 🔔 Push/email notifications

---

## 👨‍💻 Author

**Sk. Abdulraffi**  
GitHub: [@yourusername](https://github.com/yourusername)  
LinkedIn: [your-profile](https://linkedin.com/in/your-profile)  
Project for learning & showcasing full-stack skills.

---

## 🛡 License

MIT License — Feel free to fork and improve for personal use.