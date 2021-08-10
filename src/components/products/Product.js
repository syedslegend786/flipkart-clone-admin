import React, { useState } from 'react'
import { Button, Col, Container, Row, Modal, Table } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import Layout from '../../layout/Layout'
import MyModal from '../../reuse/MyModal';
import { createProduct, deleteProductAction } from './../../actions/product.actions'
//reuse.js
import MyInput from './../../reuse/MyInput'
//
import './style.css';
const Product = () => {
    const dispatch = useDispatch()
    //product tabel modal...
    const [tableProductModal, setTableProductModal] = useState(false)
    const [TrDetail, setTrDetail] = useState(null);
    const handleShowTableProductModal = () => {
        setTableProductModal(true)
    }
    const handleCloseTableProductModal = () => {
        setTableProductModal(false)
    }
    //product tabel modal...
    //Modal states and actions...
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [productName, setname] = useState('')
    const [productPictures, setproductPictures] = useState([])
    const [quantity, setquantity] = useState(1)
    const [description, setdescription] = useState('')
    const [price, setprice] = useState(0);
    const [productCatagory, setcatagory] = useState();
    //
    const catagory = useSelector(state => state.catagory);
    const product = useSelector(state => state.product);
    const selectOptionsForCatagory = (catagories, array = []) => {
        for (const cat of catagories) {
            array.push({
                name: cat.name,
                value: cat._id,
            })
            if (cat.children.length > 0) {
                selectOptionsForCatagory(cat.children, array)
            }
        }
        return array;
    }
    const handleCreateProductRequest = () => {
        if (productName && productPictures.length > 0 && quantity && description && price && productCatagory) {
            const form = new FormData();
            form.append('name', productName)
            form.append('quantity', quantity)
            form.append('description', description)
            form.append('price', price)
            form.append('catagory', productCatagory)
            for (const pic of productPictures) {
                form.append('productPictures', pic)
            }
            // console.log('product===>',
            //     productName,
            //     productPictures,
            //     quantity,
            //     description,
            //     price,
            //     productCatagory)
            dispatch(createProduct(form));
            handleClose()

        } else {
            alert('Kindly fill the Product Form properly...')
        }
    }
    const handleProductImagesSubmit = (e) => {
        setproductPictures([
            ...productPictures,
            e.target.files[0]
        ])
    }
    const createProductModal = () => {
        return (
            <MyModal
                show={show}
                handleClose={handleClose}
                saveAction={handleCreateProductRequest}
                title='Product'
            >
                <MyInput
                    value={productName}
                    onChange={(e) => setname(e.target.value)}
                    placeholder='product name...'
                    type='text'
                    label='Product name'
                />
                <MyInput
                    value={quantity}
                    onChange={(e) => setquantity(e.target.value)}
                    placeholder='quantity...'
                    type='number'
                    label='Product quantity'
                />
                <MyInput
                    value={description}
                    onChange={(e) => setdescription(e.target.value)}
                    placeholder='description...'
                    type='text'
                    label='Product description'
                />
                <MyInput
                    value={price}
                    onChange={(e) => setprice(e.target.value)}
                    type='number'
                    label='Price'
                />
                <select className='custom-select' value={productCatagory} onChange={e => setcatagory(e.target.value)}>
                    <option value=''>Select catagory</option>
                    {
                        selectOptionsForCatagory(catagory.catagoryList).map((cat) => {
                            return <option key={cat.value} value={cat.value}>{cat.name}</option>
                        })
                    }
                </select>
                {
                    productPictures.map((pic, index) => {
                        return <div key={index}>{pic.name}</div>
                    })
                }
                <input type='file' onChange={handleProductImagesSubmit} />
            </MyModal>
        )
    }
    const checkProductDetailModal = () => {
        return (
            <MyModal
                show={tableProductModal}
                handleClose={handleCloseTableProductModal}
                title={'Product detail'}
                saveAction={handleCloseTableProductModal}
                size='lg'
            >
                <div>
                    <Container>
                        <Row>
                            <Col xs={6}>
                                <label className='modal__label'>Name</label>
                                <p className='modal__label__p'>{TrDetail?.name}</p>
                            </Col>
                            <Col xs={6}>
                                <label className='modal__label'>Price</label>
                                <p className='modal__label__p'>{TrDetail?.price}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={6}>
                                <label className='modal__label'>Quantity</label>
                                <p className='modal__label__p'>{TrDetail?.quantity}</p>
                            </Col>
                            <Col xs={6}>
                                <label className='modal__label'>Catagory</label>
                                <p className='modal__label__p'>{TrDetail?.catagory.name}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <label className='modal__label'>Description</label>
                                <p className='modal__label__p'>{TrDetail?.description}</p>
                            </Col>
                        </Row>
                        <Row>
                            <Col xs={12}>
                                <label className='modal__label'>Product Pictures</label>
                                <div className='trmodal__img__div'>
                                    {
                                        TrDetail?.productPictures.map((pic) => {
                                            return <img src={`http://localhost:3001/public/${pic.img}`} />
                                        })
                                    }
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </MyModal>
        )
    }
    const handleTrDeatil = (product) => {
        setTrDetail(product)
        setTableProductModal(true)
    }
    const handleRemoveProduct = (_id) => {
        const payload = {
            productId: _id,
        }
        // console.log(payload)
        dispatch(deleteProductAction(payload))
    }
    const renderTable = () => {
        return <Table responsive="sm" striped hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>catagory</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    product.getAllProducts.map((row, i) => (
                        <tr key={i}>
                            <td>1</td>
                            <td>{row.name}</td>
                            <td>{row.price}</td>
                            <td>{row.quantity}</td>
                            <td>{row.catagory.name}</td>
                            <td>
                                <button onClick={() => handleTrDeatil(row)}>Detail</button>
                                <button onClick={() => handleRemoveProduct(row._id)}>Remove</button>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </Table >
    }
    return (
        <div>
            <Layout sidebar>
                <Container>
                    <Row>
                        <Col xs={12}>
                            <div className='product__addproduct'>
                                <h1>Products</h1>
                                <Button onClick={handleShow}>Add Product</Button>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            {
                                renderTable()
                            }
                        </Col>
                    </Row>
                </Container>
            </Layout>
            {createProductModal()}
            {checkProductDetailModal()}
        </div >
    )
}
export default Product
