import React from "react";
import {
  OrderDoneIcon,
  OrderInProgressIcon,
  OrderStatusPendingIcon,
} from "../../../../components/icons/FontAwesomeIcons";
import { TrackStatus, TrackType } from "../../../../services/types";
import "./timeline.scss";

interface TrackerPointProps extends TrackType {}
const TrackerPoint = (props: TrackerPointProps): JSX.Element => {
  const getIcon = (trackStatus: TrackStatus) => {
    switch (trackStatus) {
      case "DONE":
        return OrderDoneIcon;
        break;

      case "IN_PROGRESS":
        return OrderInProgressIcon;
        break;

      case "NOT_STARTED":
        return OrderStatusPendingIcon;
        break;

      default:
        return OrderStatusPendingIcon;
    }
  };
  return (
    <div className="trackerPoint">
      <div className="status">{props.track}</div>
      <div>
        {getIcon(props.trackStatus)}
        {props.processDateTime}
      </div>
    </div>
  );
};

export default TrackerPoint;
