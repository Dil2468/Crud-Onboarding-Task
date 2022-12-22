import React, { useContext, useState } from "react";
import swal from "sweetalert";

import { Modal, Button, Dropdown, Input, Icon } from "semantic-ui-react";
import { MyContext } from "./Context";
import moment from "moment";
import "moment-timezone";
const CreateSaleModal = (props) => {
  const { custdata } = useContext(MyContext);
  const { getproddata } = useContext(MyContext);
  const { getstordata } = useContext(MyContext);

  const [CustomerID, setcustomerID] = useState([]);
  const [ProductID, setProductID] = useState([]);
  const [StoreID, setStorID] = useState([]);

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

  //Getting current date Zone + adding one day to the date format
  const date = moment().format();

  // assigning current date zone to a variable
  const [dateSold, setdatesold] = useState(date);
  console.log(dateSold);
  //Create New sale
  async function Newsale() {
    const senddata = { dateSold, CustomerID, ProductID, StoreID };
    const posturl = `https://react-web-app.azurewebsites.net/api/Sales/PostSale`;
    const data = await fetch(posturl, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(senddata),
    });

    const res = await data.json();
    swal({
      title: "New Sale Added!",
      text: res,
      icon: "success",
      button: "OK!",
    });
    props.GetSales();
  }

  return (
    <div>
      <Modal size={"small"} open={props.open} onClose={() => props.close()}>
        <Modal.Header>New Sale</Modal.Header>
        <Modal.Content>
          <p>Date Sold</p>
          <Input
            type="date"
            value={moment(dateSold).format("yyyy-MM-DD")}
            onChange={(e) => setdatesold(e.target.value)}
          />
        </Modal.Content>

        <Modal.Content>
          <p>Customer</p>

          <Dropdown
            fluid
            onChange={customeronchange}
            selection
            options={Customeroption}
          />
        </Modal.Content>
        <Modal.Content>
          <p>Product</p>

          <Dropdown
            fluid
            onChange={productonchange}
            selection
            options={Productoption}
          />
        </Modal.Content>
        <Modal.Content>
          <p>Store</p>

          <Dropdown
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
              Newsale();
              props.close();
            }}
          >
            create
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

export default CreateSaleModal;
