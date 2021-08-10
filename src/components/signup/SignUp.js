import React, { useState } from 'react'
import Layout from '../../layout/Layout'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import MyInput from '../../reuse/MyInput'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'
import { signUp } from '../../actions/user.actions'

const SignUp = () => {
    const [firstName, setFirstname] = useState('')
    const [lastName, setLastName] = useState('')
    const [userName, setusername] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')

    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    if (auth.authenticate) {
        return <Navigate to='/' />
    }
    const handleSignUpRequest = (e) => {
        e.preventDefault()
        const user = {
            firstName, lastName, userName, email, password
        }
        dispatch(signUp(user))
    }
    return (
        <div>
            <Layout>
                <Container>
                    <Row>
                        <Col style={{ marginTop: '50px' }} md={{ span: 6, offset: 3 }}>
                            <Form onSubmit={handleSignUpRequest}>
                                <Row>
                                    <Col md={6}>
                                        <MyInput
                                            value={firstName}
                                            onChange={(e) => setFirstname(e.target.value)}
                                            placeholder='firstname'
                                            type='text'
                                            label='First Name'
                                        />
                                    </Col>
                                    <Col md={6}>
                                        <MyInput
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder='lastname'
                                            type='text'
                                            label='Last Name'
                                        />
                                    </Col>
                                </Row>
                                <MyInput
                                    value={email}
                                    onChange={e => setemail(e.target.value)}
                                    placeholder='email'
                                    type='email'
                                    label='Email'
                                />
                                <MyInput
                                    value={password}
                                    onChange={e => setpassword(e.target.value)}
                                    placeholder='Password'
                                    type='password'
                                    label='Password'
                                />
                                <Button variant="primary" type="submit">
                                    Submit
  </Button>
                            </Form>
                        </Col>
                    </Row>
                </Container>
            </Layout>
        </div>
    )
}

export default SignUp
