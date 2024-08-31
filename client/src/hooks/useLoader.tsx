import React from 'react'
import { useState } from 'react'
import LoaderSpinner from '../components/Loaders/LoaderSpinner'

interface IuseLoader {
  isLoading: boolean
  showLoading: () => void
  hideLoading: () => void
  LoaderElement: React.FC<ILoaderElement>
}

interface ILoaderElement {
  message?: string
  layout?: 'vertical' | 'horizontal'
  size?: string
  color?: string
}

const useLoader = (): IuseLoader => {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const showLoading = () => {
    setIsLoading(true)
  }

  const hideLoading = () => {
    setIsLoading(false)
  }

  const LoaderElement = ({ message, layout, size, color }: ILoaderElement) => {
    return isLoading ? (
      <LoaderSpinner
        message={message}
        layout={layout}
        size={size}
        color={color}
      />
    ) : null
  }

  return { isLoading, showLoading, hideLoading, LoaderElement }
}

export default useLoader
