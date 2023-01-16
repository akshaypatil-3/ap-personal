import React, { useEffect, useState } from "react";

import { DTColumnDef } from "../../../../components/datatable/type";
import { EllipsisVerticalIcon } from "../../../../components/icons/FontAwesomeIcons";
import {
  getOrderDetails,
  getProductSummary,
} from "../../../../services/orders";
import { OrderDetailsType, ProductSummary } from "../../../../services/types";
import "./orderdetails.scss";
import ProductSummeryComponent from "./ProductSummary";

const OrderDetails = (): JSX.Element => {
  const [productSummaryData, setProductSummaryData] = useState<
    ProductSummary[]
  >([]);

  const [orderDetails, setOrderDetails] = useState<OrderDetailsType>();

  const getProductSummaryDetails = () => {
    getProductSummary().then((res: { data: ProductSummary[] }) => {
      setProductSummaryData(res.data);
    });
  };

  const getOrderDetailsCall = () => {
    getOrderDetails().then((res: { data: OrderDetailsType }) => {
      setOrderDetails(res.data);
    });
  };

  useEffect(() => {
    getProductSummaryDetails();
    getOrderDetailsCall();
  }, []);

  return (
    <div className="orderTabContentContainer orderDetails pa-5">
      <div className="details pb-5">
        <div className="leftSection">
          <div className="title pb-2">Overview</div>
          <div className="itemsWrapper">
            <div className="item pb-1">
              <label htmlFor="" className="itemLabel">
                Order Created
              </label>
              <div className="itemValue">{orderDetails?.orderCreatedDate}</div>
            </div>
            <div className="item  pb-1">
              <label htmlFor="" className="itemLabel">
                Delivery Mode
              </label>
              <div className="itemValue">{orderDetails?.deliveryMode}</div>
            </div>
            <div className="item  pb-1">
              <label htmlFor="" className="itemLabel">
                Note
              </label>
              <div className="itemValue">{orderDetails?.note}</div>
            </div>
            <div className="item  pb-1">
              <label htmlFor="" className="itemLabel">
                Payment
              </label>
              <div className="itemValue">{orderDetails?.payment}</div>
            </div>
            <div className="item  pb-1">
              <label htmlFor="" className="itemLabel">
                Delivery Date
              </label>
              <div className="itemValue">{orderDetails?.deliveryDate}</div>
            </div>
          </div>
        </div>

        <div className="rightSection">
          <div className="title pb-2">Invoice</div>
          <div className="itemsWrapper">
            <div className="item pb-1">
              <label htmlFor="" className="itemLabel">
                Sub Total
              </label>
              <div className="itemValue pr-1">{orderDetails?.subTotal}</div>
            </div>
            <div className="item pb-1">
              <label htmlFor="" className="itemLabel">
                Total Discount
              </label>
              <div className="itemValue pr-1">
                -{orderDetails?.totalDiscount}
              </div>
            </div>
            <div className="item pb-1">
              <label htmlFor="" className="itemLabel">
                Tax
              </label>
              <div className="itemValue pr-1">{orderDetails?.tax}</div>
            </div>
            <div className="total item">
              <label htmlFor="" className="itemLabel">
                Total Payable
              </label>
              <div className="itemValue pr-1">{orderDetails?.totalPayable}</div>
            </div>
          </div>
        </div>
      </div>

      <ProductSummeryComponent {...{ data: productSummaryData }} />
    </div>
  );
};
export default OrderDetails;
