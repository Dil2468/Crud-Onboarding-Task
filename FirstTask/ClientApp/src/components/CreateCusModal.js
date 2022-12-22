import React from "react";
import { Modal, Button, Form, Icon } from "semantic-ui-react";

const CreateCusModal = (props) => {
  return (
    <div>
      <Modal size={"small"} open={props.open} onClose={() => props.close()}>
        <Modal.Header>Create New Customer</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Customer Name</label>
              <input onChange={(e) => props.onChangename(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Address</label>
              <input onChange={(e) => props.onChangeaddress(e.target.value)} />
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
              props.CreateCustomer();
              props.close();
            }}
          >
            Create
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

export default CreateCusModal;
