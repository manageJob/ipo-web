import { HomeOutlined, SettingOutlined, UserOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './side-menu.css'

const SideMenu: React.FC = () => {
  const location = useLocation()
  const history = useHistory()
  const [defaultSelectKey] = useState(location.pathname.split('/')[1] || 'main')

  useEffect(() => {
    const path: string[] = location.pathname.split('/')
    if (!path[1]) {
      history.push('/main')
    }

  }, [location.pathname]) // eslint-disable-line

  const onClickMenu = (path: string) => {
    history.push(path)
  }

  return (
    <Menu
      defaultSelectedKeys={[defaultSelectKey]}
      mode='inline'
      style={{ height: '100%', borderRight: 0 }}
    >
      <Menu.Item
        key='main'
        onClick={() => onClickMenu('main')}
        icon={<HomeOutlined />}>
        <label className="text-sm">Main</label>
      </Menu.Item>
      <Menu.Item
        key='manage-user'
        icon={<UserOutlined />}
        onClick={() => onClickMenu('manage-user')}>
        <label className="text-sm">Manage User</label>
      </Menu.Item>
      <Menu.Item
        key='setting'
        icon={<SettingOutlined />}
        onClick={() => onClickMenu('setting')}>
        <label className="text-sm">Setting</label>
      </Menu.Item>
    </Menu>
  )
}

export default SideMenu
