import React,{ Component }  from 'react' ;
import ReactTable from "react-table";
import "react-table/react-table.css";

class TradeDetails extends Component{
	
	
	render () {
		return(
		<div>
        <ReactTable
          columns={ [
                {
                  Header: "Trade Date",
                  accessor: "tradeDate"
                },
                {
                  Header: "Commodity",
                  id: "lastName",
                  accessor: d => d.lastName
                },
				{
                  Header: "Side",
                  accessor: "side"
                },
                {
                  Header: "Qty (MT)",
                  accessor: "qty"
                },
				{
                  Header: "Price(/MT) ",
                  accessor: "price"
                },
                {
                  Header: "Counterparty",
                  accessor: "counterparty"
                },
				{
                  Header: "Location",
                  accessor: "location"
                }
              ]
            }
          className="-striped -highlight"
        />
        <br />
        </div>
		)
	}
	
};

export default TradeDetails;