import React, { Fragment, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearErrors } from "../../actions/userAction";
import MetaData from "../layouts/MetaData";

const Register = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = user;

  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvaratPreview] = useState(
    "/images/avatars/avatar.jpg"
  );

  const { isAuthenticated, error, loading } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    // if user already logged in send to homepage
    if (isAuthenticated) {
      history.push("/");
    }
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
  }, [dispatch, alert, isAuthenticated, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.set("name", name);
    formData.set("email", email);
    formData.set("password", password);
    formData.set("avatar", avatar);

    dispatch(registerUser(formData));
  };

  const onChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvaratPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({
        ...user,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <Fragment>
      <MetaData title={"Register User"} />

      <div className='row wrapper'>
        <div className='col-10 col-lg-5'>
          <form
            className='shadow-lg'
            onSubmit={submitHandler}
            encType='multipart/form-data'
          >
            <h1 className='mb-3'>Register</h1>

            <div className='form-group'>
              <label htmlFor='name_field'>Name</label>
              <input
                type='name'
                id='name_field'
                className='form-control'
                name='name'
                value={name}
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='email_field'>Email</label>
              <input
                type='email'
                id='email_field'
                className='form-control'
                name='email'
                value={email}
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='password_field'>Password</label>
              <input
                type='password'
                id='password_field'
                className='form-control'
                name='password'
                value={password}
                onChange={onChange}
              />
            </div>

            <div className='form-group'>
              <label htmlFor='avatar_upload'>Avatar</label>
              <div className='d-flex align-item-center'>
                <div>
                  <figure className='avatar mr-3 item-rtl'>
                    <img
                      src={avatarPreview}
                      alt='Avatar Preview'
                      className='rounded-circle'
                      width='50px'
                      height='50px'
                    />
                  </figure>
                </div>

                <div className='custom-file'>
                  <input
                    type='file'
                    name='avatar'
                    id='customFile'
                    className='custom-file-input'
                    accept='images/*'
                    onChange={onChange}
                  />
                  <label htmlFor='customFile' className='custom-file-label'>
                    Choose Avatar
                  </label>
                </div>
              </div>
            </div>

            <button
              id='refister_button'
              type='submit'
              className='btn btn-block py-3'
              disabled={loading ? true : false}
            >
              REGISTER
            </button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
