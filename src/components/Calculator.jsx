import { useState, useEffect, useRef } from 'react'

function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)
  const [history, setHistory] = useState([])
  const [isScientific, setIsScientific] = useState(false)
  const [showHistory, setShowHistory] = useState(false)
  const [variables, setVariables] = useState({ a: 0, b: 0, c: 0, x: 0, y: 0, z: 0 })
  const [currentVariable, setCurrentVariable] = useState(null)
  const displayRef = useRef(null)

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key >= '0' && e.key <= '9') {
        handleInput(e.key)
      } else if (e.key === '.') {
        handleInput('.')
      } else if (e.key === '+') {
        handleOperation('+')
      } else if (e.key === '-') {
        handleOperation('-')
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
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [display, previousValue, operation, waitingForNewValue, isScientific])

  const formatDisplay = (value) => {
    if (value === 'Error' || value === 'Infinity' || value === '-Infinity' || isNaN(value)) {
      return value
    }
    const num = parseFloat(value)
    if (isNaN(num)) return value
    if (!isFinite(num)) return 'Infinity'
    return String(value)
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
      setWaitingForNewValue(false)
    }
    if (waitingForNewValue) {
      setDisplay(String(num))
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
    setCurrentVariable(null)
  }

  const handleDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.')
      setWaitingForNewValue(false)
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.')
    }
  }

  const handleClear = () => {
    setDisplay('0')
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
    } else {
      setDisplay('0')
    }
  }

  const handleOperation = (nextOperation) => {
    if (display === 'Error' || display === 'Infinity' || display === '-Infinity') {
      return
    }
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)
      const checkedValue = checkError(newValue)
      
      if (checkedValue === 'Error' || checkedValue === 'Infinity' || checkedValue === '-Infinity') {
        setDisplay(String(checkedValue))
        setPreviousValue(null)
        setOperation(null)
        return
      }

      setDisplay(String(newValue))
      setPreviousValue(newValue)
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
      const expression = `${previousValue} ${operation} ${inputValue} = ${checkedValue}`
      
      setDisplay(formatDisplay(checkedValue))
      if (checkedValue !== 'Error' && checkedValue !== 'Infinity' && checkedValue !== '-Infinity') {
        setHistory([...history, expression].slice(-20)) // Keep last 20 history items
      }
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const handleScientific = (func) => {
    if (display === 'Error' || display === 'Infinity' || display === '-Infinity') {
      return
    }
    const value = parseFloat(display)
    let result = 0
    let expression = ''

    switch (func) {
      case 'sin':
        result = Math.sin(value * (Math.PI / 180))
        expression = `sin(${value}°) = ${result.toFixed(6)}`
        break
      case 'cos':
        result = Math.cos(value * (Math.PI / 180))
        expression = `cos(${value}°) = ${result.toFixed(6)}`
        break
      case 'tan':
        if (Math.abs(value % 90) < 0.0001 && Math.abs(Math.floor((value + 45) / 90) % 2) === 1) {
          result = Infinity
          expression = `tan(${value}°) = Infinity`
        } else {
          result = Math.tan(value * (Math.PI / 180))
          expression = `tan(${value}°) = ${result.toFixed(6)}`
        }
        break
      case 'log':
        if (value <= 0) {
          result = NaN
          expression = `log(${value}) = Error`
        } else {
          result = Math.log10(value)
          expression = `log(${value}) = ${result.toFixed(6)}`
        }
        break
      case 'ln':
        if (value <= 0) {
          result = NaN
          expression = `ln(${value}) = Error`
        } else {
          result = Math.log(value)
          expression = `ln(${value}) = ${result.toFixed(6)}`
        }
        break
      case 'sqrt':
        if (value < 0) {
          result = NaN
          expression = `√(${value}) = Error`
        } else {
          result = Math.sqrt(value)
          expression = `√(${value}) = ${result.toFixed(6)}`
        }
        break
      case 'pow2':
        result = value * value
        expression = `${value}² = ${result.toFixed(6)}`
        break
      case 'pow3':
        result = value * value * value
        expression = `${value}³ = ${result.toFixed(6)}`
        break
      case 'exp':
        result = Math.exp(value)
        if (!isFinite(result)) {
          expression = `e^${value} = Infinity`
        } else {
          expression = `e^${value} = ${result.toFixed(6)}`
        }
        break
      case '1/x':
        if (value === 0) {
          result = Infinity
          expression = `1/${value} = Infinity`
        } else {
          result = 1 / value
          expression = `1/${value} = ${result.toFixed(6)}`
        }
        break
      case 'pi':
        result = Math.PI
        expression = `π = ${result}`
        break
      case 'e':
        result = Math.E
        expression = `e = ${result}`
        break
      default:
        return
    }

    const checkedValue = checkError(result)
    setDisplay(formatDisplay(checkedValue))
    if (checkedValue !== 'Error' && checkedValue !== 'Infinity' && checkedValue !== '-Infinity') {
      setHistory([...history, expression].slice(-20))
    }
    setWaitingForNewValue(true)
  }

  const handleVariable = (varName) => {
    if (currentVariable === varName) {
      // Store current display value to variable
      const value = parseFloat(display)
      if (!isNaN(value) && display !== 'Error' && display !== 'Infinity' && display !== '-Infinity') {
        setVariables({ ...variables, [varName]: value })
        setCurrentVariable(null)
      }
    } else {
      // Use variable value
      setDisplay(String(variables[varName]))
      setCurrentVariable(varName)
      setWaitingForNewValue(true)
    }
  }

  const handleBracket = (bracket) => {
    if (waitingForNewValue || display === '0' || display === 'Error' || display === 'Infinity' || display === '-Infinity') {
      if (bracket === '(') {
        setDisplay('(')
        setWaitingForNewValue(false)
      }
    } else {
      setDisplay(display + bracket)
    }
  }

  const handlePercentage = () => {
    if (display === 'Error' || display === 'Infinity' || display === '-Infinity') {
      return
    }
    const value = parseFloat(display)
    setDisplay(String(value / 100))
  }

  const handleToggleSign = () => {
    if (display === 'Error' || display === 'Infinity' || display === '-Infinity') {
      return
    }
    setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display)
  }

  const Button = ({ onClick, className = '', children, ...props }) => (
    <button
      onClick={onClick}
      className={`px-4 py-3 text-base font-medium rounded-2xl transition-all duration-150 active:scale-[0.96] hover:brightness-110 shadow-lg hover:shadow-xl ${className}`}
      {...props}
    >
      {children}
    </button>
  )

  const isError = display === 'Error' || display === 'Infinity' || display === '-Infinity'

  return (
    <div className="w-full max-w-md mx-auto relative">
      {/* History Modal */}
      {showHistory && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setShowHistory(false)}
        >
          <div 
            className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl p-6 w-full max-w-sm border border-slate-600/50"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-100">History</h2>
              <button
                onClick={() => setShowHistory(false)}
                className="text-slate-400 hover:text-slate-200 transition-colors text-2xl leading-none w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-700"
              >
                ×
              </button>
            </div>
            {history.length === 0 ? (
              <div className="text-slate-400 text-sm text-center py-8">
                No calculations yet
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto custom-scrollbar">
                {history.slice().reverse().map((item, index) => (
                  <div 
                    key={index} 
                    className="text-sm text-slate-300 font-number py-2 px-3 rounded-xl bg-slate-800/50 border border-slate-700/50 hover:bg-slate-700/50 transition-colors cursor-pointer"
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

      <div className="bg-gradient-to-br from-slate-800 via-slate-800 to-slate-900 rounded-3xl shadow-2xl p-6 space-y-4 border border-slate-600/30 backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg font-semibold text-slate-100 tracking-tight">Calculator</h1>
          <div className="flex gap-2">
            {history.length > 0 && (
              <button
                onClick={() => setShowHistory(true)}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-slate-100 bg-slate-700/80 hover:bg-slate-600 rounded-xl transition-all shadow-md hover:shadow-lg"
              >
                History
              </button>
            )}
            <button
              onClick={() => setIsScientific(!isScientific)}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-slate-100 bg-slate-700/80 hover:bg-slate-600 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              {isScientific ? 'Basic' : 'Scientific'}
            </button>
          </div>
        </div>

        {/* Display */}
        <div className="bg-gradient-to-br from-slate-950 to-slate-900 rounded-2xl p-6 mb-4 border-2 border-slate-700/50 shadow-inner">
          <div className="text-right text-slate-500 text-xs h-6 overflow-x-auto mb-2 custom-scrollbar-horizontal">
            {previousValue !== null && operation && (
              <span>{previousValue} {operation}</span>
            )}
          </div>
          <div 
            ref={displayRef}
            className={`text-right text-slate-100 text-5xl font-number font-light overflow-x-auto custom-scrollbar-horizontal min-h-[72px] flex items-center justify-end ${
              isError ? 'text-red-400' : ''
            }`}
          >
            {display}
          </div>
          {isError && (
            <div className="text-right text-red-400/70 text-xs mt-1">
              {display === 'Error' ? 'Invalid operation' : 'Result is infinite'}
            </div>
          )}
        </div>

        {/* Variable Display (Scientific Mode) */}
        {isScientific && (
          <div className="bg-slate-900/50 rounded-xl p-3 mb-4 border border-slate-700/30">
            <div className="text-xs text-slate-400 mb-2">Variables</div>
            <div className="grid grid-cols-6 gap-1.5">
              {['a', 'b', 'c', 'x', 'y', 'z'].map((varName) => (
                <div key={varName} className="text-center">
                  <button
                    onClick={() => handleVariable(varName)}
                    className={`w-full py-1.5 text-xs font-number rounded-lg transition-all ${
                      currentVariable === varName
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/30'
                    }`}
                  >
                    {varName}
                  </button>
                  <div className="text-[10px] text-slate-500 mt-1 font-number">
                    {variables[varName]}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Scientific Functions */}
        {isScientific && (
          <div className="grid grid-cols-4 gap-2 mb-4">
            <Button onClick={() => handleScientific('sin')} className="bg-slate-700/80 hover:bg-slate-600 text-slate-200 text-xs shadow-md">
              sin
            </Button>
            <Button onClick={() => handleScientific('cos')} className="bg-slate-700/80 hover:bg-slate-600 text-slate-200 text-xs shadow-md">
              cos
            </Button>
            <Button onClick={() => handleScientific('tan')} className="bg-slate-700/80 hover:bg-slate-600 text-slate-200 text-xs shadow-md">
              tan
            </Button>
            <Button onClick={() => handleScientific('log')} className="bg-slate-700/80 hover:bg-slate-600 text-slate-200 text-xs shadow-md">
              log
            </Button>
            <Button onClick={() => handleScientific('ln')} className="bg-slate-700/80 hover:bg-slate-600 text-slate-200 text-xs shadow-md">
              ln
            </Button>
            <Button onClick={() => handleScientific('sqrt')} className="bg-slate-700/80 hover:bg-slate-600 text-slate-200 text-xs shadow-md">
              √
            </Button>
            <Button onClick={() => handleScientific('pow2')} className="bg-slate-700/80 hover:bg-slate-600 text-slate-200 text-xs shadow-md">
              x²
            </Button>
            <Button onClick={() => handleScientific('pow3')} className="bg-slate-700/80 hover:bg-slate-600 text-slate-200 text-xs shadow-md">
              x³
            </Button>
            <Button onClick={() => handleScientific('exp')} className="bg-slate-700/80 hover:bg-slate-600 text-slate-200 text-xs shadow-md">
              e^x
            </Button>
            <Button onClick={() => handleScientific('1/x')} className="bg-slate-700/80 hover:bg-slate-600 text-slate-200 text-xs shadow-md">
              1/x
            </Button>
            <Button onClick={() => handleScientific('pi')} className="bg-slate-700/80 hover:bg-slate-600 text-slate-200 text-xs shadow-md">
              π
            </Button>
            <Button onClick={() => handleScientific('e')} className="bg-slate-700/80 hover:bg-slate-600 text-slate-200 text-xs shadow-md">
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
          <Button onClick={handleClear} className="bg-slate-700/80 hover:bg-slate-600 text-slate-200 col-span-2 shadow-md">
            AC
          </Button>
          <Button onClick={handleBackspace} className="bg-slate-700/80 hover:bg-slate-600 text-slate-200 shadow-md">
            ⌫
          </Button>
          <Button onClick={() => handleOperation('/')} className="bg-gradient-to-br from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white shadow-md shadow-amber-900/30">
            ÷
          </Button>

          {/* Row 2 */}
          <Button onClick={() => handleInput(7)} className="bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-number shadow-md">
            7
          </Button>
          <Button onClick={() => handleInput(8)} className="bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-number shadow-md">
            8
          </Button>
          <Button onClick={() => handleInput(9)} className="bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-number shadow-md">
            9
          </Button>
          <Button onClick={() => handleOperation('*')} className="bg-gradient-to-br from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white shadow-md shadow-amber-900/30">
            ×
          </Button>

          {/* Row 3 */}
          <Button onClick={() => handleInput(4)} className="bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-number shadow-md">
            4
          </Button>
          <Button onClick={() => handleInput(5)} className="bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-number shadow-md">
            5
          </Button>
          <Button onClick={() => handleInput(6)} className="bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-number shadow-md">
            6
          </Button>
          <Button onClick={() => handleOperation('-')} className="bg-gradient-to-br from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white shadow-md shadow-amber-900/30">
            −
          </Button>

          {/* Row 4 */}
          <Button onClick={() => handleInput(1)} className="bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-number shadow-md">
            1
          </Button>
          <Button onClick={() => handleInput(2)} className="bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-number shadow-md">
            2
          </Button>
          <Button onClick={() => handleInput(3)} className="bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-number shadow-md">
            3
          </Button>
          <Button onClick={() => handleOperation('+')} className="bg-gradient-to-br from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-white shadow-md shadow-amber-900/30">
            +
          </Button>

          {/* Row 5 */}
          <Button onClick={handleToggleSign} className="bg-slate-700/80 hover:bg-slate-600 text-slate-200 shadow-md">
            ±
          </Button>
          <Button onClick={() => handleInput(0)} className="bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-number shadow-md">
            0
          </Button>
          <Button onClick={handleDecimal} className="bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-number shadow-md">
            .
          </Button>
          <Button onClick={handleEquals} className="bg-gradient-to-br from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white shadow-md shadow-blue-900/30">
            =
          </Button>

          {/* Additional Row */}
          <Button onClick={handlePercentage} className="bg-slate-700/80 hover:bg-slate-600 text-slate-200 col-span-2 shadow-md">
            %
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Calculator
