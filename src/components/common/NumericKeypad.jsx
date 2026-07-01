import './NumericKeypad.css'

const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'clear', '0', 'back']

export default function NumericKeypad({ onKeyPress, maxLength = 6, value = '' }) {
  const handlePress = (key) => {
    if (key === 'clear') {
      onKeyPress({ type: 'clear' })
      return
    }
    if (key === 'back') {
      onKeyPress({ type: 'back' })
      return
    }
    if (value.length >= maxLength) return
    onKeyPress({ type: 'digit', value: key })
  }

  return (
    <div className="numeric-keypad">
      {KEYS.map((key) => (
        <button
          key={key}
          type="button"
          className={`numeric-keypad__key ${key === 'clear' || key === 'back' ? 'numeric-keypad__key--action' : ''}`}
          onClick={() => handlePress(key)}
        >
          {key === 'clear' ? 'Limpar' : key === 'back' ? '⌫' : key}
        </button>
      ))}
    </div>
  )
}
