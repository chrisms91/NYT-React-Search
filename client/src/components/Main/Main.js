import React, { Component } from 'react';
import { Row, Container } from '../Grid';
import Jumbotron from '../Jumbotron';
import Search from '../Search';
// import Saved from '../Saved';

class Main extends Component {

	// state = {
	// 	listDataFromChild: null
	// }

	// myCallBack = (dataFromChild) => {
	// 	this.setState({
	// 		listDataFromChild: dataFromChild
	// 	})
	// 	console.log(this.state);
	// }

	render() {
		return (
            <Container>
                <Jumbotron>
                    <h1 className="text-center" style={{color:'white'}}><strong><i className="fa fa-newspaper-o"></i> New York Times Search</strong></h1>
                </Jumbotron>

                <Row>
                    <Search />
                </Row>
            </Container>
	    );
	}
}

export default Main;