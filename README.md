# Calculator Basics

<div align="center">

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Build Status](https://img.shields.io/github/workflow/status/aashravs/CalculatorBasics/Build%20and%20Test)
![Version](https://img.shields.io/npm/v/calculator-app)
![GitHub stars](https://img.shields.io/github/stars/aashravs/CalculatorBasics?style=social)
![Vercel Deployment](https://img.shields.io/badge/deployed%20on-Vercel-black?logo=vercel)

A professional-grade, modern calculator built with React, Vite, and Tailwind CSS.

**Live Demo**: [View on Vercel](#) *(coming soon)*

[Features](#-features) • [Installation](#-getting-started) • [Documentation](#-documentation) • [Contributing](#-contributing)

</div>

---

##  Demo

> **Note**: Add a demo GIF or screenshot to `public/demo.gif` to showcase your calculator

<div align="center">
  <img src="public/demo.gif" alt="Calculator Demo" width="600" />
</div>

---

## Features

### Basic Operations
-  **Arithmetic**: Addition, subtraction, multiplication, and division
-  **Advanced**: Percentage calculations, sign toggle (±), backspace functionality
-  **Enhanced Error Handling**: Clear, user-friendly messages for invalid operations
-  **Infinity Handling**: Proper handling of infinite results with context

### Scientific Functions (Scientific Mode)
-  **Trigonometric Functions**: sin, cos, tan (with DEG/RAD mode switching)
-  **Logarithmic Functions**: log (base 10), ln (natural logarithm)
-  **Power Functions**: x², x³, e^x
-  **Other Functions**: Square root (√), Reciprocal (1/x)
-  **Constants**: π (Pi), e (Euler's number)
-  **Brackets**: Full parentheses support for complex expressions
-  **Variables**: Six variables (a, b, c, x, y, z) for storing and reusing values

### Memory Functions (Scientific Mode)
-  **MC**: Clear memory
-  **MR**: Recall memory value
-  **M+**: Add current value to memory
-  **M-**: Subtract current value from memory
-  Memory persists during session

### Display Modes (Scientific Mode)
-  **Fixed Point (FIX)**: Standard decimal notation
-  **Scientific Notation (SCI)**: Exponential format
-  **Engineering Notation (ENG)**: Engineering format
-  Configurable precision (6 decimal places)

### User Interface
-  **Dark/Light Mode**: Complete theme switching with localStorage persistence
-  **Expression Visualization**: Full calculation display above results
-  **Modern Design**: Gradient backgrounds, custom shadows, smooth animations
-  **Responsive Layout**: Works on desktop, tablet, and mobile
-  **Custom Scrollbars**: Beautifully styled for better visibility
-  **History Modal**: Last 20 calculations with one-click reuse
-  **Professional Typography**: JetBrains Mono + Inter fonts

### Accessibility (A11y)
-  **ARIA Labels**: All interactive elements properly labeled
-  **Keyboard Navigation**: Full keyboard support
-  **Color Contrast**: WCAG AA compliant
-  **Screen Reader Support**: Semantic HTML and proper roles
-  **Focus Indicators**: Clear visual feedback

---

##  Getting Started

### Prerequisites

```bash
Node.js >= 16.x
npm or yarn
```

### Installation

```bash
# Clone the repository
git clone https://github.com/aashravs/CalculatorBasics.git
cd CalculatorBasics/calculator-app

# Install dependencies
npm install

# Start development server
npm run dev
```

The calculator will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

### Running Tests

```bash
npm test
npm run test:ui  # Interactive test UI
npm run coverage # Generate coverage report
```

---

##  Deployment

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/aashravs/CalculatorBasics)

**Or manually:**

1. Push your code to GitHub
2. Import repository to [Vercel](https://vercel.com)
3. Configure build settings:
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Deploy!

The `vercel.json` is already configured for optimal performance.

---

##  Documentation

- **[Usage Guide](docs/USAGE.md)**: Comprehensive usage instructions
- **[Roadmap](docs/ROADMAP.md)**: Planned features and enhancements
- **[Contributing](CONTRIBUTING.md)**: Guidelines for contributors
- **[Code of Conduct](CODE_OF_CONDUCT.md)**: Community standards

---

##  Keyboard Shortcuts

| Key | Function |
|-----|----------|
| `0-9` | Enter numbers |
| `+`, `-`, `*`, `/` | Operations |
| `Enter` or `=` | Calculate |
| `Escape` | All Clear |
| `Backspace` | Delete last digit |
| `.` | Decimal point |
| `(` `)` | Brackets (Scientific mode) |

---

##  Roadmap

See the [Roadmap](docs/ROADMAP.md) for planned features:

- [ ] Unit conversions (temperature, length, weight)
- [ ] Full PEMDAS/BODMAS implementation
- [ ] Additional constants and functions
- [ ] Advanced history features
- [ ] User authentication and cloud sync
- [ ] Mobile apps (iOS/Android)
- [ ] And much more...

---

##  Contributing

We welcome contributions! See our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add: amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please read our [Code of Conduct](CODE_OF_CONDUCT.md) before contributing.

---

##  Table of Contents

<details>
<summary>Click to expand</summary>

- [Features](#-features)
- [Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Deployment](#-deployment)
- [Documentation](#-documentation)
- [Keyboard Shortcuts](#️-keyboard-shortcuts)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [Tech Stack](#️-tech-stack)
- [Testing](#-testing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

</details>

---

##  Tech Stack

- **[React 18](https://react.dev)**: UI library with hooks
- **[Vite](https://vitejs.dev)**: Build tool and dev server
- **[Tailwind CSS](https://tailwindcss.com)**: Utility-first CSS
- **[Vitest](https://vitest.dev)**: Unit testing
- **[Vercel](https://vercel.com)**: Deployment platform

---

##  Testing

The project uses Vitest for testing. Test coverage includes:

- Basic arithmetic operations
- Scientific functions
- Memory operations
- User interactions
- Theme switching
- Error handling

Run tests:

```bash
npm test           # Run tests once
npm run test:ui    # Interactive test UI
npm run coverage   # Coverage report
```

---

##  License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

##  Acknowledgments

- [React](https://react.dev) team for the amazing framework
- [Vite](https://vitejs.dev) for blazing fast development
- [Tailwind CSS](https://tailwindcss.com) for beautiful styling
- [Vitest](https://vitest.dev) for excellent testing
- All [contributors](https://github.com/aashravs/CalculatorBasics/graphs/contributors)

---

##  Support

- 🐛 [Report Bug](https://github.com/aashravs/CalculatorBasics/issues)
- 💡 [Request Feature](https://github.com/aashravs/CalculatorBasics/issues)
- 💬 [Discussions](https://github.com/aashravs/CalculatorBasics/discussions)

---

<div align="center">

**Made with ❤️ by the Calculator Basics team**

Star this repo if you find it helpful!

</div>
