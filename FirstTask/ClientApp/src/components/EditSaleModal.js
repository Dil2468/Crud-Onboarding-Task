import React, { useEffect, useState, useContext } from "react";
import { Modal, Button, Dropdown, Input, Icon } from "semantic-ui-react";
import { MyContext } from "./Context";
import moment from "moment/moment";
import swal from "sweetalert";
const EditSaleModal = (props) => {
  const { custdata } = useContext(MyContext);
  const { getproddata } = useContext(MyContext);
  const { getstordata } = useContext(MyContext);

  const [datesold, setdatesold] = useState([]);
  const [CustomerID, setcustomerID] = useState([]);
  const [ProductID, setProductID] = useState([]);
  const [StoreID, setStorID] = useState([]);
  const [id, setid] = useState([]);

  useEffect(() => {
    setdatesold(props.datesold);
    setcustomerID(props.CustomerID);
    setProductID(props.ProductID);
    setStorID(props.StoreID);
    setid(props.sale);
  }, [
    props.datesold,
    props.CustomerID,
    props.ProductID,
    props.StoreID,
    props.sale,
  ]);

  const Customeroption = custdata.map((e) => ({
    key: e.cusID,
    value: e.cusID,
    text: e.cusName,
  }));

  const Productoption = getproddata.map((e) => ({
    key: e.prodId,
    value: e.prodId,
    text: e.prodName,
  }));

  const Storeoption = getstordata.map((e) => ({
    key: e.storId,
    value: e.storId,
    text: e.storName,
  }));

  const customeronchange = (e, { value }) => {
    setcustomerID(value);
  };
  const productonchange = (e, { value }) => {
    setProductID(value);
  };

  const storeonchange = (e, { value }) => {
    setStorID(value);
  };

  async function Updatesale() {
    const senddata = { datesold, CustomerID, ProductID, StoreID };
    const updurl = `https://react-web-app.azurewebsites.net/api/Sales/UpdateSales/${id}`;
    const data = await fetch(updurl, {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(senddata),
    });
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }
    const res = await data.json();
    swal({
      title: "Updated!",
      text: res,
      icon: "success",
      button: "OK!",
    });
    props.GetSales();
  }
  return (
    <div>
      <Modal size={"small"} open={props.open} onClose={() => props.close()}>
        <Modal.Header>Edit Sales</Modal.Header>
        <Modal.Content>
          <p>Date Sold</p>
          <Input
            type="date"
            value={moment(datesold).format("yyyy-MM-DD")}
            onChange={(e) => setdatesold(e.target.value)}
          />
        </Modal.Content>

        <Modal.Content>
          <p>Customer</p>

          <Dropdown
            placeholder={props.customer.toString()}
            fluid
            onChange={customeronchange}
            selection
            options={Customeroption}
          />
        </Modal.Content>
        <Modal.Content>
          <p>Product</p>

          <Dropdown
            placeholder={props.product.toString()}
            fluid
            onChange={productonchange}
            selection
            options={Productoption}
          />
        </Modal.Content>
        <Modal.Content>
          <p>Store</p>

          <Dropdown
            placeholder={props.store.toString()}
            fluid
            onChange={storeonchange}
            selection
            options={Storeoption}
          />
        </Modal.Content>

        <Modal.Actions>
          <Button color="black" onClick={() => props.close()}>
            cancel
          </Button>
          <Button
            positive
            onClick={() => {
              Updatesale();
              props.close();
            }}
          >
            Edit
            <Icon
              style={{
                marginLeft: 10,
                outlineStyle: " outset",
                textAlignLast: "center",
                marginRight: 0,
              }}
              name="check"
            ></Icon>
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default EditSaleModal;
