$(document).ready(function() {
 	var fireb = new Firebase("https://nadiyahb.firebaseio.com");


	$('#messages-form').submit(function(e){
		e.preventDefault();		
		//$(this).find("input"); finds elements attached to the current jquery object

		var $messageInput = $(this).find('input[name="message"]')
		console.log($messageInput.val());

		 fireb.child('messages').push({
 		text: $messageInput.val(),
 		votes: 0

 		})
		 $messageInput.val("");
	})

	function getFanMessages(){
		fireb.child('messages').on('value',function(results){
			$('#messages').empty();
			var values = results.val(); 
			// returns an object. each key is an enter in the DB


			for(var key in values){ 
			// loops over all the keys in the object. not the values in the key

				//console.log(values[key]); // var values is the big object and key value is the keys of the object. which are objects nested in the "value" object.
				var msg = values[key];
				var upvote = $(' <button>upVote</button>').data("id",key);
				// same as $(' <button data-id= "' + key +'">upVote</button>').data("id",key)
				// $("<p></p>").text(msg.text).appendTo('#messages'); Same as "<p>" + values[key].text + "</p>" 
				var container = $("<p>" + msg.text + " , " + msg.votes +" votes </p>");
				
				container.append(upvote);
				//OR: upvote.appendTo(container);
				
				container.appendTo('#messages');

				upvote.click(function(){
					var msgID = $(this).data("id");
					console.log(msgID)
					updateVotes(msgID, values[msgID].votes + 1);
				})
			}

		});
	}

	function updateVotes(msgID, votes){
		var ref = fireb.child('messages').child(msgID);
		// same as var ref = new Firebase("https://nadiyahb.firebaseio.com/messages/" + msgID);

		ref.update({ votes: votes}) //must pass an object
	}

	getFanMessages();
})