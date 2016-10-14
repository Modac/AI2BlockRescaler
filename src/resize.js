

var inter = setInterval(searchIframes, 500);

function searchIframes(){
	
	var rFrames = new Array
	
	var iFrames = document.getElementsByTagName('iframe')
	
	if(iFrames.length<=1) return;
	clearInterval(inter)
	
	for (var i = 0; i < iFrames.length; i++) {
		var iframe = iFrames[i]
		if(typeof iframe.src !== "undefined"){
			console.log("Found iframe with source: " + iframe.src)
			if(iframe.src.startsWith('http://ai2.appinventor.mit.edu/blocklyframe.html#')){
				rFrames.push(iframe)
				console.log("Added iframe for screen: " + iframe.src.replace(/.*_/, ""))
				iframe.style.transformOrigin = "0 0"
			}
		}
	}

	console.log("Finished iframe search")

	/*
	window.addEventListener("message", function(event) {
	  console.log("Recieved message")
	  
	  // We only accept messages from ourselves
	  if (event.source != window)
		return;

	  if (event.data.type && (event.data.type == "sliderValue")) {
		console.log("Content script received: " + event.data.text);
		for (var rFrame in rFrames) {
			rFrame.style.transform = "scale(" + event.data.text + ")"
			rFrame.style.height = (1 / Number(event.data.text))
			rFrame.style.witdh = (1 / Number(event.data.text))
		}
	  }
	}, false);
	*/
	
	chrome.runtime.onMessage.addListener(
		function(request, sender, sendResponse) {
			console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
			if (request.type && (request.type == "sliderValue")) {
				console.log("Content script received: " + request.text);
				for (var i = 0; i < rFrames.length; i++) {
					console.log("Size: " + (1 / Number(request.text) * 100) + "%")
					rFrames[i].style.transform = "scale(" + request.text + ")"
					rFrames[i].style.height = (1 / Number(request.text) * 100) + "%"
					rFrames[i].style.width = (1 / Number(request.text) * 100) + "%"
				}
			}
	});
	
}