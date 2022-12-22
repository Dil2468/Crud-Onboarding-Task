import React from "react";
import { Modal, Button, Form, Icon } from "semantic-ui-react";
const CreateStorModal = (props) => {
  return (
    <div>
      <Modal size={"small"} open={props.open} onClose={() => props.close()}>
        <Modal.Header> New Store</Modal.Header>
        <Modal.Content>
          <Form>
            <Form.Field>
              <label>Store Name</label>
              <input onChange={(e) => props.onChangename(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Store Address</label>
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
              props.CreateStore();
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

export default CreateStorModal;
