import React from "react";
import request from "superagent";

class Editor extends React.Component {

    constructor(props) {
      super(props);
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
        event.preventDefault();
        debugger;
        var updatedTrade = {
            counterParty:this.refs.counterParty.value,
            tradeDate:this.refs.tradeDate.value,
            commodity:this.refs.commodity.value,
            side:this.refs.side.value,
            quantity:this.refs.quantity.value,
            price:this.refs.price.value,
            location:this.refs.location.value,
            tradeId:"268ecf40-340e-11e8-a48a-b716ff5f8e4c"
        }

        request.put("http://localhost:3001/updateTrade/")
            .send(updatedTrade)
            .then( (res) => {
                debugger
                var data = JSON.parse(res.text);
                if(data.success !== undefined && data.success){
                    var tableData = data.data;
                    this.setState({dataTb:tableData})
                }
            })
            .catch(function(err) {
                console.log("Error occurred in fetching the table details")
            })
    }

    onFieldChange(event) {
      // for a regular input field, read field name and value from the event
      const fieldName = event.target.name;
      const fieldValue = event.target.value;
      this.props.onChange(fieldName, fieldValue);
  }


   
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            CounterParty:
            <input type="text" value={this.props.selectedRow.counterParty} ref='counterParty' onChange={this.onFieldChange.bind(this)} />
         <br/> </label>
          <label>
          Trade Date:
            <input type="text" value={this.props.selectedRow.tradeDate}  ref='tradeDate' onChange={this.onFieldChange.bind(this)} />
            <br/> </label>
          <label>
          Commodity:
            <input type="text" value={this.props.selectedRow.commodity} ref='commodity' onChange={this.onFieldChange.bind(this)} />
            <br/> </label>
          <label>
          Side:
            <input type="text" value={this.props.selectedRow.side} ref='side' onChange={this.onFieldChange.bind(this)} />
            <br/> </label>
          <label>
          Quantity:
            <input type="text" value={this.props.selectedRow.quantity} ref='quantity' onChange={this.onFieldChange.bind(this)} />
            <br/> </label>
          <label>
          Price:
            <input type="text" value={this.props.selectedRow.price} ref='price' onChange={this.onFieldChange.bind(this)} />
            <br/> </label>
          <label>
            Location:
            <input type="text" value={this.props.selectedRow.location}  ref='location' onChange={this.onFieldChange.bind(this)} />
            <br/> </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

 Editor.defaultProps={selectedRow:{counterparty:""}} ;

  export default Editor;