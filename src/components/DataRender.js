import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
// import db from "../../public/db.json";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import EditForm from "./EditForm";

function DataRender() {
  const [companyDatas, setcompanyDatas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/data")
      .then((res) => res.json())
      .then((data) => setcompanyDatas(data));
  }, []);
  const handleDelete = (id) => {
    console.log(id);
    fetch(`http://localhost:3001/data/${id}`, {
      method: "DELETE",
    });
  };
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <Row xs={1} md={3} className="g-4">
      {companyDatas.map((companyData) => {
        console.log(companyData);
        return (
          <Col>
            <Card>
              <Card.Img variant="top" src={companyData.companyLogo} />
              <Card.Body>
                <Card.Title>{companyData.company_name}</Card.Title>
                <Card.Text>
                  {companyData.nationality}
                  <br></br>
                  {companyData.ownership}
                </Card.Text>
                <button onClick={() => handleDelete(companyData?.id)}>
                  Delete
                </button>
                <Button variant="primary" onClick={handleShow}>
                  Edit
                </Button>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <EditForm id={companyData.id}></EditForm>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                      Close
                    </Button>
                
                  </Modal.Footer>
                </Modal>
              </Card.Body>
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}

export default DataRender;
