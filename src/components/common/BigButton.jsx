import './BigButton.css'

const VARIANT_CLASS = {
  primary: 'big-button--primary',
  secondary: 'big-button--secondary',
  orange: 'big-button--orange',
  ghost: 'big-button--ghost',
  success: 'big-button--success',
  danger: 'big-button--danger',
}

export default function BigButton({
  children,
  icon,
  onClick,
  variant = 'primary',
  disabled = false,
  fullWidth = false,
  className = '',
  type = 'button',
  ...rest
}) {
  const classes = [
    'big-button',
    VARIANT_CLASS[variant] || VARIANT_CLASS.primary,
    fullWidth ? 'big-button--full' : '',
    disabled ? 'big-button--disabled' : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button
      type={type}
      className={classes}
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
      {...rest}
    >
      {icon && <span className="big-button__icon">{icon}</span>}
      <span className="big-button__label">{children}</span>
    </button>
  )
}
