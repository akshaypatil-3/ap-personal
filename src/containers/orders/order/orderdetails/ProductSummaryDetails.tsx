import React from "react";
import { ProductSummary } from "../../../../services/types";
const renderBooleanInYES_OR_NO = (val: boolean) => {
  return val ? "Yes" : "No";
};
const ProductSummaryDetails = (data: ProductSummary) => {
  return (
    <div className="productSummaryDetails">
      <div className="row pb-1">
        <div className="col">
          <label htmlFor="">Substituted items</label>
          <div>{data.substitutedItems}</div>
        </div>
        <div className="col">
          <label htmlFor="">IS Alcohol</label>
          <div>{renderBooleanInYES_OR_NO(data.isAlcohol)}</div>
        </div>
      </div>
      <div className="row pb-1">
        <div className="col">
          <label htmlFor="">Age Restricted</label>
          <div>{renderBooleanInYES_OR_NO(data.ageRestricted)}</div>
        </div>
        <div className="col">
          <label htmlFor="">EBT</label>
          <div>{renderBooleanInYES_OR_NO(data.EBT)}</div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <label htmlFor="">Picked quantity</label>
          <div>{data.pickedQuantity}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductSummaryDetails;
