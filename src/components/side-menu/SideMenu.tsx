import { HomeTwoTone, SettingTwoTone } from '@ant-design/icons'
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


  // <Menu
  //         mode="inline"
  //         defaultSelectedKeys={['1']}
  //         defaultOpenKeys={['sub1']}
  //         style={{ height: '100%', borderRight: 0 }}
  //       >
  //         <SubMenu key="sub1" title={<span><MenuOutlined className='menu-outlined-custom' />subnav 1</span>}>
  //           <Menu.Item key="1">option1</Menu.Item>
  //           <Menu.Item key="2">option2</Menu.Item>
  //           <Menu.Item key="3">option3</Menu.Item>
  //           <Menu.Item key="4">option4</Menu.Item>
  //         </SubMenu>
  //       </Menu>

  return (
    <Menu
      defaultSelectedKeys={[defaultSelectKey]}
      mode='inline'
      style={{ height: '100%', borderRight: 0 }}
      >
      <Menu.Item
        key='main'
        onClick={() => onClickMenu('main')}
        icon={<HomeTwoTone />}>
        <label className="text-sm">Main</label>
      </Menu.Item>
      <Menu.Item
        key='setting'
        icon={<SettingTwoTone />}
        onClick={() => onClickMenu('setting')}>
        <label className="text-sm">Setting</label>
      </Menu.Item>
    </Menu>
  )
}

export default SideMenu
