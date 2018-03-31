import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./customcss.css";
import Editor from "./Editor"
import request from "superagent"

import {
    Form,
    Dropdown,
    Segment,
    Checkbox, Button
} from "semantic-ui-react";

const FACTIONS = [
    // skip other entries
    {value : "lc", text : "Lyran Commonwealth"},
    {value : "wd", text : "Wolf's Dragoons"},
];

class Trade extends React.Component {
// const Trade = (props) => {

    constructor(props) {
        super(props);
        this.state = {
            dashboard:{},
            summary:{},
            esCountry:{},
            dateBasedMetric:{},
            uniqueUser:{},
            stepSize:""   ,
        selectedRow:{counterParty:"",tradeDate:"",side:"",quantity:"",price:"",commodity:"",location:""},
        deleteshow:false,
            dataTb: [{
            tradeDate: '2018/01/30',
            commodity: 'AL',
            side: "Buy",
            quantity: 100,
            price: 180.6,
            counterParty: "Garlic",
            location: "Delhi"
        },
            {
                tradeDate: '2018/01/30',
                commodity: 'AL',
                side: "Buy",
                quantity: 100,
                price: 180.6,
                counterParty: "Fan",
                location: "Delhi"
            },
            {
                tradeDate: '2018/01/30',
                commodity: 'AL',
                side: "Buy",
                quantity: 100,
                price: 180.6,
                counterParty: "Yes",
                location: "Delhi"
            },
            {
                tradeDate: '2018/01/30',
                commodity: 'AL',
                side: "Buy",
                quantity: 100,
                price: 180.6,
                counterParty: "Jupyter",
                location: "Delhi"
            },
            {
                tradeDate: '2018/01/30',
                commodity: 'AL',
                side: "Buy",
                quantity: 100,
                price: 180.6,
                counterParty: "Arial",
                location: "Delhi"
            },
            {
                tradeDate: '2018/01/30',
                commodity: 'AL',
                side: "Buy",
                quantity: 100,
                price: 180.6,
                counterParty: "Christmas",
                location: "Delhi"
            }]
         }
    }

    componentWillReceiveProps(nextProps) {
        console.log("Will Receive props called!")
    }

    componentDidMount() {
        console.log("Component Did Mount called!")
    }


    onChange(field, value) {
        this.setState({selectedRow:{[field]: value}});
    }
    
    myDefaultCell()
    {
      return 'delete'; 
    }
    handleMouseHover() {
        this.setState(this.deleteshow);
      }
    
      toggleHoverState(state) {
        return {
            deleteshow: !state.deleteshow,
        };
      }

    render() {
        
        const defaultColumn = 
        {
          Cell:this.myDefaultCell,
          Header: 'No Column Header',
        }
        const onRowClick = (state, rowInfo, column, instance) => {
            return {
                onClick: e => {
                 
                    this.setState({ selectedRow:{counterParty:rowInfo.row.counterParty
                    ,tradeDate:rowInfo.row.tradeDate
                ,commodity:rowInfo.row.commodity
            ,side:rowInfo.row.side,
            quantity:rowInfo.row.quantity,
            price:rowInfo.row.price,
            location:rowInfo.row.location}}  )                }
            }
        }
        
        const columns = [{Header: "Trade Date", accessor: "tradeDate"},
         {Header: "Commodity",accessor: "commodity"},
         {Header: "Side", accessor: "side"},
          {Header: "Qty(MT)", accessor: "quantity"},
           {Header: "Price(MT) ",accessor: "price"},
            {Header: "Counterparty", accessor: "counterParty"},
         {Header: "Location", accessor: "location"},
         {...defaultColumn,Header: "Delete", accessor: "delete",className: (this.state.deleteshow == true?'showcustom':'hidecustom')}]

        // Default table data
        var data1 = [{
            tradeDate: '2018/01/30',
            commodity: 'AL',
            side: "Buy",
            quantity: 100,
            price: 180.6,
            counterParty: "Garlic",
            location: "Delhi"
        },
            {
                tradeDate: '2018/01/30',
                commodity: 'AL',
                side: "Buy",
                quantity: 100,
                price: 180.6,
                counterParty: "Fan",
                location: "Delhi"
            },
            {
                tradeDate: '2018/01/30',
                commodity: 'AL',
                side: "Buy",
                quantity: 100,
                price: 180.6,
                counterParty: "Yes",
                location: "Delhi"
            },
            {
                tradeDate: '2018/01/30',
                commodity: 'AL',
                side: "Buy",
                quantity: 100,
                price: 180.6,
                counterParty: "Jupyter",
                location: "Delhi"
            },
            {
                tradeDate: '2018/01/30',
                commodity: 'AL',
                side: "Buy",
                quantity: 100,
                price: 180.6,
                counterParty: "Arial",
                location: "Delhi"
            },
            {
                tradeDate: '2018/01/30',
                commodity: 'AL',
                side: "Buy",
                quantity: 100,
                price: 180.6,
                counterParty: "Christmas",
                location: "Delhi"
            }];

        // Reset all the filter values
        var clearFilters = (e) => {
            e.preventDefault();
            console.log("Clear Button Clicked!")
        }

        // var apiGETRequest = async (filters) => {
        //     const response = await fetch('http://localhost:3001/allTrades/');
        //     const body = await response.json();
        //     if (response.status !== 200) throw Error(body.message);
        //     return body;
        // };
        //
        // var apiPOSTRequest = async (filters) => {
        //     const response = await fetch('http://localhost:3001/allTrades/');
        //     const body = await response.json();
        //     if (response.status !== 200) throw Error(body.message);
        //     return body;
        // };

        // Form submit
        var handleSubmit = (e) => {
            e.preventDefault();

            console.log("Inside the submit function")

            var filterValues = {};
            filterValues.commodity = this.refs.commodity.state.value

            filterValues.buy = this.refs.buy.state.checked

            filterValues.sell = this.refs.sell.state.checked
            filterValues.buy = this.refs.buy.state.checked
            filterValues.buy = this.refs.buy.state.checked
            filterValues.startDate = this.refs.startDate.value
            filterValues.endDate = this.refs.endDate.value
            filterValues.counterParty = this.refs.counterParty.state.value
            filterValues.location = this.refs.location.state.value

            // TODO: Make the api call and re-render the table
            // debugger;

            // this.refs.reactTable.filterColumn(this.columns[1], e.target.value)
            // this.refs.reactTable.filterColumn(columns[5], 'Garlic')

            request.get("http://localhost:3001/allTrades/")
                .then( (res) => {

                    console.log(res);
                    var data = JSON.parse(res.text);
                    debugger
                    if(data.success !== undefined && data.success){
                        var tableData = data.data;
                        this.setState({dataTb:tableData})
                    }
                })
                .catch(function(err) {
                   console.log("Error occurred in fetching the table details")
                    // err.message, err.response
                })
                // .bind(this);

            // var dataTb = fetchTbData(filterValues);

            // this.setState({dataTb:tableData})
            // debugger;
        }

        return (
            <div>
                <Segment attached="bottom">
                    <Form size="small" onSubmit={handleSubmit.bind(this)}>

                        <div className="twelve fields">

                            <Form.Field name="StartDate" width={2}>
                                <label>Trade Date</label>
                                <input placeholder="StartDate" ref="startDate" defaultValue="23/07/2018"/>
                            </Form.Field>
                            <Form.Field name="EndDate" width={2}>
                                <label>  &nbsp;</label>
                                <input placeholder="EndDate" ref='endDate' defaultValue="23/07/2019"/>
                            </Form.Field>


                            <Form.Field name="commodity" width={3}>
                                <label>Commodity</label>
                                <Dropdown selection options={FACTIONS} ref='commodity' defaultValue="wd"/>

                            </Form.Field>


                            <Form.Field name="side" width={3}>
                                <label>Side</label>

                                <Checkbox value="divyataken" label='Buy' ref='buy'/>
                                <Checkbox value="BhejaFry" label='Sell' ref='sell'/>

                            </Form.Field>
                            <Form.Field name="counterParty" width={3}>
                                <label>Counter Party</label>
                                <Dropdown selection options={FACTIONS} value="wd" ref='counterParty' />

                            </Form.Field>
                            <Form.Field name="location" width={3}>
                                <label>Location</label>
                                <Dropdown selection options={FACTIONS} value="wd" ref='location'/>

                            </Form.Field>
                            <br/>
                            <Button type='button' onClick={clearFilters.bind(this)}>CLEAR</Button>
                            <Button type='submit'>SEARCH</Button>

                        </div>
                    </Form>
                </Segment>
                <div className='column'>
                    <div className="six fields ctmTable">
                        <ReactTable ref='reactTable' noDataText="Loading..." columns={columns
                        } data={this.state.dataTb} className="-striped -highlight" getTrProps={onRowClick} defaultPageSize={5}/>
                        <br/>
                    </div>
                    <div className='four fields tradeDetail ui grid'>
                        <div className='column'>Data Editor</div>
                    </div>
                    <div className='four fields tradeDetail ui grid'>
                        <Editor className='column' selectedRow={this.state.selectedRow}
                                onChange={this.onChange.bind(this)}>Lorem Ipssum</Editor>
                    </div>
                </div>

            </div>

        );
    }
}

export default Trade;