import React from 'react'
import { Modal,Button,Form,Icon } from 'semantic-ui-react'

const CreateProductModal = (props) => {
  return (
    <div>

<Modal
        size={"small"}
        open={props.open}
        onClose={() => props.close()}
      >
        <Modal.Header>New Product</Modal.Header>
        <Modal.Content>
        <Form>
            <Form.Field>
              <label>Product Name</label>
              <input 
              
              onChange={(e)=>props.onChangename(e.target.value)} />
            </Form.Field>
            <Form.Field>
              <label>Price</label>
              <input 
              onChange={(e)=>props.onChangeprice(e.target.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => props.close()}>
            Cancel
          </Button>
          <Button positive onClick={() => {
            props.CreateProduct()
            props.close()}}>
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
  )
}

export default CreateProductModal