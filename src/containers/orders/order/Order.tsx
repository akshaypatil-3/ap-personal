import React, { useEffect, useState } from "react";
import PaymentDetails from "./paymentdetails/PaymentDetails";
import TimeLine from "./timeline/TimeLine";
import CustomerDetails from "./customerdetails/CustomerDetails";
import OrderDetails from "./orderdetails/OrderDetails";
import "./order.scss";
import BreadCrumb from "../../../components/breadcrumb/BreadCrumb";
import { BreadCrumbLink } from "../../../components/breadcrumb/type";
import { useLocation, useNavigate, useParams } from "react-router";
import { ReplyIcon } from "../../../components/icons/FontAwesomeIcons";
const defaultBreadCrumbLinks: BreadCrumbLink[] = [
  {
    label: "Dashboard",
    url: "",
    disabled: true,
  },
  {
    label: "Orders",
    url: "",
    disabled: true,
  },
];

const Order = (): JSX.Element => {
  const location = useLocation();
  const state = location?.state;
  const [activeTab, setActiveTab] = useState<string>(
    state && state.activeTab ? state.activeTab : "timeline"
  );
  const [breadCrumbLinks, setBreadCrumbLinks] = useState<BreadCrumbLink[]>([]);
  const { orderId } = useParams();
  const navigate = useNavigate();
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleBackToOrder = () => {
    navigate("/orders");
  };
  useEffect(() => {
    setBreadCrumbLinks([
      ...defaultBreadCrumbLinks,
      {
        label: `${state?.data?.store} - Order #${orderId}`,
        disabled: false,
        url: "orderdetails",
      },
    ]);
  }, []);
  return (
    <div className="order">
      <div>
        <div className="pl-1 pb-1 displayFlex">
          <BreadCrumb {...{ links: [...breadCrumbLinks] }} />
          <div className="backToOrderBtn displayFlex">
            <button onClick={handleBackToOrder} className="btn">
              {ReplyIcon} <span className="pl-1">Back To Orders</span>{" "}
            </button>
          </div>
        </div>
        <div className="tab pl-2">
          <div
            className={`btn ${activeTab === "timeline" && "active"}`}
            onClick={() => handleTabClick("timeline")}
          >
            Timeline
          </div>
          <div
            className={`btn ${activeTab === "paymentdetails" && "active"}`}
            onClick={() => handleTabClick("paymentdetails")}
          >
            Payment Details
          </div>
          <div
            className={`btn ${activeTab === "orderdetails" && "active"}`}
            onClick={() => handleTabClick("orderdetails")}
          >
            Order Details
          </div>
          <div
            className={`btn ${activeTab === "customerdetails" && "active"}`}
            onClick={() => handleTabClick("customerdetails")}
          >
            Customer Details
          </div>
        </div>
        <div className="tabContent">
          {activeTab === "timeline" && (
            <TimeLine {...{ trackNumber: "23233333" }} />
          )}
          {activeTab === "paymentdetails" && <PaymentDetails />}
          {activeTab === "orderdetails" && <OrderDetails />}
          {activeTab === "customerdetails" && <CustomerDetails />}
        </div>
      </div>
    </div>
  );
};
export default Order;
