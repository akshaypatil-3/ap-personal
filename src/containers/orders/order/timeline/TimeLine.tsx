import React, { useEffect, useState } from "react";
import { getTimelinesDetails } from "../../../../services/orders";
import { TimelineDetailsType } from "../../../../services/types";
import DeliveryAddress from "./DeliveryAddress";
import DeliveryPartner from "./DeliveryPartner";
import "./timeline.scss";
import Tracker from "./Tracker";

export interface TimeLineProps {
  trackNumber: string;
}

const TimeLine = (props: TimeLineProps): JSX.Element => {
  const [timelineDetails, setTimelineDetails] = useState<TimelineDetailsType>();

  const getTimelineDetailsCall = () => {
    getTimelinesDetails().then((res: { data: TimelineDetailsType }) => {
      setTimelineDetails(res.data);
    });
  };

  useEffect(() => {
    getTimelineDetailsCall();
  }, []);

  return (
    <div className="orderTabContentContainer timeLineContainer pa-2">
      <div className="timeline">
        <div className="leftSection">
          <div className="headerSection">
            <div className="trackNumber pt-1">
              Tacker Number: {timelineDetails?.trackNumber}
            </div>

            <button className="btn btnDelivered">Order Delivered</button>
          </div>

          <Tracker {...{ tracks: timelineDetails?.tracks || [] }} />
        </div>
        <div className="rightSection">
          <div>
            {timelineDetails?.deliveryAddress && (
              <DeliveryAddress {...timelineDetails?.deliveryAddress} />
            )}
          </div>
          <div className="pt-4">
            <DeliveryPartner
              {...{ name: timelineDetails?.deliveryPartner || "" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeLine;
