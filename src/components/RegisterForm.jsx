import { Button, Cascader, Form, Input, Space, Divider } from 'antd';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import { db, authentication } from '../firebase-config';
import { collection, addDoc, updateDoc, doc, onSnapshot, query, arrayUnion } from 'firebase/firestore'
import { useEffect, useState } from 'react';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "firebase/auth";

const RegisterForm = () => {
    const registerWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(authentication, provider)
            .then(res => {
                form.setFieldsValue({
                    firstName: res.user.displayName.split(' ')[0],
                    middleName: res.user.displayName.split(' ')[1],
                    email: res.user.email
                });
            })
            .catch(error => console.log(error))
    }

    const registerWithFacebook = () => {
        const provider = new FacebookAuthProvider();
        signInWithPopup(authentication, provider)
            .then(res => {
                form.setFieldsValue({
                    firstName: res.user.displayName.split(' ')[0],
                    middleName: res.user.displayName.split(' ')[1],
                    email: res.user.email
                });
            })
            .catch(error => console.log(error))
    }

    const [courses, setCourses] = useState([])
    const [searchableCourses, setSearchableCourses] = useState([])
    const [form] = Form.useForm();
    const onFinish = async (values) => {
        let newCoursesList = values.coursesList.map(ele => ele[0])
        let data = { ...values, coursesList: newCoursesList }
        try {
            let res = await addDoc(collection(db, "students"), {
                data,
                completed: false
            })
            newCoursesList.map(async (course) => {
                let index = searchableCourses.findIndex(ele => ele.courseName === course)
                await updateDoc(doc(db, "courses", searchableCourses[index].id), {
                    students: arrayUnion(res.id)
                })
            })
            form.resetFields();
        }
        catch (error) {
            console.log(error)
        }

    };

    const onReset = () => {
        form.resetFields();
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
        <Form
            form={form}
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
                        len: 11,
                        message: 'Must be exactly 11 numbers'
                    }
                ]}
            >
                <Input placeholder="Phone Number" size="large" />
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

            <Form.Item>
                <Space split={<Divider type="vertical" />} size={10}>
                    <Button type="primary" htmlType="submit" size='large'>
                        Register
                    </Button>
                    <Button type="danger" icon={<GoogleOutlined />} htmlType="button" onClick={registerWithGoogle} size='large'>
                        Register with google
                    </Button>
                    <Button type="primary" icon={<FacebookOutlined />} htmlType="button" onClick={registerWithFacebook} size='large'>
                        Register with facebook
                    </Button>
                    <Button htmlType="button" onClick={onReset} style={{textAlign:'right'}} size='large'>
                        Reset
                    </Button>
                </Space>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;