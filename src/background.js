var value = 1

chrome.extension.onConnect.addListener(function(port) {
  console.log("Connected .....");
  port.onMessage.addListener(function(msg) {
        //console.log("message recieved"+ msg);
        if(msg == "getValue"){
			port.postMessage(value);
		} else {
			value = Number(msg);
		}
  });
});