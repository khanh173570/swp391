import React from 'react'
import { Row, Col } from 'react-bootstrap'
export const UserRequestDetails1 = ({userRequestDetail}) => {
  return (
        <div>
            <div>
                <h2 className='my-4 text-center'>Detailed Information</h2>
            </div>           
                <div className='d-flex justify-content-center fs-4 '> 
                    <div className='w-50' style={{  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' , margin:'20px 0', padding:'20px 0'}}>
                    <Row className="mb-2">
                        <Col md={5} className='text-end'><strong>Name</strong></Col>
                        <Col md={7} className='text-start'>{userRequestDetail.name}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md={5} className='text-end'><strong>Username</strong></Col>
                        <Col md={7} className='text-start'>{userRequestDetail.username}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md={5} className='text-end'><strong>Email</strong></Col>
                        <Col md={7} className='text-start'>{userRequestDetail.email}</Col>
                    </Row>
                    <Row className="mb-2">
                        <Col md={5} className='text-end'><strong>Phone</strong></Col>
                        <Col md={7} className='text-start'>{userRequestDetail.phone}</Col>
                    </Row>
                    </div>
                </div>
        </div>
  )
}