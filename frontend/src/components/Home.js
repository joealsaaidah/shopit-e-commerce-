import React, { Fragment, useEffect } from "react";
import MetaData from "./layouts/MetaData";

import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../actions/productAction";

const Home = () => {
  const dispatch = useDispatch();
  const { loading, products, error, productsCount } = useSelector(
    (state) => state.products
  );
  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Fragment>
      <MetaData title={"Buy Best Products Online"} />
      <h1 className='products_heading'>Latest Products</h1>

      <section id='products' className='container mt-5'>
        <div className='row'>
          {products &&
            products.map((product) => (
              <div
                key={product._id}
                className='col-sm-12 col-md-6 col-lg-3 my-3'
              >
                <div className='card p-3 rounded'>
                  <img
                    src='https://images-na.ssl-images-amazon.com/images/I/81GJBtKKRLL._AC_SL1500_.jpg'
                    alt='product img here!'
                    className='card-img-top mx-auto'
                  />
                  <div className='card-body d-flex flex-column'>
                    <h5 className='card-title'>
                      <a href='#'>{product.name}</a>
                    </h5>
                    <div className='ratings mt-auto'>
                      <div className='rating-outer'>
                        <div className='rating-inner'></div>
                      </div>
                      <span id='no_of_reviews'>(5 Reviews)</span>
                    </div>
                    <p className='card-text'>$45.67</p>
                    <a href='#' id='view_btn' className='btn btn-block'>
                      View Details
                    </a>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>
    </Fragment>
  );
};

export default Home;
