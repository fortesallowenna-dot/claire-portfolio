# Allowenna Claire Luarez — UI/UX Portfolio

A static portfolio site (HTML, CSS, JavaScript). No build step required.

## Structure

```
index.html
style.css
script.js
favicon.svg
vercel.json
images/
```

## Run locally

Open `index.html` in a browser, or serve the folder:

```bash
npx serve .
```

## Deploy

1. Push this folder to a GitHub repository (`index.html` must be at the repo root).
2. On [vercel.com](https://vercel.com), click **Add New → Project** and import the repo.
3. Leave **Framework Preset** as **Other**, and leave Build Command and Output Directory empty.
4. Click **Deploy**.

## Things to personalize

- Social links still point to the generic `facebook.com`, `instagram.com` and `github.com` home pages. Replace them with your real profile URLs (they appear in the header, Find Me Online section, contact note, and footer).
- The contact form validates input but does not send email. Use a service such as Formspree or Web3Forms if you want it to work.
