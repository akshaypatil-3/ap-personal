import React from "react";
import { TrackType } from "../../../../services/types";
import "./timeline.scss";
import TrackerPoint from "./TrackerPoint";

export interface TrackerProps {
  tracks: TrackType[];
}

const TrackLabel = {
  ORDER_DELIVERED: "Order Delivered",
  ORDER_IN_TRANSIT: "Order In Transit",
  ORDER_DISPATCHED: "Order Dispatched",
  ORDER_PROCESSED: "Order Processed",
  PAYMENT_CONFIRMED: "Payment Confirmed",
  ORDER_PLACED: "Order Placed",
};
const Tracker = (props: TrackerProps): JSX.Element => {
  return (
    <div className="tracker">
      {props.tracks?.map((trackObj: TrackType) => {
        return (
          <TrackerPoint
            {...{
              ...trackObj,
              track: TrackLabel[trackObj.track as keyof object],
            }}
            key={trackObj.track}
          />
        );
      })}
    </div>
  );
};

export default Tracker;
