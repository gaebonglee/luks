import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import MyOrderProduct from "../myorder/MyOrderProduct";
import BuyerInfo from "../myorder/BuyerInfo";
import MyOrderPaymentInfo from "../myorder/MyOrderPaymentInfo";
import MyOrderShippingInfo from "../myorder/MyOrderShippingInfo";

const MyOrderDetail = () => {
  const location = useLocation();
  const { order } = location.state;
  const [buyerInfo, setBuyerInfo] = useState(null);
  const [shippingInfo, setShippingInfo] = useState(null);

  useEffect(() => {
    const fetchBuyerInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/order/buyer-info`,
          {
            params: { order_id: order[0].order_id },
            withCredentials: true,
          }
        );
        setBuyerInfo(response.data.buyerInfo);
      } catch (error) {
        console.error("There was an error fetching the buyer info!", error);
      }
    };

    const fetchShippingInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/order/shipping-info`,
          {
            params: { order_id: order[0].order_id },
            withCredentials: true,
          }
        );
        setShippingInfo(response.data.shippingInfo);
      } catch (error) {
        console.error("There was an error fetching the shipping info!", error);
      }
    };

    fetchBuyerInfo();
    fetchShippingInfo();
  }, [order]);

  if (!buyerInfo || !shippingInfo) {
    return <div>Loading...</div>;
  }

  return (
    <section className="right_section">
      <div className="MyOrderPage">
        <MyOrderProduct order={order} />
        <BuyerInfo buyerInfo={buyerInfo} />
        <MyOrderPaymentInfo order={order} />
        <MyOrderShippingInfo shippingInfo={shippingInfo} />
      </div>
    </section>
  );
};

export default MyOrderDetail;
