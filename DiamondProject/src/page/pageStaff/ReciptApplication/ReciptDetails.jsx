import React, { useEffect, useState } from "react";
import { Container, Row, Col, Table, Form, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import formattedDate from "../../../utils/formattedDate/formattedDate";

export const ReceiptDetails = () => {
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editRowId, setEditRowId] = useState(null);
  const [editColIsDiamond, setEditColIsDiamond] = useState(false);
  const [editColStatus, setEditColStatus] = useState(false);
  const [editStatus, setEditStatus] = useState('');
  const [editIsDiamond, setEditIsDiamond] = useState(true);
  const { orderId } = useParams();
  const navigate = useNavigate();

  const API = 'http://localhost:8080/order_detail_request/orderDetail'; // Replace with your actual API

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API}/${orderId}`);
        const data = await response.json();
        setOrderDetails(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [orderId,editIsDiamond, editStatus]);

   const APIUpdate = 'http://localhost:8080/order_detail_request/getOrderDe'

  const handleOnChangeStatus = (productId, field, value) => {
    const fetchUpdateStatus = async () => {
      try {
        const response = await fetch(`${APIUpdate}/${productId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ [field]: value }),
        });
        const data = await response.json();
        console.log('Update response:', data);
        setEditRowId(null); 
        setEditColIsDiamond(false);
        setEditColStatus(false);
      } catch (error) {
        console.error('Error updating status:', error);
      }
    };
    fetchUpdateStatus();
  };

  const handleCreateForm = (product) => {
    navigate('/staff/valuation', { state: { product } });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Container>
        <div className="text-center my-4">
          <h1>Information of Order Detail</h1>
        </div>
        <Row className="mb-4">
          <Col md={2}>RequestID:</Col>
          <Col md={3}>{orderDetails[0].orderId.requestId.requestId}</Col>
        </Row>
        <Row className="mb-4">
          <Col md={2}>Customer Name:</Col>
          <Col md={3}>{orderDetails[0].orderId.customerName}</Col>
        </Row>
        <Row className="mb-4">
          <Col md={2}>Phone:</Col>
          <Col md={3}>{orderDetails[0].phone}</Col>
        </Row>
        <Table>
          <thead>
            <tr className="text-center">
              <th>Image</th>
              <th>Service</th>
              <th>Time</th>
              <th>Valuation Staff</th>
              <th>Size</th>
              <th>Diamond</th>
              <th>Status</th>
              <th>Unit Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.map((product) => (
              <tr key={product.orderDetailId}>
                {/* img */}
                <td>
                <img 
                  src={product.img}
                  alt="" 
                  height='80'
                  width='80'
                  />
                  </td>

                {/* Service */}
                <td>{product.serviceId.serviceType}</td>
                {/* receive - expired */}
                <td>{formattedDate(product.receivedDate)}-{formattedDate(product.expiredReceivedDate)}</td>
                {/* valuation staff */}
                <td>{product.evaluationStaffId}</td>
                {/* size */}
                <td>{product.size}</td>
                {/* isDiamond */}
                <td>
                  {editRowId === product.id && editColIsDiamond ? (
                    <>
                      <Form.Select
                        aria-label="Is Diamond"
                        name="isDiamond"
                        value={editIsDiamond}
                        onChange={(e) => setEditIsDiamond(e.target.value === 'true')}
                      >
                        <option value=""></option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                      </Form.Select>
                      <Button onClick={() => handleOnChangeStatus(product.orderDetailId, 'isDiamond', editIsDiamond)}>Save</Button>
                    </>
                  ) : (
                    <div className="d-flex justify-content-between">
                      <div>{product.isDiamond ? "Yes" : "No"}</div>
                      <img
                        src="/src/assets/assetsStaff/editStatus.svg"
                        alt="Edit"
                        height="20"
                        width="20"
                        onClick={() => {
                          setEditRowId(product.orderDetailId);
                          setEditIsDiamond(product.isDiamond);
                          setEditColIsDiamond(true);
                          setEditColStatus(false);
                        }}
                      />
                    </div>
                  )}
                </td>
                {/* status */}
                <td>
                  {editRowId === product.orderDetailId && editColStatus ? (
                    <>
                      <Form.Select
                        aria-label="Status"
                        value={editStatus}
                        name="status"
                        onChange={(e) => setEditStatus(e.target.value)}
                      >
                        <option value=""></option>
                        <option value="Received">Received</option>
                        <option value="Assigned">Assigned</option>
                        <option value="Finished">Finished</option>
                      </Form.Select>
                      <Button onClick={() => handleOnChangeStatus(product.orderDetailId, 'status', editStatus)}>Save</Button>
                    </>
                  ) : (
                    <div className="d-flex justify-content-between">
                      <div>{product.status}</div>
                      <img
                        src="/src/assets/assetsStaff/editStatus.svg"
                        alt="Edit"
                        height="20"
                        width="20"
                        onClick={() => {
                          setEditRowId(product.orderDetailId);
                          setEditStatus(product.status);
                          setEditColStatus(true);
                          setEditColIsDiamond(false);
                        }}
                      />
                    </div>
                  )}
                </td>
                {/* unit price */}
                <td>{product.name}</td>
                <td>
                  <Button onClick={() => handleCreateForm(product)} disabled={!product.isDiamond}>Create Form</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </div>
  );
};