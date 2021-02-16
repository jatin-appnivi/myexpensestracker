import React, { Component } from 'react'
import '../css/HomeComponent.css'

import filterIcon from '../assets/images/filterIcon.png';


class HomeComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
            soochisList: []
        }
        this.LoadGoogle = this.LoadGoogle.bind(this)
    }

    componentDidMount() {
        this.setState({
            soochisList: [...this.state.soochisList, ['12 Jan 2021', 'Birthday Party', '3500', 'Active']]
        }, function () {
            console.log(this.state.soochisList)
            console.log(JSON.parse(sessionStorage.getItem('name')).code)
        })
    }

    getSoochis(){
        // fetch(constants.server_base_url + constants.fetchSoochi, {
        //     method: "POST",
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify({
        //         email: values.email,
        //         password: values.password
        //     }),
        // })
        //     .then((response) => response.json())
        //     .then((response) => {
        //         console.log(response.response)
        //         if (response["error"] == false) {
                    
                    
        //         }
        //         else {
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //         message.error("Sorry! Try Again")
        //     });
    }

    LoadGoogle() {
        // <script src="https://www.gstatic.com/charts/loader.js"></script>
        //     google.charts.load('current', {
        //   callback: drawChart,
        //   packages:['corechart']
        // });

        // function drawChart() {
        //   var data = new google.visualization.DataTable();
        //   data.addColumn('string', 'Topping');
        //   data.addColumn('number', 'Slices');
        //   data.addRows([
        //     ['Mushrooms', 3],
        //     ['Onions', 1],
        //     ['Olives', 1],
        //     ['Zucchini', 1],
        //     ['Pepperoni', 2]
        //   ]);

        //   var options = {'title':'How Much Pizza I Ate Last Night',
        //                  'width':400,
        //                  'height':300};

        //   var chart = new google.visualization.BarChart(document.getElementById('chart_div'));
        //   chart.draw(data, options);
        // }
    }

    render() {
        return (
            <>
                <div className="container">
                    <div className="outer-left-column">
                        <div className="left-column-chart-section">
                            <div className="left-column-chart-section-heading">
                                Expense in Track !
                            </div>
                            <div className="left-column-chart-section-body">
                                <div id="piechart">

                                </div>
                            </div>
                        </div>
                        <div className="left-column-recent-soochi-section">
                            <div className="left-column-recent-soochi-heading-div">
                                <div className="left-column-recent-soochi-heading">
                                    Recent Soochis
                                </div>
                                <div className="left-column-recent-soochi-filter">
                                    Filter
                                    <span><img src={filterIcon} id="filterIcon"></img></span>
                                </div>
                            </div>
                            <div className="left-column-recent-soochi-body">
                                <div className="left-column-recent-soochi-table">
                                    <div className="left-column-recent-soochi-th">
                                        <div className="left-column-recent-soochi-th-value">
                                            Date
                                        </div>
                                        <div className="left-column-recent-soochi-th-value">
                                            Soochi Name
                                        </div>
                                        <div className="left-column-recent-soochi-th-value">
                                            Budget
                                        </div>
                                        <div className="left-column-recent-soochi-th-value">
                                            Status
                                        </div>
                                    </div>
                                    {this.state.soochisList.map((soochi) =>
                                        <div className="left-column-recent-soochi-tr">
                                            <div className="left-column-recent-soochi-tr-value">
                                                {soochi[0]}
                                            </div>
                                            <div className="left-column-recent-soochi-tr-value">
                                                {soochi[1]}
                                            </div>
                                            <div className="left-column-recent-soochi-tr-value">
                                                {soochi[2]}
                                            </div>
                                            <div className="left-column-recent-soochi-tr-value">
                                                {soochi[3]}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="outer-right-column">
                        <div className="right-column-summary-section">
                            <div className="right-column-summary-section-heading-div">
                                <div className="right-column-summary-heading">
                                    Monthly View
                                </div>
                                <div className="right-column-summary-body">
                                    Jun - Aug
                                </div>
                            </div>
                        </div>
                        <div className="right-column-summary-stats">
                            <div className="right-column-summary-stats-upper">
                                <div className="right-column-summary-stats-upper-heading">
                                    Current Month
                                </div>
                                <div className="right-column-summary-stats-upper-expenses">
                                    Expenses
                                </div>
                            </div>
                            <div className="right-column-summary-stats-middle">
                                <div className="right-column-summary-stats-middle-row">
                                    <div className="right-column-summary-stats-middle-item-label">Food</div>
                                    <div className="right-column-summary-stats-middle-item">₹16500</div>
                                </div>
                                <div className="right-column-summary-stats-middle-row">
                                    <div className="right-column-summary-stats-middle-item-label">Travelling</div>
                                    <div className="right-column-summary-stats-middle-item">₹10500</div>
                                </div>
                                <div className="right-column-summary-stats-middle-row">
                                    <div className="right-column-summary-stats-middle-item-label">Others</div>
                                    <div className="right-column-summary-stats-middle-item">₹8500</div>
                                </div>
                                <div className="right-column-summary-stats-middle-row">
                                    <div className="right-column-summary-stats-middle-item-label">Clothing</div>
                                    <div className="right-column-summary-stats-middle-item">₹5000</div>
                                </div>
                            </div>
                            <div className="right-column-summary-stats-lower">
                                <div className="right-column-summary-stats-lower-view-button">
                                    View All
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default HomeComponent