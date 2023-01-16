import React, {useEffect, useState} from "react";
import {
  XmarkIcon,
} from "../../components/icons/FontAwesomeIcons";

import "./overviewsidebar.scss";
import { OverviewSidebarProps } from "./prop";
import GripLines from "../../assets/images/grip-lines.svg";

const OverviewSidebar = ({
  showOverview = false,
  storeName,
  totalStores,
  pending,
  delivered,
  canceled,
  modified,
}: OverviewSidebarProps): any => {
  const [isOpenOverview, setIsOpenOverview] = useState<boolean>(showOverview);

  const handleOverview = () => {
    setIsOpenOverview(!isOpenOverview);
  };

  return (
    <>
      <button type="button" className="btn btnAction btnPrimary btnOrderOverview"
              onClick={handleOverview}>
        <img src={ GripLines } />
      </button>

      <div className={`sidebarWrapper overviewWrapper ${isOpenOverview ? 'show' : ''}`}>
        <div className="sidebarContainer overviewContainer">
          <div className="sidebarHeader">
            <div className="sidebarTitle">
              Overview
            </div>
            <button type="button" className="sidebarClose" aria-label="Close"
                    onClick={handleOverview}>
              {XmarkIcon}
            </button>
          </div>

          <div className="sidebarDetails overviewDetails">
            {(storeName !== undefined && storeName.trim() !== "") && (
              <div className="storeDetails">
                { storeName }
              </div>
            )}

            {(totalStores !== undefined && totalStores !== 0) && (
              <div className="totalStoreDetails">
                <div className="totalStoreCount">
                  { totalStores }
                </div>
                <div className="totalStoreLabel">
                  Total Stores
                </div>
              </div>
            )}

            <div className="overviewItemsRow">
              <div className="overviewItem">
                <div className="overviewCount">
                  { delivered }
                </div>
                <div className="overviewLabel">
                  Delivered Orders
                </div>
              </div>

              <div className="overviewItem">
                <div className="overviewCount">
                  { pending }
                </div>
                <div className="overviewLabel">
                  Pending Orders
                </div>
              </div>
            </div>

            <div className="overviewItemsRow">
              <div className="overviewItem">
                <div className="overviewCount">
                  { canceled }
                </div>
                <div className="overviewLabel">
                  Canceled
                </div>
              </div>

              <div className="overviewItem">
                <div className="overviewCount">
                  { modified }
                </div>
                <div className="overviewLabel">
                  Modified Orders
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OverviewSidebar;
