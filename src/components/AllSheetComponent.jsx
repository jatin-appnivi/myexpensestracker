import React, { Component } from 'react'
import "../css/AllSochis.css";
import { Tooltip, Progress } from 'antd';

import searchLogo from "../assets/images/search.png";

import { Form, Input, Button, Checkbox } from 'antd';

const layout = {
    labelCol: { span: 0 },
    wrapperCol: { span: 24 },
};
const tailLayout = {
    wrapperCol: { offset: 0, span: 24 },
};

class AllSheetComponent extends Component {

    constructor(props){
        super(props)

        this.expandExpense = this.expandExpense.bind(this)
        this.onChange = this.onChange.bind(this)
        this.onFinish = this.onFinish.bind(this)
        this.onFinishFailed = this.onFinishFailed.bind(this)
    }

    onChange(checked) {
        console.log(`switch to ${checked}`);
    }


    onFinish = (values: any) => {
        console.log('Success:', values);
    };

    onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    expandExpense(){
        var item = document.getElementById('table-more-info')
        if(item.style.display == "none"){
            item.style.display = "block";
        }
        else{
            item.style.display = "none";
        }
        
    }
    render() {
        return (
            <>
                <div className="container">
                    <div className="sub-header-division">
                        <div className="sub-header-division-add-button">
                            + Add Soochi
                        </div>
                        <div className="sub-header-division-search-button">
                            {/* <img src={searchLogo} id="search-logo"/> */}
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
                                        <Input placeholder="Search Soochis" className="search-soochis-input"/>
                                    </Form.Item>
                                </Form>
                        </div>
                    </div>
                    <div className="table-head">
                        <div className="table-column-title">Title</div>
                        <div className="table-column-budget">Budget</div>
                        <div className="table-column-date-created">Date-Created</div>
                        <div className="table-column-status">Status</div>
                    </div>
                    <div className="table-row" onClick={this.expandExpense}>
                        <div className="table-row-title">Brother's Wedding</div>
                        <div className="table-row-budget">
                            <Tooltip title="3 done / 3 in progress / 4 to do">
                                <Progress percent={60} success={{ percent: 30 }} id="progress-bar" strokeWidth={10} />
                            </Tooltip>
                        </div>
                        <div className="table-row-date-created">30 November 2021</div>
                        <div className="table-row-status">
                            <div className="table-row-status-button">Active</div>
                        </div>
                    </div>
                    <div className="table-row-info" id="table-more-info">
                        <div className="table-row-inner-row">
                            <div className="table-row-inner-row-title">
                                Expense Title
                            </div>
                            <div className="table-row-inner-row-amount">
                                Amount
                            </div>
                            <div className="table-row-inner-row-date">
                                Date Created
                            </div>
                            <div className="table-row-inner-row-tag">
                                Tag
                            </div>
                        </div>
                        <div className="table-row-inner-row-data">
                            <div className="table-row-inner-row-title">
                                Lehanga
                            </div>
                            <div className="table-row-inner-row-amount">
                                5000
                            </div>
                            <div className="table-row-inner-row-date">
                                31 Jan 2011
                            </div>
                            <div className="table-row-inner-row-tag">
                                Clothing
                            </div>
                        </div>
                        <div className="table-row-inner-row-data">
                            <div className="table-row-inner-row-title">
                                Sandals
                            </div>
                            <div className="table-row-inner-row-amount">
                                4000
                            </div>
                            <div className="table-row-inner-row-date">
                                23 Feb 2021
                            </div>
                            <div className="table-row-inner-row-tag">
                                Clothing
                            </div>
                        </div>
                        <div className="table-row-inner-row-data">
                            <div className="table-row-inner-row-title">
                                Sandals
                            </div>
                            <div className="table-row-inner-row-amount">
                                4000
                            </div>
                            <div className="table-row-inner-row-date">
                                23 Feb 2021
                            </div>
                            <div className="table-row-inner-row-tag">
                                Clothing
                            </div>
                        </div>
                    </div>
                    
                </div>
            </>
        )
    }
}

export default AllSheetComponent