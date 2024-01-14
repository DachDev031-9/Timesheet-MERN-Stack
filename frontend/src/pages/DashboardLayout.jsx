import React from 'react'
import Wrapper from '../css/DashboardLayout';
import { useNavigate, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

function DashboardLayout() {
  const navigate = useNavigate()
  const handleLogout = () => {
    localStorage.clear()
    navigate("/login")
  }
  return (
    <Wrapper>
      <div className="sidebar">
        <Sidebar />
      </div>
      <div className="navbar-and-content">
        <div className="navbar">
          <button type="button" className='btn-logout' onClick={()=>handleLogout()}>Logout</button>
        </div>
        <div className="content">
          <Outlet />
        </div>
      </div>
    </Wrapper>
  )
}

export default DashboardLayout