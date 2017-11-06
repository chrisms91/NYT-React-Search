import React, { Component } from 'react';
import Panel from '../Panel';
import { Input, FormBtn } from '../Form';
import { Col } from '../Grid';
import { List, ListItem } from '../List';
import SaveBtn from '../SaveBtn';
import DeleteBtn from '../DeleteBtn';
import axios from "axios";
import API from '../../utils/API';
// import Saved from '../Saved';

/**
queryUrl = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=6be1a80129c5428a8986b72877df08e9" + "&q=" + searchTerm;
**/

class Search extends Component {
	state ={
		articles: [],
		savedArticles: [],
		topic: '',
		startYear: '',
		endYear: ''
	}

    componentDidMount () {
    	this.getArticles();
    }

	// sendDataToMain = (savedArticles) => {
	// 	this.props.callbackFromMain(savedArticles);
	// }

	handleInputChange = event => {
		const { name, value } = event.target;
		this.setState({
			[name]: value
		})
	}

	handleFormSubmit = event => {
        event.preventDefault();

        if(this.state.topic) {
        	// parsing query for api call
        	let queryUrl = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=6be1a80129c5428a8986b72877df08e9&q=${this.state.topic}`;

        	if (this.state.startYear.length > 0) {
        		queryUrl += `&begin_date=${parseInt(this.state.startYear, 10)}0101`;
        	}
        	if (this.state.endYear.length > 0) {
        		queryUrl += `&end_date=${parseInt(this.state.endYear, 10)}1230`;
        	}

        	axios.get(queryUrl)
        	    .then(res => {
        	    	var articles = res.data.response.docs;
        	    	let infoArray = [];

        	    	articles.slice(0, 5).map(article => {
                        let info = {
                        	id: article._id,
                        	title: article.headline.print_headline,
                        	snippet: article.snippet,
                        	date: article.pub_date,
                        	url: article.web_url
                        }
                        infoArray.push(info);
                        this.setState({
        	    		    articles: infoArray
        	    	    })
        	    	})
        	    	console.log(this.state);
        	    })
        	    .catch(err => {
        	    	console.log(err);
        	    })
        }
	}

	saveArticle = article => {
        API.saveArticle(article)
            .then(dbArticle => {
            	this.getArticles()
            })
	}

	getArticles = () => {
		API.getArticles()
		    .then(res => {
		    	this.setState({savedArticles: res.data})
		    	// this.sendDataToMain(this.state.savedArticles)
		    })
	}

	clearResult = event => {
		event.preventDefault();
		this.setState({
			articles: [],
			topic: '',
	        startYear: '',
	        endYear: ''
		});
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
		    <Col size='sm-12'>
			    <Panel icon='fa fa-list' title=' Search Parameters'>
			        <form>
			            <Input 
			                name='topic'
			                value={this.state.topic}
			                onChange={this.handleInputChange}
			                placeholder='trump'
			                fh='topic'
			                title='Topic: '
			            />
			            <Input 
			                name='startYear'
			                value={this.state.startYear}
			                onChange={this.handleInputChange}
			                placeholder='2015'
			                fh='startYear'
			                title='Start Year: '
			            />
			            <Input 
			                name='endYear'
			                value={this.state.endYear}
			                onChange={this.handleInputChange}
			                placeholder='2017'
			                fh='endYear'
			                title='End Year: '
			            />

			            <FormBtn
			                disabled={!(this.state.topic && (this.state.startYear || this.state.endYear))}
			                type='submit'
			                onClick={this.handleFormSubmit}>
			                <i className="fa fa-search"></i> Search
			            </FormBtn>
			            <FormBtn
			                type='button'
			                onClick={this.clearResult}>
			                <i className="fa fa-trash"></i> Clear Result
			            </FormBtn>
			        </form>
			    </Panel>
			    <Panel icon='fa fa-table' title=' Top Articles'>
			        {this.state.articles.length > 0 
			            ? (
                            <List>
                                {this.state.articles.map(article => (
                                    <ListItem key={article.id}>
                                        <SaveBtn onClick={() => this.saveArticle(article)}/>
                                        <h2> {article.title} </h2>
                                        <p> {article.date} </p>
                                        <p> {article.snippet} </p>
                                        <a href={article.url}> Article Link </a>
                                    </ListItem>
                                ))}
                            </List>
			            ) : ("")}
			    </Panel>
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
		    </Col>
		)
	}
}

export default Search;