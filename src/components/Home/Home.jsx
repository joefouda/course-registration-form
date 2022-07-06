import RegisterForm from "../RegisterForm";
import photo from '../../images/RegisterPhoto.svg'
import './Home.css'
import { Col, Row } from 'antd'

const Home = ()=>{
    return (
        <div className='Home-Container'>
            <Row className='Home-Content-Container'>
                <Col className='Home-Content-Image-Container' xs={24} sm={24} md={24} lg={12} xl={12}>
                    <img src={photo} className='Home-Content-Image' /> 
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <RegisterForm /> 
                </Col>
            </Row>
        </div>
    )
}

export default Home