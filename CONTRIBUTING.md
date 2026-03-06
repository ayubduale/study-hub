# Contributing to Study Hub

Thanks for your interest in contributing! Study Hub is my open source project to help students form study groups, share resources, and collaborate across campuses. This guide explains how to get set up and how you can help.

## Code of Conduct

By participating in this project, you agree to abide by our [Code of Conduct](./CODE_OF_CONDUCT.md).

---

## How to Report Bugs

1. First, check if an issue already exists describing the problem.
2. If not, open a new issue on GitHub.
3. Please include:
   - Steps to reproduce the bug
   - What you expected to happen
   - What actually happened
   - Screenshots if helpful
   - Your environment (OS, Node version, browser)

## How to Suggest Features

1. Open a new issue on GitHub.
2. Clearly describe:
   - The problem you're trying to solve
   - Why this would be useful for students
   - Any ideas on how it might work

---

## Development Setup

### Prerequisites

- Node.js (I use v20.x LTS)
- npm or yarn
- PostgreSQL
- Git

### Getting Started

````bash
git clone https://github.com/ayubduale/study-hub.git
cd study-hub
npm install
cp .env.example .env.local
Edit .env.local with your database URL and any auth keys you need.

bash
npx prisma migrate dev
npm run dev
Open http://localhost:3000 to see the app.

Project Structure
Here's how I've organized the codebase:

app/ – Next.js app router pages and UI components

app/api/ – API routes (backend endpoints)

components/ – Reusable React components

lib/ – Utility functions and shared logic

prisma/ – Database schema and migrations

public/ – Static assets like images

If you're not sure where to put something, just ask in an issue.

Running Tests
I've set up basic tests for critical functionality:

bash
npm test
If you add new features, please add tests where it makes sense. If you find areas with missing tests, feel free to add them!

Code Style
I use ESLint and Prettier to keep the code consistent:

bash
# Check for linting issues
npm run lint

# Format code automatically
npm run format
Please run these before submitting pull requests.

Branch Naming
When you create a branch, please use a descriptive name:

feature/add-group-search – for new features

bugfix/fix-login-error – for bug fixes

docs/update-readme – for documentation

chore/update-dependencies – for maintenance

Commit Messages
I like to keep commit history clean and readable. Please use messages like:

feat: add study group creation form

fix: correct user session expiration

docs: update installation instructions

test: add tests for group membership

chore: upgrade next.js to latest version

Pull Request Process
Make sure your branch is up to date with main.

Run npm run lint and npm test to check everything passes.

Open a pull request with:

A clear title (following the commit message style)

A description of what you changed and why

Screenshots if you changed the UI

Reference to any related issues (like Closes #12)

I'll review your PR and provide feedback. Once everything looks good, I'll merge it in.

First Time Contributing?
If you're new to open source or this project:

Look for issues labeled good first issue or help wanted.

Comment on the issue letting me know you want to work on it.

Follow the setup guide above.

Keep your first PR small and focused.

Feel free to ask questions in issues or discussions—I'm happy to help you through your first contribution!

Questions?
You can reach me through:

GitHub Issues

GitHub Discussions

Email: ayubabdisalan@gmail.com

Thanks again for considering contributing to Study Hub!

text

## ROADMAP.md
```md
# Study Hub Roadmap

Hey there! This is my roadmap for Study Hub—where the project is now and where I want to take it. I'm building this platform to help students find study partners and collaborate effectively, and I'd love your input on where we go next.

---

## 🚀 v1.0 – Current Release (March 2026)

This is what's working right now:

- **User authentication** – Sign up and log in with email/password
- **User profiles** – Basic profile setup
- **Study groups** – Create and join groups by course or topic
- **Group discussions** – Post messages and share resources
- **Responsive design** – Works on desktop and mobile
- **Database** – PostgreSQL with Prisma ORM

**The goal:** A student can sign up, find or create a group, and start collaborating within minutes. I think we're there!

---

## 📋 v1.1 – Coming Soon (Next Few Weeks)

Features I'm working on now:

- **Better group discovery** – Search and filter groups by course, skill level, or campus
- **Notifications** – Get alerts for new messages in your groups
- **Onboarding flow** – Help new users get started faster
- **Basic test suite** – Make sure core features don't break

---

## 🔜 v1.2 – Next Up

Features I plan to add after that:

- **Rich group features** – Pinned messages, tags, resource categories
- **Member roles** – Owners, moderators, and members with different permissions
- **Enhanced profiles** – Add skills, study preferences, and interests
- **API documentation** – Document the main endpoints for contributors

---

## 🌟 v2.0 – Long-term Vision

Where I want to take Study Hub in the future:

- **Multi-campus support** – Groups scoped by university or organization
- **Smart matching** – AI-powered suggestions for study partners and groups
- **LMS integration** – Connect with course platforms where possible
- **Analytics** – Help organizers understand group engagement and retention

---

## 🛠️ Known Issues & Help Wanted

Things I know need improvement:

- Test coverage is limited (I need help adding more tests!)
- Accessibility could be better (a11y review would be great)
- Error handling in forms and API routes needs work
- Deployment setup could be more robust

---

## 🤝 How You Can Help

I'd especially appreciate contributions in these areas:

- Writing tests
- Improving accessibility
- Designing better onboarding flows
- Improving documentation
- Creating deployment templates for Vercel, Railway, etc.

Check out [CONTRIBUTING.md](./CONTRIBUTING.md) to get started, or browse the Issues tab on GitHub for specific tasks.

---

*This roadmap is living document—I'll update it as the project evolves. Got ideas? Open an issue and let's talk!*
````
