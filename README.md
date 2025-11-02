# Calculator App

A modern, medium-level calculator built with React, Vite, and Tailwind CSS, featuring a sleek design and comprehensive scientific functions. Ready for deployment on Vercel.

## Features

### Basic Operations
- **Arithmetic**: Addition, subtraction, multiplication, and division
- **Advanced**: Percentage calculations, sign toggle (±), backspace functionality
- **Error Handling**: Displays "Error" for invalid operations (e.g., division by zero, negative square root)
- **Infinity Handling**: Shows "Infinity" or "-Infinity" for infinite results with helpful messages

### Scientific Functions (Scientific Mode)
- **Trigonometric Functions**: sin, cos, tan (in degrees)
- **Logarithmic Functions**: log (base 10), ln (natural logarithm)
- **Power Functions**: x², x³, e^x
- **Other Functions**: Square root (√), Reciprocal (1/x)
- **Constants**: π (Pi), e (Euler's number)
- **Brackets**: Support for parentheses `(` and `)` for expression grouping
- **Variables**: Six variables (a, b, c, x, y, z) for storing and reusing values
  - Click a variable button to use its stored value
  - Click again while highlighted to store the current display value
  - Current values displayed under each variable

### User Interface
- **Modern Design**: Sleek gradient backgrounds, enhanced shadows, and refined styling
- **Responsive Layout**: Works seamlessly on desktop and mobile devices
- **History Modal**: 
  - Separate popup window for calculation history
  - Shows last 20 calculations (instead of just 5)
  - Click any history item to reuse its result
  - Only appears when history exists
- **Improved Display**:
  - Custom styled scrollbars for better visibility
  - Horizontal scrolling for long numbers
  - Error/infinity messages with helpful descriptions
  - Smooth animations and transitions
- **Professional Typography**: 
  - JetBrains Mono font for numbers (monospace, tabular)
  - Inter font for UI text

### Keyboard Support
- **Numbers**: `0-9`
- **Operations**: `+`, `-`, `*`, `/`
- **Equals**: `Enter` or `=`
- **Clear**: `Escape`
- **Backspace**: `Backspace`
- **Decimal**: `.`
- **Brackets** (Scientific Mode): `(`, `)`

## Getting Started

### Prerequisites
- Node.js (v16 or higher recommended)
- npm or yarn

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

The development server includes hot module replacement (HMR), so changes will reflect immediately in the browser.

### Build

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

Preview the production build locally before deployment.

## Deployment to Vercel

### Option 1: Via GitHub/GitLab/Bitbucket
1. Push your code to a Git repository (GitHub, GitLab, or Bitbucket)
2. Import your repository to Vercel
3. Vercel will automatically detect the Vite configuration
4. The `vercel.json` file is already configured for proper routing

### Option 2: Via Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts to deploy your calculator app.

## Usage Tips

### Basic Mode
- Use the calculator for standard arithmetic operations
- AC button clears everything
- ⌫ button removes the last entered digit
- ± button toggles between positive and negative

### Scientific Mode
1. Click the "Scientific" button to enable scientific functions
2. **Using Variables**:
   - Enter a number
   - Click a variable (a, b, c, x, y, z) to store it
   - Click the variable again to use its value
   - The current value is shown below each variable button
3. **Using Brackets**:
   - Click `(` or `)` buttons to add parentheses
   - Supports keyboard input: `(` and `)` keys
4. **Functions**:
   - Enter a value first
   - Click any scientific function button
   - Result appears in the display

### History
- History button appears when you have calculations
- Click to open a modal with your last 20 calculations
- Click any history item to reuse its result
- Close the modal by clicking outside or the × button

### Error Handling
- Division by zero shows "Error"
- Square root of negative number shows "Error"
- Logarithm of zero or negative number shows "Error"
- Operations that result in infinity show "Infinity" or "-Infinity"
- Click AC to clear error states

## Tech Stack

- **React 18**: Modern UI library for building interactive interfaces
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **JetBrains Mono**: Professional monospace font for numbers
- **Inter**: Modern sans-serif font for UI elements
- **Vercel**: Deployment platform with automatic CI/CD

## Project Structure

```
calculator-app/
├── src/
│   ├── components/
│   │   └── Calculator.jsx    # Main calculator component
│   ├── App.jsx               # Root app component
│   ├── main.jsx              # Application entry point
│   └── index.css             # Global styles with Tailwind
├── index.html                # HTML template
├── package.json              # Dependencies and scripts
├── vite.config.js            # Vite configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── vercel.json               # Vercel deployment config
└── README.md                 # This file
```

## Customization

### Colors
The calculator uses a slate color scheme. You can customize colors in:
- `src/components/Calculator.jsx` - Button and UI colors
- `src/index.css` - Global styles and scrollbar colors
- `tailwind.config.js` - Tailwind theme customization

### Fonts
Fonts are imported in `src/index.css`. Change them by:
1. Updating the Google Fonts import URL
2. Modifying the `font-family` properties in the CSS

## License

This project is open source and available for personal and commercial use.

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.
