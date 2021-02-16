import React, { Component } from 'react'
import '../css/SettingsComponent.css'
import { Form, Input, Button, Checkbox } from 'antd';
import { Modal } from 'antd';
import * as constants from '../constants'

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
};

class SettingsComponent extends Component {

    constructor(props){

        super(props)
        this.state={
            salary: JSON.parse(sessionStorage.getItem('salary')),
            isModalVisible: false,
            userCode: ''
        }
        this.showModal = this.showModal.bind(this)
        this.updateSalary = this.updateSalary.bind(this)
    }

    componentDidMount(){
        this.setState({
            userCode: JSON.parse(sessionStorage.getItem('name')).code
        })
    }

    showModal(value){
        this.setState({
            isModalVisible: value
        })
    }

    updateSalary(values){
        console.log(values)
        this.showModal(false)
        fetch(constants.server_base_url + "/user/updateUserSalary", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userCode: JSON.parse(sessionStorage.getItem('name')).code,
                salary: values.salary
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response.response)
                if (response["error"] == false) {
                    console.log("done")
                    this.setState({
                        salary: response.response.salary
                    })
                    sessionStorage.setItem('salary', JSON.stringify(response.response.salary))
                }
                else {
                }
            })
            .catch((err) => {
                console.log(err);
                // message.error("Sorry! Try Again")
            });
    }

    render() {
        return (
            <>
                <div className="SettingsComponent">
                    Your current salary is : {this.state.salary}
                    <div className="UpdateSalaryButton" onClick={() => this.showModal(true)}>
                        Update Salary
                    </div>
                </div>
                <Modal title="Update Salary Here" visible={this.state.isModalVisible} footer={null} onCancel={() => this.showModal(false)}>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={this.updateSalary}
                        layout="vertical"
                    >
                        <Form.Item label="Salary">
                            <Form.Item
                                noStyle
                                name="salary"
                                rules={[{ required: true, message: 'Please input your salary !' }]}
                            >
                                <Input placeholder="E.g. 2xxxxx" />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item 
                        noStyle>
                            
                            <Button type="primary" htmlType="submit" className="UpdateSalaryButton">
                                Update Salary
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
    }
}


export default SettingsComponent