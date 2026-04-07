# Reorganizing Your Local Files

## What's changing

The site is being restructured so kisterhomeschool.com has a proper home page
with three sections. The weather station moves into a subfolder.

Before:
```
mrsbk.github.io/
├── index.html          ← weather station home
├── instruments.html
├── css/, js/, data/, images/
└── CNAME
```

After:
```
mrsbk.github.io/
├── index.html          ← NEW landing page (3 cards)
├── .nojekyll
├── CNAME               ← keep this exactly as-is, do not touch
├── images/
│   ├── weather.jpg
│   ├── klask.jpg
│   └── nsda.png
├── weather-station/
│   ├── index.html
│   ├── instruments.html
│   ├── data-stage1.html
│   ├── data-stage2.html
│   ├── gallery.html
│   ├── archive.html
│   ├── about.html
│   ├── css/
│   ├── js/
│   ├── data/
│   └── images/
├── klask-tourney/
│   └── index.html
└── debate/
    └── index.html
```

---

## Step by step

### Step 1 — Open your local mrsbk.github.io folder
In GitHub Desktop: Repository → Show in Explorer (or Finder)

### Step 2 — Create new subfolders
Inside the mrsbk.github.io folder, create these new folders:
- `weather-station`
- `klask-tourney`
- `debate`
- `images`

### Step 3 — Move existing weather station files into weather-station/
Select these files/folders and move them INTO the new `weather-station` folder:
- `instruments.html`
- `data-stage1.html`
- `data-stage2.html`
- `gallery.html`
- `archive.html`
- `about.html`
- `css/` (the whole folder)
- `js/` (the whole folder)
- `data/` (the whole folder)
- The old `images/` folder → rename it to `images` inside weather-station

Do NOT move: `CNAME`, `.nojekyll`
Do NOT move yet: `index.html` — you'll replace it in the next step

### Step 4 — Copy in the new files from the zip
From the new zip file you downloaded, copy:
- `index.html` → replace the existing root index.html
- `images/weather.jpg` → into the root `images/` folder
- `images/klask.jpg` → into the root `images/` folder
- `images/nsda.png` → into the root `images/` folder
- `weather-station/index.html` → into your weather-station folder
- `klask-tourney/index.html` → into your klask-tourney folder
- `debate/index.html` → into your debate folder
- `.nojekyll` → root (replace existing)

### Step 5 — Set your password
Open `weather-station/js/auth.js` in Notepad and set your password
as you did before.

### Step 6 — Commit and push
In GitHub Desktop:
- You'll see a large list of changes — files moved, added, replaced
- Write commit message: `Restructure site — add landing page and subsections`
- Click Commit to main
- Click Push origin

### Step 7 — Test
Visit kisterhomeschool.com — you should see the landing page with 3 cards.
Click each card and verify it goes to the right place.
Visit kisterhomeschool.com/weather-station/ to confirm the weather station works.

---

## Note on the CNAME file
The CNAME file contains just the text `kisterhomeschool.com` and is what
connects your GitHub repo to your domain. Never delete or edit it.
It stays in the root folder always.
