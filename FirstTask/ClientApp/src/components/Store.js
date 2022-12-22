import React, { useState, useContext } from "react";
import { Table, Button, Icon, Dropdown } from "semantic-ui-react";
import CreateStorModal from "./CreateStorModal";
import DeleteStorModal from "./DeleteStorModal";
import EditStoreModal from "./EditStoreModal";
import { MyContext } from "./Context";
import swal from "sweetalert";
const Store = () => {
  const { getstordata, GetStore } = useContext(MyContext);

  const [StorName, setStorName] = useState([]);
  const [StorAddress, setStorAddress] = useState([]);
  const [CreateModal, setCreateModal] = useState(false);
  const [getbyidobj, setgetbyidobj] = useState([]);

  const [EditModal, setEditmodal] = useState(false);
  const [delmodal, setdelmodal] = useState(false);
  const itemperpage = 5;

  const [currentpage, setcurrentpage] = useState(1);

  const indexoflastitem = itemperpage * currentpage;

  const indexoffirstitem = indexoflastitem - itemperpage;

  const slicedata = getstordata.slice(indexoffirstitem, indexoflastitem);

  const numberofpages = [];
  for (let i = 1; i <= Math.ceil(getstordata.length / itemperpage); i++) {
    numberofpages.push(i);
  }

  async function GetStoreID(id) {
    const urlID = `https://react-web-app.azurewebsites.net/api/Store/GetStoreId/${id}`;

    const data = await fetch(urlID, {
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

    setgetbyidobj(res);
  }

  async function CreateStore() {
    const createurl = `https://react-web-app.azurewebsites.net/api/Store/PostStore`;
    const senddata = { StorName, StorAddress };
    const data = await fetch(createurl, {
      method: "POST",
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
    GetStore();
    swal({
      title: "Success!",
      text: res,
      icon: "success",
      button: "OK!",
    });
  }

  async function DeleteStore() {
    const delurl = `https://react-web-app.azurewebsites.net/api/Store/DeleteStore/${getbyidobj.storId}`;

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
    GetStore();
  }

  const CreateModalopen = () => {
    setCreateModal(true);
  };

  const UpdateModal = () => {
    setEditmodal(true);
  };

  const DeletstoreModalopen = () => {
    setdelmodal(true);
  };

  return (
    <div>
      <div>
        <CreateStorModal
          open={CreateModal}
          size={"small"}
          close={() => setCreateModal(false)}
          CreateStore={() => CreateStore()}
          onChangename={(StorName) => setStorName(StorName)}
          onChangeaddress={(StorAddress) => setStorAddress(StorAddress)}
        />

        <EditStoreModal
          open={EditModal}
          size={"small"}
          close={() => setEditmodal(false)}
          getbyidobj={getbyidobj}
          GetStore={GetStore}
        />
        <DeleteStorModal
          size={"small"}
          open={delmodal}
          close={() => setdelmodal(false)}
          DeleteStore={() => DeleteStore()}
          name={getbyidobj.storName}
        />

        <Button
          style={{ marginTop: 7 }}
          onClick={CreateModalopen}
          primary
          size="small"
        >
          New Store
        </Button>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Store Name</Table.HeaderCell>
              <Table.HeaderCell>Store Address</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {slicedata.map((e, index) => (
              <Table.Row key={index}>
                <Table.Cell>{e.storName}</Table.Cell>
                <Table.Cell>{e.storAddress}</Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => {
                      GetStoreID(e.storId);
                      UpdateModal();
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
                      GetStoreID(e.storId);
                      DeletstoreModalopen();
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
            {numberofpages.map((e, i) => {
              return (
                <Dropdown.Item
                  key={i}
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

export default Store;
