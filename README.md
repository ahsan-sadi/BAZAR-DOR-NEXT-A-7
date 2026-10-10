# 🛒 বাজার দর (Bazar Dor)

> প্রয়োজনীয় পণ্যের দাম এক নজরে — *Daily essential prices at a glance.*

**Bazar Dor** is a fast, mobile-friendly Bangla web app that shows today's prices of everyday essentials — rice, lentils, oil, vegetables, fish, meat, eggs & dairy, and spices. It compares prices across markets in different divisions of Bangladesh and highlights what went up or down compared to yesterday.

---

## ✨ Features

- 📈 **Daily price overview** — home page highlights the products whose prices **rose** or **fell** the most today, plus the full product list.
- 🗂️ **Category pages** — browse চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ and মসলা, with **sorting** (price low→high, high→low, biggest rise, biggest fall).
- 🔎 **Product detail page** — today's price, change vs. yesterday, **lowest / highest / average** price and a **market-wise price table** (sortable by market, division, min, max and average).
- 📰 **Live price ticker** — a smooth, looping marquee of current prices in the header (pauses on hover, respects "reduce motion").
- 🔐 **Authentication** — sign up / sign in with **email & password**, **Google** and **GitHub** (powered by better-auth).
- 👤 **User profile** — protected profile page where users can update their name and sign out.
- 🔢 **Bangla-first UI** — Bengali numerals (১,২৯০), Bangla dates and labels throughout.
- 📱 **Fully responsive** — designed for phones, tablets and desktops.
- ⚡ **Fast & resilient** — cached data fetching with retries, rate-limit (HTTP 429) backoff and an offline snapshot fallback, so the site stays usable when the price API is slow or down.

---

## 🧰 Technologies Used

| Area | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (App Router, Cache Components, Server Components) |
| UI library | [React](https://react.dev/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Components | [HeroUI](https://www.heroui.com/) |
| Icons | [Gravity UI Icons](https://github.com/gravity-ui/icons) |
| Auth | [better-auth](https://www.better-auth.com/) (email/password + Google + GitHub) |
| Database | [MongoDB](https://www.mongodb.com/) (Atlas) |
| Deployment | [Vercel](https://vercel.com/) |

---

## 🚀 Getting Started

### 1. Clone & install

```bash
git clone <your-repo-url>
cd bazardor
npm install
```

### 2. Configure environment variables

Create a `.env.local` file in the project root (next to `package.json`):

```env
# Database
BETTER_AUTH_DB_URL="mongodb+srv://USER:PASSWORD@cluster.mongodb.net/bazardor"

# better-auth
BETTER_AUTH_SECRET="a-long-random-string"
BETTER_AUTH_URL="http://localhost:3000"
NEXT_PUBLIC_BETTER_AUTH_URL="http://localhost:3000"

# Social login (optional)
GOOGLE_CLIENT_ID=""
GOOGLE_CLIENT_SECRET=""
GITHUB_CLIENT_ID=""
GITHUB_CLIENT_SECRET=""
```

> ⚠️ Never commit `.env.local`. Make sure it is listed in `.gitignore`.

### 3. (Recommended) Save an offline copy of the price data

```bash
node scripts/save-snapshot.mjs
```

This writes `src/data/products.snapshot.json`, which the app uses as a fallback if the price API is unavailable or rate-limited.

### 4. Run the app

```bash
npm run dev      # development  → http://localhost:3000
npm run build    # production build
npm start        # run the production build
```

---

## 🔑 Social Login Setup

Add these callback URLs in the Google and GitHub developer consoles (use your real domain in production):

- `http://localhost:3000/api/auth/callback/google`
- `http://localhost:3000/api/auth/callback/github`

---

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.jsx                 # Navbar + page + Footer
│   ├── page.jsx                   # Home (Hero + price sections)
│   ├── (auth)/                    # signin · signup · profile
│   ├── category/[slug]/           # Category listing
│   ├── products/[slug]/           # Product detail + market table
│   └── api/auth/[...all]/         # better-auth route handler
├── components/                    # Navbar, Marquee, Hero, Footer, cards, tables, forms
├── hooks/                         # useSignOut
├── data/                          # products.snapshot.json (offline fallback)
└── lib/                           # api (cached fetch), auth, auth-client, format, market
```

---

## 🌐 Data Source

Prices come from the Bazar Dor API:

```
GET https://api.api-store.workers.dev/api/bazardor/products
GET https://api.api-store.workers.dev/api/bazardor/categories
```

Responses are cached on the server and refreshed in the background. If the API fails, the app falls back to the saved snapshot (products) and a built-in list (categories).

---

## ☁️ Deployment (Vercel)

1. Push the project to GitHub and import it in Vercel.
2. Add **all** the environment variables above in *Settings → Environment Variables* (enabled for **Build** and **Production**), using your live URL for `BETTER_AUTH_URL` and `NEXT_PUBLIC_BETTER_AUTH_URL`.
3. In MongoDB Atlas → **Network Access**, allow access from Vercel (e.g. `0.0.0.0/0`).
4. Add your live callback URLs to the Google and GitHub OAuth apps.
5. Redeploy.

---

## 📄 License

This project is for learning and personal use. Prices shown are indicative and may vary with market conditions.
