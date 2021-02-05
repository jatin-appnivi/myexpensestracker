import React, { Component } from 'react'
import "../css/MonthlyComponent.css";

import prev from "../assets/images/prev.png";
import next from "../assets/images/next.png";
import searchLogo from "../assets/images/search.png";
import { Switch } from 'antd';

import { Form, Input, Button, Checkbox } from 'antd';
import { Modal } from 'antd';

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
};


class MonthlyComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            expenses_list: [],
            isModalVisible: false,

        }
        this.onChange = this.onChange.bind(this)
        this.onFinish = this.onFinish.bind(this)
        this.onFinishFailed = this.onFinishFailed.bind(this)

        this.addExpense = this.addExpense.bind(this)
        this.fetchExpense = this.fetchExpense.bind(this)
        this.showModal = this.showModal.bind(this)
        this.submitAddExpenseForm = this.submitAddExpenseForm.bind(this)
    }

    componentDidMount() {
        this.fetchExpense();
    }

    showModal(val) {
        this.setState({
            isModalVisible: val
        })
    }

    submitAddExpenseForm(values){
        this.showModal(false)
        console.log(values)
        this.addExpense(values)
    }

    addExpense(values) {
        fetch("http://192.168.29.118:8080" + '/expense/addExpense', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userCode: JSON.parse(sessionStorage.getItem('name')).code,
                amount: values.amount,
                name: values.title,
                description: "This is description",
                category: values.category
            }),
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response.response)
                if (response["error"] == false) {
                    console.log("done")
                    this.setState({
                        expenses_list: [...this.state.expenses_list, response.response]
                    })
                }
                else {
                }
            })
            .catch((err) => {
                console.log(err);
                // message.error("Sorry! Try Again")
            });
    }

    fetchExpense() {
        fetch(`http://192.168.29.118:8080/expense/fetchAllExpenseOfUser?userCode=${JSON.parse(sessionStorage.getItem('name')).code}`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
            .then((response) => response.json())
            .then((response) => {
                console.log(response.response)
                if (response["error"] == false) {
                    console.log("done")
                    this.setState({
                        expenses_list: response.response
                    }, function () {
                        console.log(this.state.expenses_list)
                        console.log(JSON.parse(sessionStorage.getItem('name')).code)
                    })
                }
                else {
                }
            })
            .catch((err) => {
                console.log(err);
                // message.error("Sorry! Try Again")
            });
    }

    onChange(checked) {
        console.log(`switch to ${checked}`);
        var tableDiv = document.getElementById('monthly-table-head');
        var graphDiv = document.getElementById('monthly-graphical-section');
        if (checked) {
            tableDiv.style.display = "none"
            graphDiv.style.display = "block"
        }
        else {
            tableDiv.style.display = "block"
            graphDiv.style.display = "none"
        }
    }


    onFinish = (values: any) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    handleOk() {
        this.setState({
            isModalVisible: false
        })
    }

    handleCancel() {
        this.setState({
            isModalVisible: false
        })
    }

    render() {
        return (
            <>
                <div className="monthly-outer-component">
                    <div className="monthly-sub-header">
                        <div className="monthly-sub-header-left-indicator">
                            <div className="monthly-indicators-division">
                                <img src={prev} className="monthly-indicators" />
                            </div>
                        </div>
                        <div className="monthly-sub-header-right-indicator">
                            <div className="monthly-indicators-division">
                                <img src={next} className="monthly-indicators" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="monthly-summary">
                    <div className="monthly-summary-inner">
                        <div className="monthly-summary-inner-salary">
                            <div className="summary-salary-text-div">
                                Salary: 40,000<br></br>
                                Balance: 32,000
                            </div>
                        </div>
                        <div className="monthly-summary-inner-search">
                            <div className="summary-search-div">
                                <Form
                                    {...layout}
                                    name="basic"
                                    initialValues={{ remember: true }}
                                    onFinish={this.onFinish}
                                    onFinishFailed={this.onFinishFailed}
                                >
                                    <Form.Item
                                        name="username"
                                    >
                                        <Input placeholder="Search Expenses" style={{ lineHeight: "25x" }} />
                                    </Form.Item>
                                </Form>
                            </div>
                        </div>
                        <div className="monthly-summary-inner-add">
                            <div className="summary-inner-add-button" onClick={() => this.showModal(true)}>
                                + Add Expense
                            </div>
                        </div>
                        <div className="monthly-summary-inner-mode">
                            <div className="summary-inner-mode-div">
                                <Switch onChange={this.onChange} id="summary-mode-switch" />
                                Graphical Mode
                            </div>
                        </div>
                    </div>
                </div>
                <div id="monthly-table-head">
                    <div className="monthly-table-head-div">
                        <div className="monthly-table-title">
                            Title
                        </div>
                        <div className="monthly-table-amount">
                            Amount
                        </div>
                        <div className="monthly-table-date">
                            Date Created
                        </div>
                        <div className="monthly-table-category">
                            Category
                        </div>
                    </div>
                    {this.state.expenses_list.map((expense) =>
                        <div className="monthly-table-data-div">
                            <div className="monthly-table-data-title">
                                {expense.name}
                            </div>
                            <div className="monthly-table-data-amount">
                                {expense.amount}
                            </div>
                            <div className="monthly-table-data-date">
                                {expense.createdAt.substring(0, 10)}
                            </div>
                            <div className="monthly-table-data-category">
                                <div className="montly-table-category-button-clothing">
                                    {expense.category_id}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                <div id="monthly-graphical-section">
                    <div id="monthly-graphical-inner-section">
                        <div id="area-chart" style={{ width: '800px', height: '400px' }}>

                        </div>
                    </div>
                </div>
                <Modal title="Basic Modal" visible={this.state.isModalVisible} footer={null} onCancel={() => this.showModal(false)}>
                    <Form
                        {...layout}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={this.submitAddExpenseForm}
                        layout="vertical"
                    >
                        <Form.Item label="Title">
                            <Form.Item
                                noStyle
                                name="title"
                                rules={[{ required: true, message: 'Please input the title of expense !' }]}
                            >
                                <Input placeholder="E.g. Grocery Shopping" />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="Amount">
                            <Form.Item
                                noStyle
                                name="amount"
                                rules={[{ required: true, message: 'Please input the amount of expense !' }]}
                            >
                                <Input placeholder="..." />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="Date">
                            <Form.Item
                                noStyle
                                name="date"
                                rules={[{ required: true, message: 'Please input date of expense !' }]}
                            >
                                <Input placeholder="yyyy-mm-dd" />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item label="Category">
                            <Form.Item
                                noStyle
                                name="category"
                                rules={[{ required: true, message: 'Please input the category of expense !' }]}
                            >
                                <Input placeholder="clothing, food .... " />
                            </Form.Item>
                        </Form.Item>
                        <Form.Item >
                            <Button type="primary" htmlType="submit" id="AddExpenseButton">
                                Add Expense
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </>
        )
    }
}

export default MonthlyComponent