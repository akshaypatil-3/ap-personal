import React, {useState} from "react";
import { Link } from "react-router-dom";

import {
  CaretDownIcon,
  UserGroupIcon,
  ArrowRightFromBracketIcon, UserIcon
} from "../../icons/FontAwesomeIcons";

import "./userinfo.scss";

interface ComponentProps {
  name?: string;
  role?: string;
  email?: string;
}
const UserInfo = ({ name, role, email }: ComponentProps) => {
  const [isShowProfile, setIsShowProfile] = useState<boolean>(false);

  const handleProfileDropdown = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsShowProfile(!isShowProfile);
  };

  return (
    <div className="userInfo pl-1 ">
      {/*<div className="name pr-2">{name}</div>*/}
      <div onClick={handleProfileDropdown}>
        {CaretDownIcon}
        {(isShowProfile !== undefined && isShowProfile) && (
          <div className="profileDropdown">
            <div className="profileContainer">
              <div className="profileImageWrapper">
                {UserIcon}
              </div>
              <div className="profileDetailsWrapper">
                <div className="profileName">{ name }</div>
                <div className="profileRole">{ role }</div>
                <div className="profileEmail">{ email }</div>
              </div>
            </div>
            <div className="actionContainer">
              <Link to="/">
                Logout {ArrowRightFromBracketIcon}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default UserInfo;
