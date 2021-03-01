import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import Login from "./components/user/Login";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ProductDetails from "./components/product/ProductDetails";

function App() {
  return (
    <Router>
      <div className='App'>
        <Header />
        <div className='container container-fluid'>
          <Route path='/' component={Home} exact />
          <Route path='/search/:keyword' component={Home} />
          <Route path='/product/:id' component={ProductDetails} exact />
          <Route path='/login' component={Login} />
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
