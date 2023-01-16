import React, { useEffect, useState } from "react";
import { getPaymentDetails } from "../../../../services/orders";
import { PaymentDetailsType } from "../../../../services/types";
import "./paymentdetails.scss";

const PaymentDetails = (): JSX.Element => {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsType>();
  const getProductSummaryDetails = () => {
    getPaymentDetails().then((res: { data: PaymentDetailsType }) => {
      setPaymentDetails(res.data);
    });
  };

  useEffect(() => {
    getProductSummaryDetails();
  }, []);

  return (
    <div className="orderTabContentContainer paymentDetails pa-5">
      <div className="title pb-2">Payment</div>
      <div className="details">
        <div className="leftSection">
          <div className="item pb-2">
            <label htmlFor="" className="itemLabel">
              Date
            </label>
            <div className="itemValue">{paymentDetails?.date}</div>
          </div>
          <div className="item pb-2">
            <label htmlFor="" className="itemLabel">
              Gateway
            </label>
            <div className="itemValue">{paymentDetails?.gateway}</div>
          </div>
          <div className="item pb-2">
            <label htmlFor="" className="itemLabel">
              Transaction ID
            </label>
            <div className="itemValue">{paymentDetails?.transactionId}</div>
          </div>
          <div className="item pb-2">
            <label htmlFor="" className="itemLabel">
              State
            </label>
            <div className="itemValue">{paymentDetails?.state}</div>
          </div>
        </div>
        <div className="rightSection">
          <label htmlFor="">Amount Paid</label>
          <div className="itemValue">{paymentDetails?.amount}</div>
        </div>
      </div>
    </div>
  );
};
export default PaymentDetails;
