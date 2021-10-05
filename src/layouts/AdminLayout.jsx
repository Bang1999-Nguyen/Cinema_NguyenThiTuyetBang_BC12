import React, { useState } from 'react';
import { Layout, Menu } from 'antd';
import { Tabs } from 'antd';
import {
  TeamOutlined,
  VideoCameraOutlined,
  DesktopOutlined
} from '@ant-design/icons';
import { Link, NavLink, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import withLayout from '../hocs/withLayout';
import './Admin.css'
import Footer from '../containers/shared/Footer/Footer';
const { TabPane } = Tabs;

function AdminLayout(props) {
  const currentUser = useSelector(state => state.authReducer.currentUser);
 
 const dispatch = useDispatch()
  const handleClick = e => {
    setTabSelected(e.key)
    dispatch({
      type:'TAB_ADMIN',
      payload:e.key
    })
    
  };
  const {selectedKey} = useSelector(state=> state.UserAdmin)
  const [tabSelected, setTabSelected] = useState(selectedKey)
  return currentUser.maLoaiNguoiDung === 'QuanTri' ? (
    <div>
      <header className="p-4  text-coolGray-800 header-admin" style={{backgroundColor:'white'}}>
        <div className="content-admin">
          <div>
            <a href="#" aria-label="Back to homepage" className="flex items-center">
              <img src="https://cyberlearn.vn/wp-content/uploads/2020/03/cyberlearn-min-new-opt2.png" alt="" />
            </a>
          </div>
          <div className="flex items-center md:space-x-4">
            <button type="button" className="btn_admin_name hidden px-6 py-2 font-semibold rounded lg:block bg-violet-600 " style={{ border: 'none', color: 'white', background: "linear-gradient(80deg, #CC3366 0%, #663366 100%)" }}>Hello! {currentUser.taiKhoan}</button>
          </div>
        </div>
      </header>
      <div style={{ height: '1200px', width: '100%', background: '#ECF0F1', position: 'relative', display: 'flex', justifyContent: 'center' }}>
        <div style={{ height: '1200px', width: '20%' }}>
          <div style={{ height: '1200px', width: '100%', background: '#211d2c' }}>
            <div style={{ height: '80px', borderBottom: '1.5px solid gray' }}>
              <h1 style={{ color: 'white', lineHeight: '80px', letterSpacing: '1.5px' }}>Dashboard</h1>
            </div>
            <div className="py-5 px-3">
              <Menu theme="dark" mode="inline" defaultSelectedKeys='1' style={{ backgroundColor: 'transparent', padding: '0 20px' }}  onClick={handleClick}  selectedKeys={[tabSelected]}>
              <Menu.Item key="1" icon={<DesktopOutlined />}>
                  <Link to="/admin">Dashboard</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                  <Link to="/admin/movie">Movie</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<TeamOutlined />}>
                  <Link to="/admin/user">User</Link>
                </Menu.Item>
              </Menu>
            </div>
          </div>
        </div>
        <div style={{ height: '1200px', width: '80%' }}>
          {props.children}
        </div>
      </div>
      <Footer />
    </div >
  ) : (
    <Redirect to="/" />
  );
}
export default withLayout(AdminLayout);