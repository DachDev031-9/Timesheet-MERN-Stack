import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Wrapper from '../css/Sidebar'

function Sidebar() {
  const location = useLocation();
  return (
    <Wrapper>
        <h1>Jobify</h1>
        <ul>
            <li className={location.pathname === '/' ? 'active' : ''}>
              <Link to="/">Dashboard</Link>
            </li>
            <li className={location.pathname === '/allproject' ? 'active' : ''}>
              <Link to="allproject">All Project</Link>
            </li>
            <li className={location.pathname === '/alluser' || location.pathname.startsWith('/edituser') || location.pathname.startsWith('/adduser') ? 'active' : ''}>
              <Link to="alluser">All User</Link>
            </li>
            <li className={location.pathname === '/alljobposition' || location.pathname.startsWith('/editjobposition') || location.pathname.startsWith('/addjobposition') ? 'active' : ''}>
              <Link to="/alljobposition">All Jobposition</Link>
            </li>
            <li className={location.pathname === '/allcustomer' ? 'active' : ''}>
              <Link to="/allcustomer">All Customer</Link>
            </li>
        </ul>
    </Wrapper>
  )
}

export default Sidebar