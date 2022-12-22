import React, { useEffect, useState } from 'react'
import { Modal,Form,Button,Icon } from 'semantic-ui-react'
import swal from 'sweetalert';
const EditStoreModal = (props) => {

    const [StorName, setStorName] = useState([]);
    const [StorAddress, setStorAddress] = useState([]);
    const [storid,setstorid]=useState([])
    useEffect(()=>{
        setStorName(props.getbyidobj.storName)
        setStorAddress(props.getbyidobj.storAddress)
        setstorid(props.getbyidobj.storId)
    },[props.getbyidobj])

    async function UpdateStore() {
        const updateurl = `https://react-web-app.azurewebsites.net/api/Store/UpdateStore/${storid}`;
        const updatedata = { StorName, StorAddress, storid };
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
        swal({
          title: "Updated!",
          text: res,
          icon: "success",
          button: "OK!",
        });
        props.GetStore();
      }
      

  return (
    <div>
         <Modal size={"small"} open={props.open} onClose={() => props.close()}>
        <Modal.Header>Edit Store</Modal.Header>
        <Modal.Content>
        <Form>
            <Form.Field>
              <label>Store Name</label>
              <input
                value={StorName || ""}
                onChange={(e) => setStorName(e.target.value)}
              />
            </Form.Field>
            <Form.Field>
              <label>Store Address</label>
              <input
                value={StorAddress || ""}
                onChange={(e) => setStorAddress(e.target.value)}
              />
            </Form.Field>
          </Form>
        </Modal.Content>
        <Modal.Actions>
          <Button color='black' onClick={() => props.close()}>
            Cancel
          </Button>
          <Button positive onClick={() =>{
           UpdateStore()
           props.close()}}>
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
  )
}

export default EditStoreModal