import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLoggedInUserOrdersAsync, selectUserInfo, selectUserOrders } from '../userSlice';




export default function UserOrders() {

    const dispatch = useDispatch();
    const [open, setOpen] = useState(true)
    const user = useSelector(selectUserInfo)
    const orders = useSelector(selectUserOrders)

    useEffect(() => {
        dispatch(fetchLoggedInUserOrdersAsync(user.id))
    }, [])



    return (
        <div>

            {orders.map((order) => (
                <div>
                    <div className="mx-auto mt-12 bg-white shadow-xl max-w-7xl px-4 sm:px-6 lg:px-8">
                        <h1 className='text-4xl font-bold tracking-light text-gray-900'>Order # {order.id}</h1>
                        <h3 className='text-xl font-bold tracking-light text-red-900 my-2'>Order Status: {order.status}</h3>

                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                            <div className="flow-root">
                                <ul role="list" className="-my-6 divide-y divide-gray-200">
                                    {order.items.map((item) => (
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
                                                            Qty: {item.quantity}
                                                        </label>


                                                    </div>

                                                    <div className="flex">

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
                                <p>{order.totalAmount}</p>
                            </div>
                            <div className="flex justify-between text-base font-medium text-gray-900">
                                <p>Total items in Cart</p>
                                <p>{order.totalItems} items</p>
                            </div>

                            <p className="mt-0.5 text-xl underline font-bold tracking-light text-gray-900">Shipping Address:</p>
                        <div className="flex justify-between gap-x-6 py-5 ">
                            <div className="flex min-w-0 gap-x-4">


                                <div className="min-w-0 flex-auto">
                                    <p className="text-sm font-semibold leading-6 text-gray-900">{order.selectAddress.name}</p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectAddress.street}</p>
                                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">{order.selectAddress.pinCode}</p>
                                </div>
                            </div>
                            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                                <p className="text-sm leading-6 text-gray-900 "><span className='font-semibold'>Phone:</span>{order.selectAddress.phone}</p>
                                <p className="text-sm leading-6 text-gray-900">{order.selectAddress.city}</p>

                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            ))}

        </div>
    );
}
