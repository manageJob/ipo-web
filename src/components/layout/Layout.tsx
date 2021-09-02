import { useEffect, useState } from "react"
import { Breadcrumb, Layout as Layouts } from 'antd'
import { useWindowSize } from "../../utils/utils"
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
    <Layouts>
    <Header className="header">
      <div className="logo" />
    </Header>
    <Layouts>
      <Sider width={200} style={{ background: '#fff' }}>
        <SideMenu/>
      </Sider>
   
      <Layouts style={{ marginBottom: '400px', padding: '0 24px 24px' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>List</Breadcrumb.Item>
          <Breadcrumb.Item>App</Breadcrumb.Item>
        </Breadcrumb>
        <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
          Content
        </Content>
      </Layouts>
    </Layouts>
  </Layouts>
    )
}

  
  export default Layout