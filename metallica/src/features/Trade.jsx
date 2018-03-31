import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
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

const Trade = (props) => {
    // TODO: Check while binding; Updated the access method of the commodity table
    const columns = [ { Header: "Trade Date", accessor: "tradeDate" }, { Header: "Commodity", id: "commodity", accessor:  "commodity" }, { Header: "Side", accessor: "side" }, { Header: "Qty (MT)", accessor: "quantity" }, { Header: "Price(/MT) ", accessor: "price" }, { Header: "Counterparty", accessor: "counterparty" }, { Header: "Location", accessor: "location" } ]

    var data = [{
        tradeDate: '2018/01/30',
        commodity: 'AL',
        side: "Buy",
        quantity: 100,
        price: 180.6,
        counterparty: "Garlic",
        location: "Delhi"
    },
        {
            tradeDate: '2018/01/30',
            commodity: 'AL',
            side: "Buy",
            quantity: 100,
            price: 180.6,
            counterparty: "Fan",
            location: "Delhi"
        },
        {
            tradeDate: '2018/01/30',
            commodity: 'AL',
            side: "Buy",
            quantity: 100,
            price: 180.6,
            counterparty: "Yes",
            location: "Delhi"
        },
        {
            tradeDate: '2018/01/30',
            commodity: 'AL',
            side: "Buy",
            quantity: 100,
            price: 180.6,
            counterparty: "Jupyter",
            location: "Delhi"
        },
        {
            tradeDate: '2018/01/30',
            commodity: 'AL',
            side: "Buy",
            quantity: 100,
            price: 180.6,
            counterparty: "Arial",
            location: "Delhi"
        },
        {
            tradeDate: '2018/01/30',
            commodity: 'AL',
            side: "Buy",
            quantity: 100,
            price: 180.6,
            counterparty: "Christmas",
            location: "Delhi"
        }];


    var handleSubmit = (e, {formData}) => {
        e.preventDefault();

        console.log("Inside the submit function")
        debugger;

        //
        // Potentially need to manually validate fields here?
        //

        // Send a POST request to the server with the formData
        // this.props.dispatch(signUp(formData)).then(({isAuthenticated}) => {
        //     if (isAuthenticated) {
        //         // Redirect to the home page if the user is authenticated
        //         this.props.router.push('/');
        //     }
        // }
    }

    // handleFilter = () => {
    //     var a = this.refs.a.selcted;
    // }

    return (
	<div>
    <Segment attached="bottom">
        <Form size="small" onSubmit={handleSubmit}>

            <div className="twelve fields">

                <Form.Field name="StartDate" width={2}>
                    <label>Trade Date</label>
                    <input placeholder="StartDate" defaultValue="23/07/2018" />
                </Form.Field>
                <Form.Field name="EndDate" width={2}>
                    <label>  &nbsp;</label>
                    <input placeholder="EndDate" defaultValue="23/07/2019" />
                </Form.Field>


                <Form.Field name="commodity" width={3}>
                    <label>Commodity</label>
                    <Dropdown selection options={FACTIONS} defaultValue="wd" />

                </Form.Field>



                <Form.Field name="side" width={3}>
                    <label>Side</label>

                    <Checkbox value="divyataken"  label='Buy' />
                    <Checkbox value="BhejaFry" label='Sell' />

                </Form.Field>
                <Form.Field name="counterParty" width={3}>
                    <label>Counter Party</label>
                    <Dropdown selection options={FACTIONS} value="wd" />

                </Form.Field>
                <Form.Field name="location" width={3}>
                    <label>Location</label>
                    <Dropdown selection options={FACTIONS} value="wd" />

                </Form.Field>
                <br/>
                <Button type='submit' >CLEAR</Button>
                <Button type='submit' >SEARCH</Button>

            </div>
        </Form>
    </Segment>
    <div class='column'>
        <div className="six fields ctmTable">
            <ReactTable columns={columns
                } data={data}  className="-striped -highlight" />
                <br />
        </div>
        <div class='four fields tradeDetail ui grid'>
			<div class='column'>Lorem Ipsum</div>
		</div>
    </div>

</div>

    );
}

export default Trade;