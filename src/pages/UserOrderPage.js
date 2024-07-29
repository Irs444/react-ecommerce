import React from 'react'
import Navbar from '../features/navbar/Navbar'
import UserOrders from '../features/user/components/UserOrder'

const UserOrderPage = () => {
  return (
    <div>
        <Navbar>
            <h1 className='mx-auto text-4xl font-bold'>My Orders</h1>
            <UserOrders></UserOrders>
        </Navbar>
    </div>
  )
}

export default UserOrderPage