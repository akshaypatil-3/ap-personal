import React, { useEffect, useState } from "react";
import DataTable from "../../../../components/datatable/DataTable";
import { DTColumnDef } from "../../../../components/datatable/type";
import {
  EllipsisIcon,
  EllipsisVerticalIcon,
} from "../../../../components/icons/FontAwesomeIcons";
import { ProductSummary } from "../../../../services/types";

import "./orderdetails.scss";
import ProductSummaryDetails from "./ProductSummaryDetails";

const ProductSummery = ({ data }: { data: ProductSummary[] }): JSX.Element => {
  const [productId, setProductID] = useState<string>();
  const [store1Data, setStore1Data] = useState<ProductSummary[]>([]);
  const [store2Data, setStore2Data] = useState<ProductSummary[]>([]);

  useEffect(() => {
    let store1: ProductSummary[] = [],
      store2: ProductSummary[] = [];

    data.map((summaryData, index) => {
      if (summaryData.storeId === 1) {
        store1.push(summaryData);
      } else {
        store2.push(summaryData);
      }
    });

    setStore1Data(store1);
    setStore2Data(store2);
  }, [data]);

  const showDetails = (e: React.MouseEvent<HTMLElement>, productId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setProductID(productId);
  };
  const columns: DTColumnDef<ProductSummary>[] = [
    {
      fieldName: "productId",
      headerName: "Product ID",
      styleName: "alignLeft",
      width: "100px",
      rerender: (data: ProductSummary, index: string) => {
        return <div>#{data.productId}</div>;
      },
    },
    {
      fieldName: "productName",
      headerName: "Product Name",
      styleName: "alignLeft",
      width: "200px",
    },
    {
      fieldName: "productAvailability",
      headerName: "Product Availability",
      styleName: "alignLeft",
      width: "150px",
      rerender: (data: ProductSummary, index: string) => {
        return (
          <>
            <span
              className={
                `${data.productAvailability}` === "Not Available"
                  ? "textDanger"
                  : ""
              }
            >
              {data.productAvailability}
            </span>
          </>
        );
      },
    },
    {
      fieldName: "identity",
      headerName: "Identity",
      styleName: "alignLeft",
      width: "70px",
      rerender: (data: ProductSummary, index: string) => {
        return (
          <>
            <span
              className={
                `${data.productAvailability}` === "Not Available"
                  ? "textDanger"
                  : ""
              }
            >
              {data.identity}
            </span>
          </>
        );
      },
    },
    {
      fieldName: "quantity",
      headerName: "Quantity",
      styleName: "",
      width: "80px",
    },
    {
      fieldName: "uom",
      headerName: "UoM",
      styleName: "",
      width: "100px",
    },
    {
      fieldName: "weight",
      headerName: "Weight",
      styleName: "",
      width: "100px",
    },
    {
      fieldName: "price",
      headerName: "Price",
      styleName: "",
      width: "100px",
    },
    {
      fieldName: "discount",
      headerName: "Discount",
      styleName: "",
      width: "100px",
    },
    {
      fieldName: "total",
      headerName: "Total",
      styleName: "",
      width: "100px",
    },
    {
      fieldName: "productId",
      headerName: "More",
      styleName: "alignRight",
      rerender: (data: ProductSummary, index: string) => {
        return (
          <div className="detail">
            <div
              className="ellipsisVerticalIcon"
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                showDetails(e, `${data.productId}_${index}`)
              }
            >
              {EllipsisIcon}
            </div>
            {productId === `${data.productId}_${index}` && (
              <ProductSummaryDetails {...data} />
            )}
          </div>
        );
      },
    },
    {
      fieldName: "storeId",
      headerName: "Store Id",
      styleName: "",
      width: "100px",
      isVisible: false,
    },
  ];

  const hideAdvanceOption = () => {
    setProductID("");
  };
  const productSummaryHeader = (storeId: string, date: string) => {
    return (
      <div className="displayFlex psHeader">
        <label className="pa-2">{storeId}</label>
        <div className="pshRight pa-2">
          <label htmlFor="">Ready for pickup: </label>
          <span className="date">{date}</span>
        </div>
      </div>
    );
  };
  useEffect(() => {
    document.addEventListener("click", () => {
      hideAdvanceOption();
    });
    return () => {
      window.removeEventListener("click", hideAdvanceOption);
    };
  }, []);

  return (
    <div className="productSummeryContainer">
      <div className="title pb-2">Product Summary</div>
      <DataTable
        {...{
          header: productSummaryHeader("Store #123", "Nov 27, 2022 | 5:00 pm"),
          columns: columns,
          rows: store1Data,
          uniqueId: 1,
        }}
      />
      <DataTable
        {...{
          header: productSummaryHeader("Store #425", "Nov 27, 2022 | 5:00 pm"),
          columns: columns,
          rows: store2Data,
          uniqueId: 2,
        }}
      />
    </div>
  );
};
export default ProductSummery;
