import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layouts/MetaData";

const OrderSuccess = () => {
  return (
    <Fragment>
      <MetaData title={"Order Success"} />

      <div className='row justify-content-center'>
        <div className='col-6 mt-5 text-center'>
          <img
            src='/images/orderSuccess.png'
            alt='Order success'
            className='my-5 img-fluid d-block mx-auto'
            width='200'
            height='200'
          />
          <h2>Your order has been Places SUCCESSFULLY</h2>
          <Link to='/orders/me'>Go to Orders</Link>
        </div>
      </div>
    </Fragment>
  );
};

export default OrderSuccess;
