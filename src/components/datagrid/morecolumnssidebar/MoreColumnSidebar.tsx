import React, {useEffect, useState} from "react";
import {
  EllipsisVerticalIcon,
  XmarkIcon,
} from "../../icons/FontAwesomeIcons";
import {ColumnDef} from "../type";

import "./morecolumnsidebar.scss";

interface MoreColProps<T> {
  columns: ColumnDef<T>[];
  data: any
}

const MoreColumnSidebar = <T extends any>({ columns, data }: MoreColProps<T>): JSX.Element => {
  const [isOpenMoreColumn, setIsOpenMoreColumn] = useState(false);
  const [moreColumns, setMoreColumns] = useState<ColumnDef<T>[]>([]);

  useEffect(() => {
    const moreCols = columns.filter(
      (col: ColumnDef<T>) =>
        (col.moreColumn)
    );
    setMoreColumns(moreCols);
  }, [columns]);

  const handleMoreClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();

    setIsOpenMoreColumn(!isOpenMoreColumn);
  };

  let sIndex = 0;

  return (
    <>
      {
        moreColumns && moreColumns.length > 0 &&
        <>
          <div className="moreColumnTrigger"
               onClick={handleMoreClick}>
            {EllipsisVerticalIcon}
          </div>

          <div className={`sidebarWrapper moreColumnWrapper ${isOpenMoreColumn ? 'show' : ''}`}>
            <div className="sidebarContainer moreColumnContainer">
              <div className="sidebarHeader">
                {columns &&
                  data && data['orderId' as keyof object] &&
                  <div className="sidebarTitle">
                      Order #{data['orderId' as keyof object] || ""}
                  </div>
                }

                <button type="button" className="sidebarClose" aria-label="Close"
                        onClick={handleMoreClick}>
                  {XmarkIcon}
                </button>
              </div>

              <div className="sidebarDetails moreColumnDetails">
                {columns &&
                  data && (data['customer' as keyof object] || data['orderDate' as keyof object]) &&
                  <div
                      key="customer"
                      className="moreColumnItem border-bottom"
                  >
                      <div className="moreColumnLabel">{data['customer' as keyof object] || ""}</div>
                      <div className="moreColumnValue">{data['orderDate' as keyof object] || ""}</div>
                  </div>
                }

                {columns &&
                  data &&
                  columns.filter((col) => col.moreColumn)
                    .map((col) => {
                      sIndex++;
                      const val: any = data[col.fieldName as keyof object] || "";
                      return (
                        <div
                          key={`${col.fieldName}-${col.index}`}
                          className="moreColumnItem"
                        >
                          <div className="moreColumnLabel">{col.headerName}</div>
                          <div className="moreColumnValue">{val}</div>
                        </div>
                      );
                    })
                }
              </div>
            </div>
          </div>
        </>
      }
    </>
  );
};

export default MoreColumnSidebar;
