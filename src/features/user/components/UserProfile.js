import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo, updateUserAsync } from '../userSlice';



export default function UserProfile() {
   
  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo)

  const handleEdit = (e, index) => {
    
  }

  const handleRemove = (e, index) => {
    const newUser = {...user, address:[...user.address]}  // for shallow copy issue
    newUser.address.splice(index, 1)
    dispatch(updateUserAsync(newUser))

  }



  return (
    <div className='bg-gray-300'>
      <div className="mx-auto mt-12 bg-white shadow-xl max-w-7xl px-4 sm:px-6 lg:px-8">
        <h1 className='text-4xl font-bold tracking-light text-gray-900'>Name: {user.name ? user.name : "New User"} </h1> 
        <h3 className='text-xl font-bold tracking-light text-red-900 my-2'>Email Address: {user.email}</h3>
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <div className="flow-root">
          </div>
        </div>
        <div className="border-gray-200 px-4 py-6 sm:px-6">
          <p className="mt-0.5 text-xl underline font-bold tracking-light text-gray-900">Your Address:</p>
          {user.address.map((addres, index) => (
            <div className="flex justify-between gap-x-6 py-5 ">
              <div className="flex min-w-0 gap-x-4">
                <div className="min-w-0 flex-auto">
                  <p className="text-sm font-semibold leading-6 text-gray-900">{addres.name}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{addres.street}</p>
                  <p className="mt-1 truncate text-xs leading-5 text-gray-500">{addres.pinCode}</p>
                </div>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900 "><span className='font-semibold'>Phone:</span>{addres.phone}</p>
                <p className="text-sm leading-6 text-gray-900">{addres.city}</p>
              </div>
              <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500 p-1" onClick={(e) => handleEdit(e, index)}>
                {/* <i class="fa-solid fa-pen-to-square fa-2x "></i> */}Edit
                </button>
                <button type="button" className="font-medium text-red-600 hover:text-red-500 p-1" onClick={(e) => handleRemove(e, index)}>
                {/* <i class="fa-solid fa-trash fa-2x"></i> */}Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
