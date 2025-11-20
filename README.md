[![Hits](https://hits.sh/ramjam97.github.io/qr-generator.svg)](https://hits.sh/ramjam97.github.io/qr-generator/)

# Simple QR Generator

A lightweight QR code generator built with React, Vite, and TypeScript.

## Features

- Generate QR codes from free-form text or URLs
- Adjustable size, margin, and color
- Add a logo to the QR code
- Live preview in the browser
- Download generated QR codes as PNG images

## Quick Start

1. Clone the repository:

```bash
git clone https://github.com/ramjam97/qr-generator.git
cd qr-generator
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

Open `http://localhost:5173` (or the port Vite shows) in your browser.

## Npm Scripts

- `npm run dev`: Start the Vite development server
- `npm run build`: Create a production build
- `npm run preview`: Preview the production build locally
- `npm run lint`: Run ESLint across the project

## Usage

- Enter the text or URL you want encoded in the QR field.
- Customize size, margin and color using the controls.
- (Optional) Upload or select a logo to embed in the QR code.
- Click `Generate` to update the preview, then `Download` to save a PNG.

## Demo

You can try the hosted demo here: https://ramjam97.github.io/qr-generator/

Preview image:

![](https://ramjam97.github.io/qr-generator/qr-preview.jpg)

## Technologies Used

- React
- Vite
- TypeScript
- Tailwind CSS + DaisyUI
- `qr-code-styling` for QR rendering
- PrimeIcons

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.