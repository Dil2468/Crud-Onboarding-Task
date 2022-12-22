import React from "react";
import { Modal, Button,Icon } from "semantic-ui-react";
const DeleteStorModal = (props) => {
  return (
    <div>
      <Modal size={"small"} open={props.open} onClose={() => props.close()}>
        <Modal.Header>Delete Store</Modal.Header>
        <Modal.Content>
          <p>Are you sure you want to delete <b>{props.name + "?"}</b> </p>
        </Modal.Content>
        <Modal.Actions>
          <Button color="black" onClick={() => props.close()}>
            Cancel
          </Button>
          <Button
            negative
            onClick={() => {
              props.DeleteStore();
              props.close();
            }}
          >
            Delete
            <Icon
              style={{
                marginLeft: 10,
                outlineStyle: " outset",
                textAlignLast: "center",
                marginRight: 0,
              }}
              name="times"
            ></Icon>
          </Button>
        </Modal.Actions>
      </Modal>
    </div>
  );
};

export default DeleteStorModal;
