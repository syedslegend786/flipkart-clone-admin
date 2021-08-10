import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import MyInput from '../../../reuse/MyInput'
import MyModal from '../../../reuse/MyModal'
const UpdateCatagoryModalComponent = (props) => {
    const {
        updateCatagoryModal,
        setUpdateCatagoryModal,
        handleUpdateCatagoryModal,
        handleUpdateExpandedInput,
        handleUpdateCheckedInput,


        expandedUpdatedArray,
        catagory,
        catagoryParentIdForSelect,
        checkedUpdatedArray,
    } = props
    console.log(expandedUpdatedArray, checkedUpdatedArray,)
    return (
        <MyModal
            show={updateCatagoryModal}
            handleClose={() => setUpdateCatagoryModal(false)}
            size='lg'
            title='Update Catagory'
            saveAction={() => handleUpdateCatagoryModal()}
        >
            <Container >
                <h5>Expanded</h5>
                {
                    expandedUpdatedArray.length > 0 && expandedUpdatedArray.map((item, index) => (
                        <Row key={item.value}>
                            <Col>
                                <MyInput
                                    onChange={(e) => handleUpdateExpandedInput('name', e.target.value, 'expanded', index)}
                                    value={item.name}
                                    placeholder='catagory name'
                                    type='text'
                                    required
                                />
                            </Col>
                            <Col>
                                <select placeholder='select catagory' class="form-control" value={item.parentId} onChange={e => handleUpdateExpandedInput('parentId', e.target.value, 'expanded', index)}>
                                    <option value=''>No catagory ?</option>
                                    {
                                        catagoryParentIdForSelect(catagory.catagoryList).map((cat) => {
                                            return <option key={cat.value} value={cat.value}>{cat.name}</option>
                                        })
                                    }
                                </select>
                            </Col>
                            <Col>
                                <select className='custom-select' value={item.type} onChange={(e) => handleUpdateExpandedInput('type', e.target.value, 'expanded', index)}>
                                    <option value=''>Select Type</option>
                                    <option value='store'>Store</option>
                                    <option value='product'>Product</option>
                                    <option value='page'>Page</option>
                                </select>
                            </Col>
                        </Row>
                    ))
                }
                <h5>Checked</h5>
                {
                    checkedUpdatedArray.length > 0 && checkedUpdatedArray.map((item, index) => (
                        <Row>
                            <Col>
                                <MyInput
                                    onChange={(e) => handleUpdateCheckedInput('name', e.target.value, 'checked', index)}
                                    value={item.name}
                                    placeholder='catagory name'
                                    type='text'
                                    required
                                />
                            </Col>
                            <Col>
                                <select placeholder='select catagory' class="form-control"
                                    value={item.parentId}
                                    onChange={e => handleUpdateCheckedInput('parentId', e.target.value, 'checked', index)}>
                                    <option value=''>No catagory ?</option>
                                    {
                                        catagoryParentIdForSelect(catagory.catagoryList).map((cat) => {
                                            return <option key={cat.value} value={cat.value}>{cat.name}</option>
                                        })
                                    }
                                </select>
                            </Col>
                            <Col>
                                <select className='custom-select'
                                    value={item.type}
                                    onChange={e => handleUpdateCheckedInput('type', e.target.value, 'checked', index)}
                                >
                                    <option value=''>Select Type</option>
                                    <option value='store'>Store</option>
                                    <option value='product'>Product</option>
                                    <option value='page'>Page</option>
                                </select>
                            </Col>
                        </Row>
                    ))
                }
            </Container>
        </MyModal >)
}

export default UpdateCatagoryModalComponent;