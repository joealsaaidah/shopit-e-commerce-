import React from "react";
import { Fragment } from "react";
import Search from "./Search";
import { Link, Route } from "react-router-dom";

const Header = () => {
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
          <Link
            style={{ color: "black" }}
            to='/login'
            className='btn ml-4'
            id='login_btn'
          >
            Login
          </Link>
          <span className='ml-3' id='cart'>
            Cart
          </span>
          <span className='ml-1' id='cart_count'>
            2
          </span>
        </div>
      </nav>
    </Fragment>
  );
};

export default Header;
