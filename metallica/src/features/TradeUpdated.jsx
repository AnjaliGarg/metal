import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import "./customcss.css";
import Editor from "./Editor"
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
        selectedRow:{counterparty:"",tradeDate:"",side:"",qty:"",price:"",lastName:"",location:""},
        deleteshow:false
         }
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
                 
                    this.setState({ selectedRow:{counterparty:rowInfo.row.counterparty
                    ,tradeDate:rowInfo.row.tradeDate
                ,lastName:rowInfo.row.lastName
            ,side:rowInfo.row.side,
            qty:rowInfo.row.qty,
            price:rowInfo.row.price,
            location:rowInfo.row.location}}  )                }
            }
        }
        
        const columns = [{Header: "Trade Date", accessor: "tradeDate"},
         {Header: "Commodity",id: "lastName",accessor: "lastName"}, 
         {Header: "Side", accessor: "side"},
          {Header: "Qty(MT)", accessor: "qty"},
           {Header: "Price(MT) ",accessor: "price"},
            {Header: "Counterparty", accessor: "counterparty"},
         {Header: "Location", accessor: "location"},
         {...defaultColumn,Header: "Delete", accessor: "delete",className: (this.state.deleteshow == true?'showcustom':'hidecustom')}]

        // Default table data
        var data = [{
            tradeDate: '2018/01/30',
            lastName: 'AL',
            side: "Buy",
            qty: 100,
            price: 180.6,
            counterparty: "Garlic",
            location: "Delhi"
        },
            {
                tradeDate: '2018/01/30',
                lastName: 'AL',
                side: "Buy",
                qty: 100,
                price: 180.6,
                counterparty: "Fan",
                location: "Delhi"
            },
            {
                tradeDate: '2018/01/30',
                lastName: 'AL',
                side: "Buy",
                qty: 100,
                price: 180.6,
                counterparty: "Yes",
                location: "Delhi"
            },
            {
                tradeDate: '2018/01/30',
                lastName: 'AL',
                side: "Buy",
                qty: 100,
                price: 180.6,
                counterparty: "Jupyter",
                location: "Delhi"
            },
            {
                tradeDate: '2018/01/30',
                lastName: 'AL',
                side: "Buy",
                qty: 100,
                price: 180.6,
                counterparty: "Arial",
                location: "Delhi"
            },
            {
                tradeDate: '2018/01/30',
                lastName: 'AL',
                side: "Buy",
                qty: 100,
                price: 180.6,
                counterparty: "Christmas",
                location: "Delhi"
            }];

        // Reset all the filter values
        var clearFilters = (e) => {
            e.preventDefault();
            console.log("Clear Button Clicked!")
        }

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
            debugger;

           
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
                        <ReactTable columns={columns
                        } data={data} className="-striped -highlight" getTrProps={onRowClick} defaultPageSize={5}/>
                        <br/>
                    </div>
                    <div className='four fields tradeDetail ui grid'>
                        <div className='column'>Data Editor</div>
                    </div>
                    <div className='four fields tradeDetail ui grid'>
                        <Editor className='column' selectedRow={this.state.selectedRow} onChange={this.onChange.bind(this)}>Lorem Ipssum</Editor>
                    </div>
                </div>

            </div>

        );
    }
}

export default Trade;