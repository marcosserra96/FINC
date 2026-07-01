import './AlphaKeyboard.css'

const ROWS = ['ABCDEFGHIJ', 'KLMNOPQRST', 'UVWXYZ']

export default function AlphaKeyboard({ onKeyPress, maxLength = 14, value = '' }) {
  const handlePress = (type, char) => {
    if (type === 'char') {
      if (value.length >= maxLength) return
      onKeyPress({ type: 'char', value: char })
      return
    }
    onKeyPress({ type })
  }

  return (
    <div className="alpha-keyboard">
      {ROWS.map((row, i) => (
        <div className="alpha-keyboard__row" key={i}>
          {row.split('').map((char) => (
            <button
              key={char}
              type="button"
              className="alpha-keyboard__key"
              onClick={() => handlePress('char', char)}
            >
              {char}
            </button>
          ))}
        </div>
      ))}
      <div className="alpha-keyboard__row alpha-keyboard__row--actions">
        <button type="button" className="alpha-keyboard__key alpha-keyboard__key--wide" onClick={() => handlePress('space')}>
          Espaço
        </button>
        <button type="button" className="alpha-keyboard__key alpha-keyboard__key--action" onClick={() => handlePress('back')}>
          ⌫
        </button>
        <button type="button" className="alpha-keyboard__key alpha-keyboard__key--action" onClick={() => handlePress('clear')}>
          Limpar
        </button>
      </div>
    </div>
  )
}
