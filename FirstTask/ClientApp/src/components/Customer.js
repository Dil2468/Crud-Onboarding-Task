import React, { useContext, useState } from "react";
import { Button, Icon, Table, Dropdown } from "semantic-ui-react";
import { MyContext } from "./Context";
import CreateCusModal from "./CreateCusModal";
import DeleteCustomerModal from "./DeleteCustomerModal";
import EditCustomerModal from "./EditCustomerModal";
import swal from "sweetalert";

const Customer = () => {
  const [CreateModal, setCreateModal] = useState(false);
  const [EditModal, setEditmodal] = useState(false);
  const [delmodal, setdelmodal] = useState(false);
  const [cusname, setcusname] = useState([]);
  const [address, setaddress] = useState([]);
  const [getbyidobj, setgetbyidobj] = useState([]);

  const { custdata, GetCustomer } = useContext(MyContext);

  const itemperpage = 5;

  const [currentpage, setcurrentpage] = useState(1);

  const indexoflastitem = itemperpage * currentpage;

  const indexoffirstitem = indexoflastitem - itemperpage;

  const slicedata = custdata.slice(indexoffirstitem, indexoflastitem);

  const numberofpages = [];
  for (let i = 1; i <= Math.ceil(custdata.length / itemperpage); i++) {
    numberofpages.push(i);
  }

  //Get Customer By ID
  async function GetCustomerID(id) {
    const urlID = `https://react-web-app.azurewebsites.net/api/Customer/GetCustomerID/${id}`;

    const data = await fetch(urlID, {
      method: "GET",
      headers: {
        'Access-Control-Allow-Origin': '*',
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

  //Create New Customer Data

  async function CreateCustomer() {
    const createurl = `https://react-web-app.azurewebsites.net/api/Customer/PostCustomer`;
    const senddata = { cusname, address };
    const data = await fetch(createurl, {
      method: "POST",
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(senddata),
    });
    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }
    const res = await data.json();
    GetCustomer();
    //console.log(res);
    swal({
      title: "Success!",
      text: res,
      icon: "success",
      button: "OK!",
    });
  }

  //Delete Customers

  async function DeleteCustomers() {
    const delurl = `https://react-web-app.azurewebsites.net/api/Customer/DeleteCustomer/${getbyidobj.cusID}`;

    const data = await fetch(delurl, {
      method: "DELETE",
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!data.ok) {
      throw new Error(`HTTP error! status: ${data.status}`);
    }
    const res = await data.json();
    // console.log(res);
    swal({
      title: "Deleted!",
      text: res,
      icon: "success",
      button: "OK!",
    });
    GetCustomer();
  }

  // Open Create Customer modal
  const Createmodalopen = () => {
    setCreateModal(true);
  };
  // Edit Modal Open
  const EditcusModal = () => {
    setEditmodal(true);
  };

  //Delete customer Modal open
  const DeleteModal = () => {
    setdelmodal(true);
  };

  return (
    <div>
      <div>
        <CreateCusModal
          open={CreateModal}
          size={"small"}
          close={() => setCreateModal(false)}
          CreateCustomer={() => CreateCustomer()}
          onChangename={(cusname) => setcusname(cusname)}
          onChangeaddress={(address) => setaddress(address)}
        />
        <EditCustomerModal
          open={EditModal}
          size={"small"}
          close={() => setEditmodal(false)}
          getbyidobj={getbyidobj}
          GetCustomer={GetCustomer}
        />
        <DeleteCustomerModal
          size={"small"}
          open={delmodal}
          close={() => setdelmodal(false)}
          DeleteCustomers={DeleteCustomers}
          name={getbyidobj.cusName}
        />

        <Button
          style={{ marginTop: 7 }}
          onClick={Createmodalopen}
          primary
          size="small"
        >
          Create Customer
        </Button>

        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Customer Name</Table.HeaderCell>
              <Table.HeaderCell>Customer Address</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {slicedata.map((e) => (
              <Table.Row key={e.cusID}>
                <Table.Cell>{e.cusName}</Table.Cell>
                <Table.Cell>{e.address}</Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => {
                      GetCustomerID(e.cusID);
                      EditcusModal();
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
                      GetCustomerID(e.cusID);
                      DeleteModal();
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

export default Customer;
