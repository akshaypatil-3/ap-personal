import axiosRequest from "../utils/axiosRequest";
import { endPoints } from "../utils/endpoints";
import {
  Order,
  ProductSummary,
  PaymentDetailsType,
  CustomerDetailsType,
  OrderDetailsType,
  TimelineDetailsType,
} from "./types";

export const searchOrder = () => {
  return axiosRequest({
    url: endPoints.orders.search,
    options: { method: "GET" },
  }).then((res: { data: Order[] }) => {
    return res;
  });
};

export const getProductSummary = () => {
  return axiosRequest({
    url: endPoints.orderDetails.productSummary,
    options: { method: "GET" },
  }).then((res: { data: ProductSummary[] }) => {
    return res;
  });
};

export const getPaymentDetails = () => {
  return axiosRequest({
    url: endPoints.orderDetails.paymentDetails,
    options: { method: "GET" },
  }).then((res: { data: PaymentDetailsType }) => {
    return res;
  });
};

export const getCustomerDetails = () => {
  return axiosRequest({
    url: endPoints.orderDetails.customerDetails,
    options: { method: "GET" },
  }).then((res: { data: CustomerDetailsType }) => {
    return res;
  });
};

export const getOrderDetails = () => {
  return axiosRequest({
    url: endPoints.orderDetails.orderDetailsOverview,
    options: { method: "GET" },
  }).then((res: { data: OrderDetailsType }) => {
    return res;
  });
};

export const getTimelinesDetails = () => {
  return axiosRequest({
    url: endPoints.orderDetails.timeline,
    options: { method: "GET" },
  }).then((res: { data: TimelineDetailsType }) => {
    return res;
  });
};
