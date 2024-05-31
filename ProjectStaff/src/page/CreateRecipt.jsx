import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

export const CreateRecipt = () => {
  const [selection, setSelection] = useState([]);
  const [custName, setCustName] = useState('');
  const [phone, setPhone] = useState('');
  const [quantity, setQuantity] = useState('');
  const [result, setResult] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setSelection(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const initialRows = Array.from({ length: parseInt(quantity) || 0 }, () => ({
    assessmentId: '',
    service: '',
    receivedDate: '',
    expiredDate: '',
    price: ''
  }));

  const [rows, setRows] = useState(initialRows);

  const handleRowChange = (index, field, value) => {
    const updatedRows = rows.map((row, rowIndex) => 
      rowIndex === index ? { ...row, [field]: value } : row
    );
    setRows(updatedRows);
  };

  const handleServiceChange = (index, value) => {
    const selectedService = selection.find(service => service.username === value);
    const updatedRows = rows.map((row, rowIndex) => 
      rowIndex === index ? { ...row, service: value, price: selectedService?.phone || '' } : row
    );
    setRows(updatedRows);
  };

  const handleQuantityChange = (e) => {
    const qty = parseInt(e.target.value) || 0;
    setQuantity(e.target.value);
    const newRows = Array.from({ length: qty }, (v, i) => rows[i] || {
      assessmentId: '',
      service: '',
      receivedDate: '',
      expiredDate: '',
      price: ''
    });
    setRows(newRows);
  };

  const totalPrice = rows.reduce((total, row) => total + parseFloat(row.price || 0), 0);

  const handleOnChange = (name) => (e) => {
    setResult((currentState) => ({
        ...currentState, [name]: e.target.value
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const dataToSend = {
      customerName: custName,
      phone: phone,
      quantity: quantity,
      items: rows
    };

    // Gửi dữ liệu đi thông qua API endpoint
    console.log('Data to send:', dataToSend);
  };

  return (
    <form onSubmit={handleOnSubmit}>
      <div className='row mb-5'>
        <h2 className='p-2 text-center'>Order</h2>
        <div className="row mb-3 d-flex justify-content-center">
          <div className="col-3" style={{ width: "15%" }}>
            <label className="form-label fw-bold">Customer Name</label>
          </div>
          <div className="col-7">
            <input
              type="text"
              className="form-control"
              value={custName}
              onChange={(e) => setCustName(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3 d-flex justify-content-center">
          <div className="col-3" style={{ width: "15%" }}>
            <label className="form-label fw-bold">Phone</label>
          </div>
          <div className="col-7">
            <input
              type="text"
              className="form-control"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
        </div>
        <div className="row mb-3 d-flex justify-content-center">
          <div className="col-3" style={{ width: "15%" }}>
            <label className="form-label fw-bold">Quantity</label>
          </div>
          <div className="col-7">
            <input
              type="text"
              className="form-control"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-center'>
        <Table striped bordered className='fs-5'  style={{width:"80%"}}>
          <thead className='text-center'>
            <tr>
              <th style={{ backgroundColor: "#7CF4DE" }}>Assessment ID</th>
              <th style={{ backgroundColor: "#7CF4DE" }}>Service</th>
              <th style={{ backgroundColor: "#7CF4DE" }}>Received Date</th>
              <th style={{ backgroundColor: "#7CF4DE" }}>Expired Date</th>
              <th style={{ backgroundColor: "#7CF4DE" }}>Price</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.assessmentId}
                    onChange={(e) => handleRowChange(index, 'assessmentId', e.target.value)}
                  />
                </td>
                <td>
                  <select
                    className="form-control"
                    value={row.service}
                    onChange={(e) => handleServiceChange(index, e.target.value)}
                  >
                    <option value="">Select Service</option>
                    {selection.map(service => (
                      <option key={service.id} value={service.username}>
                        {service.username}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.receivedDate}
                    onChange={(e) => handleRowChange(index, 'receivedDate', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.expiredDate}
                    onChange={(e) => handleRowChange(index, 'expiredDate', e.target.value)}
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    value={row.price}
                    onChange={(e) => handleRowChange(index, 'price', e.target.value)}
                    readOnly
                  />
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="4" className="text-end"><strong>Total Price</strong></td>
              <td><input type="text" className="form-control" value={totalPrice} readOnly /></td>
            </tr>
          </tbody>
        </Table>
      </div>

      <div className="d-flex justify-content-center">
        <Button className='btn btn-success me-4' type='submit'>Accept</Button>
      </div>
    </form>
  );
}