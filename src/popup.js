/*
document.addEventListener("load", function () {
	document.getElementById('slider').addEventListener("input", update)
	console.log("Loaded")
});
*/

document.getElementById('slider').addEventListener("input", update)

function update(){
	var value = document.getElementById('slider').value
	document.getElementById('val').innerHTML = value
	
	//window.postMessage('{ type: "sliderValue", text: value }', "*");
	
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
			chrome.tabs.sendMessage(tabs[0].id, { type: "sliderValue", text: value }, function(response) {
			console.log(response.farewell);
		});
	});
	console.log("Send: " + value)
}