import "./icons.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserGroup } from "@fortawesome/free-solid-svg-icons/faUserGroup";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons/faCalendarDays";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons/faCartShopping";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { faBell } from "@fortawesome/free-regular-svg-icons/faBell";
import { faUser } from "@fortawesome/free-regular-svg-icons/faUser";
import { faCircle } from "@fortawesome/free-solid-svg-icons/faCircle";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons/faAngleDown";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons/faAngleUp";
import { faEye } from "@fortawesome/free-regular-svg-icons/faEye";
import { faEyeSlash } from "@fortawesome/free-regular-svg-icons/faEyeSlash";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons/faEllipsisVertical";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons/faEllipsis";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons/faGreaterThan";
import { faReply } from "@fortawesome/free-solid-svg-icons/faReply";
import { faFilter } from "@fortawesome/free-solid-svg-icons/faFilter";
import dashboard from "../../assets/images/dashboard.svg";
import dashboardActive from "../../assets/images/dashboard-active.svg";
import spli from "../../assets/images/spli.svg";
import order from "../../assets/images/order.svg";
import orderDone from "../../assets/images/icn-stepdone.png";
import orderInProgress from "../../assets/images/icn-stepinprogress.png";
import orderStatusPending from "../../assets/images/icn-pendingstep.png";
import barsList from "../../assets/images/bars-list.svg";
import phone from "../../assets/images/icn-call.png";
import chat from "../../assets/images/icn-chat.png";
import infoCircle from "../../assets/images/info-circle.svg";
import spliOrange from "../../assets/images/spli-orange.svg";
import store from "../../assets/images/store.svg";
import truck from "../../assets/images/truck.svg";
import status from "../../assets/images/status.svg";
import calendarClock from "../../assets/images/calendar-clock.svg";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons/faTrashCan";
import { faXmark } from "@fortawesome/free-solid-svg-icons/faXmark";
import { faGear } from "@fortawesome/free-solid-svg-icons/faGear";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons/faCircleQuestion";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons/faChevronRight";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons/faArrowRightFromBracket";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons/faAngleRight";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons/faMagnifyingGlass";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons/faUserPlus";
import { faFileExport } from "@fortawesome/free-solid-svg-icons/faFileExport";
import { faGripLines } from "@fortawesome/free-solid-svg-icons/faGripLines";

export const UserGroupIcon = <FontAwesomeIcon icon={faUserGroup} />;
export const CalendarDaysIcon = <FontAwesomeIcon icon={faCalendarDays} />;
export const CartShoppingIcon = <FontAwesomeIcon icon={faCartShopping} />;
export const BellIcon = <FontAwesomeIcon className="bellIcon" icon={faBell} />;
export const penToSquareIcon = <FontAwesomeIcon icon={faPenToSquare} />;
export const TrashCanIcon = <FontAwesomeIcon icon={faTrashCan} />;
export const XmarkIcon = <FontAwesomeIcon icon={faXmark} />;
export const GearIcon = <FontAwesomeIcon icon={faGear} />;
export const CircleQuestionIcon = <FontAwesomeIcon icon={faCircleQuestion} />;
export const ChevronRightIcon = <FontAwesomeIcon icon={faChevronRight} />;
export const FilterIcon = <FontAwesomeIcon icon={faFilter} />;
export const ArrowRightFromBracketIcon = (
  <FontAwesomeIcon icon={faArrowRightFromBracket} />
);

export const ArrowRightIcon = <FontAwesomeIcon icon={faAngleRight} />;
export const MagnifyingGlassIcon = (
  <FontAwesomeIcon className="searchIcon" icon={faMagnifyingGlass} />
);
export const UserPlusIcon = (
  <FontAwesomeIcon className="userPlusIcon" icon={faUserPlus} />
);
export const FileExportIcon = (
  <FontAwesomeIcon className="fileExportIcon" icon={faFileExport} />
);
export const GripLinesIcon = (
  <FontAwesomeIcon className="gripLinesIcon" icon={faGripLines} />
);
export const PenToSquareIcon = <FontAwesomeIcon icon={faPenToSquare} />;
export const EyeIcon = <FontAwesomeIcon icon={faEye} />;
export const EyeSlashIcon = <FontAwesomeIcon icon={faEyeSlash} />;

export const EllipsisVerticalIcon = (
  <FontAwesomeIcon icon={faEllipsisVertical} />
);
export const EllipsisIcon = <FontAwesomeIcon icon={faEllipsis} />;
export const GreaterThanIcon = <FontAwesomeIcon icon={faGreaterThan} />;
export const ReplyIcon = <FontAwesomeIcon icon={faReply} />;
export const AngleDownIcon = (
  <FontAwesomeIcon className="angleIcon" icon={faAngleDown} />
);
export const AngleUpIcon = (
  <FontAwesomeIcon className="angleIcon" icon={faAngleUp} />
);
export const CircleIcon = (
  <FontAwesomeIcon className="circleIcon" icon={faCircle} />
);

export const CaretDownIcon = (() => {
  return (
    <div className="circle caretDown">
      <FontAwesomeIcon icon={faCaretDown} />
    </div>
  );
})();

export const UserIcon = (() => {
  return (
    <div className="circle user pa-1">
      <FontAwesomeIcon className="userIcon" icon={faUser} />
    </div>
  );
})();

export const DashboardActiveIcon = (() => {
  return <img src={dashboardActive} />;
})();
export const DashboardIcon = (() => {
  return <img src={dashboard} />;
})();

export const SpliIcon = (() => {
  return (
    <div className="pa-1">
      <img src={spli} />
    </div>
  );
})();

export const OrderIcon = (() => {
  return (
    <div>
      <img src={order} />
    </div>
  );
})();

export const VerticalPipeIcon = (() => {
  return (
    <div className="pipeIcon pa-1">
      <span></span>
    </div>
  );
})();

export const PhoneIcon = (() => {
  return (
    <div className="phoneIcon">
      <img src={phone} />
    </div>
  );
})();

export const ChatIcon = (() => {
  return (
    <div className="chatIcon">
      <img src={chat} />
    </div>
  );
})();

export const OrderDoneIcon = (() => {
  return (
    <div className="orderStepIcon">
      <img src={orderDone} />
    </div>
  );
})();
export const OrderInProgressIcon = (() => {
  return (
    <div className="orderStepIcon">
      <img src={orderInProgress} />
    </div>
  );
})();
export const OrderStatusPendingIcon = (() => {
  return (
    <div className="orderStepIcon">
      <img src={orderStatusPending} />
    </div>
  );
})();

export const BarsListIcon = (() => {
  return <img src={barsList} />;
})();

export const InfoCircleIcon = (() => {
  return <img src={infoCircle} />;
})();

export const SpliOrangeIcon = (() => {
  return <img src={spliOrange} />;
})();

export const StoreIcon = (() => {
  return <img src={store} />;
})();
export const TruckIcon = (() => {
  return <img src={truck} />;
})();
export const StatusIcon = (() => {
  return <img src={status} />;
})();
export const CalendarClockIcon = (() => {
  return <img src={calendarClock} />;
})();
