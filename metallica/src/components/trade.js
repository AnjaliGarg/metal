import React,{ Component }  from 'react' ;

class Trade extends Component{
	state = {
    response: ''
  };
  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.message }))
      .catch(err => console.log(err));
  }
  callApi = async () => {
    const response = await fetch('/api');
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };
  render() {
    return (
      <div className="App">
               <p className="App-intro">{this.state.response}</p>
      </div>
    );
  }
};

export default Trade;