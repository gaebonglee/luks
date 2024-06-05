import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PaymentInfo from "../components/checkout/PaymentInfo";
import ShippingInfo from "../components/checkout/ShippingInfo";
import CheckProductInfo from "../components/checkout/CheckProductInfo";
import PaymentMethod from "../components/checkout/PaymentMethod";
import "../style/checkout/Checkout.scss";
import axios from "axios";
import Swal from "sweetalert2";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedItems = location.state?.selectedProductDetails || [];
  const [paymentMethod, setPaymentMethod] = useState("");
  const [shippingInfo, setShippingInfo] = useState({
    address_name: "",
    recipient_name: "",
    phonenumber: "",
    postcode: "",
    basic_address: "",
    detail_address: "",
    request: "",
  });

  const totalAmount = selectedItems.reduce((sum, item) => {
    const price = parseFloat(item.p_price);
    const quantity = parseInt(item.quantity, 10);
    return sum + price * quantity;
  }, 0);

  const handleMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleShippingInfoChange = (info) => {
    setShippingInfo(info);
  };

  const handleCheckout = async () => {
    if (!paymentMethod) {
      Swal.fire("결제 방법을 선택해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/order/checkout",
        {
          orderItems: selectedItems,
          paymentMethod,
          shippingInfo,
          totalAmount,
        },
        { withCredentials: true }
      );

      if (response.data.success) {
        Swal.fire("상품 구매 완료되었습니다.");
        navigate("/confirmed", {
          state: { selectedItems, paymentMethod, shippingInfo, totalAmount },
        });
      } else {
        Swal.fire("상품 구매 실패했습니다.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      Swal.fire("결제 처리 중 오류가 발생했습니다.");
    }
  };

  return (
    <section className="checkout_section">
      <div className="checkout_container">
        <div className="bagAndOrder_title">
          <ul>
            <li>
              <a>01 SHOPPING BAG</a>
            </li>
            <li>
              <a className="changeColor">02 ORDER</a>
            </li>
            <li>
              <a>03 ORDER CONFIRMED</a>
            </li>
          </ul>
        </div>
        <div className="checkout_wrap">
          <div className="shippingInfo_container">
            <ShippingInfo onChange={handleShippingInfoChange} />
            <CheckProductInfo selectedItems={selectedItems} />
            <PaymentMethod onMethodChange={handleMethodChange} />
          </div>
          <div className="paymentInfo_container">
            <PaymentInfo
              totalAmount={totalAmount}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;
