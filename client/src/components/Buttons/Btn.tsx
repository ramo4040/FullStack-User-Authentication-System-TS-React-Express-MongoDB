interface ButtonProps {
  type: 'button' | 'submit' | 'reset'
  id?: string
  children: React.ReactNode | string
  onClick?: () => void
}

const Button = ({ type, id, children, onClick }: ButtonProps) => {
  return (
    <button id={id} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
