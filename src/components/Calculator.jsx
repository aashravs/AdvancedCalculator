import { useState, useEffect } from 'react'

function Calculator() {
  const [display, setDisplay] = useState('0')
  const [previousValue, setPreviousValue] = useState(null)
  const [operation, setOperation] = useState(null)
  const [waitingForNewValue, setWaitingForNewValue] = useState(false)
  const [history, setHistory] = useState([])
  const [isScientific, setIsScientific] = useState(false)
  const [showHistory, setShowHistory] = useState(false)

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
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [display, previousValue, operation, waitingForNewValue])

  const handleInput = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num))
      setWaitingForNewValue(false)
    } else {
      setDisplay(display === '0' ? String(num) : display + num)
    }
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
  }

  const handleBackspace = () => {
    if (display.length > 1) {
      setDisplay(display.slice(0, -1))
    } else {
      setDisplay('0')
    }
  }

  const handleOperation = (nextOperation) => {
    const inputValue = parseFloat(display)

    if (previousValue === null) {
      setPreviousValue(inputValue)
    } else if (operation) {
      const currentValue = previousValue || 0
      const newValue = calculate(currentValue, inputValue, operation)

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
        return secondValue !== 0 ? firstValue / secondValue : 0
      case '=':
        return secondValue
      default:
        return secondValue
    }
  }

  const handleEquals = () => {
    const inputValue = parseFloat(display)

    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation)
      const expression = `${previousValue} ${operation} ${inputValue} = ${newValue}`
      
      setDisplay(String(newValue))
      setHistory([...history, expression].slice(-5)) // Keep last 5 history items
      setPreviousValue(null)
      setOperation(null)
      setWaitingForNewValue(true)
    }
  }

  const handleScientific = (func) => {
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
        result = Math.tan(value * (Math.PI / 180))
        expression = `tan(${value}°) = ${result.toFixed(6)}`
        break
      case 'log':
        result = Math.log10(value)
        expression = `log(${value}) = ${result.toFixed(6)}`
        break
      case 'ln':
        result = Math.log(value)
        expression = `ln(${value}) = ${result.toFixed(6)}`
        break
      case 'sqrt':
        result = Math.sqrt(value)
        expression = `√(${value}) = ${result.toFixed(6)}`
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
        expression = `e^${value} = ${result.toFixed(6)}`
        break
      case '1/x':
        result = value !== 0 ? 1 / value : 0
        expression = `1/${value} = ${result.toFixed(6)}`
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

    setDisplay(String(result))
    setHistory([...history, expression].slice(-5))
    setWaitingForNewValue(true)
  }

  const handlePercentage = () => {
    const value = parseFloat(display)
    setDisplay(String(value / 100))
  }

  const handleToggleSign = () => {
    setDisplay(display.charAt(0) === '-' ? display.slice(1) : '-' + display)
  }

  const Button = ({ onClick, className = '', children, ...props }) => (
    <button
      onClick={onClick}
      className={`px-4 py-3 text-base font-medium rounded-xl transition-all duration-150 active:scale-[0.97] hover:brightness-110 ${className}`}
      {...props}
    >
      {children}
    </button>
  )

  return (
    <div className="w-full max-w-md mx-auto relative">
      {/* History Modal */}
      {showHistory && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowHistory(false)}
        >
          <div 
            className="bg-slate-900 rounded-2xl shadow-2xl p-6 w-full max-w-sm border border-slate-700"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-slate-100">History</h2>
              <button
                onClick={() => setShowHistory(false)}
                className="text-slate-400 hover:text-slate-200 transition-colors text-2xl leading-none"
              >
                ×
              </button>
            </div>
            {history.length === 0 ? (
              <div className="text-slate-400 text-sm text-center py-8">
                No calculations yet
              </div>
            ) : (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {history.slice().reverse().map((item, index) => (
                  <div 
                    key={index} 
                    className="text-sm text-slate-300 font-number py-2 px-3 rounded-lg bg-slate-800 border border-slate-700 hover:bg-slate-700 transition-colors cursor-pointer"
                    onClick={() => {
                      const match = item.match(/=\s*(.+)$/)
                      if (match) {
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

      <div className="bg-slate-800 rounded-3xl shadow-2xl p-6 space-y-4 border border-slate-700">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-lg font-semibold text-slate-200 tracking-tight">Calculator</h1>
          <div className="flex gap-2">
            {history.length > 0 && (
              <button
                onClick={() => setShowHistory(true)}
                className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-slate-100 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
              >
                History
              </button>
            )}
            <button
              onClick={() => setIsScientific(!isScientific)}
              className="px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-slate-100 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
            >
              {isScientific ? 'Basic' : 'Scientific'}
            </button>
          </div>
        </div>

        {/* Display */}
        <div className="bg-slate-900 rounded-xl p-5 mb-4 border border-slate-700">
          <div className="text-right text-slate-500 text-xs h-5 overflow-x-auto mb-1">
            {previousValue !== null && operation && (
              <span>{previousValue} {operation}</span>
            )}
          </div>
          <div className="text-right text-slate-100 text-5xl font-number font-light overflow-x-auto">
            {display}
          </div>
        </div>

        {/* Scientific Functions */}
        {isScientific && (
          <div className="grid grid-cols-4 gap-2 mb-4">
            <Button onClick={() => handleScientific('sin')} className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs">
              sin
            </Button>
            <Button onClick={() => handleScientific('cos')} className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs">
              cos
            </Button>
            <Button onClick={() => handleScientific('tan')} className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs">
              tan
            </Button>
            <Button onClick={() => handleScientific('log')} className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs">
              log
            </Button>
            <Button onClick={() => handleScientific('ln')} className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs">
              ln
            </Button>
            <Button onClick={() => handleScientific('sqrt')} className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs">
              √
            </Button>
            <Button onClick={() => handleScientific('pow2')} className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs">
              x²
            </Button>
            <Button onClick={() => handleScientific('pow3')} className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs">
              x³
            </Button>
            <Button onClick={() => handleScientific('exp')} className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs">
              e^x
            </Button>
            <Button onClick={() => handleScientific('1/x')} className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs">
              1/x
            </Button>
            <Button onClick={() => handleScientific('pi')} className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs">
              π
            </Button>
            <Button onClick={() => handleScientific('e')} className="bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs">
              e
            </Button>
          </div>
        )}

        {/* Main Keypad */}
        <div className="grid grid-cols-4 gap-2.5">
          {/* Row 1 */}
          <Button onClick={handleClear} className="bg-slate-700 hover:bg-slate-600 text-slate-200 col-span-2">
            AC
          </Button>
          <Button onClick={handleBackspace} className="bg-slate-700 hover:bg-slate-600 text-slate-200">
            ⌫
          </Button>
          <Button onClick={() => handleOperation('/')} className="bg-amber-600 hover:bg-amber-500 text-white">
            ÷
          </Button>

          {/* Row 2 */}
          <Button onClick={() => handleInput(7)} className="bg-slate-900 hover:bg-slate-800 text-slate-100 font-number">
            7
          </Button>
          <Button onClick={() => handleInput(8)} className="bg-slate-900 hover:bg-slate-800 text-slate-100 font-number">
            8
          </Button>
          <Button onClick={() => handleInput(9)} className="bg-slate-900 hover:bg-slate-800 text-slate-100 font-number">
            9
          </Button>
          <Button onClick={() => handleOperation('*')} className="bg-amber-600 hover:bg-amber-500 text-white">
            ×
          </Button>

          {/* Row 3 */}
          <Button onClick={() => handleInput(4)} className="bg-slate-900 hover:bg-slate-800 text-slate-100 font-number">
            4
          </Button>
          <Button onClick={() => handleInput(5)} className="bg-slate-900 hover:bg-slate-800 text-slate-100 font-number">
            5
          </Button>
          <Button onClick={() => handleInput(6)} className="bg-slate-900 hover:bg-slate-800 text-slate-100 font-number">
            6
          </Button>
          <Button onClick={() => handleOperation('-')} className="bg-amber-600 hover:bg-amber-500 text-white">
            −
          </Button>

          {/* Row 4 */}
          <Button onClick={() => handleInput(1)} className="bg-slate-900 hover:bg-slate-800 text-slate-100 font-number">
            1
          </Button>
          <Button onClick={() => handleInput(2)} className="bg-slate-900 hover:bg-slate-800 text-slate-100 font-number">
            2
          </Button>
          <Button onClick={() => handleInput(3)} className="bg-slate-900 hover:bg-slate-800 text-slate-100 font-number">
            3
          </Button>
          <Button onClick={() => handleOperation('+')} className="bg-amber-600 hover:bg-amber-500 text-white">
            +
          </Button>

          {/* Row 5 */}
          <Button onClick={handleToggleSign} className="bg-slate-700 hover:bg-slate-600 text-slate-200">
            ±
          </Button>
          <Button onClick={() => handleInput(0)} className="bg-slate-900 hover:bg-slate-800 text-slate-100 font-number">
            0
          </Button>
          <Button onClick={handleDecimal} className="bg-slate-900 hover:bg-slate-800 text-slate-100 font-number">
            .
          </Button>
          <Button onClick={handleEquals} className="bg-blue-600 hover:bg-blue-500 text-white">
            =
          </Button>

          {/* Additional Row */}
          <Button onClick={handlePercentage} className="bg-slate-700 hover:bg-slate-600 text-slate-200 col-span-2">
            %
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Calculator

