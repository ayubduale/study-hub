README.md
md

# Study Hub

A platform that helps students discover peers, form study groups, and share resources across courses.

## Why I Built This

I noticed that many students struggle to find consistent study partners, especially in large classes where it's hard to know who else is serious about a course. Study Hub gives students a lightweight way to organize into focused groups, share materials, and stay accountable together.

**Who is this for?**

- University and college students
- Bootcamp participants
- Self-taught learners who want structured collaboration

**When is it useful?**

- During exam periods
- Around project deadlines
- When learning new technical topics
- For ongoing course support throughout the semester

---

## ✨ Features

✅ User authentication (email/password + OAuth)  
✅ Create and join study groups  
✅ Group discussions and messaging  
✅ Share resources and links  
✅ Responsive design for mobile and desktop  
✅ PostgreSQL database with Prisma

See [ROADMAP.md](./ROADMAP.md) for what's coming next.

---

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **UI Library:** React
- **Styling:** Tailwind CSS
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Authentication:** NextAuth.js
- **Deployment:** Vercel (planned)

---

## 🏗️ Project Structure

Here's how the code is organized:
study-hub/
├── app/ # Next.js app router
│ ├── (auth)/ # Authentication pages
│ ├── (dashboard)/ # Main app pages
│ ├── api/ # API routes
│ └── layout.tsx # Root layout
├── components/ # Reusable React components
│ ├── ui/ # UI primitives
│ ├── groups/ # Group-related components
│ └── auth/ # Auth components
├── lib/ # Utilities and shared logic
│ ├── prisma.ts # Database client
│ ├── auth.ts # Auth configuration
│ └── utils.ts # Helper functions
├── prisma/ # Database schema and migrations
│ ├── schema.prisma # Data models
│ └── migrations/ # Migration history
└── public/ # Static assets

text

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or later
- PostgreSQL (local or remote)
- Git

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ayubduale/study-hub.git
   cd study-hub
   Install dependencies:
   ```

bash
npm install
Set up environment variables:

bash
cp .env.example .env.local
Edit .env.local with your database URL and any other configuration.

Set up the database:

bash
npx prisma migrate dev
This creates all the tables defined in my schema.

Start the development server:

bash
npm run dev
Open http://localhost:3000 in your browser.
