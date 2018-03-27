import React from "react";
import ReactTable from "react-table";
import "react-table/react-table.css";
import {
    Form,
    Dropdown,
    Segment,
    Checkbox
} from "semantic-ui-react";

const FACTIONS = [
    // skip other entries
    {value : "lc", text : "Lyran Commonwealth"},
    {value : "wd", text : "Wolf's Dragoons"},
];

const Trade = () => {

    return (
	<div>
    <Segment attached="bottom">
        <Form size="small">

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

                    <Checkbox value="divyataken" label='Buy' />
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

            </div>
        </Form>
    </Segment>
    <div class='column'>
        <div className="six fields ctmTable">
            <ReactTable columns={ [ { Header: "Trade Date", accessor: "tradeDate" }, { Header: "Commodity", id: "lastName", accessor: d=> d.lastName }, { Header: "Side", accessor: "side" }, { Header: "Qty (MT)", accessor: "qty" }, { Header: "Price(/MT) ", accessor: "price" }, { Header: "Counterparty", accessor: "counterparty" }, { Header: "Location", accessor: "location" } ]
                } className="-striped -highlight" />
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