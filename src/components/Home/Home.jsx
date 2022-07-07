import RegisterForm from "../RegisterForm";
import photo from '../../images/RegisterPhoto.svg'
import { Modal } from 'antd';
import './Home.css'
import { Col, Row } from 'antd'

const isEnrolled = () => {
    Modal.success({
        title: 'Registered Successfully',
        content: `your registration is completed and you’ve enrolled in the course`,
        centered:true,
    });
};

const Home = () => {
    return (
        <div className='Home-Container'>
            <Row className='Home-Content-Container'>
                <Col className='Home-Content-Image-Container' xs={24} sm={24} md={24} lg={24} xl={12}>
                    <img src={photo} className='Home-Content-Image' />
                </Col>
                <Col xs={24} sm={24} md={24} lg={24} xl={12}>
                    <RegisterForm isEnrolled={isEnrolled} />
                </Col>
            </Row>
        </div>
    )
}

export default Home