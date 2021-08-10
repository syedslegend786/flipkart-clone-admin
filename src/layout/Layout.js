import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { Link, NavLink } from 'react-router-dom'
import Header from '../components/header/Header'

//
import './style.css'
const Layout = (props) => {
    const checkActive = (match, location) => {
        console.log(location);
        if (!location) return false;
        const { pathname } = location;
        const { url } = match;
        return pathname === url ? true : false;
    };
    return (
        <div>
            <Header />
            {
                props.sidebar ?
                    <Container fluid className='home__sidebat__main'>
                        <Row>
                            <Col className='home__sidebar' xs={2}>
                                <ul>
                                    <li key='home'><NavLink isActive={checkActive} to='/'>Home</NavLink></li>
                                    <li key='page'><NavLink isActive={checkActive} to='/page'>Page</NavLink></li>
                                    <li key='products'><NavLink activeClassName="active-link active2" to='/products'>Products</NavLink></li>
                                    <li key='orders'><NavLink activeClassName="active-link active2" to='/orders'>Orders</NavLink></li>
                                    <li key='catagories'><NavLink activeClassName="active-link active2" to='/catagories'>Catagories</NavLink></li>
                                </ul>
                            </Col>
                            <Col xs={10}>
                                {props.children}
                            </Col>
                        </Row>
                    </Container>
                    :
                    props.children
            }

        </div>
    )
}

export default Layout
