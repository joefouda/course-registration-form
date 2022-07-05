import { Button, Cascader, Form, Input, InputNumber } from 'antd';
import React from 'react';

const courses = [
    {
        label: 'html',
        value: 'html',
    },
    {
        label: 'javascript',
        value: 'javascript',
    },
    {
        label: 'css',
        value: 'css',
    },
    {
        label: 'jquery',
        value: 'jquery',
    },
    {
        label: 'bootstrap',
        value: 'bootstrap',
    }
]

const RegisterForm = () => {
    const [form] = Form.useForm();
    const onFinish = (values) => {
        let data = {...values,coursesList:values.coursesList.map(ele=>ele[0])}
        console.log('Success:', data);
        form.resetFields();
    };

    const onReset = () => {
        form.resetFields();
    };

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
                        message:'Must be only numbers'
                    },
                    {
                        len: 11,
                        message:'Must be exactly 11 numbers'
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
                        message:'Must be only numbers'
                    },
                    {
                        len: 14,
                        message:'Must be exactly 14 numbers'
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
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                <Button htmlType="button" onClick={onReset}>
                    Reset
                </Button>
            </Form.Item>
        </Form>
    );
};

export default RegisterForm;