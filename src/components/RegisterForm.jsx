import { useEffect, useState } from 'react';
import { Button, Cascader, Form, Input, Space, notification } from 'antd';
import { GoogleOutlined, FacebookOutlined, PropertySafetyFilled } from '@ant-design/icons';
import { db, authentication } from '../firebase-config';
import { collection, onSnapshot, query } from 'firebase/firestore'
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";
import OTPModal from './OTPModal';


const openNotification = (eMessage) => {
    notification.error({
        message: eMessage,
        placement: 'topLeft'
    });
}

const RegisterForm = (props) => {
    //use ref to call child function from parent function

    const [OTPModalVisible, setOTPModalVisible] = useState(false)
    const OAuthRegister = (e) => {
        const provider = e.target.innerHTML === 'Register with google' ? new GoogleAuthProvider() : new FacebookAuthProvider()
        signInWithPopup(authentication, provider)
            .then(res => {
                registerForm.setFieldsValue({
                    firstName: res.user.displayName.split(' ')[0],
                    middleName: res.user.displayName.split(' ')[1],
                    email: res.user.email
                });
            })
            .catch(error => openNotification(error.message))
    }

    const [courses, setCourses] = useState([])
    const [searchableCourses, setSearchableCourses] = useState([])
    const [student, setStudent] = useState({})
    const [registerForm] = Form.useForm();
    const onFinish = async (values) => {
        let newCoursesList = values.coursesList.map(ele => ele[0])
        let data = { ...values, coursesList: newCoursesList,phoneNumber:`+20${values.phoneNumber}` }
        setStudent(data)
        setOTPModalVisible(true)
    };

    const onReset = () => {
        registerForm.resetFields();
    };

    useEffect(() => {
        const q = query(collection(db, 'courses'));
        const unsub = onSnapshot(q, (querySnapshot) => {
            // one array for displaying cascader options (ant design component) and the other one with full information to apply any operations on db 
            let disblayedCourses = []
            let searchableCourses = []
            querySnapshot.forEach(doc => disblayedCourses.push({ value: doc.data().courseName, label: doc.data().courseName }))
            querySnapshot.forEach(doc => searchableCourses.push({ ...doc.data(), id: doc.id }))
            setSearchableCourses(searchableCourses)
            setCourses(disblayedCourses)
        })
        return () => unsub()
    }, [])

    return (
        <>
            <Form
                form={registerForm}
                wrapperCol={{
                    span: 24,
                }}
                initialValues={{
                    remember: true,
                }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item
                    name="firstName"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder="First Name" size="large" allowClear />
                </Form.Item>
                <Form.Item
                    name="middleName"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder="Middle Name" size="large" allowClear />
                </Form.Item>
                <Form.Item
                    name="lastName"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder="Last Name" size="large" allowClear />
                </Form.Item>

                <Form.Item
                    name="phoneNumber"
                    rules={[
                        {
                            required: true,
                        },
                        {
                            pattern: /^[0-9]+$/,
                            message: 'Must be only numbers'
                        },
                        {
                            len: 10,
                            message: 'Must be exactly 10 numbers'
                        }
                    ]}
                >
                    <Input placeholder="Phone Number" size="large" addonBefore="+20"/>
                </Form.Item>

                <Form.Item
                    name="nationalID"
                    rules={[
                        {
                            required: true,
                        },
                        {
                            pattern: /^[0-9]+$/,
                            message: 'Must be only numbers'
                        },
                        {
                            len: 14,
                            message: 'Must be exactly 14 numbers'
                        }
                    ]}
                >
                    <Input placeholder="National ID" size="large" />
                </Form.Item>

                <Form.Item
                    name="email"
                    rules={[
                        {
                            required: true,
                        },
                        {
                            type: 'email',
                        }
                    ]}
                >
                    <Input placeholder="Email" size="large" allowClear />
                </Form.Item>

                <Form.Item
                    name="firstAddress"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder="First Address" size="large" allowClear />
                </Form.Item>
                <Form.Item
                    name="secondAddress"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Input placeholder="Second Address" size="large" allowClear />
                </Form.Item>

                <Form.Item
                    name="linkedInProfile"
                    rules={[
                        {
                            required: true,
                        },
                        {
                            type: 'url',
                        }
                    ]}
                >
                    <Input placeholder="LinkedIn Profile Link" size="large" allowClear />
                </Form.Item>

                <Form.Item
                    name="twitterProfile"
                    rules={[
                        {
                            required: true,
                        },
                        {
                            type: 'url',
                        },
                    ]}
                >
                    <Input placeholder="Twitter Profile Link" size="large" allowClear />
                </Form.Item>

                <Form.Item
                    name="facebookProfile"
                    rules={[
                        {
                            required: true,
                        },
                        {
                            type: 'url',
                        },
                    ]}
                >
                    <Input placeholder="Facebook Profile Link" size="large" allowClear />
                </Form.Item>
                <Form.Item
                    name="coursesList"
                    rules={[
                        {
                            required: true,
                        },
                    ]}
                >
                    <Cascader
                        placeholder="Courses List"
                        options={courses}
                        multiple
                        maxTagCount="responsive"
                        size="large"
                    />
                </Form.Item>

                <Form.Item >
                    <Space size={8} wrap>
                        <Button type="primary" htmlType="submit" size='large'>
                            Register
                        </Button>
                        <Button type="danger" icon={<GoogleOutlined />} htmlType="button" onClick={OAuthRegister} size='large'>
                            Register with google
                        </Button>
                        <Button type="primary" icon={<FacebookOutlined />} htmlType="button" onClick={OAuthRegister} size='large'>
                            Register with facebook
                        </Button>
                        <Button htmlType="button" onClick={onReset} style={{ textAlign: 'right' }} size='large'>
                            Reset
                        </Button>
                    </Space>
                </Form.Item>
            </Form>
            <OTPModal searchableCourses={searchableCourses} student={student} registerForm={registerForm} OTPModalVisible={OTPModalVisible} setOTPModalVisible={setOTPModalVisible} setEnrolled={props.setEnrolled}/>
        </>
    );
};

export default RegisterForm;