import React, { useState } from 'react'
import './style.css'
import { Col, Container, Row, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { createCatagoryAction, deleteCatagoryAction, updateCatagoryAction } from '../../actions/catagory.actions'
import Layout from '../../layout/Layout'
//
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import CheckboxTree from 'react-checkbox-tree';
import { BsCaretDownFill, BsCaretRightFill } from 'react-icons/bs'
import { FaCheckSquare } from 'react-icons/fa'
import { ImCheckboxUnchecked } from 'react-icons/im'
import { MdDelete, MdCloudUpload, MdUpdate } from 'react-icons/md'
//
import AddCatagoryModalComponent from './components/AddCatagoryModalComponent'
import UpdateCatagoryModalComponent from './components/UpdateCatagoryModalComponent'
import DeleteCatagoryModalComponent from './components/DeleteCatagoryModalComponent'

const Catagories = () => {
    //deleteCatagory Modal
    const [deleteCatagoryModal, setdeleteCatagoryModal] = useState(false);
    const handleOpenDeleteCatagoryModal = () => {
        getExpandedCheckedArrayLists()
        setdeleteCatagoryModal(true)
    }
    const handleDeleteCatagoryModal = () => {
        const checkedIds = checkedUpdatedArray.map((v, i) => v.value)
        const ids = checkedIds;
        if (ids.length > 0) {
            dispatch(deleteCatagoryAction(ids))
        } else {
            alert(`You did'nt check catagories for Deletion!!!`)
        }
        setdeleteCatagoryModal(false)
    }
    //deleteCatagory Modal
    //UpdateCatagory Modal
    const [updateCatagoryModal, setUpdateCatagoryModal] = useState(false);
    const [expandedUpdatedArray, setExpandedUpdatedArray] = useState([])
    const [checkedUpdatedArray, setCheckedUpdatedArray] = useState([])
    const handleUpdateCatagoryModal = () => {
        const form = new FormData();
        expandedUpdatedArray.forEach((item, index) => {
            form.append('name', item.name);
            form.append('_id', item.value)
            form.append('parentId', item.parentId ? item.parentId : '')
            form.append('type', item.type)
        })
        checkedUpdatedArray.forEach((item, index) => {
            form.append('name', item.name);
            form.append('_id', item.value)
            form.append('parentId', item.parentId ? item.parentId : '')
            form.append('type', item.type)
        })
        dispatch(updateCatagoryAction(form))
        setUpdateCatagoryModal(false)
    }
    const getExpandedCheckedArrayLists = () => {
        const checkedArrayList = []
        const expandedArrayList = []
        const catagories = catagoryParentIdForSelect(catagory.catagoryList);
        //
        checked && checked.forEach((object, index) => {
            const _object = catagories.find((cat, index) => cat.value == object)
            _object && checkedArrayList.push(_object)
        })
        //
        expanded && expanded.forEach((object, index) => {
            const _object = catagories.find((cat, index) => cat.value == object)
            _object && expandedArrayList.push(_object)
        })
        setExpandedUpdatedArray(expandedArrayList)
        setCheckedUpdatedArray(checkedArrayList)
    }
    const handleOpenUpdateCatagoryModal = () => {
        getExpandedCheckedArrayLists()
        setUpdateCatagoryModal(true);
    }
    const handleUpdateExpandedInput = (key, value, type, index) => {
        if (type = 'expanded') {
            const _onchandeHandler = expandedUpdatedArray.map((_value, _index) => _index == index ? { ..._value, [key]: value } : _value)
            setExpandedUpdatedArray(_onchandeHandler)
        }
    }
    const handleUpdateCheckedInput = (key, value, type, index) => {
        if (type = 'checked') {
            const handler = checkedUpdatedArray.map((item, i) => i == index ? { ...item, [key]: value } : item)
            setCheckedUpdatedArray(handler);
        }
    }
    //
    //Modal states and functions...
    const [show, setShow] = useState(false);
    //
    const [catagoryName, setcatagoryName] = useState('')
    const [catagoryParentId, setcatagoryParentId] = useState('')
    const [catagoryImage, setcatagoryImage] = useState(null)
    //CheckboxTree
    const [expanded, setExpanded] = useState([]);
    const [checked, setChecked] = useState([]);
    //
    const handleClose = () => {
        setShow(false)
    }
    const handleShow = () => setShow(true);
    //
    const dispatch = useDispatch()
    const catagory = useSelector(state => state.catagory)
    const myUpdateCatgoryList = (catagories) => {
        let store = []
        for (let cat of catagories) {
            store.push({
                label: cat.name,
                value: cat._id,
                children: cat.children.length > 0 && myUpdateCatgoryList(cat.children, store)
            }
            )
            if (cat.children.length > 0) {
                myUpdateCatgoryList(cat.children, store);
            }
        }
        return store;
    }
    if (catagory.loading) {
        return (
            <div>
                <Layout sidebar>
                    <div>Loading...</div>
                </Layout>
            </div>
        )
    }
    const catagoryParentIdForSelect = (catagories, store = []) => {
        for (let cat of catagories) {
            store.push({
                name: cat.name,
                value: cat._id,
                type: cat.type,
                parentId: cat.parentId,
            })
            if (cat.children.length > 0) {
                catagoryParentIdForSelect(cat.children, store)
            }
        }
        return store;
    }
    const handleCatagoryImage = (e) => {
        setcatagoryImage(e.target.files[0])
    }
    const handleCreateCatgorySubmit = () => {
        const form = new FormData()
        form.append('name', catagoryName)
        if (catagoryParentId) {
            form.append('parentId', catagoryParentId)
        }
        form.append('catagoryPicture', catagoryImage)
        dispatch(createCatagoryAction(form))
        setcatagoryImage(null);
        setcatagoryName('')
        setcatagoryParentId('')
        handleClose()
    }
    return (
        <div>
            <Layout sidebar>
                <Container>
                    <Row>
                        {
                            catagory.catagoryCreatedSuccess && <div>{catagory.catagoryCreatedSuccess}</div>
                        }
                        {
                            catagory.catagoryCreatedFailure && <div>{catagory.catagoryCreatedFailure}</div>
                        }
                        <Col xs={12}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                margin: '20px'
                            }}>
                                <h1>Add Catagory</h1>
                                <div className='del__upd'>
                                    <button onClick={handleShow} ><MdCloudUpload /><span>Add</span></button>
                                    <button onClick={handleOpenDeleteCatagoryModal}><MdDelete /><span>Delete</span></button>
                                    <button onClick={handleOpenUpdateCatagoryModal}><MdUpdate /><span>Update</span></button>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <CheckboxTree
                                nodes={myUpdateCatgoryList(catagory.catagoryList)}
                                checked={checked}
                                expanded={expanded}
                                onCheck={checked => setChecked(checked)}
                                onExpand={expanded => setExpanded(expanded)}
                                icons={{
                                    check: <FaCheckSquare />,
                                    uncheck: <ImCheckboxUnchecked />,
                                    halfCheck: <ImCheckboxUnchecked />,
                                    expandClose: <BsCaretRightFill />,
                                    expandOpen: <BsCaretDownFill />,
                                }}
                            />
                        </Col>
                    </Row>
                </Container>

            </Layout>
            <AddCatagoryModalComponent
                show={show}
                handleClose={handleClose}
                setcatagoryName={setcatagoryName}
                catagoryName={catagoryName}
                catagoryParentId={catagoryParentId}
                setcatagoryParentId={setcatagoryParentId}
                handleCatagoryImage={handleCatagoryImage}
                handleCreateCatgorySubmit={handleCreateCatgorySubmit}
                parentIdOfCatagory={catagoryParentIdForSelect(catagory.catagoryList)}
                title='Add Catagory'
            />
            <UpdateCatagoryModalComponent
                updateCatagoryModal={updateCatagoryModal}
                setUpdateCatagoryModal={setUpdateCatagoryModal}
                handleUpdateCatagoryModal={handleUpdateCatagoryModal}
                handleUpdateExpandedInput={handleUpdateExpandedInput}
                handleUpdateCheckedInput={handleUpdateCheckedInput}

                expandedUpdatedArray={expandedUpdatedArray}
                catagoryParentIdForSelect={catagoryParentIdForSelect}
                catagory={catagory}
                checkedUpdatedArray={checkedUpdatedArray}
            />
            <DeleteCatagoryModalComponent
                deleteCatagoryModal={deleteCatagoryModal}
                setdeleteCatagoryModal={setdeleteCatagoryModal}
                handleDeleteCatagoryModal={handleDeleteCatagoryModal}
                expandedUpdatedArray={expandedUpdatedArray}
                checkedUpdatedArray={checkedUpdatedArray}
            />
        </div>
    )
}

export default Catagories
