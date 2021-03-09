import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layouts/MetaData";
import { saveShippingInfo } from "../../actions/cartAction";
import { countries } from "countries-list";
import CheckoutSteps from "./CheckoutSteps";

const Shipping = ({ history }) => {
  const { shippingInfo } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const countriesList = Object.values(countries);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [postalCode, setPostalCode] = useState(shippingInfo.postalCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);
  const [country, setCountry] = useState(shippingInfo.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingInfo({ address, city, phoneNo, postalCode, country }));
    history.push("/order/confirm");
  };
  return (
    <Fragment>
      <MetaData title={"Shipping Info"} />

      <CheckoutSteps shipping />

      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form className='shadow-lg' onSubmit={submitHandler}>
            <h1 className='mb-4'>Shipping Info</h1>
            <div className='form-group'>
              <label htmlFor='address_field'>Address</label>
              <input
                type='text'
                id='address_field'
                className='form-control'
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='city_field'>City</label>
              <input
                type='text'
                id='city_field'
                className='form-control'
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='phone-field'>Phone No.</label>
              <input
                type='phone'
                id='phone-field'
                className='form-control'
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='postal-code-field'>Postal Code</label>
              <input
                type='number'
                id='postal-code-field'
                className='form-control'
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </div>
            <div className='form-group'>
              <label htmlFor='country-field'>Country</label>
              <select
                id='country-field'
                className='form-control'
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                required
              >
                {countriesList.map((country) => (
                  <option key={country.name} value={country.name}>
                    {country.name}
                  </option>
                ))}
              </select>
            </div>
            <button
              type='submit'
              id='shipping_btn'
              className='btn btn-block py-3'
            >
              CONTINUE
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
