import React, {useEffect, useState} from "react";
import {InfoCircleIcon} from "../../icons/FontAwesomeIcons";

import { IndicatorInfoProps, IndicatorProps} from "../type";

import "./indicatorinfo.scss";

const IndicatorInfo = ({
  indicators
}:IndicatorInfoProps) => {
  useEffect(() => {}, [indicators]);
  const [isShowIndicatorInfo, setIsShowIndicatorInfo] = useState<boolean>(false);

  const handleIndicatorInfoDisplay = () => {
    setIsShowIndicatorInfo(!isShowIndicatorInfo);
  };

  return (
    <div className="indicatorInfoContainer">
      <div className="indicatorInfoWrapper">
        <div className="indicatorInfoTrigger" onClick={handleIndicatorInfoDisplay}>
          {InfoCircleIcon}
        </div>
      </div>

      {isShowIndicatorInfo && (
        <div className="indicatorInfoDropdown">
          {indicators && indicators.map(
            (indicator: IndicatorProps) =>
              <div className="indicatorInfoItem" key={indicator.label}>
                <div className={`icon ${indicator.iconClass}`}>
                  {indicator.icon()}
                </div>
                <div className="infoLabel">{indicator.label}</div>
              </div>
          )}
        </div>
      )}
    </div>
  );
};

export default IndicatorInfo;
