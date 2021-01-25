import './App.css';
import React, { useState, useEffect } from 'react';
import { Button, Modal } from 'react-bootstrap';

const RingleButton = ({text}) => {
    return(
        <div className="RingleButton" >
            {text}
        </div>
    );
  }

export const VertModal = ({text, title, buttext, hrefV}) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
        <div className="RingleButton" onClick={handleShow}>
            {buttext}
        </div>

        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
            <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {text}
                <iframe
                    src={hrefV}>
                </iframe>
            </Modal.Body>
            <Modal.Footer>
            {/* <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            <Button variant="primary">Understood</Button> */}
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default RingleButton;