var youtubeVidID = ""
var clearJSON = "%7B%22jsonrpc%22%3A%222.0%22%2C%22method%22%3A%22Playlist.Clear%22%2C%22params%22%3A%7B%22playlistid%22%3A1%7D%2C%22id%22%3A1%7D";
var playJSON = "%7B%22jsonrpc%22%3A%222.0%22%2C%22method%22%3A%22Player.Open%22%2C%22params%22%3A%7B%22item%22%3A%7B%22playlistid%22%3A1%7D%7D%2C%22id%22%3A1%7D%0A";

var add1JSON = "%7B%22jsonrpc%22%3A%222.0%22%2C%22method%22%3A%22Playlist.Add%22%2C%22params%22%3A%7B%22playlistid%22%3A1%2C%22item%22%3A%7B%22file%22%3A%22plugin%3A%2F%2Fplugin.video.youtube%2F%3Faction%3Dplay_video%26videoid%3D";
var add2JSON = "%22%7D%7D%2C%22id%22%3A1%7D";

var open1JSON = "%7B%22jsonrpc%22%3A%20%222.0%22%2C%20%22method%22%3A%20%22Player.Open%22%2C%20%22params%22%3A%7B%22item%22%3A%20%7B%22file%22%20%3A%20%22plugin%3A%2F%2Fplugin.video.youtube%2F%3Faction%3Dplay_video%26videoid%3D";
var open2JSON = "%22%20%7D%7D%2C%20%22id%22%20%3A%20%221%22%7D%0A";

var test = "%7B%22jsonrpc%22%3A%20%222.0%22%2C%20%22method%22%3A%20%22Player.Open%22%2C%20%22params%22%3A%7B%22item%22%3A%20%7B%22file%22%20%3A%20%22plugin%3A%2F%2Fplugin.video.youtube%2F%3Faction%3Dplay_video%26videoid%3DhH8EYvnlDxQ%22%20%7D%7D%2C%20%22id%22%20%3A%20%221%22%7D%0A"

var serverHeader = "http://192.168.178.22/jsonrpc?request=";

var xbmcip = "";
var xbmcport = "";

function JSONresponse() {
	//Response from the XMLHttpRequest for the console
	console.log(this.responseText);
}

var sendData = function(event) {
	// Button press
	if(event.command !== "xbmc s") return;
	var url = event.target.browserWindow.activeTab.url;
	console.log(url);
	
	if(parseVideoID(url))
		return;
	
	//sendJSON("clear");
	//sendJSON("add");
	//sendJSON("play");
	
	//sendJSON("test");
	
	//send to XBMC
	sendJSON("open");
	
	//File start.js
	safari.application.activeBrowserWindow.activeTab.page.dispatchMessage("stop Player", null);
	
};
	
var parseVideoID = function(urlstring) {
	
	var urlYT = urlstring.search(/youtube.+/);
	if (urlYT == -1)
		return 1;
	
	var urlSub = urlstring.substring(32,urlstring.length);
	console.log(urlSub);
	
	youtubeVidID = urlSub;
	return 0;
};

var sendJSON = function(com) {
	var myRequest = new XMLHttpRequest();
	//var endpoint = serverHeader;
	getSettings();
	console.log('XBMC IP:   ' + xbmcip);
	console.log('XBMC Port: ' + xbmcport);
	
	var endpoint = "http://" + xbmcip + ":" + xbmcport + "/jsonrpc?request=";
	console.log('com: ' + com);
	
	
	if(com === "clear")
		endpoint += clearJSON;
	else if(com === "add")
		endpoint += add11JSON + youtubeVidID + add12JSON;
	else if(com === "play")
		endpoint += playJSON;
	else if(com === "test")
		endpoint += test;
	else if(com === "open")
		endpoint += open1JSON + youtubeVidID + open2JSON;
		
	
	myRequest.open("GET", endpoint);
	console.log('opening ' + endpoint);
	myRequest.onload = JSONresponse;
	myRequest.send();

};


var getSettings = function(){
	xbmcip = safari.extension.settings.getItem("xbmcip");
	xbmcport = safari.extension.settings.getItem("xbmcport");
};
	
var validate_shorturl = function(event) {
	if(event.command === "shorten url") {
		// Disable the button if there is no URL loaded in the tab.
		event.target.disabled = !event.target.browserWindow.activeTab.url;
	}
};
	
	
var handle_message = function(msgEvent) {
	var messageName = msgEvent.name;
	var messageData = msgEvent.message;
	
	console.log(messageName);
	console.log(messageData);

	if(messageName === 'test') {
	 	//handle_shorturl(messageData);
	}
};

safari.application.addEventListener("command", sendData, false);
safari.application.addEventListener("validate", validate_shorturl, false);
safari.application.addEventListener("message", handle_message, false);

