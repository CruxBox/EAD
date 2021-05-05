const MovieDB = require('node-themoviedb');


class TmdbApiManager {
	constructor(){
		// console.log('reached')
		this.mdb = new MovieDB('6d343765c641930b74aae2d4a89c22f8', 'en-US');
	}

	async get_movie_info(args, json){
		console.log('get_movie_movies')
		var count = 0
		let movies = null;
		// console.log(args)
		try{
			// console.log('something')
			movies = await this.mdb.movie.getDetails(args);
			// console.log('seomthing2')
			// movies = JSON.stringify(movies, null, 4)
			movies = movies.data
			// console.log(movies)

			console.log('GOT RESP FROM TMDB')
		
			if(json == true)
				movies = JSON.stringify(movies);
		} catch (e) {
			throw e;
		}
		console.log('done with getting movie info')
		// console.log('Responses:')
		// responses = JSON.stringify(responses, null, 4).replace(/\\/g, '')
		// console.log(responses)
		return movies;
	}

	async search_movies(args, pages, max_count){
		console.log('search_movies')
		var responses = [];
		var count = 0
		// console.log(args)
		try{
			let temp = await this.mdb.search.movies(args);
			let temp_pages = temp.data.total_pages;
			if (temp_pages < pages){
				pages = temp_pages;
			}
		} catch (e){
			throw e;
		}
		for(var i = 0; i<pages; i++){
			args.query.page = i+1;
			try{
				let movies = await this.mdb.search.movies(args);
				// movies = JSON.stringify(movies, null, 4)
				movies = movies.data.results
				// console.log(movies)

				console.log('GOT RESP FROM TMDB')
				for(var j = 0; j < movies.length ; j++){
					if(count == max_count){
						break;
					}

					responses.push(JSON.stringify(movies[j]));
					// console.log(movies[j])
					count++;
				}
				if(count == max_count){
					break;
				}
			} catch (e) {
				throw e;
			}
		}
		console.log('done with movie search')
		// console.log('Responses:')
		responses = JSON.stringify(responses, null, 4).replace(/\\/g, '')
		// console.log(responses)
		return responses;
	}
	async get_popular_movies(args, pages, max_count){
		console.log('get_popular_movies')
		var responses = [];
		var count = 0
		// console.log(args)
		try{
			let temp = await this.mdb.movie.getPopular(args);
			// console.log(temp)
			let temp_pages = temp.data.total_pages;
			if (temp_pages < pages){
				pages = temp_pages;
			}
		} catch (e){
			throw e;
		}
		for(var i = 0; i<pages; i++){
			args.query.page = i+1;
			try{
				let movies = await this.mdb.movie.getPopular(args);
				// movies = JSON.stringify(movies, null, 4)
				movies = movies.data.results
				// console.log(movies)

				console.log('GOT RESP FROM TMDB')
				for(var j = 0; j < movies.length ; j++){
					if(count == max_count){
						break;
					}

					responses.push(JSON.stringify(movies[j]));
					// console.log(movies[j])
					count++;
				}
				if(count == max_count){
					break;
				}
			} catch (e) {
				throw e;
			}
		}
		console.log('done with getting popular movies')
		// console.log('Responses:')
		responses = JSON.stringify(responses, null, 4).replace(/\\/g, '')
		// console.log(responses)
		return responses;
	}

	async get_top_rated_movies(args, pages, max_count){
		console.log('get_top_rated_movies')
		var responses = [];
		var count = 0
		// console.log(args)
		try{
			let temp = await this.mdb.movie.getTopRated(args);
			// console.log(temp)
			let temp_pages = temp.data.total_pages;
			if (temp_pages < pages){
				pages = temp_pages;
			}
		} catch (e){
			throw e;
		}
		for(var i = 0; i<pages; i++){
			args.query.page = i+1;
			try{
				let movies = await this.mdb.movie.getTopRated(args);
				// movies = JSON.stringify(movies, null, 4)
				movies = movies.data.results
				// console.log(movies)

				console.log('GOT RESP FROM TMDB')
				for(var j = 0; j < movies.length ; j++){
					if(count == max_count){
						break;
					}

					responses.push(JSON.stringify(movies[j]));
					// console.log(movies[j])
					count++;
				}
				if(count == max_count){
					break;
				}
			} catch (e) {
				throw e;
			}
		}
		console.log('done with getting top rated movies')
		// console.log('Responses:')
		responses = JSON.stringify(responses, null, 4).replace(/\\/g, '')
		// console.log(responses)
		return responses;
	}

	async get_upcoming_movies(args, pages, max_count){
		console.log('get_upcoming_movies')
		var responses = [];
		var count = 0
		// console.log(args)
		try{
			let temp = await this.mdb.movie.getUpcoming(args);
			// console.log(temp)
			let temp_pages = temp.data.total_pages;
			if (temp_pages < pages){
				pages = temp_pages;
			}
		} catch (e){
			throw e;
		}
		for(var i = 0; i<pages; i++){
			args.query.page = i+1;
			try{
				let movies = await this.mdb.movie.getUpcoming(args);
				// movies = JSON.stringify(movies, null, 4)
				movies = movies.data.results
				// console.log(movies)

				console.log('GOT RESP FROM TMDB')
				for(var j = 0; j < movies.length ; j++){
					if(count == max_count){
						break;
					}

					responses.push(JSON.stringify(movies[j]));
					// console.log(movies[j])
					count++;
				}
				if(count == max_count){
					break;
				}
			} catch (e) {
				throw e;
			}
		}
		console.log('done with getting upcoming movies')
		// console.log('Responses:')
		responses = JSON.stringify(responses, null, 4).replace(/\\/g, '')
		// console.log(responses)
		return responses;
	}

	async get_latest_movie(args, max_count){
		console.log('get_latest_movies')
		var responses = [];
		var count = 0
		try{
			let movies = await this.mdb.movie.getLatest(args);
			// movies = JSON.stringify(movies, null, 4)
			movies = movies.data
			console.log(movies)

			console.log('GOT RESP FROM TMDB')
		
			responses.push(JSON.stringify(movies));
		} catch (e) {
			throw e;
		}
		console.log('done with getting latest movies')
		// console.log('Responses:')
		responses = JSON.stringify(responses, null, 4).replace(/\\/g, '')
		// console.log(responses)
		return responses;
	}
}


module.exports = new TmdbApiManager();