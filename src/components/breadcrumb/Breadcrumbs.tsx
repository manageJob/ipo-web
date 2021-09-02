import { Breadcrumb as BreadcrumbImport } from 'antd'
import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { ContextItems } from '../../context/ContextItems'
import { Breadcrumb } from '../../models/breadcrumb.model'
import './Breadcrumbs.css'

const Breadcrumbs: React.FC = () => {
  const history = useHistory()
  const { breadcrumbItems } = useContext(ContextItems)

  const handleOnClick = (path: string, index: number) => {
    if (breadcrumbItems?.length === index + 1) {
      return
    }
    history.push(path)
  }

  return (
    <BreadcrumbImport className='breadcrumb'>
      {breadcrumbItems?.map((breadcrumbItem: Breadcrumb, index: number) => (
        <BreadcrumbImport.Item
          onClick={() => handleOnClick(String(breadcrumbItem.path), index)}
          key={index}>
          <span className='breadcrumb-name'>{breadcrumbItem.name}</span>
        </BreadcrumbImport.Item>
      ))}
    </BreadcrumbImport>
  )
}

export default Breadcrumbs
