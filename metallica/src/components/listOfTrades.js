import React,{ Component }  from 'react' ;
import trade from './trade';
import ReactTable from "react-table";
import "react-table/react-table.css";

class ListOfTrades extends Component{
	
	constructor(props){
		super(props);
		this.state={term :''}
		
	}
	
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
                  id: "commodity",
                  accessor: d => d.commodity
                },
				{
                  Header: "Side",
                  accessor: "side"
                },
                {
                  Header: "Qty (MT)",
                  accessor: "quantity"
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
	
	onMouseHover(){
		
	}
};

export default ListOfTrades;