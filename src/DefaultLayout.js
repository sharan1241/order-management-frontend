import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './DefaultLayout.css'

import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined ,
  UserOutlined,
  HomeOutlined,
  CopyOutlined,
  UnorderedListOutlined,
  ShoppingCartOutlined,
  
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
const { Header, Sider, Content } = Layout;
const DefaultLayout = ({children}) => {
  const navigate = useNavigate()
  const {cartItems,loading} = useSelector(state=>state.rootReducer)
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const toggle = () =>{
    setCollapsed(
      !collapsed
    )
  }

  useEffect(()=>{
    localStorage.setItem('cartItems',JSON.stringify(cartItems))
  },[cartItems])
  return (
    <Layout bodybg="#f5f5f5">
      {loading &&<Spinner/>}
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical">
          <h1 className='text-center text-light font-weight-bold mt-4'>Swiggy</h1>
        </div>
        <Menu 
         theme='dark'
          mode="inline"
          defaultSelectedKeys={window.location.pathname}
        >
          <Menu.Item key='/' icon={<HomeOutlined />}>
              <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item key='/bills' icon={<CopyOutlined />}>
              <Link to="/bills">bills</Link>
          </Menu.Item>
          <Menu.Item key='/items' icon={<UnorderedListOutlined />}>
              <Link to="/items">items</Link>
          </Menu.Item>
          <Menu.Item key='/customers' icon={<UserOutlined />}>
              <Link to="/customers">customers</Link>
          </Menu.Item>
          <Menu.Item key='/logout' 
          icon={<LogoutOutlined />}
          onClick={()=>{
            localStorage.removeItem('auth')
            navigate('/login')
          }}
          >
              Logout
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className='cart-item' onClick={()=>navigate('/cart')} style={{paddingLeft:"0px",paddingRight:"0px",display:"flex",flexDirection:"row"}}>
            <p style={{ padding:"10px",fontSize:"20px",marginRight:"10px"}}>{cartItems.length}</p>
            
            <div style={{marginTop:"20px",marginRight:"10px"}}>
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-cart" viewBox="0 0 16 16">
  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/>
</svg></div>
           
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default DefaultLayout;

