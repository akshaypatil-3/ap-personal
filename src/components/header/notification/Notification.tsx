import React from "react";
import "./notification.scss";
import { BellIcon, CircleIcon } from "../../icons/FontAwesomeIcons";

const Notification = () => {
  return (
    <div className="notificationIcon">
      {CircleIcon}
      {BellIcon}
    </div>
  );
};
export default Notification;
