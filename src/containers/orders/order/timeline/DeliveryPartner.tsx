import React from "react";
import {
  ChatIcon,
  PhoneIcon,
} from "../../../../components/icons/FontAwesomeIcons";
import "./timeline.scss";

export interface DeliveryPartnerProps {
  name: string;
}
const DeliveryPartner = (props: DeliveryPartnerProps): JSX.Element => {
  return (
    <div className="deliveryPartner">
      <div className="title pb-1"> Delivery Partner</div>
      <div className="name pb-3"> {props.name}</div>
      <div className="btnCtrl">
        <div className="btn btnPhone">{PhoneIcon}Call</div>
        <div className="btn btnChat">{ChatIcon}Chat</div>
      </div>
    </div>
  );
};

export default DeliveryPartner;
