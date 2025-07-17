
---

## 🟥 `server/README.md` — FlatFlow Server (Express + MongoDB)

# FlatFlow — Server (Backend)

This is the backend API for FlatFlow — a modern apartment management web application. It is built using Express, MongoDB, Stripe, and Cloudinary.

---

## 🎯 Purpose

To serve REST APIs for user authentication, apartment data, booking agreements, role-based access, and payment processing.

---

## 🌐 Live URL

**Backend (Render)** 👉 https://flatflow.vercel.app/      or      https://flatflow-kfcg977gi-shariyer-shazans-projects.vercel.app/

---

## ✨ Key Features

- ✅ User Registration & Login
- 🔐 JWT-based Authentication
- 🧾 Role-based Authorization Middleware (user, member, admin)
- 🏢 Apartment CRUD for Admin
- 📄 Apartment Booking Agreements
- 🧾 Agreement Cancellation by User
- 💳 Stripe Payment Gateway Integration
- 📤 Image Upload via Cloudinary
- 🛡️ Protected Routes with Middleware
- 📈 Paginated and filtered apartment fetch (rent range)
- 📝 Admin ability to remove members and update apartment availability

---

## 📦 Dependencies

```json
{
  "express": "^5.1.0",
  "mongoose": "^8.16.3",
  "dotenv": "^17.2.0",
  "jsonwebtoken": "^9.0.2",
  "bcryptjs": "^3.0.2",
  "cookie-parser": "^1.4.7",
  "cors": "^2.8.5",
  "multer": "^2.0.1",
  "cloudinary": "^2.7.0",
  "datauri": "^4.1.0",
  "stripe": "^18.3.0",
  "nodemon": "^3.1.10"
}
