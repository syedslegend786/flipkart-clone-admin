import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signOut } from '../../actions/auth.actions'
//
import './header.css'

const Header = () => {
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const handleSignout = () => {
        dispatch(signOut())
    }
    return (
        <div className='header'>
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Container>
                    {
                        auth.authenticate ? <Link class="navbar-brand" to='/'>Admin dashBoard</Link> : <span class="navbar-brand" >Admin Login Or Signup</span>
                    }

                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav className="mr-auto">
                            {/* <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                        </Nav>
                        {
                            auth.authenticate ?
                                <Nav>
                                    <li class="nav-item">
                                        <span onClick={handleSignout} className="nav-link" style={{ cursor: 'pointer' }}>Signout</span>
                                    </li>
                                </Nav>
                                :
                                <Nav>
                                    <li disabled={true} class="nav-item">
                                        <Link className="nav-link" to='/signin'>SignIn</Link>
                                    </li>
                                    <li class="nav-item">
                                        <Link className="nav-link" to='/signup'>SignUp</Link>
                                    </li>
                                </Nav>
                        }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default Header
