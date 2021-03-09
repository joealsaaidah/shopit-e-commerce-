import React from "react";
import { Fragment } from "react";
import Search from "./Search";
import { Link, Route } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../actions/userAction";

const Header = () => {
  const alert = useAlert();
  const { user, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHanddler = () => {
    dispatch(logout());
    alert.success("Logged out successfully");
  };
  return (
    <Fragment>
      <nav className='navbar row'>
        <div className='col-12 col-md-3'>
          <div className='navbar-brand'>
            <Link to='/'>
              <img
                src='/images/logo.png'
                alt='Shop-IT'
                width='50px'
                height='30px'
              />
            </Link>
          </div>
        </div>
        <div className='col-12 col-md-6 mt-2 mt-md-0'>
          <Route render={({ history }) => <Search history={history} />} />
        </div>
        <div className='col-12 col-md-3 mt-4 mt-md-0 text-center'>
          <Link to='/cart' style={{ textDecoration: "none" }}>
            <span className='ml-3' id='cart'>
              Cart
            </span>
            <span className='ml-1' id='cart_count'>
              {cartItems.length}
            </span>
          </Link>

          {user ? (
            <div className='ml-4 dropdown d-inline'>
              <Link
                to='#!'
                className='btn dropdown-toggle text-white mr-4'
                type='button'
                id='dropDownMenuButton'
                data-toggle='dropdown'
                aria-haspopup='true'
                aria-expanded='false'
              >
                <div className='d-flex justify-content-center align-items-center'>
                  <figure className='avatar avatar-nav mr-3 my-auto'>
                    <img
                      width='30px'
                      height='30px'
                      src={user.avatar && user.avatar.url}
                      alt={user && user.name}
                      className='rounded-circle'
                    />
                  </figure>
                  <span>{user && user.name}</span>
                </div>
              </Link>
              <div
                className='dropdown-menu'
                aria-labelledby='dropDownMenuButton'
              >
                {user && user.role !== "admin" ? (
                  <Link to='/orders/me' className='dropdown-item'>
                    Order
                  </Link>
                ) : (
                  <Link to='/dashboard' className='dropdown-item'>
                    Dashboard
                  </Link>
                )}
                <Link to='/me' className='dropdown-item'>
                  Profile
                </Link>
                <div class='dropdown-divider'></div>
                <Link
                  to='/'
                  className='dropdown text-danger'
                  onClick={logoutHanddler}
                >
                  Logout
                </Link>
              </div>
            </div>
          ) : (
            !loading && (
              <Link
                /* style={{ color: "black" }} */ to='/login'
                className='btn ml-4'
                id='login_btn'
              >
                Login
              </Link>
            )
          )}
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
