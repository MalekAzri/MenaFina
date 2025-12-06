# MenaFina

**MenaFina** is an AI-powered financial education platform designed to empower students and professors with advanced tools for investment analysis and financial learning. This prototype was built using [Next.js](https://nextjs.org/) and [Tailwind CSS](https://tailwindcss.com/).

## 🚀 Features

- **🔐 Secure Authentication**: Integrated authentication with **NextAuth** to protect user routes and data.
- **📊 Investment Simulator**: Practice trading and get AI-powered investment advice in a risk-free environment.
- **🤖 AI Financial Chatbot**: An intelligent assistant capable of answering questions about markets, strategies, and risk management.
- **👥 Prof-Student Space**: A directory connecting students with professors and courses.
- **👤 User Account Management**: Comprehensive profile management with statistics and interaction tracking.
- **📝 User Registration**: Easy signup for Students and Professors with specialized profiling.
- **📱 Responsive Design**: Fully responsive UI built with Tailwind CSS for seamless experience across devices.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Authentication**: [NextAuth.js](https://next-auth.js.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)
- **Language**: TypeScript

## 🏁 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

- `/src/app`: Page routes (`/`, `/login`, `/register`, `/simulator`, `/chatbot`, `/prof-student-space`, `/account`)
- `/src/app/api/auth`: NextAuth API route configuration.
- `/src/components`: Reusable UI components (`Header`, `Footer`, `HeroSection`, `AuthProvider`, etc.)
- `src/middleware.ts`: Route protection logic.

## ✨ Key Pages

| Route | Description | Access |
|-------|-------------|--------|
| `/` | **Home**: Landing page with feature overview and stats. | Public |
| `/login` | **Login**: Authentication interface with role selection. | Public |
| `/register` | **Register**: New user signup with role-specific fields. | Public |
| `/simulator` | **Simulator**: AI investment analysis tool. | **Protected** |
| `/chatbot` | **Chatbot**: Interactive financial AI assistant. | **Protected** |
| `/prof-student-space` | **Prof-Student Space**: Directory of professors and courses. | **Protected** |
| `/account` | **My Account**: User profile, stats, and calendar. | **Protected** |

## 🤝 Contributing

This project is a prototype. Contributions to enhance features or add real backend integration are welcome!
