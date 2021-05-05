const JustWatch = require('justwatch-api');

class JustwatchManager {

	constructor(){
		this.manager = new JustWatch({locale:"en_IN"});
	}

	async search_response_with_tmdb_id(id, title){
		try{
			let page = 1;
			var searchResult = await this.manager.search({query: title, page: 1});
			let totalPages = searchResult.total_pages;
			let correctResp = null;
			// console.log(searchResult)
			for(var k = 0; k < totalPages; k++){
				if(k+1>1)
					searchResult = await this.manager.search({query: title, page: k+1});
				searchResult = searchResult.items;
				// console.log(searchResult)
				// console.log(searchResult.length)
				// console.log(typeof searchResult)
				
				for(var i = 0; i<searchResult.length; i++){
					// console.log(searchResult[i]);
					// break;
					// console.log(temp)
					id = parseInt(id);
					let val = null;
					let scoring = searchResult[i].scoring;
					for(var j = 0; j<scoring.length; j++){
						if(scoring[j].provider_type == 'tmdb:id' && scoring[j].value == id){
							val = scoring[j].value;
							break;
						}
					}
					if(val == id){
						correctResp = searchResult[i];
						break;
					}
				}
				if(correctResp == null) continue;
				// console.log(correctResp)
				searchResult = correctResp;
				// console.log(searchResult)
				break;
				}
			} catch(e){
				throw e;
			}
		return searchResult;
	}
}

module.exports = new JustwatchManager();