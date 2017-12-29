
// chrome.browserAction.onClicked.addListener(function(){
// 	chrome.windows.create({
// 		url: 'options.html',
// 		width: 400,
// 		height: 400,
// 		type: 'popup'
// 	},function(w){
		
// 	})
// });

chrome.app.runtime.onLaunched.addListener(function() {
	chrome.app.window.create('index.html', {
		id: "MainWindow",
		innerBounds: {
			width: 400,
			height: 300
		},
		frame: 'none'
	});
});