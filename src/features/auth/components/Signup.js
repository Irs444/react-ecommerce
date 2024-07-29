import React, { useState } from 'react';
import { useForm } from "react-hook-form"
import { Link, Navigate } from 'react-router-dom';
import { selectLoggedInUser, createUserAsync } from '../authSlice';
import { useDispatch, useSelector } from 'react-redux';


export default function Signup() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser)
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  console.log(errors);

  return (
    <div >
      {user && <Navigate to={'/'} replace={true}></Navigate>}
      <div >
        <div className="flex h-full max-h-full bg-gray-300 mt-10  flex-1 flex-col justify-center px-6 py-12 lg:px-8 shadow-md  w-96 mx-auto rounded  ">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm ">
            {/* <img
              alt="Your Company"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            /> */}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Create a New Account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form noValidate className="space-y-6" onSubmit={handleSubmit((data) => {
              dispatch(createUserAsync({ email: data.email, password: data.password , address:[]}))
              console.log(data);
            })}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    {...register("email", {
                      required: true, pattern: {
                        value: /^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])/gm, message: "email is not valid"
                      }
                    })}
                    type="email"
                    required

                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.email && <span className='text-red-500'>{errors.email.message}</span>}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  {/* <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div> */}
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password", {
                      required: true, pattern: {
                        value: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,}/gm,
                        message: `password must contain 1 number (0-9)\n
                                  password must contain 1 uppercase letters\n
                                  password must contain 1 lowercase letters\n
                                  password must contain 1 non-alpha numeric number\n
                                  password is 8-16 characters with no space`}
                    })}
                    type="password"


                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
                <div className="mt-2">
                  <input
                    id="cpassword"
                    {...register("cpassword", {
                      required: true,
                      validate: (value, formValues) => value === formValues.password || 'password not matching'
                    })}
                    type="password"


                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.cpassword && <span className='text-red-500'>{errors.cpassword.message}</span>}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Signu Up
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already a member?{' '}
              <Link to={"/login"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Login In
              </Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
