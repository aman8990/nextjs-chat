# 💬 Next.js Chat App

A full-featured real-time chat application built with Next.js 15, enabling smooth one-to-one messaging with authentication, image uploads, notifications, and real-time updates using Pusher.


## 🚀 Live Demo

🔗 [Live Site](https://nextjs-chat-rho-gules-14.vercel.app/)  


## 🧩 Features

- 🔐 User authentication (Email/Password + Google & Github OAuth)
- 📸 Image uploads via Cloudinary
- 📥 Message read receipts
- 👥 Chat list with last message preview
- 📡 Pusher integration for real-time updates
- 📧 Email service integration (via Nodemailer)
- 🔄 State syncing with Zustand
- 🌐 Responsive design using Tailwind CSS
- 🧪 Form validation via React Hook Form
- 🔒 Route protection using NextAuth and middleware

---

## 🛠️ Tech Stack

### Frontend:
- **Next.js 15 (App Router)**
- **React 19**
- **Tailwind CSS**
- **React Hook Form**
- **Zustand – State management**
- **React Hot Toast – Notifications**
- **React Icons – Icons**

### Backend:
- **Next.js API Routes & Actions**
- **Prisma ORM with MongoDB**
- **Bcrypt – Password hashing**
- **Nodemailer – Email sending**

### Real-Time & File Handling:
- **Pusher & Pusher-JS – Real-time messaging**
- **Next-Cloudinary – Image/file uploads**

### Authentication:
- **NextAuth.js**
  - Google oAuth
  - Github oAuth
  - Email & Password login
- **@next-auth/prisma-adapter – Database integration**
