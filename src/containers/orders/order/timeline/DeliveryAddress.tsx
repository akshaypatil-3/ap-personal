import React from "react";
import { DeliveryAddressType } from "../../../../services/types";
import "./timeline.scss";

const DeliveryAddress = (props: DeliveryAddressType): JSX.Element => {
  return (
    <div className="deliveryAddress">
      <div className="title pb-1"> Delivery Address</div>
      <div>
        {props.address1}, {props.address2}, {props.city}, {props.state},
        {props.pincode}
      </div>
    </div>
  );
};

export default DeliveryAddress;
