import React, { useEffect, useState } from 'react'
import Layout from '../../layout/Layout'
import MyModal from './../../reuse/MyModal'
import MyInput from '../../reuse/MyInput'
import { Button } from 'react-bootstrap'
import { catagoryParentIdForSelect } from '../../reuse/ListOfCatagoriesForSelectReUse'
import { useDispatch, useSelector } from 'react-redux'
import { createPageAction } from './../../actions/mypage.actions'
const MyPages = () => {
    const page = useSelector(state => state.page)
    const dispatch = useDispatch()
    //create page modal ...
    const [show, setShow] = useState(false)
    const catagory = useSelector(state => state.catagory)
    const [pageTitle, setPageTitle] = useState('')
    const [pagedescription, setpagedescription] = useState('')
    const [catagorylistforselect, setcatagorylistforselect] = useState([])
    const [selectForCatagoriesInModal, setselectForCatagoriesInModal] = useState('')
    //images handlers...
    const [bannersimage, setbannersimage] = useState([])
    const [productsimage, setproductsimage] = useState([])
    const handelBannersImages = (e) => {
        setbannersimage([...bannersimage, e.target.files[0]])
    }
    const handleProductsImages = (e) => {
        setproductsimage([...productsimage, e.target.files[0]])
    }
    //
    useEffect(() => {
        setcatagorylistforselect(catagoryParentIdForSelect(catagory.catagoryList))
    }, [catagory])
    console.log('MyPage===>', catagorylistforselect)
    const handleOpenCreatePageModal = () => {
        setShow(true)
    }
    const handleCreatePageModal = () => {
        const form = new FormData();
        if (pageTitle == '') {
            alert('Title is required...')
            return;
        }
        if (pagedescription == '') {
            alert('Page description is required...')
            return;
        }
        if (selectForCatagoriesInModal == '') {
            alert('KINDLY Select Catagory Of Page...')
            return;
        }
        if (!bannersimage.length > 0) {
            alert('Select Images For Banners...')
            return;
        }
        if (!productsimage.length > 0) {
            alert('Select Images For Products...')
            return;
        }
        form.append('title', pageTitle)
        form.append('description', pagedescription)
        if (bannersimage.length > 0) {
            bannersimage.forEach(element => {
                form.append('banners', element)
            });
        }
        if (productsimage.length > 0) {
            productsimage.forEach(element => {
                form.append('products', element)
            });
        }
        form.append('catagory', selectForCatagoriesInModal)
        dispatch(createPageAction(form))
        setShow(false)
    }
    const MyModalForCreateNewPage = () => {
        return (
            <MyModal
                show={show}
                handleClose={() => setShow(false)}
                size='md'
                title='Create Page'
                saveAction={handleCreatePageModal}
            >
                <MyInput
                    placeholder='Page Title...'
                    value={pageTitle}
                    onChange={(e) => setPageTitle(e.target.value)}
                />
                <MyInput
                    placeholder='Page Description...'
                    value={pagedescription}
                    onChange={(e) => setpagedescription(e.target.value)}
                />
                <select className="custom-select" value={selectForCatagoriesInModal} onChange={e => setselectForCatagoriesInModal(e.target.value)}>
                    <option value=''>Select a catagory...</option>
                    {
                        catagorylistforselect.map((val, index) => {
                            return <option key={index} value={val.value}>{val.name}</option>
                        })
                    }
                </select>
                {
                    bannersimage.length > 0 && bannersimage.map((val, index) => {
                        return <h6 key={index}>{val.name}</h6>
                    })
                }
                <input type='file' onChange={handelBannersImages} />
                {
                    productsimage.length > 0 && productsimage.map((val, index) => {
                        return <h6 key={index}>{val.name}</h6>
                    })
                }
                <input type='file' onChange={handleProductsImages} />
            </MyModal >
        );
    }
    return (

        <Layout sidebar>
            {
                page.loading ?
                    <p>Creating Page Wait please...</p>
                    :
                    <>
                        {MyModalForCreateNewPage()}
                        < Button onClick={handleOpenCreatePageModal}>Create</Button>
                    </>
            }

        </Layout >
    )
}

export default MyPages
