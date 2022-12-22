import React, { useEffect, useState } from "react";
import { Table, Button, Icon, Dropdown } from "semantic-ui-react";
import CreateSaleModal from "./CreateSaleModal";
import DeleteSaleModal from "./DeleteSaleModal";
import EditSaleModal from "./EditSaleModal";
import moment from "moment";
import swal from "sweetalert";
const Sales = () => {
  useEffect(() => {
    GetSales();
  }, []);
  const [saledata, setsaledata] = useState([]);
  const [newmodal, setnewmodal] = useState(false);
  const [deletemodal, setdeletemodal] = useState(false);
  const [updatemodal, setupdatemodal] = useState(false);
  const [sale, setsale] = useState([]);
  const [customer, setcustomer] = useState([]);
  const [product, setproduct] = useState([]);
  const [store, setstore] = useState([]);
  const [datesold, setdatesold] = useState([]);
  const [CustomerID, setcustomerID] = useState([]);
  const [ProductID, setProductID] = useState([]);
  const [StoreID, setStorID] = useState([]);

  const itemperpage = 5;

  const [currentpage, setcurrentpage] = useState(1);

  const indexoflastitem = itemperpage * currentpage;

  const indexoffirstitem = indexoflastitem - itemperpage;

  const slicedata = saledata.slice(indexoffirstitem, indexoflastitem);

  const numberofpages = [];
  for (let i = 1; i <= Math.ceil(saledata.length / itemperpage); i++) {
    numberofpages.push(i);
  }

  async function GetSales() {
    const geturl = `https://react-web-app.azurewebsites.net/api/Sales/GetSales`;

    const data = await fetch(geturl, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }
    const res = await data.json();

    setsaledata(res);
  }

  async function GetSalesid(id) {
    const urlid = `https://react-web-app.azurewebsites.net/api/Sales/GetSalesID/${id}`;

    const data = await fetch(urlid, {
      method: "GET",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }

    const resolve = await data.json();
    setsale(resolve.map((e) => e.sales));
    setcustomer(resolve.map((e) => e.customer));
    setproduct(resolve.map((e) => e.product));
    setstore(resolve.map((e) => e.store));
    setdatesold(resolve.map((e) => e.dateSold));
    setcustomerID(resolve.map((e) => e.customerID));
    setProductID(resolve.map((e) => e.productID));
    setStorID(resolve.map((e) => e.storeID));
  }

  async function DeleteSales() {
    const delurl = `https://react-web-app.azurewebsites.net/api/Sales/DeleteSales/${sale}`;

    const data = await fetch(delurl, {
      method: "DELETE",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }
    const res = await data.json();
    swal({
      title: "Deleted!",
      text: res,
      icon: "success",
      button: "OK!",
    });
    GetSales();
  }

  const newsaleopen = () => {
    setnewmodal(true);
  };

  const deletemodalopen = () => {
    setdeletemodal(true);
  };

  const Editmodalopen = () => {
    setupdatemodal(true);
  };
  return (
    <div>
      <div>
        <CreateSaleModal
          size={"small"}
          open={newmodal}
          close={() => setnewmodal(false)}
          GetSales={() => GetSales()}
        />
        <DeleteSaleModal
          size={"small"}
          open={deletemodal}
          close={() => setdeletemodal(false)}
          
          DeleteSales={() => DeleteSales()}
          name={sale}
        />
        <EditSaleModal
          size={"small"}
          open={updatemodal}
          close={() => setupdatemodal(false)}
          customer={customer}
          product={product}
          store={store}
          datesold={datesold[0]}
          CustomerID={CustomerID[0]}
          ProductID={ProductID[0]}
          StoreID={StoreID[0]}
          sale={sale}
          GetSales={() => GetSales()}
        />

        <Button
          style={{ marginTop: 7 }}
          onClick={newsaleopen}
          primary
          size="small"
        >
          New Sale
        </Button>

        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Customer</Table.HeaderCell>
              <Table.HeaderCell>Product</Table.HeaderCell>
              <Table.HeaderCell>Store </Table.HeaderCell>
              <Table.HeaderCell>Date Sold</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {slicedata.map((e, index) => (
              <Table.Row key={index}>
                <Table.Cell>{e.customer}</Table.Cell>
                <Table.Cell>{e.product}</Table.Cell>
                <Table.Cell>{e.store}</Table.Cell>
                <Table.Cell>
                  {moment(e.dateSold).format("DD MMM,YYYY")}
                </Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => {
                      GetSalesid(e.sales);
                      Editmodalopen();
                    }}
                    size="small"
                    color="yellow"
                  >
                    <Icon name="edit"></Icon>Edit
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => {
                      GetSalesid(e.sales);
                      deletemodalopen();
                    }}
                    size="small"
                    negative
                  >
                    <Icon name="trash alternate"></Icon>Delete
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <Dropdown
          style={{
            borderStyle: "outset",
            WebkitTextStroke: "small",
            paddingLeft: 5,
            paddingTop: 5,
            paddingRight: 5,
          }}
          text={currentpage.toString()}
        >
          <Dropdown.Menu>
            {numberofpages.map((e,i) => {
              return (
                <Dropdown.Item key={i}
                  onClick={(e) => setcurrentpage(e.target.textContent)}
                >
                  {e}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>

        <Button primary size={"small"}>
          {currentpage}
        </Button>
      </div>
    </div>
  );
};

export default Sales;
