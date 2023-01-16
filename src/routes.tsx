import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "./containers/dashboard/Dashboard";
import Login from "./containers/login/Login";
import Order from "./containers/orders/order/Order";
import Orders from "./containers/orders/Orders";
import Schedule from "./containers/schedules/Schedule";
import Users from "./containers/users/Users";

const CustomRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/orders/orderdetails/:orderId" element={<Order />} />
      <Route path="/schedules" element={<Schedule />} />
      <Route path="/users" element={<Users />} />
    </Routes>
  );
};
export default CustomRoutes;
