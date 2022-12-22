import React, { createContext } from "react";
import { useEffect, useState } from "react";

export const MyContext = createContext();
export const Context = ({ children }) => {
  useEffect(() => {
    GetCustomer();
    GetProduct();
    GetStore();
  }, []);

  const [custdata, setcustdata] = useState([]);
  const [getproddata, setgetproddata] = useState([]);
  const [getstordata, setgetstordata] = useState([]);

  async function GetCustomer() {
    const geturl = `https://react-web-app.azurewebsites.net/api/Customer/GetCustomer`;
    const data = await fetch(geturl, {
      method: "GET",
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }
    const res = await data.json();
    setcustdata(res);
  }

  async function GetProduct() {
    const geturl = `https://react-web-app.azurewebsites.net/api/Product/GetProduct`;

    const data = await fetch(geturl, {
      method: "GET",
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }
    const res = await data.json();

    setgetproddata(res);
  }

  async function GetStore() {
    const geturl = `https://react-web-app.azurewebsites.net/api/Store/GetStore`;

    const data = await fetch(geturl, {
      method: "GET",
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }
    const res = await data.json();
    setgetstordata(res);
  }

  return (
    <div>
      <MyContext.Provider
        value={{
          custdata,
          getproddata,
          getstordata,
          GetStore,
          GetProduct,
          GetCustomer,
        }}
      >
        {children}
      </MyContext.Provider>
    </div>
  );
};
