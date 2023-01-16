import React, { useEffect, useState } from "react";

import DataGrid from "../../components/datagrid/DataGrid";
import { ColumnDef, DataGridProps } from "../../components/datagrid/type";

import {
  FileExportIcon,
  UserPlusIcon,
  TrashCanIcon,
} from "../../components/icons/FontAwesomeIcons";

import { searchUser } from "../../services/users";
import {Order, User} from "../../services/types";

import SearchInput from "../../components/searchinput/SearchInput";
import { SearchInputProps } from "../../components/searchinput/prop";

import ExportButton from "../../components/exportbutton/ExportButton";
import { ExportButtonProps } from "../../components/exportbutton/prop";

import "./users.scss";

const columns: ColumnDef<User>[] = [
  {
    fieldName: "userId",
    headerName: "#",
    allowFilter: false,
    sortable: false,
    rerender: (data: User) => {
      return (
        <div className="checkbox">
          <input type="checkbox" />
        </div>
      );
    },
    width: "40px",
    maxWidth: "40px"
  },
  {
    fieldName: "fullName",
    allowFilter: true,
    headerName: "Users",
    alignItem: "left"
  },
  {
    fieldName: "userId",
    headerName: "Action",
    allowFilter: false,
    sortable: false,
    hidden: true,
    rerender: (data: User) => {
      return <div className="action">{TrashCanIcon}</div>;
    },
    width: "80px",
    maxWidth: "80px"
  },
];

function handlePageSizeChange() {}

function handlePageClick() {}

const Users = () => {
  const handleSearch = (searchTerm: any) => {
    /* Need to handle server side pagination here */
    console.log("Search term => ",searchTerm);
  };

  const searchInputData: SearchInputProps = {
    showIcon: true,
    placeholder: "Search by name",
    handleSearch,
  };

  const handleExport = () => {
    /* Need to handle server side export here */
    console.log("Handle export");
  };

  const exportButtonData: ExportButtonProps = {
    showIcon: true,
    handleExport,
  };

  const dataGridMockData: DataGridProps<User> = {
    columns: columns,
    rows: [],
    showAdvanceFilter: false,
    handlePageSizeChange,
    handlePageClick,
  };

  const [usersData, setUsersData] =
    useState<DataGridProps<User>>(dataGridMockData);

  useEffect(() => {
    searchUser().then((res) => {
      setUsersData({ ...dataGridMockData, rows: res.data });
    });
  }, []);

  return (
    <>
      <div className="listWrapper usersListWrapper">
        <div className="listTitle">Users</div>

        <div className="listActionsWrapper">
          <SearchInput {...searchInputData} />

          <div className="actionsWrapper">
            <ExportButton{...exportButtonData} />

            <button type="button" className="btn btnAction btnActionIcon btnPrimary">
              {UserPlusIcon}
              Add User
            </button>
          </div>
        </div>
        <div className="listDataGridWrapper">
          <DataGrid {...usersData} />
        </div>
      </div>
    </>
  );
};

export default Users;
