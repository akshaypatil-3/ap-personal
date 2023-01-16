import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

import {
  UserGroupIcon,
  CalendarDaysIcon,
  CartShoppingIcon,
  DashboardIcon,
  DashboardActiveIcon,
  GearIcon,
  CircleQuestionIcon,
} from "../icons/FontAwesomeIcons";

import "./sidenav.scss";

const ORDERS_TAB = "orders";
const USERS_TAB = "users";
const SCHEDULERS_TAB = "schedules";

const SideNav = (): JSX.Element => {
  const location = useLocation();
  const pathname = location.pathname;
  const handleActiveTag = (tag: string) => {};

  return (
    <div className="sideNav">
      <div className="upperNav">
        <div className={`navItem ${pathname === "/" ? "active" : ""}`}>
          <Link to="/">
            <div className="navItemIcon">
              {/*{ DashboardActiveIcon }
              { DashboardIcon }*/}
              {pathname === "/" ? DashboardActiveIcon : DashboardIcon}
            </div>
          </Link>
        </div>
        <div
          className={`navItem ${pathname.includes(ORDERS_TAB) ? "active" : ""}`}
        >
          <Link to="/orders">
            <div className="navItemIcon">
              {CartShoppingIcon}
            </div>
          </Link>
        </div>
        <div
          className={`navItem ${
            pathname.includes(SCHEDULERS_TAB) ? "active" : ""
          }`}
        >
          <Link to="/schedules">
            <div className="navItemIcon">
              {CalendarDaysIcon}
            </div>
          </Link>
        </div>
        <div
          className={`navItem ${pathname.includes(USERS_TAB) ? "active" : ""}`}
        >
          <Link to="/users">
            <div className="navItemIcon">
              {UserGroupIcon}
            </div>
          </Link>
        </div>
      </div>
      <div className="lowerNav">
        <div className="navItem">
          <Link to="/">
            <div className="navItemIcon">
              {GearIcon}
            </div>
          </Link>
        </div>
        <div className="navItem">
          <Link to="/">
            <div className="navItemIcon">
              {CircleQuestionIcon}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default SideNav;
