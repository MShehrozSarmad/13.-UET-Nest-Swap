import React from 'react'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/authSlc'
import authService from '../../appwrite/authservices'

const LogoutBtn = () => {
    const dispatch = useDispatch();
    const logoutHndlr = () =>  {
        authService.logOut().then(() => {
            dispatch(logout())
        })
    }

  return (
    <button onClick={logoutHndlr} className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 hover:text-gray-900 rounded-full'>LogoutBtn</button>
  )
}

export default LogoutBtn   