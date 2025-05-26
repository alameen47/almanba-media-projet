# Next.js Frontend Setup for Al-Manba Media

## Prerequisites:
- Node.js and npm/yarn installed.
- Strapi backend (my-almanba-cms) should be set up and running.

## 1. Create a new Next.js project:
npx create-next-app@latest almanba-frontend
# Or using yarn:
# yarn create next-app almanba-frontend

cd almanba-frontend

## 2. Install Tailwind CSS (as per official Next.js guide):
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
# This creates tailwind.config.js and postcss.config.js.

## 3. Configure Tailwind (in tailwind.config.js - see file content)

## 4. Add Tailwind directives (in styles/globals.css - see file content)

## 5. Set up Environment Variables (in .env.local - see file content)

## 6. Create lib/api.js (see file content)

## 7. Modify pages/index.js (see file content)

## 8. Create pages/articles/[slug].js (see file content)

## 9. Install additional packages:
# For Markdown rendering (if using Rich Text Markdown in Strapi)
npm install react-markdown

# For Tailwind typography (optional, for prose classes)
npm install -D @tailwindcss/typography
# Then add require('@tailwindcss/typography') to plugins in tailwind.config.js

## 10. Run the Next.js development server:
npm run dev
# Or using yarn:
# yarn dev

Open http://localhost:3000 in your browser.