(function() {  
	if(window !== window.top)
		return;
	
	console.log('sendToXBMC started');


	var handle_message = function(msgEvent) {
		var messageName = msgEvent.name;
		var messageData = msgEvent.message;

		console.log('inject message: ' + messageName);
		
		if(messageName === 'stop Player'){
			if(document.getElementById('CTPmediaElement0') !== null){
				document.getElementById('CTPmediaElement0').pause();
				console.log('player: html5');
			}
			else if(document.getElementById('movie_player') !== null){
				document.getElementById('movie_player').stopVideo();
				console.log('player: flash');
			}
		}
	};

	var handle_keypress = function(e) {
		console.log('handing ' + e.keyCode);
		if(e.keyCode !== 223) return;
		safari.self.tab.dispatchMessage("keyboard", window.location.href);
	}

	safari.self.addEventListener("message", handle_message, false);
	window.addEventListener("keypress", handle_keypress)
})();