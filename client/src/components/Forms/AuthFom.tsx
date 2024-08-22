import logo from '../../assets/images/Logo.png'

interface IAuthForm {
  description?: string
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  children: React.ReactNode
  hasHeader?: boolean
}

const AuthForm = ({
  description,
  onSubmit,
  children,
  hasHeader = true,
}: IAuthForm) => {
  return (
    <main className="form_container">
      <header>
        <img src={logo} className="logo" />
        <h2>NFT Yassir</h2>
      </header>

      <div>
        <form onSubmit={onSubmit}>
          {hasHeader && (
            <header>
              <h1>NFT Yassir</h1>
              <p>{description}</p>
            </header>
          )}
          <div className="group-input-container">{children}</div>
        </form>
      </div>
    </main>
  )
}

export default AuthForm
