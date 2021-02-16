import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, message } from 'antd';
import './css/ResetPasswordComponent.css'
import * as constants from './constants'

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
};

class ResetPasswordComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            validUser: false
        }

        this.ResetPassord = this.ResetPassord.bind(this)
    }

    ResetPassord(values) {
        console.log(values)
        if(values.password1 == values.password2){
        // console.log(window.location.href.split("/"))
        var url_list = window.location.href.split("/")
        // console.log(url_list)
        var temp = url_list[3].split("?")[1].split("=")[1]
        // console.log(temp)
        fetch(constants.server_base_url + "/user/updatePassword", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userEmail: values.email, 
                userCode: temp,
                activationCode: "0000",
                password: values.password1
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response.response)
                message.success("Your Password is changed, Please Login with new credentials.")
                window.location = "/"
            })
            .catch((err) => {
                console.log(err);
                message.error("Sorry! Try Again")
            });
        }
        else{
            message.error("Your passwords does not match.")
        }
    }

    render() {
        return (
            <>
                <div className="ResetPasswordFormDivision">
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={this.ResetPassord}
                        layout="vertical"
                    >
                        {/* <Form.Item label="Email">
                            <Form.Item
                                noStyle
                                name="email"
                                rules={[{ required: true, message: 'Please input your full name!' }]}
                            >
                                <Input placeholder="E.g. John Doe" />
                            </Form.Item>
                        </Form.Item> */}
                        <Form.Item label="Password">
                            <Form.Item
                                noStyle
                                name="password1"
                                rules={[{ required: true, message: 'Please input your password !' }]}
                            >
                                <Input placeholder="Enter Password" />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="Confirm Password">
                            <Form.Item
                                noStyle
                                name="password2"
                                rules={[{ required: true, message: 'Please input your password !' }]}
                            >
                                <Input.Password placeholder="Re-enter passwor to confirm" />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit" id="LoginFormSubmitButton">
                                Reset Password
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
                
            </>
        )
    }
}

export default ResetPasswordComponent