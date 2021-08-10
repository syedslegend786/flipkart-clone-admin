import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import MyInput from '../../../reuse/MyInput';
const AddCatagoryModalComponent = (props) => {
    const {
        show,
        handleClose,
        setcatagoryName,
        catagoryName,
        catagoryParentId,
        setcatagoryParentId,
        handleCatagoryImage,
        handleCreateCatgorySubmit,
        parentIdOfCatagory,
        title
    } = props
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <MyInput
                    onChange={(e) => setcatagoryName(e.target.value)}
                    value={catagoryName}
                    type='text'
                    placeholder='enter catagory name...'
                    required
                />
                <select placeholder='select catagory' class="form-control" value={catagoryParentId} onChange={e => setcatagoryParentId(e.target.value)}>
                    <option value=''>No catagory ?</option>
                    {
                        parentIdOfCatagory.map((cat) => {
                            return <option key={cat.value} value={cat.value}>{cat.name}</option>
                        })
                    }
                </select>
                <input type='file' name='catagoryImage' onChange={handleCatagoryImage} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleCreateCatgorySubmit}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddCatagoryModalComponent;