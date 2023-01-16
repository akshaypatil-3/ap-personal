import React from "react";
import { ArrowRightIcon, GreaterThanIcon } from "../icons/FontAwesomeIcons";
import { BreadCrumbLink } from "./type";
import "./breadcrumb.scss";
const BreadCrumb = ({ links }: { links: BreadCrumbLink[] }) => {
  return (
    <div className="breadcrumb">
      {links.length > 0 &&
        links.map((link: BreadCrumbLink, index: number) => {
          return (
            <div className="link pr-1" key={index}>
              {link.url ? (
                <a href={link.url}>{link.label}</a>
              ) : (
                <>{link.label}</>
              )}
              <span className="pl-1">
                {links.length > index + 1 && <span>&gt;</span>}
              </span>
            </div>
          );
        })}
    </div>
  );
};
export default BreadCrumb;
