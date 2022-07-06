import RegisterForm from "../RegisterForm";
import photo from '../../images/RegisterPhoto.svg'
import './Home.css'
import { Col, Row, Result, Button } from 'antd'
import { useState } from "react";

const Home = () => {
    const [enrolled, setEnrolled] = useState(false)
    return (
        <div className='Home-Container'>
            {!enrolled ? <Row className='Home-Content-Container'>
                <Col className='Home-Content-Image-Container' xs={24} sm={24} md={24} lg={12} xl={12}>
                    <img src={photo} className='Home-Content-Image' />
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <RegisterForm setEnrolled={setEnrolled} />
                </Col>
            </Row> : <Result
                className='Home-Content-Container Home-Content-Result'
                status="success"
                title="Registered Successfully"
                subTitle="your registration is completed and you’ve enrolled in the course"
                extra={[
                    <Button type="primary" key="console" onClick={()=>setEnrolled(false)}>
                        Register New Student
                    </Button>,
                ]}
            />}
        </div>
    )
}

export default Home