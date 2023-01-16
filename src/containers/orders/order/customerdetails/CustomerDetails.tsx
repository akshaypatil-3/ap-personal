import React, { useEffect, useState } from "react";
import { getCustomerDetails } from "../../../../services/orders";
import { CustomerDetailsType } from "../../../../services/types";
import "./customerdetails.scss";

const CustomerDetails = (): JSX.Element => {
  const [customerDetails, setCustomerDetails] = useState<CustomerDetailsType>();
  const getCustomerDetailsCall = () => {
    getCustomerDetails().then((res: { data: CustomerDetailsType }) => {
      setCustomerDetails(res.data);
    });
  };

  useEffect(() => {
    getCustomerDetailsCall();
  }, []);
  return (
    <div className="orderTabContentContainer customerDetails pa-5 pl-6">
      <div className="details">
        <div className="itemsWrapper">
          <div className="item pb-2">
            <label htmlFor="" className="itemLabel">
              Name
            </label>
            <div>{customerDetails?.name}</div>
          </div>
          <div className="item pb-2">
            <label htmlFor="" className="itemLabel">
              Email
            </label>
            <div>{customerDetails?.email}</div>
          </div>
          <div className="item pb-2">
            <label htmlFor="" className="itemLabel">
              Address
            </label>
            <div>
              {customerDetails?.address1}, {customerDetails?.address2}
              <br />
              {customerDetails?.city}, {customerDetails?.state},
              {customerDetails?.pincode}, {customerDetails?.landmark}
            </div>
          </div>
          <div className="item pb-2">
            <label htmlFor="" className="itemLabel">
              Payment
            </label>
            <div>{customerDetails?.payment}</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CustomerDetails;
