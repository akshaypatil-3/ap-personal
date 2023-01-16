import React from "react";
import "./header.scss";
import LogoWhite from "../../assets/images/logo-white.svg";
import { UserIcon } from "../icons/FontAwesomeIcons";
import UserInfo from "./userinfo/UserInfo";
import Notification from "./notification/Notification";

const Header = () => {
  return (
    <div className="header">
      <div className="headerNavBar">     
        <img className="logo" alt="logo" src={LogoWhite} />
        <div className="rightContainer">
          <Notification />
          {UserIcon}
          <UserInfo
            name="Angelina"
            role="Yantra Admin User"
            email="Angelina@yantra.com"
          />
        </div>
      </div>
    </div>
  );
};
export default Header;
