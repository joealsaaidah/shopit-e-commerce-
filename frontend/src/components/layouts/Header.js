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
              <img src='/images/logo1.png' alt='Shop-it logo here' />
            </Link>
          </div>
        </div>
        <div className='col-12 col-md-6 mt-2 mt-md-0'>
          <Route render={({ history }) => <Search history={history} />} />
        </div>
        <div className='col-12 col-md-3 mt-4 mt-md-0 text-center'>
          <button className='btn' id='login_btn'>
            Login
          </button>
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
