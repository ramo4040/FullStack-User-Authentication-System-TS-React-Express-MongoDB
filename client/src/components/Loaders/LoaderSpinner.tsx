import React from 'react'
import { LuLoader } from 'react-icons/lu'

interface LoaderSpinnerProps {
  message?: string
  layout?: 'vertical' | 'horizontal'
  size?: string
}

const LoaderSpinner: React.FC<LoaderSpinnerProps> = ({
  message = '',
  layout = 'vertical',
  size = '2rem',
}) => {
  return (
    <div className={`loader-container ${layout}`}>
      <LuLoader size={size} className="rotating-icon" />
      <p>{message}</p>
    </div>
  )
}

export default LoaderSpinner
