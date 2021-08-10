import React, { useEffect, useState } from 'react'
import { Col, Container, Form, Row, Button } from 'react-bootstrap'
import Layout from '../../layout/Layout'
import MyInput from '../../reuse/MyInput'
//actions..
import { login } from '../../actions/auth.actions'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate } from 'react-router'

//

const SignIn = () => {
    //
    const dispatch = useDispatch()
    const auth = useSelector(state => state.auth)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleLoginRequest = (e) => {
        e.preventDefault();
        const _user = {
            email: email,
            password: password,
        }
        dispatch(login(_user))
    }
    if (auth.authenticate) {
        return <Navigate to='/' />
    }
    return (
        <div>
            <Layout>
                <Container>
                    <Row>
                        <Col style={{ marginTop: '50px' }} md={{ span: 6, offset: 3 }}>
                            <Form onSubmit={handleLoginRequest}>
                                <MyInput
                                    label='Email'
                                    placeholder='Email'
                                    type='email'
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                />
                                <MyInput
                                    label='Password'
                                    placeholder='Password'
                                    type='password'
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
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
export default SignIn
