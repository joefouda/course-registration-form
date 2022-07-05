import RegisterForm from "./RegisterForm";
import photo from '../images/RegisterPhoto.svg'
import backgroundPhoto from '../images/background-tornado.svg'
import { Col, Row } from 'antd'

const Home = ()=>{
    return (
        <div style={{height:"100vh", padding:'5vh 10vh',backgroundImage:`url(${backgroundPhoto})`,backgroundSize:"cover"}}>
            <Row style={{ padding:'4vh 5vh 1vh 5vh', boxShadow: '1px 0px 10px white',borderRadius:'2vh',backgroundColor:'white'}}>
                <Col span={12}>
                    <img src={photo} style={{maxWidth:'40vw'}}/> 
                </Col>
                <Col span={12}>
                    <RegisterForm /> 
                </Col>
            </Row>
        </div>
    )
}

export default Home