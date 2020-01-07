export default class fetchReddit {

	getSubreddit(subreddit){
		return fetch(`https://www.reddit.com/r/${subreddit}.json`)
		  .then(function(response) {
		    return response.json();
		  })
		  .then(function(myJson) {
		    return myJson.data.children;
		  })
      .catch(err => {
        let subs = JSON.parse(localStorage.getItem("subreddits"));
        subs.splice(subs.indexOf(subreddit), 1);
        localStorage.setItem("subreddits", JSON.stringify(subs));
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