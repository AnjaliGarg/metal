import React,{ Component }  from 'react' ;
import { Button, Icon, Grid } from 'semantic-ui-react';

class SearchBar extends Component{
	
	constructor(props){
		super(props);
		this.state = { term :''};
		
	}
	render () {
		return(
		<div>
		<input placeholder="Search here	"
		value={this.state.term} 
		onChange={event=> this.setState({term :event.target.value})}/>
		<Button basic circular icon="video" floated="right" style={{marginTop: 5}} >Click me</Button>
		</div>
		
		)
	}
	
	
};

export default SearchBar;

