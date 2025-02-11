import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { checkUserAsync, selectError, selectLoggedInUser } from '../authSlice';


export default function Login() {

  const dispatch = useDispatch();
  const error = useSelector(selectError)
  const user = useSelector(selectLoggedInUser)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  console.log(errors);

  return (
    <div>
      {user && <Navigate to={"/"} replace={true}></Navigate>}
      <div >
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 shadow-lg w-96 mx-auto bg-gray-300 mt-10 rounded">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            {/* <img
              alt="Your Company"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              className="mx-auto h-10 w-auto"
            /> */}
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Log in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form noValidate className="space-y-6" onSubmit={handleSubmit((data) => {
              dispatch(checkUserAsync({ email: data.email, password: data.password }))
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
                  <div className="text-sm">
                    <Link to={"/forgot-password"} className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </Link>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    {...register("password", {
                      required: "Password is required"
                    })}
                    type="password"

                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                  {errors.password && <span className='text-red-500'>{errors.password.message}</span>}
                </div>
                {error && <span className='text-red-500'>{error.message}</span>}
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Log in
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{' '}
              <Link to={"/signup"} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                Create an Account
              </Link>
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}
