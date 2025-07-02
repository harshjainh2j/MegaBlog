import React from 'react'
import authService from '../Appwrite/auth'
import {useDispatch} from 'react-redux'
import {logout} from '../store/authSlice'

const LogoutBtn = () => {
const dispatch = useDispatch();
    const logoutHandler=()=>{
        authService.logoutUser().then(()=>{
            return dispatch(logout())
        })
    }

  return (
    <button onClick={logoutHandler} className='inline-block px-6 py-2 ml-2 duration-200 hover:bg-blue-100 rounded-full'>
    Logout
    </button>
  )
}

export default LogoutBtn
