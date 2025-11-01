# Calculator App

A medium-level calculator built with React, Vite, and Tailwind CSS, ready for deployment on Vercel.

## Features

- **Basic Operations**: Addition, subtraction, multiplication, and division
- **Scientific Functions**: 
  - Trigonometric functions (sin, cos, tan)
  - Logarithmic functions (log, ln)
  - Power functions (x², x³, e^x)
  - Square root (√)
  - Reciprocal (1/x)
  - Constants (π, e)
- **Additional Features**:
  - Percentage calculations
  - Sign toggle (±)
  - Backspace functionality
  - Calculation history (last 5 operations)
  - Keyboard support
  - Toggle between Basic and Scientific modes

## Getting Started

### Installation

```bash
cd calculator-app
npm install
```

### Development

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Deployment to Vercel

1. Push your code to GitHub, GitLab, or Bitbucket
2. Import your repository to Vercel
3. Vercel will automatically detect the Vite configuration
4. The `vercel.json` file is already configured for proper routing

Or deploy via Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Keyboard Shortcuts

- Numbers: `0-9`
- Operations: `+`, `-`, `*`, `/`
- Equals: `Enter` or `=`
- Clear: `Escape`
- Backspace: `Backspace`
- Decimal: `.`

## Tech Stack

- **React 18**: UI library
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling
- **Vercel**: Deployment platform

