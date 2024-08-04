import { ReactNode } from 'react'
import AsideAuth from '../Auth/AsideAuth'

const withAuthLayout = (children: ReactNode) => {
  return (
    <main className="auth_container">
      <div>
        {children}
        <AsideAuth />
      </div>
    </main>
  )
}

export default withAuthLayout
