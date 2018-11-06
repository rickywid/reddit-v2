(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{13:function(e,t,a){e.exports=a(27)},18:function(e,t,a){},24:function(e,t,a){},27:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(11),r=a.n(i),u=(a(18),a(5)),c=a(6),d=a(8),l=a(7),o=a(9),m=function(){function e(){Object(u.a)(this,e)}return Object(c.a)(e,[{key:"getSubreddit",value:function(e){return fetch("https://www.reddit.com/r/".concat(e,".json")).then(function(e){return e.json()}).then(function(e){return e.data.children})}},{key:"getData",value:function(e){var t=this,a=e.map(function(e){return t.getSubreddit(e)});return Promise.all(a).then(function(e){return e})}}]),e}(),b=a(12),p=a.n(b),h=a(4),v=a(2),S=a(3);h.b.add(S.c,S.e,S.g);var f=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(l.a)(t).call(this,e))).state={updatedSubs:[]},a}return Object(o.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.setState({updatedSubs:this.props.data2})}},{key:"displayLinks",value:function(e,t){var a=e.data.stickied?"stickied":"",n=e.data.gilded>0?s.a.createElement(v.a,{className:"icon-link icon--star",icon:"star"}):"",i="image"===e.data.link_flair_text||"Picture"===e.data.link_flair_text?s.a.createElement(v.a,{className:"icon-link icon--image",icon:"image"}):"",r=!0===e.data.is_video?s.a.createElement(v.a,{className:"icon-link icon--video",icon:"video"}):"";return s.a.createElement("li",{key:t,className:"subreddit-topic"},s.a.createElement("a",{className:"subreddit-topic__link ".concat(a),href:e.data.url,target:"_blank"},e.data.title),s.a.createElement("small",null," by ",s.a.createElement("a",{href:"https://reddit.com/u/".concat(e.data.author)},e.data.author)," "),s.a.createElement("small",null,p()(1e3*e.data.created_utc).fromNow()),s.a.createElement("small",null," ",s.a.createElement("a",{href:"https://reddit.com".concat(e.data.permalink)},e.data.num_comments," comments")),n,i,r)}},{key:"render",value:function(){var e=this.props,t=e.data;e.id;return this.props.data?s.a.createElement("div",{className:"subreddit"},s.a.createElement("a",{className:"subreddit-title",href:"https://reddit.com/".concat(t[0].data.permalink)},s.a.createElement("h2",null,"r/",t[0].data.subreddit)),s.a.createElement("ul",{className:"subreddit-topics"},t.map(this.displayLinks))):s.a.createElement("div",null,"loading")}}]),t}(n.Component);h.b.add(S.b,S.d,S.a,S.f);var g=function(e){function t(e){var a;return Object(u.a)(this,t),(a=Object(d.a)(this,Object(l.a)(t).call(this,e))).state={updatedSubs:[],isOpen:!1},a}return Object(o.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){this.setState({updatedSubs:this.props.subreddits})}},{key:"openSettings",value:function(){this.setState({isOpen:!this.state.isOpen})}},{key:"handleChange",value:function(e){var t=this.state.updatedSubs;t[e.target.name]=e.target.value,this.setState({updatedSubs:t},function(){})}},{key:"addInput",value:function(){var e=this.state.updatedSubs;e.push(""),this.setState({updatedSubs:e})}},{key:"deleteInput",value:function(e){var t=this,a=this.state.updatedSubs;a.splice(e,1),this.setState({updatedSubs:a},function(){return t.props.updateSubs(t.state.updatedSubs,"delete")})}},{key:"displayInput",value:function(e,t){var a=this;return s.a.createElement("div",{className:"new-sub__wrap",key:t},s.a.createElement("label",{className:"new-sub__label"},"r/",s.a.createElement("input",{className:"new-sub__input",name:t,value:this.state.updatedSubs[t],placeholder:"subreddit",onChange:this.handleChange.bind(this)})),s.a.createElement(v.a,{onClick:function(){return a.deleteInput(t)},className:"icon icon--remove",icon:"times"}))}},{key:"saveSubs",value:function(){this.setState({isOpen:!1}),this.props.updateSubs(this.state.updatedSubs,"add")}},{key:"render",value:function(){var e=this;return this.state.isOpen?s.a.createElement("div",{className:"new-sub"},this.state.updatedSubs.map(this.displayInput.bind(this)),s.a.createElement("button",{className:"btn btn--add",onClick:this.addInput.bind(this)},s.a.createElement(v.a,{className:"icon icon--add",icon:"plus"})),s.a.createElement("button",{className:"btn btn--save",onClick:function(){return e.saveSubs()}},s.a.createElement(v.a,{className:"icon icon--save",icon:"check"})),s.a.createElement("button",{className:"btn btn--close",onClick:function(){return e.openSettings()}},"close")):s.a.createElement("button",{className:"settings-btn",onClick:function(){return e.openSettings()}},s.a.createElement(v.a,{className:"icon icon--cog",icon:"cog"}),"Settings")}}],[{key:"getDerivedStateFromProps",value:function(e,t){return{updatedSubs:e.subreddits}}}]),t}(n.Component);a(24);h.b.add(S.f);var k=function(e){function t(){var e;return Object(u.a)(this,t),(e=Object(d.a)(this,Object(l.a)(t).call(this))).state={subreddits:[""],subredditsData:[],showInitialSetup:!0},e}return Object(o.a)(t,e),Object(c.a)(t,[{key:"componentDidMount",value:function(){var e=this;null!==JSON.parse(localStorage.getItem("subreddits"))&&(console.log("mounted"),this.setState({showInitialSetup:!1},function(){return e.getData()}))}},{key:"getData",value:function(){var e=this,t=JSON.parse(localStorage.getItem("subreddits"));(new m).getData(t).then(function(t){e.setState({subredditsData:t})})}},{key:"updateSubReddit",value:function(e,t){var a=this;if("delete"===t&&0===e.length)return localStorage.removeItem("subreddits"),void this.setState({showInitialSetup:!0,subreddits:[""]});localStorage.setItem("subreddits",JSON.stringify(e)),this.setState({showInitialSetup:!1},function(){return a.getData(JSON.parse(localStorage.getItem("subreddits")))})}},{key:"handleChange",value:function(e){var t=this,a=this.state.subreddits;a[e.target.name]=e.target.value,this.setState({subreddits:a},function(){return console.log(t.state.subreddits)})}},{key:"addSubReddit",value:function(){var e=this.state.subreddits;e.push(""),this.setState({subreddits:e})}},{key:"render",value:function(){var e=this;return this.state.showInitialSetup?s.a.createElement("div",{className:"start"},s.a.createElement("div",{className:"start__content"},s.a.createElement("h2",null,"Start adding some of your favourite subreddits"),this.state.subreddits.map(function(t,a){return s.a.createElement("div",{className:"start__newsub"},s.a.createElement("label",{className:"new-sub__label"},"r/",s.a.createElement("input",{name:a,className:"new-sub__input new-sub__input--start",onChange:e.handleChange.bind(e),value:e.state.subreddits[a]})))}),s.a.createElement("div",{className:"button-wrap"},s.a.createElement("button",{className:"btn btn--add"},s.a.createElement(v.a,{onClick:function(){return e.addSubReddit()},className:"icon icon--add",icon:"plus"})),s.a.createElement("button",{className:"btn btn--save"},s.a.createElement(v.a,{onClick:function(){return e.updateSubReddit(e.state.subreddits,"add")},className:"icon icon--save",icon:"check"}))))):s.a.createElement("div",{className:"App"},s.a.createElement("nav",null,s.a.createElement(g,{subreddits:JSON.parse(localStorage.getItem("subreddits")),updateSubs:this.updateSubReddit.bind(this)})),s.a.createElement("div",{className:"subreddit-wrap"},JSON.parse(localStorage.getItem("subreddits")).map(function(t,a){return s.a.createElement(f,{key:a,id:a,data:e.state.subredditsData[a],data2:JSON.parse(localStorage.getItem("subreddits"))})})))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(k,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})}},[[13,2,1]]]);
//# sourceMappingURL=main.f6ca0066.chunk.js.map