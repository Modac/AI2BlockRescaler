
chrome.runtime.onMessage.addListener(
	function(request, sender, sendResponse) {
		//console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");
		if (request.type && (request.type == "sliderValue")) {
			//console.log("Content script received: " + request.text);
			
			
			var rFrames = new Array

			var iFrames = document.getElementsByTagName('iframe')

			for (var i = 0; i < iFrames.length; i++) {
				var iframe = iFrames[i]
				if(typeof iframe.src !== "undefined"){
					//console.log("Found iframe with source: " + iframe.src)
					if(iframe.src.startsWith('http://ai2.appinventor.mit.edu/blocklyframe.html#')){
						rFrames.push(iframe)
						//console.log("Added iframe for screen: " + iframe.src.replace(/.*_/, ""))
						iframe.style.transformOrigin = "0 0"
					}
				}
			}

			//console.log("Finished iframe search")

			
			for (var i = 0; i < rFrames.length; i++) {
				var proc = (1 / Number(request.text) * 100)
				//console.log("Size: " + proc + "%")
				rFrames[i].style.transform = "scale(" + request.text + ")"
				rFrames[i].style.height = proc + "%"
				rFrames[i].style.width = proc + "%"
			}
		}
});