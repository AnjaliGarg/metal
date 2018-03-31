import React from "react";

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
        alert('A name was submitted: ' + this.state.value);
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
            CounterProperty:
            <input type="text" value={this.props.selectedRow.counterParty} onChange={this.onFieldChange.bind(this)} />
         <br/> </label>
          <label>
          tradeDate:
            <input type="text" value={this.props.selectedRow.tradeDate} onChange={this.onFieldChange.bind(this)} />
            <br/> </label>
          <label>
          commodity:
            <input type="text" value={this.props.selectedRow.commodity} onChange={this.onFieldChange.bind(this)} />
            <br/> </label>
          <label>
          side:
            <input type="text" value={this.props.selectedRow.side} onChange={this.onFieldChange.bind(this)} />
            <br/> </label>
          <label>
          quantity:
            <input type="text" value={this.props.selectedRow.quantity} onChange={this.onFieldChange.bind(this)} />
            <br/> </label>
          <label>
          price:
            <input type="text" value={this.props.selectedRow.price} onChange={this.onFieldChange.bind(this)} />
            <br/> </label>
          <label>
            CounterProperty:
            <input type="text" value={this.props.selectedRow.location} onChange={this.onFieldChange.bind(this)} />
            <br/> </label>
          <input type="submit" value="Submit" />
        </form>
      );
    }
  }

 Editor.defaultProps={selectedRow:{counterparty:""}} ;

  export default Editor;