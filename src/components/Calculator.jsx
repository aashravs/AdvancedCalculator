import { useState, useEffect, useRef } from 'react'

function Calculator() {
  // Display and calculation states
  const [display, setDisplay] = useState('0')
  const [expression, setExpression] = useState('')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)
  
  // UI states
  const [history, setHistory] = useState([])
  const [isScientific, setIsScientific] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [theme, setTheme] = useState('dark') // 'dark' or 'light'
  
  // Scientific mode states
  const [variables, setVariables] = useState({ a: 0, b: 0, c: 0, x: 0, y: 0, z: 0 })
  const [currentVariable, setCurrentVariable] = useState(null)
  const [angleMode, setAngleMode] = useState('deg') // 'deg' or 'rad'
  const [displayMode, setDisplayMode] = useState('fix') // 'fix', 'sci', 'eng'
  const [displayPrecision, setDisplayPrecision] = useState(6)
  
  // Memory states
  const [memory, setMemory] = useState(0)
  
  const displayRef = useRef(null)

  // Theme configuration
  const themes = {
    dark: {
      bg: 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950',
      calc: 'from-slate-800 via-slate-800 to-slate-900',
      display: 'from-slate-950 to-slate-900',
      btnNumber: 'bg-slate-900/90 hover:bg-slate-800 text-slate-100',
      btnOperator: 'bg-gradient-to-br from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white shadow-md shadow-amber-900/30',
      btnFunction: 'bg-slate-700/80 hover:bg-slate-600 text-slate-200',
      btnEquals: 'bg-gradient-to-br from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-md shadow-blue-900/30',
      textPrimary: 'text-slate-100',
      textSecondary: 'text-slate-300',
      textMuted: 'text-slate-500',
      modal: 'from-slate-900 to-slate-800',
      border: 'border-slate-600/30',
      shadow: 'shadow-2xl'
    },
    light: {
      bg: 'bg-gradient-to-br from-blue-50 via-white to-cyan-50',
      calc: 'from-gray-100 via-gray-50 to-white',
      display: 'from-gray-100 to-white',
      btnNumber: 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200',
      btnOperator: 'bg-gradient-to-br from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-md',
      btnFunction: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
      btnEquals: 'bg-gradient-to-br from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white shadow-md',
      textPrimary: 'text-gray-900',
      textSecondary: 'text-gray-700',
      textMuted: 'text-gray-500',
      modal: 'from-white to-gray-50',
      border: 'border-gray-300',
      shadow: 'shadow-xl'
    }
  }

  const currentTheme = themes[theme]

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handleInput(e.key)
      } else if (e.key === '.') {
        handleDecimal()
      } else if (e.key === '+' || e.key === '-') {
        handleOperation(e.key)
      } else if (e.key === '*') {
        handleOperation('*')
      } else if (e.key === '/') {
        handleOperation('/')
      } else if (e.key === 'Enter' || e.key === '=') {
        handleEquals()
      } else if (e.key === 'Escape') {
        handleClear()
      } else if (e.key === 'Backspace') {
        handleBackspace()
      } else if (e.key === '(' && isScientific) {
        handleBracket('(')
      } else if (e.key === ')' && isScientific) {
        handleBracket(')')
      } else if ((e.key === 'm' || e.key === 'M') && isScientific) {
        // Memory functions
        if (e.shiftKey) {
          handleMemory('MR')
        }
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [display, previousValue, operation, waitingForNewValue, isScientific])

  // Save theme preference
  useEffect(() => {
    localStorage.setItem('calculator-theme', theme)
  }, [theme])

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('calculator-theme')
    if (savedTheme && (savedTheme === 'dark' || savedTheme === 'light')) {
      setTheme(savedTheme)
    }
  }, [])

  const formatDisplayValue = (value) => {
    if (value === 'Error' || value === 'Infinity' || value === '-Infinity' || isNaN(value)) {
      return String(value)
    }
    const num = parseFloat(value)
    if (!isFinite(num)) return 'Infinity'
    
    // Format based on display mode
    switch (displayMode) {
      case 'sci':
        return num.toExponential(displayPrecision)
      case 'eng':
        return formatEngineering(num)
      case 'fix':
      default:
        return formatNumber(num)
    }
  }

  const formatNumber = (num) => {
    // Remove trailing zeros
    const str = num.toFixed(displayPrecision)
    return parseFloat(str).toString()
  }

  const formatEngineering = (num) => {
    const exponent = Math.floor(Math.log10(Math.abs(num)) / 3) * 3
    const base = num / Math.pow(10, exponent)
    return `${base.toFixed(displayPrecision)}e${exponent}`
  }

  const checkError = (value) => {
    if (value === null || value === undefined || isNaN(value)) {
      return 'Error'
    }
    if (!isFinite(value)) {
      return value > 0 ? 'Infinity' : '-Infinity'
    }
    return value
  }

  const handleInput = (num) => {
    if (display === 'Error' || display === 'Infinity' || display === '-Infinity') {
      setDisplay('0')
      setExpression('')
      setWaitingForNewValue(false)
    }
    if (waitingForNewValue) {
      setDisplay(String(num))
      setExpression(String(num))
      setWaitingForNewValue(false)
    } else {
      const newDisplay = display === '0' ? String(num) : display + num
      setDisplay(newDisplay)
      setExpression(expression === '' ? String(num) : expression + num)
    }
    setCurrentVariable(null)
  }

  const handleDecimal = () => {
    if (display === 'Error' || display === 'Infinity' || display === '-Infinity') {
      setDisplay('0.')
      setExpression('0.')
      setWaitingForNewValue(false)
      return
    }
    if (waitingForNewValue) {
      setDisplay('0.')
      setExpression('0.')
      setWaitingForNewValue(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
      setExpression(expression + '.')
    }
  }

  const handleClear = () => {
    setDisplay('0')
    setExpression('')
    setPreviousValue(null)
    setOperation(null)
    setWaitingForNewValue(false)
    setCurrentVariable(null)
  }

  const handleBackspace = () => {
    if (display === 'Error' || display === 'Infinity' || display === '-Infinity') {
      handleClear()
      return
    }
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
      setExpression(expression.slice(0, -1))
    } else {
      setDisplay('0')
      setExpression('')
    }
  }

  const handleOperation = (nextOperation) => {
    if (display === 'Error' || display === 'Infinity' || display === '-Infinity') {
      return
    }
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
      setExpression(`${inputValue} ${nextOperation} `)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)
      const checkedValue = checkError(newValue)
      
      if (checkedValue === 'Error' || checkedValue === 'Infinity' || checkedValue === '-Infinity') {
        setDisplay(String(checkedValue))
        setExpression('')
        setPreviousValue(null)
        setOperation(null)
        return
      }

      setDisplay(String(newValue))
      setPreviousValue(newValue)
      setExpression(`${newValue} ${nextOperation} `)
    }

    setWaitingForNewValue(true)
    setOperation(nextOperation)
  }

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue
      case '-':
        return firstValue - secondValue
      case '*':
        return firstValue * secondValue
      case '/':
        if (secondValue === 0) {
          return 'Error'
        }
        return firstValue / secondValue
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    if (display === 'Error' || display === 'Infinity' || display === '-Infinity') {
      return
    }
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      const checkedValue = checkError(newValue)
      const fullExpression = `${previousValue} ${operation} ${inputValue} = ${formatDisplayValue(checkedValue)}`
      
      setDisplay(formatDisplayValue(checkedValue))
      if (checkedValue !== 'Error' && checkedValue !== 'Infinity' && checkedValue !== '-Infinity') {
        setHistory([...history, fullExpression].slice(-20))
      }
      setExpression(fullExpression)
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const handleMemory = (action) => {
    const value = parseFloat(display)
    if (isNaN(value) || display === 'Error' || display === 'Infinity' || display === '-Infinity') {
      return
    }

    switch (action) {
      case 'MC':
        setMemory(0)
        break
      case 'MR':
        setDisplay(formatNumber(memory))
        setExpression(memory.toString())
        setWaitingForNewValue(true)
        break
      case 'M+':
        setMemory(memory + value)
        break
      case 'M-':
        setMemory(memory - value)
        break
    }
  }

  const handleScientific = (func) => {
    if (display === 'Error' || display === 'Infinity' || display === '-Infinity') {
      return
    }
    const value = parseFloat(display)
    let result = 0
    let expression = ''

    // Convert angle based on mode
    const angle = angleMode === 'deg' ? value * (Math.PI / 180) : value

    switch (func) {
      case 'sin':
        result = Math.sin(angle)
        expression = `sin(${value}${angleMode === 'deg' ? '°' : ''}) = ${formatDisplayValue(result)}`
        break
      case 'cos':
        result = Math.cos(angle)
        expression = `cos(${value}${angleMode === 'deg' ? '°' : ''}) = ${formatDisplayValue(result)}`
        break
      case 'tan':
        if (angleMode === 'deg' && Math.abs(value % 90) < 0.0001 && Math.abs(Math.floor((value + 45) / 90) % 2) === 1) {
          result = Infinity
          expression = `tan(${value}°) = Infinity`
        } else {
          result = Math.tan(angle)
          expression = `tan(${value}${angleMode === 'deg' ? '°' : ''}) = ${formatDisplayValue(result)}`
        }
        break
      case 'log':
        if (value <= 0) {
          result = NaN
          expression = `log(${value}) = Error`
        } else {
          result = Math.log10(value)
          expression = `log(${value}) = ${formatDisplayValue(result)}`
        }
        break
      case 'ln':
        if (value <= 0) {
          result = NaN
          expression = `ln(${value}) = Error`
        } else {
          result = Math.log(value)
          expression = `ln(${value}) = ${formatDisplayValue(result)}`
        }
        break
      case 'sqrt':
        if (value < 0) {
          result = NaN
          expression = `√(${value}) = Error`
        } else {
          result = Math.sqrt(value)
          expression = `√(${value}) = ${formatDisplayValue(result)}`
        }
        break
      case 'pow2':
        result = value * value
        expression = `${value}² = ${formatDisplayValue(result)}`
        break
      case 'pow3':
        result = value * value * value
        expression = `${value}³ = ${formatDisplayValue(result)}`
        break
      case 'exp':
        result = Math.exp(value)
        if (!isFinite(result)) {
          expression = `e^${value} = Infinity`
        } else {
          expression = `e^${value} = ${formatDisplayValue(result)}`
        }
        break
      case '1/x':
        if (value === 0) {
          result = Infinity
          expression = `1/${value} = Infinity`
        } else {
          result = 1 / value
          expression = `1/${value} = ${formatDisplayValue(result)}`
        }
        break
      case 'pi':
        result = Math.PI
        expression = `π = ${Math.PI}`
        break
      case 'e':
        result = Math.E
        expression = `e = ${Math.E}`
        break
      default:
        return
    }

    const checkedValue = checkError(result)
    setDisplay(formatDisplayValue(checkedValue))
    if (checkedValue !== 'Error' && checkedValue !== 'Infinity' && checkedValue !== '-Infinity') {
      setHistory([...history, expression].slice(-20))
    }
    setExpression(expression)
    setWaitingForNewValue(true)
  }

  const handleVariable = (varName) => {
    if (currentVariable === varName) {
      const value = parseFloat(display)
      if (!isNaN(value) && display !== 'Error' && display !== 'Infinity' && display !== '-Infinity') {
        setVariables({ ...variables, [varName]: value })
        setCurrentVariable(null)
      }
    } else {
      setDisplay(formatNumber(variables[varName]))
      setExpression(variables[varName].toString())
      setCurrentVariable(varName)
      setWaitingForNewValue(true)
    }
  }

  const handleBracket = (bracket) => {
    if (waitingForNewValue || display === '0' || display === 'Error' || display === 'Infinity' || display === '-Infinity') {
      if (bracket === '(') {
        setDisplay('(')
        setExpression('(')
        setWaitingForNewValue(false)
      }
    } else {
      setDisplay(display + bracket)
      setExpression(expression + bracket)
    }
  }

  const handlePercentage = () => {
    if (display === 'Error' || display === 'Infinity' || display === '-Infinity') {
      return
    }
    const value = parseFloat(display)
    setDisplay(formatNumber(value / 100))
    setExpression((value / 100).toString())
  }

  const handleToggleSign = () => {
    if (display === 'Error' || display === 'Infinity' || display === '-Infinity') {
      return
    }
    setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display)
    setExpression(expression.charAt(0) === '-' ? expression.slice(1) : '-' + expression)
  }

  const Button = ({ onClick, className = '', children, ariaLabel, ...props }) => (
    <button
      onClick={onClick}
      className={`px-4 py-3 text-base font-medium rounded-2xl transition-all duration-150 active:scale-[0.96] hover:brightness-110 shadow-md hover:shadow-lg ${className}`}
      aria-label={ariaLabel || children}
      {...props}
    >
      {children}
    </button>
  )

  const isError = display === 'Error' || display === 'Infinity' || display === '-Infinity'

  return (
    <div className={`min-h-screen ${currentTheme.bg} flex items-center justify-center p-4 transition-colors duration-300`}>
      <div className="w-full max-w-md mx-auto relative">
        {/* History Modal */}
        {showHistory && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowHistory(false)}
          >
            <div 
              className={`bg-gradient-to-br ${currentTheme.modal} rounded-3xl ${currentTheme.shadow} p-6 w-full max-w-sm border ${currentTheme.border}`}
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Calculation History"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className={`text-xl font-semibold ${currentTheme.textPrimary}`}>History</h2>
                <button
                  onClick={() => setShowHistory(false)}
                  className={`${currentTheme.textSecondary} hover:${currentTheme.textPrimary} transition-colors text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-opacity-20`}
                  aria-label="Close history"
                >
                  ×
                </button>
              </div>
              {history.length === 0 ? (
                <div className={`${currentTheme.textSecondary} text-sm text-center py-8`}>
                  No calculations yet
                </div>
              ) : (
                <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                  {history.slice().reverse().map((item, index) => (
                    <div 
                      key={index} 
                      className={`text-sm ${currentTheme.textSecondary} font-number py-2 px-3 rounded-xl bg-opacity-30 border ${currentTheme.border} hover:bg-opacity-50 transition-colors cursor-pointer`}
                      onClick={() => {
                        const match = item.match(/=\s*(.+)$/)
                        if (match && match[1] !== 'Error' && match[1] !== 'Infinity' && match[1] !== '-Infinity') {
                          setDisplay(match[1])
                          setShowHistory(false)
                        }
                      }}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className={`bg-gradient-to-br ${currentTheme.calc} rounded-3xl ${currentTheme.shadow} p-6 space-y-4 border ${currentTheme.border} backdrop-blur-xl`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <h1 className={`text-lg font-semibold ${currentTheme.textPrimary} tracking-tight`}>Calculator</h1>
            <div className="flex gap-2">
              {history.length > 0 && (
                <button
                  onClick={() => setShowHistory(true)}
                  className={`px-3 py-1.5 text-xs font-medium ${currentTheme.textSecondary} hover:${currentTheme.textPrimary} bg-opacity-80 hover:bg-opacity-100 rounded-xl transition-all shadow-md hover:shadow-lg`}
                  aria-label="View calculation history"
                >
                  History
                </button>
              )}
              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`px-3 py-1.5 text-xs font-medium ${currentTheme.textSecondary} hover:${currentTheme.textPrimary} bg-opacity-80 hover:bg-opacity-100 rounded-xl transition-all shadow-md hover:shadow-lg`}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? '☀️' : '🌙'}
              </button>
              <button
                onClick={() => setIsScientific(!isScientific)}
                className={`px-3 py-1.5 text-xs font-medium ${currentTheme.textSecondary} hover:${currentTheme.textPrimary} bg-opacity-80 hover:bg-opacity-100 rounded-xl transition-all shadow-md hover:shadow-lg`}
                aria-label={`Switch to ${isScientific ? 'basic' : 'scientific'} mode`}
              >
                {isScientific ? 'Basic' : 'Sci'}
              </button>
            </div>
          </div>

          {/* Display */}
          <div className={`bg-gradient-to-br ${currentTheme.display} rounded-2xl p-5 mb-4 border-2 ${currentTheme.border} shadow-inner`}>
            {expression && expression !== display && (
              <div className={`text-right ${currentTheme.textMuted} text-xs h-6 overflow-x-auto mb-2 custom-scrollbar-horizontal`}>
                {expression}
              </div>
            )}
            <div 
              ref={displayRef}
              role="region"
              aria-label="Display"
              className={`text-right ${currentTheme.textPrimary} text-5xl font-number font-light overflow-x-auto custom-scrollbar-horizontal min-h-[72px] flex items-center justify-end ${
                isError ? 'text-red-500' : ''
              }`}
            >
              {display}
            </div>
            {isError && (
              <div className={`text-right text-red-500 opacity-70 text-xs mt-1`}>
                {display === 'Error' ? 'Invalid operation' : 'Result is infinite'}
              </div>
            )}
          </div>

          {/* Display Mode Controls (Scientific) */}
          {isScientific && (
            <div className="bg-opacity-50 rounded-xl p-3 mb-4 border border-opacity-30 flex gap-2">
              <button
                onClick={() => setAngleMode(angleMode === 'deg' ? 'rad' : 'deg')}
                className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all ${
                  angleMode === 'deg' 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : `${currentTheme.textSecondary} bg-opacity-30 border ${currentTheme.border}`
                }`}
                aria-label={`Angle mode: ${angleMode === 'deg' ? 'degrees' : 'radians'}`}
              >
                {angleMode === 'deg' ? 'DEG' : 'RAD'}
              </button>
              <button
                onClick={() => setDisplayMode(displayMode === 'fix' ? 'sci' : displayMode === 'sci' ? 'eng' : 'fix')}
                className={`flex-1 py-2 text-xs font-medium rounded-lg transition-all border ${
                  displayMode === 'fix'
                    ? 'bg-green-600 text-white shadow-md border-transparent'
                    : displayMode === 'sci'
                    ? 'bg-purple-600 text-white shadow-md border-transparent'
                    : `bg-orange-600 text-white shadow-md border-transparent`
                }`}
                aria-label={`Display mode: ${displayMode === 'fix' ? 'fixed' : displayMode === 'sci' ? 'scientific' : 'engineering'}`}
              >
                {displayMode.toUpperCase()}
              </button>
            </div>
          )}

          {/* Variable Display (Scientific Mode) */}
          {isScientific && (
            <div className="bg-opacity-50 rounded-xl p-3 mb-4 border border-opacity-30">
              <div className={`text-xs ${currentTheme.textSecondary} mb-2`}>Variables</div>
              <div className="grid grid-cols-6 gap-1.5">
                {['a', 'b', 'c', 'x', 'y', 'z'].map((varName) => (
                  <div key={varName} className="text-center">
                    <button
                      onClick={() => handleVariable(varName)}
                      className={`w-full py-1.5 text-xs font-number rounded-lg transition-all ${
                        currentVariable === varName
                          ? 'bg-blue-600 text-white shadow-lg'
                          : `${currentTheme.textSecondary} bg-opacity-30 border ${currentTheme.border}`
                      }`}
                      aria-label={`Variable ${varName}`}
                    >
                      {varName}
                    </button>
                    <div className={`text-[10px] ${currentTheme.textMuted} mt-1 font-number`}>
                      {variables[varName]}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Memory Functions (Scientific Mode) */}
          {isScientific && (
            <div className="grid grid-cols-4 gap-2 mb-4">
              <Button onClick={() => handleMemory('MC')} className="bg-red-600/80 hover:bg-red-500 text-white text-xs shadow-md" ariaLabel="Memory Clear">
                MC
              </Button>
              <Button onClick={() => handleMemory('MR')} className="bg-red-600/80 hover:bg-red-500 text-white text-xs shadow-md" ariaLabel="Memory Recall">
                MR
              </Button>
              <Button onClick={() => handleMemory('M+')} className="bg-red-600/80 hover:bg-red-500 text-white text-xs shadow-md" ariaLabel="Memory Add">
                M+
              </Button>
              <Button onClick={() => handleMemory('M-')} className="bg-red-600/80 hover:bg-red-500 text-white text-xs shadow-md" ariaLabel="Memory Subtract">
                M-
              </Button>
            </div>
          )}

          {/* Scientific Functions */}
          {isScientific && (
            <div className="grid grid-cols-4 gap-2 mb-4">
              <Button onClick={() => handleScientific('sin')} className={`${currentTheme.btnFunction} text-xs shadow-md`}>
                sin
              </Button>
              <Button onClick={() => handleScientific('cos')} className={`${currentTheme.btnFunction} text-xs shadow-md`}>
                cos
              </Button>
              <Button onClick={() => handleScientific('tan')} className={`${currentTheme.btnFunction} text-xs shadow-md`}>
                tan
              </Button>
              <Button onClick={() => handleScientific('log')} className={`${currentTheme.btnFunction} text-xs shadow-md`}>
                log
              </Button>
              <Button onClick={() => handleScientific('ln')} className={`${currentTheme.btnFunction} text-xs shadow-md`}>
                ln
              </Button>
              <Button onClick={() => handleScientific('sqrt')} className={`${currentTheme.btnFunction} text-xs shadow-md`}>
                √
              </Button>
              <Button onClick={() => handleScientific('pow2')} className={`${currentTheme.btnFunction} text-xs shadow-md`}>
                x²
              </Button>
              <Button onClick={() => handleScientific('pow3')} className={`${currentTheme.btnFunction} text-xs shadow-md`}>
                x³
              </Button>
              <Button onClick={() => handleScientific('exp')} className={`${currentTheme.btnFunction} text-xs shadow-md`}>
                e^x
              </Button>
              <Button onClick={() => handleScientific('1/x')} className={`${currentTheme.btnFunction} text-xs shadow-md`}>
                1/x
              </Button>
              <Button onClick={() => handleScientific('pi')} className={`${currentTheme.btnFunction} text-xs shadow-md`}>
                π
              </Button>
              <Button onClick={() => handleScientific('e')} className={`${currentTheme.btnFunction} text-xs shadow-md`}>
                e
              </Button>
              <Button onClick={() => handleBracket('(')} className="bg-indigo-600/80 hover:bg-indigo-500 text-white text-xs shadow-md">
                (
              </Button>
              <Button onClick={() => handleBracket(')')} className="bg-indigo-600/80 hover:bg-indigo-500 text-white text-xs shadow-md">
                )
              </Button>
            </div>
          )}

          {/* Main Keypad */}
          <div className="grid grid-cols-4 gap-2.5">
            {/* Row 1 */}
            <Button onClick={handleClear} className={`${currentTheme.btnFunction} col-span-2 shadow-md`} ariaLabel="All Clear">
              AC
            </Button>
            <Button onClick={handleBackspace} className={`${currentTheme.btnFunction} shadow-md`} ariaLabel="Backspace">
              ⌫
            </Button>
            <Button onClick={() => handleOperation('/')} className={`${currentTheme.btnOperator} shadow-md`}>
              ÷
            </Button>

            {/* Row 2 */}
            <Button onClick={() => handleInput(7)} className={`${currentTheme.btnNumber} font-number shadow-md`}>
              7
            </Button>
            <Button onClick={() => handleInput(8)} className={`${currentTheme.btnNumber} font-number shadow-md`}>
              8
            </Button>
            <Button onClick={() => handleInput(9)} className={`${currentTheme.btnNumber} font-number shadow-md`}>
              9
            </Button>
            <Button onClick={() => handleOperation('*')} className={`${currentTheme.btnOperator} shadow-md`}>
              ×
            </Button>

            {/* Row 3 */}
            <Button onClick={() => handleInput(4)} className={`${currentTheme.btnNumber} font-number shadow-md`}>
              4
            </Button>
            <Button onClick={() => handleInput(5)} className={`${currentTheme.btnNumber} font-number shadow-md`}>
              5
            </Button>
            <Button onClick={() => handleInput(6)} className={`${currentTheme.btnNumber} font-number shadow-md`}>
              6
            </Button>
            <Button onClick={() => handleOperation('-')} className={`${currentTheme.btnOperator} shadow-md`}>
              −
            </Button>

            {/* Row 4 */}
            <Button onClick={() => handleInput(1)} className={`${currentTheme.btnNumber} font-number shadow-md`}>
              1
            </Button>
            <Button onClick={() => handleInput(2)} className={`${currentTheme.btnNumber} font-number shadow-md`}>
              2
            </Button>
            <Button onClick={() => handleInput(3)} className={`${currentTheme.btnNumber} font-number shadow-md`}>
              3
            </Button>
            <Button onClick={() => handleOperation('+')} className={`${currentTheme.btnOperator} shadow-md`}>
              +
            </Button>

            {/* Row 5 */}
            <Button onClick={handleToggleSign} className={`${currentTheme.btnFunction} shadow-md`} ariaLabel="Toggle Sign">
              ±
            </Button>
            <Button onClick={() => handleInput(0)} className={`${currentTheme.btnNumber} font-number shadow-md`}>
              0
            </Button>
            <Button onClick={handleDecimal} className={`${currentTheme.btnNumber} font-number shadow-md`} ariaLabel="Decimal Point">
              .
            </Button>
            <Button onClick={handleEquals} className={`${currentTheme.btnEquals} shadow-md`} ariaLabel="Equals">
              =
            </Button>

            {/* Additional Row */}
            <Button onClick={handlePercentage} className={`${currentTheme.btnFunction} col-span-2 shadow-md`}>
              %
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Calculator
