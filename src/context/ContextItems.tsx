import React, { useState } from 'react'
import { Breadcrumb } from '../models/breadcrumb.model'

interface ContextProps {
  breadcrumbItems?: Breadcrumb[]
  setBreadcrumbItems: Function // eslint-disable-line
  
}

export const ContextItems = React.createContext<ContextProps>({
  setBreadcrumbItems: () => {}, // eslint-disable-line
})

// eslint-disable-next-line
const ContextProvider: React.FC<any> = (props: {
  children: React.ReactNode
}) => {
  const [breadcrumbItems, setBreadcrumbItems] = useState()

  return (
    <ContextItems.Provider
      value={{
        breadcrumbItems,
        setBreadcrumbItems,
      }}>
      {props.children}
    </ContextItems.Provider>
  )
}

export default ContextProvider
