import React, { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { GeneratePDF } from './GeneratePDF';

export const ValuationList = () => {
  const [valuationResult, setValuationRequest] = useState([]);
  const [isPrint, setIsPrint] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
        setValuationRequest(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleOnPrint = (result) => {
    setSelectedResult(result);
    setIsPrint(true);
  };

  const handleGoBack = () => {
    setIsPrint(false);
    setSelectedResult(null);
  };

  return (
    <div>
      {!isPrint ? (
        <>
          <h2 className='text-center my-4'>Valuation Report List</h2>
          <Table striped bordered className='fs-5'>
            <thead style={{ backgroundColor: '#E2FBF5' }}>
              <tr>
                <th>Valuation ID</th>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Date</th>
                <th>Valuation Staff</th>
                <th>Delete</th>
                <th>Print</th>
              </tr>
            </thead>
            <tbody>
              {valuationResult.map((result) => (
                <tr key={result.id}>
                  <td>{result.id}</td>
                  <td>{result.username}</td>
                  <td>{result.username}</td>
                  <td>13/07/2023</td>
                  <td>{result.name}</td>
                  <td>
                    <img src="/src/assets/assetsStaff/delete.svg" alt="Delete" width='20' height='20' />
                  </td>
                  <td>
                    <img 
                      src="/src/assets/assetsStaff/print.svg" 
                      alt="Print" 
                      width='20' 
                      height='20' 
                      onClick={() => handleOnPrint(result)} 
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : (
        <div>
          <img
            src="/src/assets/assetsStaff/back.svg"
            alt="go back"
            className='mt-3'
            height="40"
            width="40"
            onClick={handleGoBack}
          />
          <GeneratePDF result={selectedResult} />
        </div>
      )}
    </div>
  );
};
