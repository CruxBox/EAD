const express = require('express');
let app = express.Router();

const TmdbManager = require('../ApiManagers/TmdbManager.js');
const JustwatchManager = require('../ApiManagers/JustwatchManager.js')
const cors = require("cors");
app.use(cors());

app.get('/search', async (req, res) => {
	console.log('got req')
	let max_results = req.query.max_results;
	let language = req.query.language;
	let query = req.query.query;
	let pages = req.query.page;
	let include_adult = req.query.include_adult;
	let region = req.query.region;
	let year = req.query.year;
	let primary_release_year = req.query.primary_release_year;
	
	var args = {
	  pathParameters: {
	  },
	  query: {
	    // NOTE: api_key and language will be added to query by default, don't need specify these values
	  },
	  body: {
	    // data for request body
	  },
	};
	if(language != null){
		args.query['language'] = language;
	}
	if(query != null){
		args.query['query'] = query;
	}
	if(include_adult != null){
		args.query['include_adult'] = include_adult;
	}
	if(region != null){
		args.query['region'] = region;
	}
	if(year != null){
		args.query['year'] = year;
	}
	if(primary_release_year != null){
		args.query['primary_release_year'] = primary_release_year;
	}
	if(pages == null){
		pages = 1
	}
	if(max_results == null){
		max_results = 100;
	}
	let response = await TmdbManager.search_movies(args, pages, max_results);
	
	res.send(response)
});


app.get('/popular', async (req, res) => {
	console.log('got req')
	let max_results = req.query.max_results;
	let language = req.query.language;
	let pages = req.query.page;
	let region = req.query.region;
	
	var args = {
	  pathParameters: {
	  },
	  query: {
	    // NOTE: api_key and language will be added to query by default, don't need specify these values
	  },
	  body: {
	    // data for request body
	  },
	};
	if(language != null){
		args.query['language'] = language;
	}
	if(region != null){
		args.query['region'] = region;
	}
	if(pages == null){
		pages = 1
	}
	if(max_results == null){
		max_results = 100;
	}
	let response = await TmdbManager.get_popular_movies(args, pages, max_results);
	
	res.send(response)
});


app.get('/latest', async (req, res) => {
	console.log('got req')
	let max_results = req.query.max_results;
	let language = req.query.language;
	
	var args = {
	  pathParameters: {
	  },
	  query: {
	    // NOTE: api_key and language will be added to query by default, don't need specify these values
	  },
	  body: {
	    // data for request body
	  },
	};
	if(language != null){
		args.query['language'] = language;
	}
	if(max_results == null){
		max_results = 100;
	}
	let response = await TmdbManager.get_latest_movie(args, max_results);
	
	res.send(response)
});


app.get('/top-rated', async (req, res) => {
	console.log('got req')
	let max_results = req.query.max_results;
	let language = req.query.language;
	let pages = req.query.page;
	let region = req.query.region;
	
	var args = {
	  pathParameters: {
	  },
	  query: {
	    // NOTE: api_key and language will be added to query by default, don't need specify these values
	  },
	  body: {
	    // data for request body
	  },
	};
	if(language != null){
		args.query['language'] = language;
	}
	if(region != null){
		args.query['region'] = region;
	}
	if(pages == null){
		pages = 1
	}
	if(max_results == null){
		max_results = 100;
	}
	let response = await TmdbManager.get_top_rated_movies(args, pages, max_results);
	
	res.send(response)
});

app.get('/upcoming', async (req, res) => {
	console.log('got req')
	let max_results = req.query.max_results;
	let language = req.query.language;
	let pages = req.query.page;
	let region = req.query.region;
	
	var args = {
	  pathParameters: {
	  },
	  query: {
	    // NOTE: api_key and language will be added to query by default, don't need specify these values
	  },
	  body: {
	    // data for request body
	  },
	};
	if(language != null){
		args.query['language'] = language;
	}
	if(region != null){
		args.query['region'] = region;
	}
	if(pages == null){
		pages = 1
	}
	if(max_results == null){
		max_results = 100;
	}
	let response = await TmdbManager.get_upcoming_movies(args, pages, max_results);
	
	res.send(response)
});

app.get('/search_response_with_tmdb_id', async (req, res) => {
	console.log('got req')
	let title = req.query.query;
	let tmdb_id = req.query.tmdb_id;
	let response = null;
	try{
		response = await JustwatchManager.search_response_with_tmdb_id(tmdb_id, title);	
	} catch(e){
		throw e;
	}
	
	res.send(response)
});

//This should get an integer
app.get('/:id', async (req, res) => {
	console.log('got req')
	let id = req.params.id;
	
	var args = {
	  pathParameters: {
	  	movie_id: parseInt(id)
	  },
	  query: {
	  },
	  body: {
	    // data for request body
	  },
	};
	let response = null;
	try{
		response = await TmdbManager.get_movie_info(args, false);	
	} catch(e){
		throw e;
	}
	response['meta_data'] = await JustwatchManager.search_response_with_tmdb_id(parseInt(id), response.title)
	response = JSON.stringify(response)
	res.send(response)
});





module.exports = app