import {
  FileExportIcon,
} from "../../components/icons/FontAwesomeIcons";

import { ExportButtonProps } from "./prop";

const ExportButton = ({
   showIcon = true,
   handleExport
}: ExportButtonProps): JSX.Element => {
  return (
    <button type="button" className={`btn btnAction ${showIcon ? "btnActionIcon" : ""}`}
            onClick={handleExport}>
      {(showIcon === undefined ||
        showIcon === true) && (
        FileExportIcon
      )}
        Export
    </button>
  );
};

export default ExportButton;
