import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserInfo, updateUserAsync } from '../userSlice';
import { useForm } from 'react-hook-form';

export default function UserProfile() {

  const dispatch = useDispatch();
  const user = useSelector(selectUserInfo)
  const [selectedEditIndex, setSelectedEditIndex] = useState(false)
  const [showAddAddressForm, setShowAddAddressForm] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm()

  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...user, address: [...user.address] }  // for shallow copy issue
    newUser.address.splice(index, 1, addressUpdate)
    dispatch(updateUserAsync(newUser))
    setSelectedEditIndex(false)

  }

  const handleRemove = (e, index) => {
    const newUser = { ...user, address: [...user.address] }  // for shallow copy issue
    newUser.address.splice(index, 1)
    dispatch(updateUserAsync(newUser))

  }

  const handleEditForm = (index) => {
    setSelectedEditIndex(index)
    const addres = user.address[index]
    setValue('name', addres.name)
    setValue('email', addres.email)
    setValue('city', addres.city)
    setValue('state', addres.state)
    setValue('pinCode', addres.pinCode)
    setValue('phone', addres.phone)
    setValue('street', addres.street)
  }

  // const handleAdd = (address) => {
  //   const newUser = { ...user, address: [...user.address , address] }  
  //   dispatch(updateUserAsync(newUser))
  //   setShowAddAddressForm(false)

  // }

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
          {/* <button
          onClick={e => {setShowAddAddressForm(true)}}
            type="submit"
            className="rounded-md bg-green-600 px-3 py-2 my-3 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
          >
            Add New Address
          </button>

          {showAddAddressForm ?
            <form noValidate onSubmit={handleSubmit((data) => {
              console.log(data);
              handleAdd(data)
              reset();
            })}>
              <div className="space-y-12">
                <div className="border-b border-gray-900/10 pb-12">
                  <h2 className="text-2xl font-bold leading-7 text-gray-900">Personal Information</h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                  <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                      <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                        Full name
                      </label>
                      <div className="mt-2">
                        <input
                          id="name"
                          {...register("name", { required: "name is require" })}
                          type="text"

                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="sm:col-span-4">
                      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                        Email address
                      </label>
                      <div className="mt-2">
                        <input
                          id="email"
                          {...register("email", { required: "email is require" })}
                          type="email"

                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-3">
                      <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                        Phone
                      </label>
                      <div className="mt-2">
                        <input
                          id="phone"
                          {...register("phone", { required: "phone is require" })}
                          type="tel"

                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                        Street address
                      </label>
                      <div className="mt-2">
                        <input
                          id="street"
                          {...register("street", { required: "street is require" })}
                          type="text"

                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2 sm:col-start-1">
                      <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                        City
                      </label>
                      <div className="mt-2">
                        <input
                          id="city"
                          {...register("city", { required: "city is require" })}
                          type="text"

                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                        State / Province
                      </label>
                      <div className="mt-2">
                        <input
                          id="state"
                          {...register("state", { required: "state is required" })}
                          type="text"

                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                        ZIP / Postal code
                      </label>
                      <div className="mt-2">
                        <input
                          id="pinCode"
                          {...register("pinCode", { required: "pinCode is required" })}
                          type="text"

                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>

                  </div>
                  <div className="mt-6 flex items-center justify-end gap-x-6">

                    <button
                      type="submit"
                      className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Add Address
                    </button>
                  </div>
                </div>
              </div>


            </form> : null
          } */}
          <p className="mt-0.5 text-xl underline font-bold tracking-light text-gray-900">Your Address:</p>
          {user.address.map((addres, index) => (
            <div>
              <form noValidate onSubmit={handleSubmit((data) => {
                console.log(data);
                handleEdit(data, index)
                reset();
              })}>
                <div className="space-y-12">
                  <div className="border-b border-gray-900/10 pb-12">
                    <h2 className="text-2xl font-bold leading-7 text-gray-900">Personal Information</h2>
                    <p className="mt-1 text-sm leading-6 text-gray-600">Use a permanent address where you can receive mail.</p>

                    <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <div className="sm:col-span-4">
                        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                          Full name
                        </label>
                        <div className="mt-2">
                          <input
                            id="name"
                            {...register("name", { required: "name is require" })}
                            type="text"

                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>
                      <div className="sm:col-span-4">
                        <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                          Email address
                        </label>
                        <div className="mt-2">
                          <input
                            id="email"
                            {...register("email", { required: "email is require" })}
                            type="email"

                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-3">
                        <label htmlFor="phone" className="block text-sm font-medium leading-6 text-gray-900">
                          Phone
                        </label>
                        <div className="mt-2">
                          <input
                            id="phone"
                            {...register("phone", { required: "phone is require" })}
                            type="tel"

                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="col-span-full">
                        <label htmlFor="street-address" className="block text-sm font-medium leading-6 text-gray-900">
                          Street address
                        </label>
                        <div className="mt-2">
                          <input
                            id="street"
                            {...register("street", { required: "street is require" })}
                            type="text"

                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2 sm:col-start-1">
                        <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                          City
                        </label>
                        <div className="mt-2">
                          <input
                            id="city"
                            {...register("city", { required: "city is require" })}
                            type="text"

                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="state" className="block text-sm font-medium leading-6 text-gray-900">
                          State / Province
                        </label>
                        <div className="mt-2">
                          <input
                            id="state"
                            {...register("state", { required: "state is required" })}
                            type="text"

                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                      <div className="sm:col-span-2">
                        <label htmlFor="pinCode" className="block text-sm font-medium leading-6 text-gray-900">
                          ZIP / Postal code
                        </label>
                        <div className="mt-2">
                          <input
                            id="pinCode"
                            {...register("pinCode", { required: "pinCode is required" })}
                            type="text"

                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                          />
                        </div>
                      </div>

                    </div>
                    <div className="mt-6 flex items-center justify-end gap-x-6">

                      {/* <button
                        onClick={e => setSelectedEditIndex(-1)}
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Cancel
                      </button> */}
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Edit Address
                      </button>
                    </div>
                  </div>
                </div>


              </form>
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
                  <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500 p-1" onClick={(e) => handleEditForm(index)}>
                    {/* <i class="fa-solid fa-pen-to-square fa-2x "></i> */}Edit
                  </button>
                  <button type="button" className="font-medium text-red-600 hover:text-red-500 p-1" onClick={(e) => handleRemove(e, index)}>
                    {/* <i class="fa-solid fa-trash fa-2x"></i> */}Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
