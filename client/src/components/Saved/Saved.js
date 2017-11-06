import React, { Component } from 'react';
import Panel from '../Panel';
import API from '../../utils/API';
import { Col } from '../Grid';
import { List, ListItem } from '../List';
import DeleteBtn from '../DeleteBtn';


class Saved extends Component {

	state = {
		savedArticles: []
	}


	componentDidMount () {
		
		
	}

	getArticles = () => {
	    API.getArticles()
		    .then(res => {
		        this.setState({savedArticles: res.data})
		    })
	}

	handleDeleteBtn = (id) => {
		API.deleteArticle(id)
		    .then(res => {
		    	this.setState({
		    		savedArticles: this.state.savedArticles.filter(element => element._id !== id)
		    	})
		    	this.render()
		    })
		    .catch(err => {
		    	console.log(err);
		    })
	}


	render () {
		return (
			<Panel icon="fa fa-bookmark" title=' Saved Articles'>
			    {this.state.savedArticles.length > 0
			        ? (
			            <List>
			            	{this.state.savedArticles.map(article => (
			            	    <ListItem key={article._id}>
			            	    	<DeleteBtn onClick={() => this.handleDeleteBtn(article._id)} />
			            	    	<h3> {article.title} </h3>
			            	    </ListItem>
			            	))}
			            </List>
			        ) : ("")}
			</Panel>
		)
	}
}

export default Saved;