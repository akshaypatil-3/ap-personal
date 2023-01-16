import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./pagination.scss";
import { VerticalPipeIcon } from "../../icons/FontAwesomeIcons";
import { PageBtn } from "./Page";
import { DropDown } from "../../dropdown/DropDown";
import { useEffect, useState } from "react";
import { VALID_NUMBER } from "../../../utils/regex";
interface ComponentProps {
  totalRecords: number;
  activePageNumber: number;
  handlePageClick: (page: any) => void;
  handlePageSizeChange: (size: number) => void;
  pageSize: number;
}

export const Pagination = ({
  totalRecords,
  activePageNumber,
  handlePageClick,
  handlePageSizeChange,
  pageSize,
}: ComponentProps) => {
  const [pageNum, setPageNum] = useState<any>(activePageNumber);
  const [pages, setPages] = useState<any[]>([]);

  useEffect(() => {
    handlePageClick(pageNum);
  }, [pageNum]);

  const onPageClick = (page: number | string) => {
    if (page === "pre") {
      setPageNum(pageNum - 1);
    } else if (page === "next") {
      setPageNum(pageNum + 1);
    } else {
      typeof page === "number" && setPageNum(page);
    }
  };

  const reArrangeVisiblePages = () => {
    const totalPages = Math.trunc(totalRecords / pageSize) + 1;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i <= 5 && pageNum < 5) ||
        (i > pageNum - 2 && i <= pageNum + 1)
      ) {
        if (totalPages > 6 && i === totalPages && pageNum < totalPages) {
          pages.push("...");
        }
        pages.push(i);

        if (totalPages > 6 && i === 1 && pageNum > 4) {
          pages.push("...");
        }
      }
    }
    setPages(pages);
  };

  const pageSizeChange = (pageSize: string) => {
    VALID_NUMBER.test(pageSize) && handlePageSizeChange(parseInt(pageSize));
  };

  useEffect(() => {
    reArrangeVisiblePages();
  }, [pageNum, totalRecords, pageSize]);

  useEffect(() => {
    setPageNum(activePageNumber);
  }, [activePageNumber]);
  return (
    <div className="paginationBox">
      <div className="viewLabel">View</div>

      <div className="pageSizeDD">
        <DropDown
          onChange={pageSizeChange}
          value={pageSize.toString()}
          dropdownData={["5", "10", "20", "50"]}
        />
      </div>
      <div className="pipe">{VerticalPipeIcon}</div>
      <PageBtn
        disabled={activePageNumber === 1}
        handleOnClick={() => {
          onPageClick("pre");
        }}
      >
        <FontAwesomeIcon className="icon" icon={faChevronLeft} />
      </PageBtn>
      {pages.map((p) => (
        <PageBtn
          key={p}
          handleOnClick={() => {
            onPageClick(p);
          }}
          isActive={activePageNumber == p ? true : false}
        >
          <>{p}</>
        </PageBtn>
      ))}
      <PageBtn
        disabled={Math.trunc(totalRecords / pageSize) + 1 === activePageNumber}
        handleOnClick={() => {
          onPageClick("next");
        }}
      >
        <FontAwesomeIcon className="icon" icon={faChevronRight} />
      </PageBtn>
    </div>
  );
};
