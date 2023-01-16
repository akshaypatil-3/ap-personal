import React, { useEffect, useMemo, useState } from "react";
import { useWindowSize } from "../../hooks/useWindowSize";
import { Order } from "../../services/types";
import AdvanceFilter from "./advancefilters/AdvanceFilters";
import IndicatorInfo from "./indicatorinfo/IndicatorInfo";
import Columns from "./Columns";
import "./datagrid.scss";
import { DataGridContext } from "./DataGridContext";
import { Pagination } from "./pagination";
import Rows from "./Rows";
import { ColumnDef, DataGridProps } from "./type";
import {
  calculateTotalWidth,
  getActivePageRows,
  DEFAULT_ACTIVE_PAGE,
  ASC,
  DESC,
  sortDataByField,
  manageColumnsWidth,
} from "./utils";

const DataGrid = <T extends Object>(props: DataGridProps<T>): any => {
  const [windowSize, handleWindowResize] = useWindowSize();
  const [totalWidth, setTotalWidth] = useState<number>(0);
  const [gridTemplateCol, setGridTemplateCol] = useState<string>("");
  const [activePageRows, setActivePageRows] = useState<T[]>([]);
  const [allPageRows, setAllPageRows] = useState<T[]>([]);
  const [columns, setColumns] = useState<ColumnDef<T>[]>([]);
  const [totalRecords, setTotalRecords] = useState<number>(0);
  const [activePageNumber, setActivePageNumber] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);

  const handleActivePageData = () => {
    const rows = getActivePageRows(props.rows, activePageNumber, pageSize);
    setActivePageRows(rows);
  };

  useMemo(() => {
    handleWindowResize();
    const totalWidth = calculateTotalWidth(columns);
    if (totalWidth) setTotalWidth(totalWidth);
  }, [columns]);

  useEffect(() => {
    setColumns(
      props.columns.map((col, index) => {
        col.index = index;
        return col;
      })
    );
  }, [props.columns]);

  useEffect(() => {
    if (props.serverSidePagination) {
      if (props.totalRecods === undefined) {
        console.error(
          "incase of  serverside pagination [totalrecods] must be send"
        );
      } else {
        setTotalRecords(props.totalRecods);
      }
      if (props.activePage === undefined) {
        console.error(
          "incase of  serverside pagination [activePage] must be send"
        );
      } else {
        setActivePageNumber(props.activePage);
      }
      setActivePageRows(props.rows);
    } else {
      setTotalRecords(props.rows.length);
      setActivePageNumber(1);
      const rows = getActivePageRows(props.rows);
      setActivePageRows(rows);
      setAllPageRows(props.rows);
    }
  }, [props.rows]);

  useEffect(() => {
    const dgStyle = manageColumnsWidth(columns, windowSize.width);
    setGridTemplateCol(dgStyle);
  }, [windowSize]); // whenever we do resize , datagrid columns width calculated and asign

  useEffect(() => {
    handleActivePageData();
  }, [activePageNumber, pageSize, allPageRows]);

  function handlePageSizeChange(pageSize: number) {
    if (props.serverSidePagination) {
      //TO-DO
    } else {
      setPageSize(pageSize);
      setActivePageNumber(DEFAULT_ACTIVE_PAGE); //once we pagesize get change , reset the active page to DEFAULT_ACTIVE_PAGE
    }
  }

  function handlePageClick(page: number) {
    if (props.serverSidePagination) {
      //TO-DO
    } else {
      setActivePageNumber(page);
      handleActivePageData();
    }
  }

  function handleColumnSort(col: ColumnDef<T>): void {
    const cols = columns.map((column, index) => {
      if (col.fieldName === column.fieldName && col.index === index) {
        column.order = !column.order || column.order === ASC ? DESC : ASC;
      }
      return column;
    });

    setColumns(cols);
    if (props.serverSidePagination) {
      //TO-Do
    } else {
      const rowsData = sortDataByField(
        props.rows,
        col.fieldName as keyof T,
        col.order || ASC
      );
      setAllPageRows(rowsData);
    }
  }

  const handleVisiblity = (col: ColumnDef<T>, isVisible: boolean) => {
    const cols = columns.map((column: ColumnDef<T>) => {
      return {
        ...column,
        isVisible:
          column.fieldName + column.index === col.fieldName + col.index
            ? isVisible
            : column.isVisible,
      };
    });
    setColumns(cols);
  };

  const handleRowClick = (data: T) => {
    props.handleRowClick && props.handleRowClick(data);
  };

  return (
    <div>
      <div className="dataGrid">
        <div className="filterInfoWrapper">
          { props.showAdvanceFilter === undefined || props.showAdvanceFilter &&
              <AdvanceFilter {...{ columns, serverSide: true }} />
          }

          {props.indicators != undefined && <IndicatorInfo {...{indicators: props.indicators}} /> }
        </div>

        <div
          className={`grid`}
          style={{ gridTemplateColumns: gridTemplateCol }}
        >
          <DataGridContext.Provider
            value={{
              columns: columns,
              columnSort: handleColumnSort,
              handleVisiblity: handleVisiblity,
              handleRowClick: handleRowClick,
            }}
          >
            {columns && <Columns data={columns} />}
            {activePageRows && <Rows {...{ data: activePageRows }} />}
          </DataGridContext.Provider>
        </div>
      </div>
      <Pagination
        handlePageSizeChange={handlePageSizeChange}
        handlePageClick={handlePageClick}
        totalRecords={totalRecords}
        activePageNumber={activePageNumber}
        pageSize={pageSize}
      />
    </div>
  );
};

export default DataGrid;
