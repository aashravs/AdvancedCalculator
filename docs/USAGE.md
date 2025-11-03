# Usage Guide

This comprehensive guide will help you make the most of the Calculator Basics application.

## Table of Contents

- [Basic Operations](#basic-operations)
- [Scientific Mode](#scientific-mode)
- [Memory Functions](#memory-functions)
- [Display Modes](#display-modes)
- [Variables](#variables)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Themes](#themes)
- [Accessibility](#accessibility)

## Basic Operations

### Standard Arithmetic

The calculator supports all basic mathematical operations:

- **Addition**: Click numbers, then `+`, then more numbers, then `=`
- **Subtraction**: Click numbers, then `−`, then more numbers, then `=`
- **Multiplication**: Click numbers, then `×`, then more numbers, then `=`
- **Division**: Click numbers, then `÷`, then more numbers, then `=`

**Example**: To calculate `15 + 27`:
1. Click `1`, `5`
2. Click `+`
3. Click `2`, `7`
4. Click `=`
5. Result: `42`

### Additional Functions

- **Percentage**: Enter a number, then click `%` to convert to percentage
  - Example: `50` → `%` → `0.5`
- **Toggle Sign**: Click `±` to switch between positive and negative
  - Example: `5` → `±` → `-5`
- **Decimal Point**: Click `.` to add decimal places
- **Backspace**: Click `⌫` to delete the last entered digit
- **All Clear**: Click `AC` to reset everything

## Scientific Mode

Click the **Sci** button to enable scientific calculator features.

### Trigonometric Functions

All trigonometric functions respect the current angle mode (DEG/RAD):

- **sin**: Calculates sine of the current value
- **cos**: Calculates cosine of the current value
- **tan**: Calculates tangent of the current value

**Example**: Calculate sin(30°)
1. Enable Scientific mode
2. Enter `30`
3. Click `sin`
4. Result: `0.5`

### Logarithmic Functions

- **log**: Calculates base-10 logarithm
- **ln**: Calculates natural logarithm (base e)

**Example**: Calculate log(100)
1. Enter `100`
2. Click `log`
3. Result: `2`

**Note**: Logarithm of zero or negative numbers will show an error.

### Power Functions

- **x²**: Squares the current number
- **x³**: Cubes the current number
- **e^x**: Calculates e raised to the power of the current number

**Example**: Calculate 5²
1. Enter `5`
2. Click `x²`
3. Result: `25`

### Other Functions

- **√**: Square root of the current number
- **1/x**: Reciprocal of the current number
- **π**: Inserts the value of Pi (π ≈ 3.141592...)
- **e**: Inserts Euler's number (e ≈ 2.718281...)

## Memory Functions

Memory functions allow you to store and manipulate a persistent value.

### Using Memory

1. **MC (Memory Clear)**: Clears the stored memory value
2. **MR (Memory Recall)**: Displays the current memory value
3. **M+ (Memory Add)**: Adds the current displayed value to memory
4. **M-** (Memory Subtract)**: Subtracts the current displayed value from memory

**Example Workflow**:
1. Calculate `5 + 3 = 8`
2. Click `M+` to store 8 in memory
3. Calculate `2 × 4 = 8`
4. Click `M+` to add 8 to memory (total: 16)
5. Calculate `10 - 6 = 4`
6. Click `M-` to subtract 4 from memory (total: 12)
7. Click `MR` to recall and display 12

## Display Modes

In Scientific mode, you can choose how results are displayed:

### Fixed Point (FIX)

Standard decimal notation with configurable precision.

**Example**: `123.456789`

### Scientific Notation (SCI)

Standard exponential format: `a × 10^n`

**Example**: `1.23456789e+02` (represents 123.456789)

### Engineering Notation (ENG)

Exponential format where the exponent is a multiple of 3.

**Example**: `123.456789e+00` (most readable for large/small numbers)

### Switching Display Modes

Click the **FIX/SCI/ENG** button in Scientific mode to cycle through formats.

## Angle Modes

Scientific mode supports two angle measurement units:

### Degrees (DEG)

- Full circle: 360°
- Most common for everyday use
- Default mode

### Radians (RAD)

- Full circle: 2π
- Standard in higher mathematics
- Preferred in calculus and physics

### Switching Angle Modes

Click the **DEG/RAD** button to toggle between modes.

**Important**: This setting affects all trigonometric functions (sin, cos, tan).

## Variables

Scientific mode provides six variables for storing intermediate results:

### Using Variables

**Variables**: `a`, `b`, `c`, `x`, `y`, `z`

**To Store a Value**:
1. Perform a calculation or enter a number
2. Click a variable button once
3. The value is now stored in that variable

**To Use a Stored Value**:
1. Click a variable button to use its stored value
2. The value appears in the display
3. Current value is shown below each variable button

**Example**:
1. Calculate `5 × 2 = 10`
2. Click variable `a` (stores 10 in `a`)
3. Calculate `3 + 7 = 10`
4. Click `+`, then variable `a`, then `=`
5. Result: `20`

## Brackets

Scientific mode supports parentheses for grouping expressions:

### Using Brackets

- Click `(` to open a bracket
- Click `)` to close a bracket
- Keyboard: `(` and `)` keys also work

**Note**: Bracket evaluation respects standard order of operations.

## Keyboard Shortcuts

The calculator is fully keyboard-accessible:

### Number Entry
- `0-9`: Enter numbers
- `.`: Decimal point

### Operations
- `+`: Addition
- `-`: Subtraction
- `*`: Multiplication
- `/`: Division
- `Enter` or `=`: Equals
- `Escape`: All Clear
- `Backspace`: Delete last digit

### Scientific Mode
- `(`: Open bracket
- `)`: Close bracket

### Tips
- Use the numeric keypad for faster number entry
- Press `Escape` anytime to start over
- `Backspace` works like a normal calculator

## Themes

### Dark Mode

Modern slate color scheme with gradients:
- Perfect for low-light environments
- Reduced eye strain
- Elegant appearance

### Light Mode

Clean white/blue color scheme:
- Bright and clear
- Easy to read in well-lit areas
- Professional appearance

### Switching Themes

Click the **☀️/🌙** button in the header to toggle themes.

Your theme preference is automatically saved and will persist across sessions.

## Accessibility

### Screen Readers

The calculator is fully accessible with screen readers:
- All buttons have descriptive aria-labels
- Keyboard navigation is supported
- Results are announced

### Keyboard Navigation

- Tab through all buttons
- Enter or Space to activate
- All functions are keyboard-accessible

### Visual Accessibility

- High contrast colors in both themes
- Clear button labels
- Large, readable display
- Color is not the only indicator

## Tips and Tricks

### Efficient Workflow

1. Use memory for multi-step calculations
2. Switch to scientific mode for complex math
3. Use variables to store frequently used values
4. Take advantage of keyboard shortcuts
5. Review calculation history when needed

### Common Patterns

**Compound Interest**:
```
Principal × (1 + Rate)^Years
Store rate in a variable, reuse for different principals
```

**Unit Conversions**:
```
Use memory to store conversion factors
Store result of "from" unit, multiply by "to" unit factor
```

**Statistical Calculations**:
```
Use variables to store data points
Use memory to accumulate sums
```

## Troubleshooting

### Error Messages

**"Error"**: Invalid operation attempted
- Division by zero
- Square root of negative number
- Logarithm of non-positive number

**"Infinity"**: Result is infinite
- Number too large
- Division by very small number

**Solution**: Click `AC` to clear and start over

### Common Issues

**Display shows 0**: Calculator has been reset
- Solution: Enter your calculation again

**Wrong angle mode**: Switched between DEG and RAD
- Solution: Click DEG/RAD button to correct mode
- Look for DEG or RAD indicator

**Memory not working**: Not in Scientific mode
- Solution: Click Sci button to enable scientific features

## Advanced Features

### Calculation History

Click the **History** button to view your last 20 calculations:
- See full expressions and results
- Click any item to reuse its result
- Helpful for reviewing work

### Expression Visualization

The calculator shows the full expression above the result:
- See what you're calculating as you type
- Verify your input before pressing equals
- Helps catch mistakes early

## Need Help?

- Check the [README](../README.md) for general information
- Visit [GitHub Issues](https://github.com/aashravs/CalculatorBasics/issues) for bug reports
- Review [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) for community guidelines

