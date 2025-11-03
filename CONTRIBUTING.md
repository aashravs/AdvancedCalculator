# Contributing to Calculator Basics

Thank you for your interest in contributing to Calculator Basics! This document provides guidelines and instructions for contributing to this project.

## Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please read [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) before contributing.

## How to Contribute

### Reporting Issues

Before creating an issue, please:
1. Check if the issue has already been reported in the [Issues](https://github.com/aashravs/CalculatorBasics/issues) section
2. Search through closed issues to see if it was already addressed
3. Use a clear and descriptive title
4. Provide detailed steps to reproduce the issue
5. Include your environment details (OS, browser, Node.js version)

### Suggesting Features

We welcome feature suggestions! Please:
1. Check if the feature has already been suggested
2. Use a clear and descriptive title
3. Provide a detailed explanation of the feature and its use case
4. Explain why this feature would be useful to others

### Pull Requests

#### Getting Started

1. Fork the repository
2. Clone your fork locally:
   ```bash
   git clone https://github.com/your-username/CalculatorBasics.git
   cd CalculatorBasics/calculator-app
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

#### Making Changes

1. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes and test them thoroughly
3. Run the build to ensure everything compiles:
   ```bash
   npm run build
   ```
4. Follow the existing code style (we use Prettier)
5. Update documentation if necessary

#### Submitting Changes

1. Commit your changes with clear messages:
   ```bash
   git commit -m "Add: feature description"
   ```
2. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```
3. Open a Pull Request on GitHub
4. Fill out the PR template completely
5. Link any related issues

### Commit Message Guidelines

We follow conventional commit messages:
- `Add:` for new features
- `Fix:` for bug fixes
- `Update:` for changes to existing features
- `Docs:` for documentation changes
- `Style:` for formatting changes
- `Refactor:` for code refactoring
- `Test:` for adding or updating tests

Example:
```
Add: memory function buttons in scientific mode
```

## Development Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
npm install
```

### Development Server

```bash
npm run dev
```

The calculator will be available at `http://localhost:5173`

### Building for Production

```bash
npm run build
```

### Running Tests

```bash
npm test
```

## Coding Standards

### Code Style

- We use **Prettier** for code formatting
- We use **ESLint** for code quality (if configured)
- Follow the existing code structure and patterns
- Use meaningful variable and function names
- Add comments for complex logic

### React Best Practices

- Use functional components with hooks
- Keep components small and focused
- Extract reusable logic into custom hooks
- Follow React naming conventions

### CSS/Styling

- Use Tailwind CSS utility classes
- Maintain consistent spacing and sizing
- Ensure responsive design
- Follow the existing theme structure

### Accessibility

- Add ARIA labels to interactive elements
- Ensure keyboard navigation works
- Maintain sufficient color contrast
- Test with screen readers when possible

## Testing

- Write tests for new features
- Ensure all existing tests pass
- Aim for meaningful test coverage
- Test both positive and negative cases

## Documentation

- Update the README if adding new features
- Add usage examples to `docs/USAGE.md` if needed
- Update the roadmap in `docs/ROADMAP.md` for major changes

## Review Process

1. All PRs will be reviewed by maintainers
2. Address any feedback promptly
3. Be open to suggestions and improvements
4. Engage in constructive discussions

## Questions?

If you have questions about contributing, feel free to:
- Open an issue with the `question` label
- Contact the maintainers

Thank you for contributing to Calculator Basics! 🎉

