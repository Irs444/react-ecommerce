import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link, Navigate } from 'react-router-dom'
import { deleteItemFromCartAsync, selectitems, updateCartAsync } from '../features/cart/cartSlice';
import { useForm } from 'react-hook-form';
import {  updateUserAsync } from '../features/auth/authSlice';
import { createOrderAsync, selecCurrentOrder } from '../features/order/orderSlice';
import { selectUserInfo } from '../features/user/userSlice';

const Checkout = () => {

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm()

    const user = useSelector(selectUserInfo)

    const [selectAddress, setSelectAddress] = useState(null)
    const [paymentMethod, setPaymentMethod] = useState("cash")


    const dispatch = useDispatch();
    const [open, setOpen] = useState(true)
    const items = useSelector(selectitems)
    const currentOrder = useSelector(selecCurrentOrder);

    const totalAmount = items.reduce((amount, item) => item.price * item.quantity + amount, 0)
    const totalItems = items.reduce((total, item) => item.quantity + total, 0)

    const handleQuantity = (e, item) => {
        dispatch(updateCartAsync({ ...item, quantity: +e.target.value }))
    }

    const handleDelete = (e, id) => {
        dispatch(deleteItemFromCartAsync(id))
    }

    const handleAddress = (e) => {
        console.log(e.target.value);
        setSelectAddress(user.address[e.target.value])
    }

    const handlePayment = (e) => {

        console.log(e.target.value);
        setPaymentMethod(e.target.value)
    }

    const handleOrder = (e) => {
        if (selectAddress && paymentMethod) {

            const order = { items, totalAmount, totalItems, user, paymentMethod, selectAddress, status: "pending"  }; // other status can be delivered, received
            dispatch(createOrderAsync(order))
            //need to redirect from here to a new page of order success 
        } else {
            // TODO: we can use proper messaging popup here
            alert("Enter Address and Payment method")
        }
        //TODO : Rediret order success page
        //TODO : clear cart after order
        //TODO : on server change stock number of item
    }

    return (

        <div className='bg-gray-300 p-10'>
            {!items.length && <Navigate to={"/"} replace={true}></Navigate>}
            {currentOrder && <Navigate to={`/order-success/${currentOrder.id}`} replace={true}></Navigate>}

            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
                <div className='grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5'>
                    <div className='lg:col-span-3 p-10 mt-5 rounded-xl shadow-xl bg-white'>

                        <form noValidate onSubmit={handleSubmit((data) => {
                            console.log(data);
                            dispatch(updateUserAsync({ ...user, address: [...user.address, data] }));
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

                                        {/* <div className="sm:col-span-3">
                                            <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                                Last name
                                            </label>
                                            <div className="mt-2">
                                                <input
                                                    id="last-name"
                                                    name="last-name"
                                                    type="text"
                                                    autoComplete="family-name"
                                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                />
                                            </div>
                                        </div> */}

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
                                                    autoComplete="address-level2"
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
                                        <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                            Reset
                                        </button>
                                        <button
                                            type="submit"
                                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                        >
                                            Save Address
                                        </button>
                                    </div>
                                </div>


                                <div className=" border-gray-900/10 pb-12">
                                    <h2 className="text-base font-semibold leading-7 text-gray-900">Address</h2>
                                    <p className="mt-1 text-sm leading-6 text-gray-600">
                                        Choose from Existing Address
                                    </p>
                                    <ul role="list" className="divide-y divide-gray-">
                                        {user.address.map((address, index) => (
                                            <li key={index} className="flex justify-between gap-x-6 py-5">
                                                <div className="flex min-w-0 gap-x-4">
                                                    <input
                                                        onChange={handleAddress}
                                                        name="address"
                                                        type="radio"
                                                        value={index}
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />

                                                    <div className="min-w-0 flex-auto">
                                                        <p className="text-sm font-semibold leading-6 text-gray-900">{address.name}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.street}</p>
                                                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{address.pinCode}</p>
                                                    </div>
                                                </div>
                                                <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                                    <p className="text-sm leading-6 text-gray-900 "><span className='font-semibold'>Phone:</span>{address.phone}</p>
                                                    <p className="text-sm leading-6 text-gray-900">{address.city}</p>

                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    <div className="mt-10 space-y-10">

                                        <fieldset>
                                            <legend className="text-sm font-semibold leading-6 text-gray-900">Payment Method</legend>
                                            <p className="mt-1 text-sm leading-6 text-gray-600">Choose One</p>
                                            <div className="mt-6 space-y-6">
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="cash"
                                                        name="payments"
                                                        onChange={handlePayment}
                                                        value="cash"
                                                        type="radio"
                                                        checked={paymentMethod === "cash"}
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="cash" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Cash
                                                    </label>
                                                </div>
                                                <div className="flex items-center gap-x-3">
                                                    <input
                                                        id="card"
                                                        name="payments"
                                                        onChange={handlePayment}
                                                        value="card"
                                                        checked={paymentMethod === "card"}
                                                        type="radio"
                                                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                                                    />
                                                    <label htmlFor="card" className="block text-sm font-medium leading-6 text-gray-900">
                                                        Card Payment
                                                    </label>
                                                </div>

                                            </div>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>


                        </form>
                    </div>
                    <div className='lg:col-span-2'>
                        <div className="mx-auto mt-5 bg-white shadow-xl rounded-xl max-w-7xl px-4 sm:px-6 lg:px-8">
                            <h1 className='text-4xl font-bold tracking-light text-gray-900 my-3'>Cart</h1>

                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {items.map((item) => (
                                            <li key={item.id} className="flex py-6">
                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                    <img
                                                        alt={item.title}
                                                        src={item.thumbnail}
                                                        className="h-full w-full object-cover object-center"
                                                    />
                                                </div>

                                                <div className="ml-4 flex flex-1 flex-col">
                                                    <div>
                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                            <h3>
                                                                <a href={item.href}>{item.title}</a>
                                                            </h3>
                                                            <p className="ml-4">{item.price}</p>
                                                        </div>
                                                        <p className="mt-1 text-sm text-gray-500">{item.brand}</p>
                                                    </div>
                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                        <div className="text-gray-500">
                                                            <label htmlFor="quantity" className="inline mr-5 text-sm font-medium leading-6 text-gray-900">
                                                                Qty
                                                            </label>
                                                            <select onChange={e => handleQuantity(e, item)} value={item.quantity}>
                                                                <option value={1}>1</option>
                                                                <option value={2}>2</option>
                                                            </select>

                                                        </div>

                                                        <div className="flex">
                                                            <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={e => handleDelete(e, item.id)}>
                                                                Remove
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>


                            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Subtotal</p>
                                    <p>{totalAmount}</p>
                                </div>
                                <div className="flex justify-between text-base font-medium text-gray-900">
                                    <p>Total items in Cart</p>
                                    <p>{totalItems} items</p>
                                </div>
                                <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
                                <div className="mt-6">
                                    <div
                                        onClick={handleOrder}

                                        className="cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                    >
                                        Order Now
                                    </div>
                                </div>
                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                    <p>
                                        or{' '}
                                        <Link to={"/"}>
                                            <button
                                                type="button"
                                                onClick={() => setOpen(false)}
                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                            >
                                                Continue Shopping
                                                <span aria-hidden="true"> &rarr;</span>
                                            </button>
                                        </Link>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout