import RegisterForm from "./RegisterForm";
import photo from '../images/RegisterPhoto.svg'
import backgroundPhoto from '../images/background-tornado.svg'
import { Col, Row } from 'antd'

const Home = ()=>{
    return (
        <div style={{height:"100vh", display:'flex', alignItems:'center'}}>
            <Row style={{ padding:'4vh 5vh 1vh 5vh', width:'90vw',height:'90vh', margin:'auto', boxShadow: '1px 0px 10px white',borderRadius:'2vh',backgroundColor:'white'}}>
                <Col xs={24} sm={24} md={24} lg={12} xl={12} style={{display:'flex', alignItems:'center'}}>
                    <img src={photo} style={{maxWidth:'40vw'}}/> 
                </Col>
                <Col xs={24} sm={24} md={24} lg={12} xl={12}>
                    <RegisterForm /> 
                </Col>
            </Row>
        </div>
    )
}

export default Home