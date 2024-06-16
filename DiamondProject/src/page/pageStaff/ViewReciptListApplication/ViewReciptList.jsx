import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import formattedDate from '../../../utils/formattedDate/formattedDate';

export const ViewReciptList = () => {
  const [selection, setSelection] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredSelection, setFilteredSelection] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/order_request/getOrders');
        const data = await response.json();
        setSelection(data);
        setFilteredSelection(data); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearch = () => {
    const filteredData = selection.filter(item =>
      item.orderId.toString().includes(searchTerm)
    );
    setFilteredSelection(filteredData);
  };

  const viewDetail = (item) => {
    navigate(`/staff/view-receipt/${item.orderId}`, { state: { item } });
  };

  return (
    <div className="container">
      <div className='d-flex justify-content-center' style={{ marginBottom: '50px', marginTop: '50px' }}>
        <h1>View Order List</h1>
      </div>

      <div className='justify-content-center' style={{ width: '80%', margin: '0 auto' }}>
        <Form className="mb-3">
          <Row>
            <Col>
              <Form.Control 
                type="text"
                placeholder="Search by ID"
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </Col>
            <Col xs="auto">
              <Button variant="primary" onClick={handleSearch}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
      <style>
        {`
          .centered-table th,
          .centered-table td {
            text-align: center;
            vertical-align: middle;
          }
        `}
      </style>
      <div>
        <Table striped bordered hover className="centered-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Product Quantity</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredSelection.map(item => (
              <tr key={item.orderId}>
                <td>{item.orderId}</td>
                <td>{formattedDate(item.orderDate)}</td>
                <td>{item.diamondQuantity}</td>
                <td>{item.status}</td>
                <td>
                  <Button variant="info" onClick={() => viewDetail(item)}>
                    View Detail
</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ViewReciptList;