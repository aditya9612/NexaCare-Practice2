# Login OTP App

A fully frontend React + TypeScript login page with Mobile Number + OTP (mock) authentication.

## Features
- 📱 Mobile number input with Indian (+91) flag
- 🔐 4-digit OTP verification (mock OTP: `1234`)
- ⏱️ 30-second resend countdown timer
- ✅ Success screen with mock session token
- 🎨 Dark UI with DM Sans + DM Mono fonts
- 💯 Fully typed with TypeScript
- 🧩 CSS Modules for scoped styles

## Project Structure

```
login-otp-app/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── LoginPage.tsx
│   │   └── LoginPage.module.css
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Install dependencies
```bash
npm install
```

### Run the app
```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for production
```bash
npm run build
```

## Usage
1. Enter a valid 10-digit Indian mobile number (starting with 6–9)
2. Click **Send OTP**
3. Enter the mock OTP: **1234**
4. Click **Verify OTP**
5. You're in! 🎉
