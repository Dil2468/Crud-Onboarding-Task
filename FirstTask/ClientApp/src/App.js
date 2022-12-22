import { Context } from "./components/Context";

import React from "react";
import Customer from "./components/Customer";
import Product from "./components/Product";

import Sales from "./components/Sales";
import Store from "./components/Store";
import NavMenu from "./components/NavMenu";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";

const App = () => {
  return (
    <Context>
      <Router>
        <NavMenu />
        <div>
          <Routes>
            <Route exact path="/" element={<Customer />}/>
            <Route exact path="/Customer" element={<Customer />} />
            <Route exact path="/Product" element={<Product />} />
            <Route exact path="/Store" element={<Store />} />
            <Route exact path="/Sales" element={<Sales />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </Context>
  );
};

export default App;
