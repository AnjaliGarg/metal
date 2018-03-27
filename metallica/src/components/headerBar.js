import React,{ Component }  from 'react' ;
import { Container,Header,Menu,Anchor} from 'semantic-ui-react';

class HeaderBar extends Component{
	
	render () {
		return(
		
				<Container>
                 <Menu tabular size="massive">
                       <Menu.Item name="trades" active={true}>Trades</Menu.Item>
                       <Menu.Item name="transfers" active={false}>Transfers</Menu.Item>
                      <Menu.Item name="transports" active={false}>Transports</Menu.Item>
                     </Menu>
               </Container>
            
		)
	}
	
	
};

export default HeaderBar;

