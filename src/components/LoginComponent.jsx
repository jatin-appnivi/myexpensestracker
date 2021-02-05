import React, { Component } from 'react'
import '../css/LoginComponent.css'
import { Carousel } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import { message } from 'antd';
import * as constants from '../constants'

import img1 from '../assets/images/loginCarousel1.jpeg'
import img2 from '../assets/images/loginCarousel2.jpg'
import img3 from '../assets/images/loginCarousel3.jpg'
import img4 from '../assets/images/logo.jpeg'

import mainLogoColor from '../assets/images/logos/mainLogoColor.png'

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
};
const tailLayout = {
    wrapperCol: { offset: 16, span: 16 },
};




const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
};

class LoginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            phoneAndNumber: false,
            alreadyUser: false,
            OTPForm: false,
            email: "",
            name: ""
        }

        this.onFinish = this.onFinish.bind(this)
        this.showLoginForm = this.showLoginForm.bind(this)
        this.showOTPForm = this.showOTPForm.bind(this)
        this.checkOTP = this.checkOTP.bind(this)
        this.loginUser = this.loginUser.bind(this)
        this.onFinishLoginEmail = this.onFinishLoginEmail.bind(this)
        this.onFinishRegister = this.onFinishRegister.bind(this)
        this.checkRegisterOTP = this.checkRegisterOTP.bind(this)
    }

    checkOTP(values) {
        console.log(values)
        this.loginUser(values)
    }

    loginUser(values) {
        console.log("login of login component")
        // this.props.login()

        // Register api call here

        // this.props.login();

        fetch(constants.server_base_url + constants.register_url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: this.state.email,
                otp: values.otp
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                if (response["error"] == false) {
                    message.success("Registration Succesfull! Verify OTP sent to your Mail.")
                    this.props.login();
                    sessionStorage.setItem('name', values)
                }
                else {
                    message.error("Sorry! Try Again")
                }
            })
            .catch((err) => {
                console.log(err);
                message.error("Sorry! Try Again")
            });


    }

    onFinish(values) {
        console.log('Success:', values);
        this.setState({
            phoneAndNumber: true
        })
        this.showOTPForm();
    };

    showLoginForm(value) {
        this.setState({
            alreadyUser: value
        })
    }

    showOTPForm() {
        this.setState({
            OTPForm: true
        })
    }
    onFinishLoginEmail = (values) => {
        console.log(values)
        // this.props.login();
        // this.loginUser()

        // Login Api Call

        fetch(constants.server_base_url + constants.login_url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: values.email,
                password: values.password
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response.response)
                if (response["error"] == false) {
                    message.success("Logged in Successfully.")
                    
                    sessionStorage.setItem('name', JSON.stringify(response.response))
                    console.log(JSON.parse(sessionStorage.getItem('name')))
                    this.props.login();
                }
                else {
                    message.error("Sorry! Try Again")
                }
            })
            .catch((err) => {
                console.log(err);
                message.error("Sorry! Try Again")
            });
    }

    onFinishRegister(values) {
        console.log(values)
        // this.setState({
        //     OTPForm: true
        // })
        this.checkRegisterOTP(values)

    }

    checkRegisterOTP(values) {
        this.setState({
            email: values.email
        })
        console.log("In register otp func.")
        console.log(values.fullname, values.email, values.password)
        fetch(constants.server_base_url + constants.registerOTPSend_url, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: values.fullname,
                email: values.email,
                password: values.password
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response)
                if (response["error"] == false) {
                    message.success("Registration Succesfull! Verify OTP sent to your Mail.")
                    this.setState({
                        OTPForm: true,
                        name: values.fullname
                    }, function () {
                        sessionStorage.setItem('name', this.state.name)
                        console.log(this.state.name)
                    })

                }
                else {
                    message.error("Sorry! Try Again")
                }
            })
            .catch((err) => {
                console.log(err);
                message.error("Sorry! Try Again")
            });
    }

    render() {
        return (
            <div className="OuterContainer">
                <div className="OuterCenterSection">
                    <div className="InnerLeftDivision">
                        <div className="InnerLeftLogoDivision">
                            {/* <div className="LogoDivision" >
                                <img src={img4} style={{ width: "100%", height: "100%" }} />
                            </div>
                            <div className="LogoName">
                                Speso
                            </div> */}
                            <div className="Brand">
                                <img src={mainLogoColor} style={{ height: '100%', width: '100%' }}></img>
                            </div>
                        </div>
                        <div className="InnerLeftUpperDivision">
                            Day to Day Expenses Management
                        </div>
                        <div className="InnerLeftMiddleDivision">
                            Manage Your Expenses in just few Clicks.
                            Get Detailed analysis & <br></br> expenses report.
                        </div>
                        <div className="InnerLeftLowerDivision">
                            <Carousel autoplay dots>
                                <div className="carouselItem">
                                    <img src={img1} className="contentStyle" />
                                </div>
                                <div className="carouselItem">
                                    <img src={img2} className="contentStyle" />
                                </div>
                                <div className="carouselItem">
                                    <img src={img3} className="contentStyle" />
                                </div>
                            </Carousel>
                        </div>
                    </div>
                    <div className="InnerRightDivision">
                        <div className="InnerRightUpperDivision">
                            Come Join Us & Start Saving!
                            <hr className="HeadingHrStyle" />
                        </div>
                        <div className="InnerRightLowerDivision">
                            {!this.state.OTPForm ?
                                !this.state.alreadyUser ?
                                    <>
                                        <Form
                                            {...layout}
                                            name="basic"
                                            initialValues={{ remember: true }}
                                            onFinish={this.onFinishRegister}
                                            onFinishFailed={onFinishFailed}
                                            layout="vertical"
                                        >
                                            <div id="PhoneAndNameForm">
                                                <div className="LoginFormHeadingDivision">
                                                    You are just a few steps away!
                                                    </div>
                                                <div className="RegisterFormDivision">
                                                    <Form.Item label="Full Name">
                                                        <Form.Item
                                                            noStyle
                                                            name="fullname"
                                                            rules={[{ required: true, message: 'Please input your full name!' }]}
                                                        >
                                                            <Input placeholder="E.g. John Doe" />
                                                        </Form.Item>
                                                    </Form.Item>
                                                    <Form.Item label="Email">
                                                        <Form.Item
                                                            noStyle
                                                            name="email"
                                                            rules={[{ required: true, message: 'Please input your email !' }]}
                                                        >
                                                            <Input placeholder="Verify your email to proceed" />
                                                        </Form.Item>
                                                    </Form.Item>
                                                    <Form.Item label="Password">
                                                        <Form.Item
                                                            noStyle
                                                            name="password"
                                                            rules={[{ required: true, message: 'Please input your email !' }]}
                                                        >
                                                            <Input.Password placeholder="password here" />
                                                        </Form.Item>
                                                    </Form.Item>
                                                </div>
                                                <div className="RegisterButtonDivision">
                                                    <Form.Item >
                                                        <Button type="primary" htmlType="submit" id="LoginFormSubmitButton">
                                                            Register Me!
                                                            </Button>
                                                    </Form.Item>
                                                </div>
                                                <div className="ChangeToLoginDiv">
                                                    Already a user? <span style={{ color: '#cf3492', fontWeight: '500', cursor: "pointer" }} onClick={() => this.showLoginForm(true)}>Login here</span>
                                                </div>
                                            </div>
                                        </Form>
                                    </>
                                    :
                                    <>
                                        <Form
                                            {...layout}
                                            name="basic"
                                            initialValues={{ remember: true }}
                                            onFinish={this.onFinishLoginEmail}
                                            onFinishFailed={onFinishFailed}
                                            layout="vertical"
                                        >

                                            <div id="LoginComponentDivision">
                                                <div className="LoginFormHeadingDivision">
                                                    You are all set to go!!
                                                    </div>
                                                <div className="LoginFormInnerDivision">
                                                    <Form.Item label="Email">
                                                        <Form.Item
                                                            noStyle
                                                            name="email"
                                                            rules={[{ required: true, message: 'Please input your email' }]}
                                                        >
                                                            <Input placeholder="Verify your number to proceed" />
                                                        </Form.Item>
                                                    </Form.Item>
                                                    <Form.Item label="Password">
                                                        <Form.Item
                                                            noStyle
                                                            name="password"
                                                            rules={[{ required: true, message: 'Please input your email !' }]}
                                                        >
                                                            <Input.Password placeholder="password here" />
                                                        </Form.Item>
                                                    </Form.Item>
                                                </div>
                                                <div className="RegisterButtonDivision">
                                                    <Form.Item >
                                                        <Button type="primary" htmlType="submit" id="LoginFormSubmitButton">
                                                            Login
                                                        </Button>
                                                    </Form.Item>
                                                    <div className="ChangeToLoginDiv">
                                                        Go to <span style={{ color: '#cf3492', fontWeight: '500', cursor: "pointer" }} onClick={() => this.showLoginForm(false)}>Register</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </Form>
                                    </>
                                :
                                <>
                                    <Form
                                        {...layout}
                                        name="basic"
                                        initialValues={{ remember: true }}
                                        onFinish={this.checkOTP}
                                        onFinishFailed={onFinishFailed}
                                        layout="vertical"
                                    >
                                        <div id="OTPForm">
                                            <div className="LoginFormHeadingDivision">
                                                You are all set to go!!
                                            </div>
                                            <div className="OTPFormDivision">
                                                <Form.Item label="Enter OTP">
                                                    <Form.Item
                                                        noStyle
                                                        name="otp"
                                                        rules={[{ required: true, message: 'Please enter the otp' }]}
                                                    >
                                                        <Input placeholder="E.g. John Doe" style={{ borderRadius: "5px" }} />
                                                    </Form.Item>
                                                </Form.Item>

                                            </div>
                                            <div className="RegisterButtonDivision">
                                                <Form.Item style={{ height: "20px" }}>
                                                    <Button type="primary" htmlType="submit" id="LoginFormSubmitButton">
                                                        Verify OTP and Login
                                                    </Button>
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </Form>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

export default LoginComponent