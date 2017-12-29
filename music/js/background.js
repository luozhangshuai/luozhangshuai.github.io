console.log(1)
chrome.browserAction.onClicked.addListener(function(){
	chrome.windows.create({
		url: 'options.html',
		width: 400,
		height: 400,
		type: 'popup'
	},function(w){
		
	})
});

