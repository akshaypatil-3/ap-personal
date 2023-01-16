import React, { useState } from "react";
import {
  MagnifyingGlassIcon,
} from "../../components/icons/FontAwesomeIcons";

import "./searchinput.scss";
import { SearchInputProps } from "./prop";

const SearchInput = ({
   showIcon = true,
   placeholder,
   handleSearch
}: SearchInputProps): JSX.Element => {
  return (
    <div className="searchWrapper">
      <div className="searchBox">
        <input type="text"
               name="term"
               className="searchControl"
               placeholder={placeholder}
               onChange={(e) => {
                 handleSearch?.(e.target.value);
               }}/>
        {(showIcon === undefined ||
          showIcon === true) && (
          MagnifyingGlassIcon
        )}
      </div>
    </div>
  );
};

export default SearchInput;
