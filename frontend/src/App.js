import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Login from "./components/user/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProductDetails from "./components/product/ProductDetails";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";
import ProtectedRoute from "./components/route/ProtectedRoute";
import { loadUser } from "./actions/userAction";
import store from "./store";
import { useEffect, useState } from "react";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import NewPassword from "./components/user/NewPassword";
import Cart from "./components/cart/Cart";
import Shipping from "./components/cart/Shipping";
import ConfirmOrder from "./components/cart/ConfirmOrder";
import axios from "axios";
import Payment from "./components/cart/Payment";
import OrderSuccess from "./components/cart/OrderSuccess";

//payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.sripeApiKey);
    }
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <div className='App'>
        <Header />
        <div className='container container-fluid'>
          <Route path='/' component={Home} exact />
          <Route path='/search/:keyword' component={Home} />
          <Route path='/product/:id' component={ProductDetails} exact />
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register} />
          <ProtectedRoute path='/me' component={Profile} exact />
          <ProtectedRoute path='/me/update' component={UpdateProfile} exact />
          <ProtectedRoute
            path='/password/update'
            component={UpdatePassword}
            exact
          />
          <Route path='/password/forgot' component={ForgotPassword} exact />
          <Route path='/password/reset/:token' component={NewPassword} exact />

          <Route path='/cart' component={Cart} exact />

          <ProtectedRoute path='/shipping' component={Shipping} exact />
          <ProtectedRoute
            path='/order/confirm'
            component={ConfirmOrder}
            exact
          />

          {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectedRoute path='/payment' component={Payment} />
            </Elements>
          )}

          <ProtectedRoute path='/success' component={OrderSuccess} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
