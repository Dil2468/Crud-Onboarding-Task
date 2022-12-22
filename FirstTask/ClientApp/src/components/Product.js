import React, { useContext, useState } from "react";
import { Button, Icon, Table, Dropdown } from "semantic-ui-react";
import { MyContext } from "./Context";
import swal from "sweetalert";
import CreateProductModal from "./CreateProductModal";
import DeleteProdModal from "./DeleteProdModal";
import EditProductModal from "./EditProductModal";
const Product = () => {
  const { getproddata, GetProduct } = useContext(MyContext);

  const [prodName, setprodname] = useState([]);
  const [price, setprice] = useState([]);

  const [getprodobj, setgetprodobj] = useState([]);

  const [prodmodal, setprodmodal] = useState(false);
  const [editModal, seteditModal] = useState(false);
  const [DelProdModal, setdelprodmodal] = useState(false);

  const itemperpage = 5;

  const [currentpage, setcurrentpage] = useState(1);

  const indexoflastitem = itemperpage * currentpage;

  const indexoffirstitem = indexoflastitem - itemperpage;

  const slicedata = getproddata.slice(indexoffirstitem, indexoflastitem);

  const numberofpages = [];
  for (let i = 1; i <= Math.ceil(getproddata.length / itemperpage); i++) {
    numberofpages.push(i);
  }

  //Get Product By ID

  async function GetProdID(id) {
    const getid = `https://react-web-app.azurewebsites.net/api/Product/GetProductId/${id}`;
    const data = await fetch(getid, {
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
    setgetprodobj(res);
  }

  //Create new Product
  async function CreateProduct() {
    const createurl = `https://react-web-app.azurewebsites.net/api/Product/PostProduct`;
    const senddata = { prodName, price };
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
    //console.log(res);
    swal({
      title: "Success!",
      text: res,
      icon: "success",
      button: "OK!",
    });
    GetProduct();
  }

  // Delete Product

  async function DeleteProduct() {
    const delurl = `https://react-web-app.azurewebsites.net/api/Product/DeleteProduct/${getprodobj.prodId}`;

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
    GetProduct();
  }

  const CreateProdMod = () => {
    setprodmodal(true);
  };

  const EditProdModal = () => {
    seteditModal(true);
  };

  const DelProdMOdalopen = () => {
    setdelprodmodal(true);
  };
  return (
    <div>
      <div>
        <CreateProductModal
          size={"small"}
          open={prodmodal}
          close={() => setprodmodal(false)}
          CreateProduct={() => CreateProduct()}
          onChangename={(prodName) => setprodname(prodName)}
          onChangeprice={(price) => setprice(price)}
        />
        <EditProductModal
          size={"small"}
          open={editModal}
          close={() => seteditModal(false)}
          getprodobj={getprodobj}
          GetProduct={() => GetProduct()}
        />

        <DeleteProdModal
          size={"small"}
          open={DelProdModal}
          close={() => setdelprodmodal(false)}
          DeleteProduct={() => DeleteProduct()}
          name={getprodobj.prodName}
        />

        <Button
          style={{ marginTop: 7 }}
          primary
          size="small"
          onClick={CreateProdMod}
        >
          New Product
        </Button>
        <Table celled striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Product Name</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
              <Table.HeaderCell>Action</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {slicedata.map((e) => (
              <Table.Row key={e.prodId}>
                <Table.Cell>{e.prodName}</Table.Cell>
                <Table.Cell>{"$" + e.price}</Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() => {
                      GetProdID(e.prodId);
                      EditProdModal();
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
                      GetProdID(e.prodId);
                      DelProdMOdalopen();
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

export default Product;
