import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Payments from 'components/Payments'


const Header = () => {
  const user = useSelector(state => state.auth)

  const renderContent = () => {
    if (!user) {
      return <li><a href="/auth/google">Login With Google</a></li>
    }

    return <>
      <li><Payments /></li>
      <li style={{ margin: '0 10px' }}>Credits: { user.credits }</li>
      <li><a href="/api/logout">Logout</a></li>
    </>
  }

  return (
    <nav>
      <div className="nav-wrapper">
        <Link to={!user ? '/' : '/surveys'} className="brand-logo left">Logo</Link>
        <ul className="right">
          { user == null ? null : renderContent() }
        </ul>
      </div>
    </nav>
  )
}

export default Header