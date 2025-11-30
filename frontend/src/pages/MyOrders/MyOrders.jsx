import React, { useContext, useEffect, useState } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';
import './MyOrders.css';

const MyOrders = () => {  // ✅ Changed to PascalCase
    const { url, token } = useContext(StoreContext);
    const [data, setData] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.post(url + "/api/order/userorders", {}, { headers: { token } });
            setData(response.data.data);
        } catch (error) {
            console.error("Failed to fetch orders:", error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchOrders();
        }
    }, [token]);

    return (
        <div className="my-orders">
            <h2>My Orders</h2>
            <div className="container">
                {data.map((order, index) => (
                    <div key={order.id || index} className="my-orders-order">  {/* ✅ Fixed key */}
                        <img src={assets.parcel_icon} alt="Order Icon" />
                        <p>
                            {order.items.map((item, idx) => (
                                <span key={idx}>
                                    {item.name} x {item.quantity}{idx !== order.items.length - 1 ? ", " : ""}
                                </span>
                            ))}
                        </p>
                        <p>${order.amount}.00</p>
                        <p>Items: {order.items.length}</p>
                        <p>
                            <span>&#x25cf;</span> <b>{order.status}</b>  {/* ✅ Fixed typo: `statis` → `status` */}
                            <button onClick={fetchOrders}>Track Order</button>
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyOrders;
