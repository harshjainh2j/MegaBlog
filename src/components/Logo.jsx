import React from 'react'

const Logo = ({ width = '100px' }) => {
  return (
    <div style={{ width }}>
      <img src="/logo.png" alt="logo" style={{ width: '100%' }} />
    </div>
  )
}

export default Logo
