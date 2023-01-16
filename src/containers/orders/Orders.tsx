import React, { useEffect, useState } from "react";

import DataGrid from "../../components/datagrid/DataGrid";
import {
  ColumnDef,
  DataGridProps,
  IndicatorProps,
} from "../../components/datagrid/type";
import {
  PenToSquareIcon,
  SpliIcon,
  SpliOrangeIcon,
  VerticalPipeIcon,
  TruckIcon,
  StatusIcon,
  StoreIcon,
  XmarkIcon,
  CalendarClockIcon,
} from "../../components/icons/FontAwesomeIcons";

import { searchOrder } from "../../services/orders";
import { Order } from "../../services/types";

import SearchInput from "../../components/searchinput/SearchInput";
import { SearchInputProps } from "../../components/searchinput/prop";

import ExportButton from "../../components/exportbutton/ExportButton";
import { ExportButtonProps } from "../../components/exportbutton/prop";

import OverviewSidebar from "../../components/overviewsidebar/OverviewSidebar";
import { OverviewSidebarProps } from "../../components/overviewsidebar/prop";

import "./orders.scss";
import { useNavigate } from "react-router";

function callAPI() {
  console.log("call api to get repsonse**");
}

const indicators: IndicatorProps[] = [
  {
    icon: () => {
      return PenToSquareIcon;
    },
    iconClass: "orange",
    label: "Modified Orders",
  },
  {
    icon: () => {
      return SpliOrangeIcon;
    },
    label: "Split Orders",
  },
];

function handlePageSizeChange() {}
function handlePageClick() {}

const Orders = () => {
  const handleSplitOrderClick = (
    e: React.MouseEvent<HTMLElement>,
    data: Order
  ) => {
    /* Need to handle server side export here */
    e.stopPropagation();
    e.preventDefault();
    navigation(`orderdetails/${data.orderId}`, {
      state: { data, activeTab: "orderdetails" },
    });
  };

  const columns: ColumnDef<Order>[] = [
    {
      fieldName: "orderId",
      headerName: "#",
      sortable: false,
      hidden: true,
      allowFilter: false,

      rerender: (data: Order) => {
        return (
          <div className="checkbox">
            <span
              className={data.status ? data.status.toLocaleLowerCase() : ""}
            >
              {VerticalPipeIcon}
            </span>
            <input type="checkbox" />
          </div>
        );
      },
      width: "50px",
      maxWidth: "50px",
    },
    {
      fieldName: "orderId",
      headerName: "Order Id",
      width: "80px",
      dataType: "NUMBER",
      alignItem: "left",
    },
    {
      fieldName: "orderDate",
      headerName: "Order Date",
      width: "120px",
      dataType: "DATE",
      alignItem: "left",
    },
    {
      fieldName: "store",
      headerName: "Store",
      dataType: "OPTIONS",
      rerenderTag: (data: JSX.Element) => {
        return (
          <>
            {StoreIcon}
            {data}
          </>
        );
      },
      options: [
        {
          optionId: "lakeOrionGrocery",
          optionValue: "Lake Orion Grocery",
        },
        {
          optionId: "macombTwpGrocery",
          optionValue: "Macomb Twp Grocery",
        },
      ],
      filterValues: "Lake Orion",
      alignItem: "left",
    },
    {
      fieldName: "customer",
      headerName: "Customer",
      alignItem: "left",
    },
    {
      fieldName: "quantity",
      headerName: "Quantity",
      width: "80px",
      maxWidth: "80px",
      dataType: "NUMBER",
      alignItem: "right",
    },
    {
      fieldName: "orderValue",
      headerName: "Order Value",
      dataType: "NUMBER",
      alignItem: "right",
      maxWidth: "120px",
    },
    {
      fieldName: "deliveryDate",
      headerName: "Delivery Date",
      width: "120px",
      dataType: "DATE_TIME",
      filterValues: "Nov 18 to 21, 9:00 to 9:45",
      alignItem: "left",
      rerenderTag: (data: JSX.Element) => {
        return (
          <>
            {CalendarClockIcon}
            {data}
          </>
        );
      },
    },
    {
      fieldName: "deliveryMode",
      headerName: "Delivery Mode",
      dataType: "OPTIONS",
      filterValues: "Home Delivery, Pickup",
      alignItem: "left",
      width: "130px",
      maxWidth: "130px",
      options: [
        {
          optionId: "pickup",
          optionValue: "Pick up",
        },
        {
          optionId: "homedelivery",
          optionValue: "Home Delivery",
        },
      ],
      rerenderTag: (data: JSX.Element) => {
        return (
          <>
            {TruckIcon}
            {data}
          </>
        );
      },
    },
    {
      fieldName: "status",
      headerName: "Status",
      width: "180px",
      alignItem: "left",
      options: [
        {
          optionId: "Pending",
          optionValue: "Pending",
        },
        {
          optionId: "Prepared",
          optionValue: "Prepared",
        },
        {
          optionId: "Delayed",
          optionValue: "Delayed",
        },
        {
          optionId: "Delivered",
          optionValue: "Delivered",
        },
      ],
      rerender: (data: Order) => {
        return (
          <div className="status">
            <div className={data.status ? data.status.toLocaleLowerCase() : ""}>
              {data.status}
            </div>
            <div className="trackStatusMsg">{data.trackStatus}</div>
          </div>
        );
      },
      rerenderTag: (data: JSX.Element) => {
        return (
          <>
            {StatusIcon}
            {data}
          </>
        );
      },
      dataType: "OPTIONS",
      filterValues: "Pending, Prepared, Delivered, Delayed, Staging",
    },
    {
      fieldName: "orderId",
      headerName: "",
      alignItem: "right",
      allowFilter: false,
      sortable: false,
      hidden: true,
      rerender: (data: Order) => {
        return (
          <div className="action orange">
            {PenToSquareIcon}
            <span
              onClick={(e) => handleSplitOrderClick(e, data)}
              className="pl-2"
            >
              {SpliOrangeIcon}
            </span>
          </div>
        );
      },
      width: "80px",
    },
    {
      fieldName: "pickupSlotId",
      headerName: "Pickup Slot Id",
      allowFilter: false,
      sortable: false,
      isVisible: false,
      hidden: true,
      moreColumn: true,
    },
    {
      fieldName: "pickupDate",
      headerName: "Pickup Date",
      allowFilter: false,
      sortable: false,
      isVisible: false,
      hidden: true,
      moreColumn: true,
    },
    {
      fieldName: "scheduleTypeId",
      headerName: "Schedule Type Id",
      allowFilter: false,
      sortable: false,
      isVisible: false,
      hidden: true,
      moreColumn: true,
    },
  ];

  const navigation = useNavigate();
  const handleSearch = (searchTerm: any) => {
    /* Need to handle server side pagination here */
    console.log("Search term => ", searchTerm);
  };

  const redirectToOrderDetails = () => {};
  const searchInputData: SearchInputProps = {
    showIcon: true,
    placeholder:
      "Search for order ID, customer name, order status, date, store number, phone number",
    handleSearch,
  };

  const handleExport = () => {
    /* Need to handle server side export here */
    console.log("Handle export");
  };
  const handleRowClick = (data: Order) => {
    /* Need to handle server side export here */
    console.log("Handle export", data);
    navigation(`orderdetails/${data.orderId}`, { state: { data } });
  };

  const exportButtonData: ExportButtonProps = {
    showIcon: true,
    handleExport,
  };

  const ordersOverviewData: OverviewSidebarProps = {
    showOverview: true,
    storeName: "",
    totalStores: 2,
    pending: 38,
    delivered: 145,
    canceled: 10,
    modified: 7,
  };

  const dataGridMockData: DataGridProps<Order> = {
    columns: columns,
    rows: [],
    showAdvanceFilter: true,
    indicators: indicators,
    handlePageSizeChange,
    handlePageClick,
    handleRowClick,
  };

  const [ordersData, setOrdersData] =
    useState<DataGridProps<Order>>(dataGridMockData);

  useEffect(() => {
    searchOrder().then((res) => {
      setOrdersData({ ...dataGridMockData, rows: res.data });
    });
  }, []);

  return (
    <div className="listWrapper">
      <div className="listTitle">Orders</div>

      <div className="listActionsWrapper">
        <SearchInput {...searchInputData} />

        <div className="actionsWrapper">
          <ExportButton {...exportButtonData} />

          <OverviewSidebar {...ordersOverviewData} />
        </div>
      </div>

      <div className="listDataGridWrapper ordersSearch">
        <DataGrid {...ordersData} />
      </div>
    </div>
  );
};
export default Orders;
