const ErrorMessage = ({ message }: { message: string | undefined }) => {
  return <div className="error-msg">{message}</div>
}

export default ErrorMessage
