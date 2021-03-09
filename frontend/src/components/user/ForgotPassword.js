import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { forgotUserPassword, clearErrors } from "../../actions/userAction";
import MetaData from "../layouts/MetaData";

const ForgotPassword = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const { error, message, loading } = useSelector(
    (state) => state.forgotPassword
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    if (message) {
      alert.success(message);
    }
  }, [dispatch, alert, error, message, loading]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("email", email);

    dispatch(forgotUserPassword(formData));
  };

  return (
    <Fragment>
      <MetaData title={"Forgot Password"} />
      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form className='shadow-lg' onSubmit={submitHandler}>
            <h1 className='mb-3'>Forgot Password</h1>
            <div className='form-froup'>
              <label htmlFor='email_field'>Enter E-mail</label>
              <input
                type='email'
                id='email_field'
                className='for-control'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              id='forgot_password_button'
              className='btn btn-block py-3'
              type='submit'
              disabled={loading ? true : false}
            >
              Send Email
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default ForgotPassword;
