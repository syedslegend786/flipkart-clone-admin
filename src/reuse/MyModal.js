import { Button } from 'react-bootstrap'
import React from 'react'
import { Modal } from 'react-bootstrap'

const MyModal = (props) => {
    return (
        <Modal show={props.show} onHide={props.handleClose} size={props.size}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{props.children}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={props.handleClose}>
                    Close
          </Button>
                <Button variant="primary" onClick={props.saveAction}>
                    Save Changes
          </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default MyModal
