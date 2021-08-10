import React from 'react'
import { Form } from 'react-bootstrap'

const MyInput = (props) => {
    return (
        <Form.Group controlId="formBasicEmail">
            {props.label && <Form.Label>{props.label}</Form.Label>}
            <Form.Control required={props.required ? true : false} onChange={props.onChange} value={props.value} type={props.type} placeholder={props.placeholder} />
            {props.errorMsg && <Form.Text className="text-muted">
                {props.errorMsg}
            </Form.Text>}
        </Form.Group>
    )
}

export default MyInput
