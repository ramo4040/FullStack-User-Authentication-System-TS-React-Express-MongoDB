interface IAuthForm {
  description?: string
  title?: string
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
  children: React.ReactNode
  hasHeader?: boolean
}

const AuthForm = ({
  description,
  title,
  onSubmit,
  children,
  hasHeader = true,
}: IAuthForm) => {
  return (
    <main className="form_container">
      <header>
        <div className="logo"></div>
        <h2>NFT Yassir</h2>
      </header>

      <div>
        <form onSubmit={onSubmit}>
          {hasHeader && (
            <header>
              <h1>{title}</h1>
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
