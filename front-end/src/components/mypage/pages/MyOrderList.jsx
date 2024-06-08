import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../../style/mypage/MyOrderList.scss";
import Review from "../review/Review";

const MyOrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/order/my-orders`,
          {
            withCredentials: true,
          }
        );

        // 주문을 주문 번호별로 그룹화
        const groupedOrders = response.data.orders.reduce((acc, order) => {
          const { order_id } = order;
          if (!acc[order_id]) {
            acc[order_id] = [];
          }
          acc[order_id].push(order);
          return acc;
        }, {});

        // 그룹화된 주문을 내림차순으로 정렬
        const sortedOrders = Object.values(groupedOrders).sort(
          (a, b) => b[0].order_id - a[0].order_id
        );

        setOrders(sortedOrders);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the orders!", error);
        setError("There was an error fetching the orders.");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleOrderClick = (order) => {
    navigate("/mypage/my-order/detail", { state: { order } });
  };

  const handleReviewClick = (event, order) => {
    event.stopPropagation();
    setSelectedOrder(order);
    setIsReviewModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsReviewModalOpen(false);
    setSelectedOrder(null);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <section className="right_section">
      <div className="MyOrderList">
        <h3>주문배송조회</h3>
        <div className="MyOrderList_contents">
          <table className="MyOrderList_table">
            <thead>
              <tr>
                <th>상품정보</th>
                <th>진행상태</th>
                <th>리뷰</th>
              </tr>
            </thead>
            <tbody>
              {orders.length === 0 ? (
                <tr>
                  <td colSpan="3" className="OrderListEmpty">
                    주문 내역이 없습니다.
                  </td>
                </tr>
              ) : (
                orders.map((orderGroup, index) => (
                  <React.Fragment key={index}>
                    <tr onClick={() => handleOrderClick(orderGroup)}>
                      <td colSpan="3">
                        <div className="MyOrderList_orderInfo">
                          <a>
                            <span>주문일자</span>
                            <span className="bold">
                              {new Date(
                                orderGroup[0].order_date
                              ).toLocaleDateString()}
                            </span>
                          </a>
                          <a>
                            <span>주문번호</span>
                            <span className="bold">
                              {orderGroup[0].order_id}
                            </span>
                          </a>
                        </div>
                      </td>
                    </tr>
                    {orderGroup.map((order) => (
                      <tr key={order.product_id}>
                        <td
                          className="MyOrderList_detailWrap"
                          onClick={() => handleOrderClick(orderGroup)}
                        >
                          <img src={order.p_image_url} alt="상품 이미지" />
                          <div className="MyOrderList_detail">
                            <div className="MyOrderList_detail name">
                              {order.p_name}
                            </div>
                            <div className="MyOrderList_detail colorSize">
                              <span>색상: {order.color_name}</span>
                              <span>사이즈: {order.size}</span>
                            </div>
                            <div className="MyOrderList_detail priceWrap">
                              <span>{order.price.toLocaleString()}원</span>
                              <span> / </span>
                              <span>수량 {order.quantity}개</span>
                            </div>
                          </div>
                        </td>
                        <td className="MyOrderList_progress">
                          <p>{order.status}</p>
                        </td>
                        <td className="MyOrderList_review">
                          <a
                            onClick={(event) => handleReviewClick(event, order)}
                          >
                            리뷰작성
                          </a>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isReviewModalOpen && (
        <Review
          isOpen={isReviewModalOpen}
          onRequestClose={closeReviewModal}
          order={selectedOrder}
        />
      )}
    </section>
  );
};

export default MyOrderList;
