import React, { Component } from 'react';
import 'antd/dist/antd.css';
import '../css/BaseComponent.css';
import { Dropdown, Button, Space } from 'antd';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined
} from '@ant-design/icons';

import { BrowserRouter as Router, Route, Switch, Link, withRouter } from 'react-router-dom'


import HomeComponent from './HomeComponent';
import AllSheetComponent from "./AllSheetComponent";
import SingleSheetComponent from "./MonthlyComponent";


import img3 from '../assets/images/monthIcon.png'
import img2 from '../assets/images/sochiIcon.png'
import img4 from '../assets/images/shareIcon.png'
import img5 from '../assets/images/requestIcon.png'
import img1 from '../assets/images/dashboardIcon.png'
import img6 from '../assets/images/bellIcon.png'
import img7 from '../assets/images/userIcon.png'
import img8 from '../assets/images/nextIcon.png'

import mainLogoWhite from '../assets/images/logos/mainLogoWhite.png'
import sideLogoWhite from '../assets/images/logos/sideLogoWhite.png'
import onlyWhiteLogo from '../assets/images/logos/onlyWhiteLogo.png'
const { Header, Sider, Content } = Layout;

const menu = (
  <Menu>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
        1st menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
        2nd menu item
      </a>
    </Menu.Item>
    <Menu.Item>
      <a target="_blank" rel="noopener noreferrer" href="http://www.tmall.com/">
        3rd menu item
      </a>
    </Menu.Item>
  </Menu>
);

class BaseComponent extends Component {

  constructor(props){
    super(props)

    this.localLogout = this.localLogout.bind(this)
  }

  componentDidMount(){
    console.log(JSON.parse(sessionStorage.getItem('name')))
  }
  
  state = {
    collapsed: false,
  };

  toggle = () => {

    if (this.state.collapsed == true) {
      var sidebar = document.getElementById("content-main");
      var logo = document.getElementById("logo");
      var logo2 = document.getElementById("logo2");
      var x = document.getElementsByClassName("menu-item-text");
      var header = document.getElementById('site-header-main');
      var menuItemNames = ["Dashboard", "Sochis", "Monthly", "Shared", "Requests"]
      console.log(x)
      for (var i = 0; i < x.length; i++) {
        x[i].textContent = menuItemNames[i]
      }
      sidebar.style.marginLeft = "200px";
      header.style.marginLeft = "200px";
      logo.style.display = "block";
      logo2.style.display = "none";
    }
    else {
      var sidebar = document.getElementById("content-main");
      var header = document.getElementById('site-header-main');
      var logo = document.getElementById("logo");
      var logo2 = document.getElementById("logo2");
      sidebar.style.marginLeft = "80px";
      header.style.marginLeft = "80px";
      logo.style.display = "none";
      logo2.style.display = "block";
      var x = document.getElementsByClassName("menu-item-text");
      console.log(x)
      for (var i = 0; i < x.length; i++) {
        x[i].textContent = ""
      }
    }
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  localLogout(){
    console.log("local logout")
    this.props.logout()
  }
  

  render() {
    return (
      <Router>
        <Layout>
          <Sider trigger={null} collapsible collapsed={this.state.collapsed} id="sideNavigation">
            <div id="logo">
              <div className="logo-division">
                <img src={sideLogoWhite} style={{ height: '100%', width: '100%' }}></img>
              </div>
            </div>
            <div id="logo2">
              <div className="logo-division2">
                <img src={onlyWhiteLogo} style={{ height: '100%', width: '100%' }}></img>
              </div>
            </div>
            <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>

              <Menu.Item key="1">
                <Link to="/">
                  <img src={img1} className="menuItemImageIcon"></img>
                  <span className="menu-item-text">Dashboard</span>
                </Link>
              </Menu.Item>

              {/* <Menu.Item key="2">
                <Link to="/allsheets">
                  <img src={img2} className="menuItemImageIcon"></img>
                  <span className="menu-item-text">Sochis</span>
                </Link>
              </Menu.Item> */}

              <Menu.Item key="3">
                <Link to="/monthly">
                  <img src={img3} className="menuItemImageIcon"></img>
                  <span className="menu-item-text">Monthly</span>
                </Link>
              </Menu.Item>

              {/* <Menu.Item key="4">
                <Link to="/allsheets">
                  <img src={img4} className="menuItemImageIcon"></img>
                  <span className="menu-item-text">Shared</span>
                </Link>
              </Menu.Item> */}

              {/* <Menu.Item key="5">
                <Link to="/">
                  <img src={img5} className="menuItemImageIcon"></img>
                  <span className="menu-item-text">Requests</span>
                </Link>

              </Menu.Item> */}

            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Header className="site-layout-background" style={{ padding: 0 }} id="site-header-main">
              {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                className: 'trigger',
                onClick: this.toggle,
              })}
              <div className="user-info-div">
                <div className="user-info-div-left">
                  <div className="user-info-div-left-bell-icon">
                    <img src={img6} className='user-info-div-left-bell-image'></img>
                  </div>
                </div>
                <div className="user-info-div-right">
                  <div className="user-info-div-right-left">
                    <img src={img7} className='user-info-div-right-user-image'></img>
                  </div>
                  <div className="user-info-div-right-middle">
                    <div className="user-info-div-right-middle-upper">Rebecca</div>
                    <div className="user-info-div-right-middle-lower">Premium</div>
                  </div>
                  <div className="user-info-div-right-right">
                    <div className="user-info-div-right-right-more">
                      <img src={img8} className="user-info-div-right-right-more-img"></img>
                    </div>
                  </div>
                  <div className="user-info-dropdown">
                    {/* <Dropdown overlay={menu} placement="bottomCenter" trigger={['click']}>
                      <Button className="user-info-dropdown-button">Rebecca</Button>
                    </Dropdown> */}
                    <select className="user-info-dropdown-button">
                      <option >{JSON.parse(sessionStorage.getItem('name')).name}</option>
                      <option>Settings</option>
                      <option onClick={this.localLogout}>Logout</option>
                    </select>
                  </div>
                </div>
              </div>
            </Header>
            <Content
              className="site-layout-background"
              id="content-main"
            // style={{
            //   margin: '10px 16px',
            //   padding: 0,
            //   minHeight: 'calc(100vh - 112px)',
            //   border: '1px solid black'
            // }}
            >
              <Switch>
                <Route path="/" exact component={HomeComponent}></Route>
                <Route path="/allsheets" exact component={AllSheetComponent}></Route>
                <Route path="/monthly" exact component={SingleSheetComponent}></Route>
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    )
  }
}

export default BaseComponent;
