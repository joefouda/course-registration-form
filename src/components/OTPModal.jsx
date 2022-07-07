import { useState, useContext } from 'react'
import { Modal } from 'antd';
import { Form, Input, Button } from 'antd';
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { db, authentication } from '../firebase-config';
import { collection, addDoc, updateDoc, doc, arrayUnion } from 'firebase/firestore'
import { NotificationContext } from '../App'

const generateRecaptcha = () => {
    window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
        }
    }, authentication);
}

const OTPModal = (props) => {
    const { openNotification } = useContext(NotificationContext)
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [form] = Form.useForm();

    const handleOk = () => {
        form.submit()
    }
    const handleSendOTP = async () => {
        generateRecaptcha()
        let appVerifier = window.recaptchaVerifier
        signInWithPhoneNumber(authentication, props.student.phoneNumber, appVerifier)
            .then(confirmationResult => {
                window.confirmationResult = confirmationResult
            }).catch(error => {
                openNotification(error.message)
            })
    }

    const onFinish = async (values) => {
        setConfirmLoading(true);
        let confirmationResult = window.confirmationResult
        confirmationResult.confirm(values.OTPCode).then(async (result) => {
            const user = result.user;
            if (user) {
                try {
                    let student = await addDoc(collection(db, "students"), {
                        data: props.student,
                        completed: false
                    })
                    props.student.coursesList.map(async (course) => {
                        let index = props.searchableCourses.findIndex(ele => ele.courseName === course)
                        await updateDoc(doc(db, "courses", props.searchableCourses[index].id), {
                            students: arrayUnion(student.id)
                        })
                    })
                    setConfirmLoading(false)
                    props.setOTPModalVisible(false)
                    props.isEnrolled()
                }
                catch (error) {
                    console.log(error.message)
                }
                form.resetFields();
                props.registerForm.resetFields()
            } else {
                openNotification('somthing went wrong')
            }

        }).catch((error) => {
            setConfirmLoading(false)
            openNotification(error.message)
        });
    };
    return (
        <>
            <Modal
                title="Verify your phone Number"
                confirmLoading={confirmLoading}
                centered
                visible={props.OTPModalVisible}
                onOk={handleOk}
                okText="Verify"
                onCancel={() => props.setOTPModalVisible(false)}
            >
                <h4>you have to verify your phone number in order to register in our courses</h4>
                <Button type="success" onClick={handleSendOTP}>Send OTP</Button>
                <Form
                    form={form}
                    style={{ marginTop: '20px' }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    {/* <Input.Group compact>
                        <Input style={{ width: 'calc(100% - 200px)' }} defaultValue="https://ant.design" />
                        <Button type="primary">Submit</Button>
                    </Input.Group> */}
                    <Form.Item
                        style={{ display: 'flex' }}
                        name="OTPCode"
                        rules={[
                            {
                                required: true,
                            },
                            {
                                pattern: /^[0-9]+$/,
                                message: 'Must be only numbers'
                            },
                            {
                                len: 6,
                                message: 'Must be exactly 6 numbers'
                            }
                        ]}
                    >
                        <Input placeholder="Enter OTP Code Here" />
                    </Form.Item>
                </Form>
                <div id="recaptcha-container"></div>
            </Modal>
        </>
    );
};

export default OTPModal;