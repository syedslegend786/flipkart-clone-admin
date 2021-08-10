import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import { useDispatch, useSelector } from 'react-redux';
import './style.css'
import { getOrdersActions } from '../../actions/order.actins';
import Items from './Items';
const Orders = () => {
    const order = useSelector(state => state.order)
    const dispatch = useDispatch()
    const [status, setstatus] = useState(true)
    useEffect(() => {
        dispatch(getOrdersActions());
    }, [])
    return (
        <Layout sidebar>
            <div>
                {
                    order.orders.map((val, index) => (
                        <Items key={index} val={val} />
                    ))
                }
            </div >
        </Layout >
    )
}

export default Orders
