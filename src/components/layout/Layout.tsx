import { useEffect, useState } from "react"
import { Breadcrumb, Layout as Layouts } from 'antd'
import { useWindowSize } from "../../utils/utils"
import { MenuOutlined } from '@ant-design/icons'
import './layout.css'
import React from "react"
import SideMenu from "../side-menu/SideMenu"

const { Header, Sider, Content } = Layouts

const Layout: React.FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false)
  const { width } = useWindowSize()

  useEffect(() => {
    if (width <= 990) {
      setCollapsed(true)
    } else {
      setCollapsed(false)
    }
  }, [width])

  const toggle = () => {
    setCollapsed(!collapsed)
  }

  return (
    // <Layouts>
    //   <Header className="header">
    //     <div className="logo" />
    //   </Header>
    //   <Layouts>
    //     <Sider width={200} style={{ background: '#fff' }}>
    //       <SideMenu />
    //     </Sider>

    //     <Layouts style={{ marginBottom: '400px', padding: '0 24px 24px' }}>

    //       <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280, marginTop: 20 }}>
    //         {children}
    //       </Content>
    //     </Layouts>
    //   </Layouts>
    // </Layouts>

    <Layouts className='layout'>
  
    <Header className='header fixed w-full'>
      <div className='logo' />
      <button className='btn-custom' type='button'>
        <MenuOutlined className='menu-outlined-custom' onClick={toggle} />
      </button>
    </Header>
    <Layouts className='mt-13 fixed h-full w-full'>
      <Sider trigger={null} collapsible collapsed={collapsed} collapsedWidth={0} width={225} style={{ backgroundColor: '#29363d', zIndex: 99 }}>
        <SideMenu />
      </Sider>
      <Layouts style ={{ height: '800px' }}>
        <Content className='overflow-auto pb-12'>{children}</Content>
      </Layouts>
    </Layouts>
  </Layouts>
  )
}


export default Layout