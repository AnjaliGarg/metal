import React,{ Component } from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import SearchBar from './components/searchBar';
import HeaderBar from './components/headerBar';
import ListOfTrades from './components/listOfTrades';
import TradeDetails from './components/tradeDetails';
import LoginFrame from './components/loginFrame';
import Trade from './components/trade';
import "semantic-ui-css/semantic.css";
import './App.css';
import {Header,Container,Menu} from "semantic-ui-react";
import TabBarContainer from "./tabs/TabBarContainer";
import Trades from "./features/TradeUpdated";
const Transfers = () => <div>Transfers content</div>;
const Transports = () => <div>Transports content</div>;


class App extends Component{
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
        const tabs = [
         {name : "trades", label : "Trades",component: Trades},
          {name : "transfers", label : "Transfers",component: Transfers},
          {name : "transports", label : "Transports",component: Transports}
		  ];

        return (
            <div className="App">
                <div className="App-header">
                    <Header inverted as="h1">Metallica</Header>
                </div>
                <Container>
                    <TabBarContainer tabs={tabs} size="massive" />
				</Container>
            </div>
        );
    }
};

// Bind the dynamically generated code to Root component on index page
ReactDOM.render(<App />, document.getElementById('root'));

registerServiceWorker();
