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

---

## 📂 Project Structure

```bash
project/
  ├── middleware.js        # Middleware for route protection (auth guard)
  ├── prisma/
  │   └── schema.prisma    # Prisma schema for MongoDB

  app/
    ├── api/               # API endpoints (auth, chats, pusher etc.)
    ├── _actions/          # Next.js Server Actions (getChats, getChatById, getMessages etc.)
    ├── _context/          # React Contexts (e.g. Auth context, Toast context)
    ├── _components/       # Reusable UI components (buttons, input, header etc.)
    ├── _utils/            # Utility/helper functions
    ├── _hooks/            # Custom hooks (useActiveList, useActiveChannel, useMessageStore etc.)
    ├── _libs/             # Core libraries (prismadb, emailSender, pusher)
    ├── (site)/            # Login page
    ├── account/           # User account info and settings
    ├── search/            # Search other users
    ├── chats/             # Chats listing route
    │   └── [chatId]/      # Dynamic chat details page
    ├── layout.js          # Root layout for the app
    ├── globals.css        # Global Tailwind styles
    └── not-found.js       # Custom 404 error page
```
