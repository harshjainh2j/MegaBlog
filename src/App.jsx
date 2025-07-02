import { useEffect, useState } from 'react'
import auth from './Appwrite/auth.js'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { login,logout } from './store/authSlice'
import {Header,Footer} from './components/index.js'
import './App.css'

function App() {
let [loading,setLoading]= useState(true)
const dispatch = useDispatch()
useEffect(()=>{
  auth.getAccount().then((res)=>{
  if(res){
    dispatch(login(res))
    
  }else{
    dispatch(logout())
  }
}).finally(()=>{
  setLoading(false)
}).catch((err)=>{
  console.log("Error in getting user in app file",err)
  setLoading(false)
})
},[])


return loading ? (
  <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
    Loading please wait...
  </div>
) : (
  <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className='w-full block'>
    <Header />
    <main className='py-6' >
      <Outlet />
    </main>
    <Footer />
      </div>

  </div>
)

}

export default App
