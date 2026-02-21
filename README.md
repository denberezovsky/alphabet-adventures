# Hebrew Animal Spelling Game 🦁

A fun educational game for kids to learn Hebrew spelling with animals!

## 🎮 Features

✅ Beautiful animal images as backgrounds  
✅ Hebrew text-to-speech pronunciation  
✅ Drag-and-drop letter placement  
✅ Animated letter scattering  
✅ Success celebrations  
✅ PWA support - install on phone/tablet  
✅ Works offline  

---

## 🚀 Quick Start (First Time Setup)

### Step 1: Install Node.js

**Download Node.js from:** https://nodejs.org/  
Choose the **LTS version** (recommended)

**Verify installation:**
```bash
node --version
npm --version
```

### Step 2: Install Dependencies

Open this folder in **VS Code** or any terminal:

```bash
npm install
```

This downloads all required packages (takes 2-3 minutes first time).

### Step 3: Run the App Locally

```bash
npm start
```

✅ Browser opens automatically at `http://localhost:3000`  
✅ App auto-refreshes when you edit code  

**To stop:** Press `Ctrl + C` in terminal

---

## 📱 Deploy to GitHub Pages (Make it Live!)

### Step 1: Create GitHub Repository

1. Go to https://github.com
2. Click **"New repository"**
3. Name it: `hebrew-spelling-game`
4. Make it **Public**
5. Click **"Create repository"**

### Step 2: Update package.json

Open `package.json` and change this line:

```json
"homepage": "https://YOUR-USERNAME.github.io/hebrew-spelling-game",
```

Replace `YOUR-USERNAME` with your actual GitHub username!

### Step 3: Push Code to GitHub

In your terminal (in this folder):

```bash
# Initialize git (first time only)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Add GitHub repository (replace YOUR-USERNAME!)
git remote add origin https://github.com/YOUR-USERNAME/hebrew-spelling-game.git

# Push to GitHub
git branch -M main
git push -u origin main
```

### Step 4: Deploy to GitHub Pages

```bash
npm run deploy
```

✅ Done! Your app is live at:  
`https://YOUR-USERNAME.github.io/hebrew-spelling-game`

---

## 🔄 Update After Changes

After editing code:

```bash
# Test locally first
npm start

# If looks good, deploy
npm run deploy
```

---

## 📁 Project Structure

```
hebrew-spelling-game/
├── public/
│   ├── index.html          # Main HTML
│   ├── manifest.json       # PWA config
│   └── service-worker.js   # Offline support
├── src/
│   ├── App.js              # Main app wrapper
│   ├── AnimalSpellingGame.js  # 🎮 THE GAME (edit this!)
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── package.json            # Dependencies
└── README.md               # This file
```

---

## ✏️ How to Add More Animals

Edit `src/AnimalSpellingGame.js`:

```javascript
// Change these two lines:
const word = "פיל";  // elephant
const imageUrl = "https://images.unsplash.com/photo-elephant...";
```

Find images at: https://unsplash.com/

---

## 🛠️ Common Commands

| Command | What it does |
|---------|--------------|
| `npm start` | Run app locally |
| `npm run build` | Create production build |
| `npm run deploy` | Deploy to GitHub Pages |

---

## 📱 Install as App (PWA)

After deploying:

**On Mobile:**
1. Open the website
2. Tap browser menu (⋮)
3. Click "Add to Home Screen"

**On Desktop (Chrome):**
1. Open the website
2. Click install icon in address bar
3. Click "Install"

---

## 🐛 Troubleshooting

**Problem:** `npm: command not found`  
**Solution:** Install Node.js from https://nodejs.org/

**Problem:** Port 3000 already in use  
**Solution:** Kill the other process or change port in package.json

**Problem:** Deploy failed  
**Solution:** Check GitHub username in package.json homepage

**Problem:** Hebrew text looks weird  
**Solution:** Make sure browser supports Hebrew fonts

---

## 🎨 Customization Ideas

- Add more animals (lion, elephant, monkey, etc.)
- Add difficulty levels
- Add sound effects
- Add scoring system
- Add timer challenges
- Multiple languages support

---

## 📧 Questions?

Open an issue on GitHub or edit the code and experiment!

---

**Made with ❤️ for Hebrew-learning kids**
