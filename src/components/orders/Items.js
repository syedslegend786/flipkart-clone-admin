import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getOrdersActions, handleOrderStatus } from '../../actions/order.actins'

const Items = ({ val }) => {
    const dispatch = useDispatch()
    const [selectType, setselectType] = useState('')
    const handleDate = (date) => {
        let toReturn = ''
        if (date) {
            toReturn = new Date(date).toDateString()
        }
        return toReturn;
    }
    const handleUpdateOrderStatus = (orderId) => {
        if (!selectType) {
            alert('Please select the updated status of order!!!')
        } else {
            const payload = {
                orderId,
                type: selectType,
            }
            console.log(payload)
            dispatch(handleOrderStatus(payload))
        }
    }
    return (
        <div>
            <div className='order_id'>
                {val._id}
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                padding: '40px'
            }}>
                <ul>
                    {
                        val.products.map((val, index) => (
                            <li key={index}>{val.productId.name}</li>
                        ))
                    }
                </ul>
                <span>total price: ({val.totalPrice})</span>
                <span>payment type: ({val.paymentType})</span>
                <span>payment status: ({val.paymentStatus})</span>
            </div>
            <div
                style={{
                    boxSizing: "border-box",
                    padding: "100px",
                    display: "flex",
                    alignItems: "center",
                }}
            >
                <div className="orderTrack">
                    {val.orderStatus.map((_val, _index) => (
                        <div
                            className={`orderStatus ${_val.isCompleted == true ? "active" : ""
                                }`}
                        >
                            <div
                                className={`point ${_val.isCompleted == true ? "active" : ""}`}
                            ></div>
                            <div className="orderInfo">
                                <div className="status">{_val.type}</div>
                                <div className="date">{handleDate(_val.date ? _val.date : '')}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={{
                    marginLeft: '30px'
                }}>
                    <select onChange={e => setselectType(e.target.value)}>
                        <option value=''>update status</option>
                        {
                            val.orderStatus.map((val, index) => (
                                !val.isCompleted ? < option value={val.type} > {val.type}</option> : null
                            ))
                        }
                    </select>
                    <button
                        onClick={() => handleUpdateOrderStatus(val._id)}
                        style={{
                            marginLeft: '30px'
                        }}
                    >Update</button>
                </div>
            </div>
        </div>
    )
}

export default Items
