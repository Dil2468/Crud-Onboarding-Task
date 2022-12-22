import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Icon } from "semantic-ui-react";
import swal from "sweetalert";
const EditProductModal = (props) => {
  const [prodName, setprodname] = useState([]);
  const [price, setprice] = useState([]);

  useEffect(() => {
    setprodname(props.getprodobj.prodName);
    setprice(props.getprodobj.price);
  }, [props.getprodobj]);

  async function EditProduct() {
    const editurl = `https://react-web-app.azurewebsites.net/api/Product/UpdateProduct/${props.getprodobj.prodId}`;
    const senddata = { prodName, price };
    const data = await fetch(editurl, {
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
    //console.log(res);
    swal({
      title: "Updated!",
      text: res,
      icon: "success",
      button: "OK!",
    });
    props.GetProduct();
  }

  return (
    <div>
      <Modal size={"small"} open={props.open} onClose={() => props.close()}>
        <Modal.Header>Update Product Details</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Product Name</label>
              <input
                value={prodName || ""}
                onChange={(e) => setprodname(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Price</label>
              <input
                value={price || ""}
                onChange={(e) => setprice(e.target.value)}
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
              EditProduct();
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

export default EditProductModal;
