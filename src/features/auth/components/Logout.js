import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectLoggedInUser, signOutAsync } from '../authSlice';
import { Navigate } from 'react-router-dom';

const Logout = () => {

    const dispatch = useDispatch();
    const user = useSelector(selectLoggedInUser)

    useEffect(() => {
        dispatch(signOutAsync())
    })

    // but useEffect run after render, so we have to delay navigate part
  return (
    <div>{!user && <Navigate to={"/login"} replace={true}></Navigate>}</div>
  )
}

export default Logout
