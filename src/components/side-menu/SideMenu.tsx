import { HomeOutlined, SettingOutlined, UserOutlined, FileTextOutlined, DollarOutlined } from '@ant-design/icons'
import { Menu } from 'antd'
import React, { useEffect, useState } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import './side-menu.css'

const SideMenu: React.FC = () => {
  const location = useLocation()
  const history = useHistory()
  const [defaultSelectKey] = useState(location.pathname.split('/')[1] || 'news')

  useEffect(() => {
    const path: string[] = location.pathname.split('/')
    if (!path[1]) {
      history.push('/news')
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
        key='news'
        icon={<FileTextOutlined />}
        onClick={() => onClickMenu('news')}>
        <label className="text-sm">News</label>
      </Menu.Item>
      <Menu.Item
        key='deposit-withdraw'
        icon={<DollarOutlined />}
        onClick={() => onClickMenu('deposit-withdraw')}>
        <label className="text-sm">ฝาก/ถอน</label>
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
