import { VALID_WIDTH } from "../../utils/regex";
import { DTColumnDef } from "./type";
import { LEFT_SIDE_NAVE_WIDTH_OFFSET } from "../../utils/common";

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_ACTIVE_PAGE = 1;
export const ASC = "asc";
export const DESC = "desc";

const DATATABLE_PEDDING_OFFSET = 194;

export const manageColumnsWidth = <T extends any>(
  columns: DTColumnDef<T>[],
  windowWidth: number
): string => {
  let widthStyle = "";
  let totalGivenWidth = 0;
  let totalNumColGivenWidth = 0;

  columns.forEach((col) => {
    if (col.width && VALID_WIDTH.test(col.width)) {
      const validNum = parseInt(col.width.slice(0, col.width.length - 2));
      totalNumColGivenWidth++;
      totalGivenWidth += validNum;
      widthStyle += `${col.width} `;
    } else {
      widthStyle += `{CW} `;
    }
  });

  const totalWidth =
    windowWidth -
    LEFT_SIDE_NAVE_WIDTH_OFFSET -
    DATATABLE_PEDDING_OFFSET -
    totalGivenWidth;
  const reminder = totalWidth % (columns.length - totalNumColGivenWidth);
  let avgWidth =
    (totalWidth - reminder) / (columns.length - totalNumColGivenWidth);

  widthStyle = widthStyle.replaceAll("{CW}", `${avgWidth}px`);
  return widthStyle;
};
