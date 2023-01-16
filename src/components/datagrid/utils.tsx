import { VALID_NUMBER, VALID_WIDTH } from "../../utils/regex";
import { ALIGN, ColumnDef, ORDER } from "./type";

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_ACTIVE_PAGE = 1;
export const ASC = "asc";
export const DESC = "desc";
const HEADER_WIDTH_OFFSET = 100;
const DATAGRID_PEDDING_OFFSET = 90;
const LAST_COLUMN_WIDTH = 40;
const MIN_COLUMN_WIDTH = 100;

export const calculateTotalWidth = <T extends any>(
  columns: ColumnDef<T>[]
): number | void => {
  const totalWidth =
    columns &&
    columns.reduce((totalWidth: number, col: ColumnDef<T>) => {
      if (col.width && VALID_WIDTH.test(col.width)) {
        if (col.isVisible || col.isVisible === undefined) {
          const validNum = col.width.slice(0, col.width.length - 2);
          if (VALID_NUMBER.test(validNum)) {
            totalWidth += parseInt(validNum);
          }
        }
      } else {
        col.width &&
          console.error(
            `[provide valid width to ${col.fieldName} , e.g. 10px ]`
          );
      }
      return totalWidth;
    }, 0);
  return totalWidth;
};

export const manageColumnsWidth = <T extends any>(
  columns: ColumnDef<T>[],
  windowWidth: number
): string => {
  let columnsCountWithValidWidth = 0;
  let widthStyle = "";
  const cols: ColumnDef<T>[] = columns.filter(
    (col) => col.isVisible || col.isVisible === undefined
  );

  // calculate the letfover totalwidth for datagrid
  const totalWidth =
    windowWidth -
    HEADER_WIDTH_OFFSET -
    DATAGRID_PEDDING_OFFSET -
    LAST_COLUMN_WIDTH;

  //get the reminder which will add to stream last visible column width
  const reminder = totalWidth % cols.length;
  // get the average width for each columns
  let avgWidth = (totalWidth - reminder) / cols.length;
  let totalGivenWidth = 0;
  let totalNumberGivenWidth = 0;

  cols.forEach((col) => {
    if (
      (col.width && VALID_WIDTH.test(col.width)) ||
      (col.maxWidth && VALID_WIDTH.test(col.maxWidth))
    ) {
      const width = col.width
        ? parseInt(col.width.slice(0, col.width.length - 2))
        : 0;
      const maxWidth = col.maxWidth
        ? parseInt(col.maxWidth.slice(0, col.maxWidth.length - 2))
        : 0;
      if (maxWidth > 0) {
        totalNumberGivenWidth++;
        totalGivenWidth += maxWidth;
        widthStyle += `${col.maxWidth} `;
      } else if (avgWidth < width) {
        totalNumberGivenWidth++;
        totalGivenWidth += width;
        widthStyle += `${col.width} `;
      } else {
        widthStyle += `{CW} `;
      }
    } else {
      widthStyle += `{CW} `;
    }
  });
  const rmnTotalWidth = totalWidth - totalGivenWidth;
  const rmnTotalNumWidth = cols.length - totalNumberGivenWidth;
  const totalReminder = rmnTotalWidth % rmnTotalNumWidth;
  avgWidth = (rmnTotalWidth - totalReminder) / rmnTotalNumWidth;
  widthStyle = widthStyle.replaceAll(
    "{CW}",
    `${avgWidth > MIN_COLUMN_WIDTH ? avgWidth : MIN_COLUMN_WIDTH}px`
  );
  return widthStyle;
};

// export const manageColumnsWidth = <T extends any>(
//   columns: ColumnDef<T>[],
//   windowWidth: number,
//   totalWidth: number
// ) => {
//   let columnsCountWithValidWidth = 0;
//   let widthStyle = "";

//   columns.forEach((col) => {
//     if (col.isVisible || col.isVisible === undefined) {
//       if (col.width && VALID_WIDTH.test(col.width)) {
//         columnsCountWithValidWidth++;
//         widthStyle += col.width + " ";
//       } else {
//         widthStyle += "{CW} "; // CW: calculated width
//       }
//     }
//   });

//   //
//   // number of  columns for which we need to get the dynamic width where there is not default width defined
//   const remainCols = columns.length - columnsCountWithValidWidth;
//   // in order to get the dynamic width for each remaining columns, we need to get the left over screen width
//   // which will devide in all remaining columns equaly

//   //calculate left over screen width
//   const leftoverScreenWidth =
//     windowWidth - totalWidth - HEADER_WIDTH_OFFSET - DATAGRID_PEDDING_OFFSET;

//   const widthForEachCol =
//     (leftoverScreenWidth - (leftoverScreenWidth % remainCols)) / remainCols;

//   widthStyle = widthStyle.replaceAll(
//     "{CW}",
//     `${
//       widthForEachCol > MIN_COLUMN_WIDTH ? widthForEachCol : MIN_COLUMN_WIDTH
//     }px`
//   );
//   return widthStyle;
// };

/**
 * getActivePageRows to get filterd rows for respective page.
 * @param rows // all data grid rows
 * @param pageSize // total number of rows we willing to show , default value 10
 * @param activePageNumber // page number which we willing to see
 * @returns
 */
export const getActivePageRows = <T extends any>(
  rows: T[],
  activePageNumber: number = DEFAULT_ACTIVE_PAGE,
  pageSize: number = DEFAULT_PAGE_SIZE
) => {
  return rows.slice(
    (activePageNumber - 1) * pageSize,
    activePageNumber * pageSize
  );
};

/**
 * function to sort data based on the field
 * @param data // data to be sorted
 * @param fieldName // data to be sorted by fieldName
 */
export const sortDataByField = <T extends any>(
  data: T[],
  fieldName: keyof T,
  order: ORDER
): T[] => {
  const d = data.sort((item1: T, item2: T) => {
    const nameA = item1[fieldName]; // ignore upper and lowercase
    const nameB = item2[fieldName]; // ignore upper and lowercase
    if (nameA === nameB) return 0;
    return nameA < nameB ? (order === ASC ? -1 : 1) : order === DESC ? -1 : 1;
  });
  return [...d];
};

export const getAlignStyle = (align: ALIGN | undefined) => {
  switch (align) {
    case "left":
      return "pl-1 pr-1 alignItemLeft";
      break;

    case "right":
      return "pl-1 pr-1  alignItemRight";
      break;

    case "center":
      return "pl-1 pr-1  alignItemCenter";
      break;

    default:
      return "pl-1 pr-1  alignItemCenter";
  }
};
