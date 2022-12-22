import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Icon } from "semantic-ui-react";
import swal from "sweetalert";
const EditCustomerModal = (props) => {
  const [cusname, setcusname] = useState([]);
  const [address, setaddress] = useState([]);
  const [cusID, setcusID] = useState([]);

  useEffect(() => {
    setcusname(props.getbyidobj.cusName);
    setaddress(props.getbyidobj.address);
    setcusID(props.getbyidobj.cusID);
  }, [props.getbyidobj]);

  // Update Customer Data using get by customer ID
  async function UpdateCustomer() {
    const updateurl = `https://react-web-app.azurewebsites.net/api/Customer/UpdateCustomer/${cusID}`;
    const updatedata = { cusname, address, cusID };
    const data = await fetch(updateurl, {
      method: "PUT",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(updatedata),
    });
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }
    const res = await data.json();
    //console.log(res);
    swal({
      title: "Updated!",
      text: res,
      icon: "success",
      button: "OK!",
    });
    props.GetCustomer();
  }

  return (
    <div>
      <Modal size={"small"} open={props.open} onClose={() => props.close()}>
        <Modal.Header>Edit Customer Data</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Customer Name</label>
              <input
                value={cusname || ""}
                onChange={(e) => setcusname(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <input
                value={address || ""}
                onChange={(e) => setaddress(e.target.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => props.close()}>
            Cancel
          </Button>
          <Button
            positive
            onClick={() => {
              UpdateCustomer();
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

export default EditCustomerModal;
