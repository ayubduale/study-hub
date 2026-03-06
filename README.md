# study-hub

collaberate and learn wiht ur peers on study-hub

Tech Stack

- Next.js 14 (App Router)
- React 18
- NextAuth (Credentials + OAuth providers)
- Prisma
- TypeScript
- Tailwind CSS

project structure
study-hub/
├── prisma/
│ └── schema.prisma
├── src/
│ ├── app/
│ │ ├── api/
│ │ │ ├── auth/
│ │ │ │ └── [...nextauth]/route.ts
│ │ │ ├── posts/
│ │ │ │ ├── route.ts
│ │ │ │ └── [id]/route.ts
│ │ │ └── register/route.ts
│ │ ├── posts/
│ │ │ ├── page.tsx
│ │ │ ├── new/page.tsx
│ │ │ └── [id]/page.tsx
│ │ │ └── edit/page.tsx
│ │ ├── layout.tsx
│ │ ├── page.tsx
│ │ └── globals.css
│ ├── components/
│ │ ├── Header.tsx
│ │ ├── PostCard.tsx
│ │ └── Provider.tsx
│ └── lib/
│ ├── prisma.ts
│ └── auth.ts
├── public/
├── .env.local
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
