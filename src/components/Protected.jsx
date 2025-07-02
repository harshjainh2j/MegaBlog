import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Protected = ({children,authenticated=true}) => {
const navigate=useNavigate()
const authStatus=useSelector((state)=>state.auth?.status)

const [Loading,setLoading]=useState(true)
useEffect(()=>{

if(authenticated && authStatus!==authenticated){
    navigate('/login')
}else if(!authenticated && authStatus!==authenticated){
    navigate('/')
}
setLoading(false)
},[authStatus,navigate,authenticated])
  return Loading?( <div>loading please wait...</div>): (
    <>
      {children}
    </>
  )
}

export default Protected
