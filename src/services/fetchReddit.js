export default class fetchReddit {

	getSubreddit(subreddit){
		return fetch(`https://www.reddit.com/r/${subreddit}.json`)
		  .then(function(response) {
		    return response.json();
		  })
		  .then(function(myJson) {
		    return myJson.data.children;
		  });
	}

	getData(subreddits){
		let promise = subreddits.map(subreddit=>{
			return this.getSubreddit(subreddit);
		});	

	    return Promise.all(promise).then(data=>{
	    		return data;
	    })
	}
}