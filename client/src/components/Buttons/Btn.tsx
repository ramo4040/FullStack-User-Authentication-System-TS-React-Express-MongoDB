interface ButtonProps {
  type: 'button' | 'submit' | 'reset'
  id?: string
  children: React.ReactNode | string
  onClick?: () => void
  disabled?: boolean
}

const Button = ({ type, id, children, onClick, disabled }: ButtonProps) => {
  return (
    <button id={id} type={type} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}

export default Button
