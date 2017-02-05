/*  Douglas Aquilino       February 04, 2017   */
/*  RCB - "Hangman-game" Homework #3           */
/*                game.js                      */
	
/*==================  notes REMOVE ==============================

1.) display clue question  askQuestion();
2.) win or lose reveal clue showAnswer();

=========================================================*/

	// Global Variable Declarations
	var wins = 0;
	var losses = 0;
	var presidents = "washington ADAMS JEFFERSON MADISON Adams Jackson Buren Harrison Tyler Polk Taylor Fillmore Pierce Buchanan Lincoln Johnson Grant Hayes Garfield Arthur Cleveland Harrison Cleveland McKinley Roosevelt Taft Wilson Harding Hoover Roosevelt Truman Eisenhower Kennedy Johnson Nixon Ford Carter Reagan Bush Clinton Bush Obama Trump".toUpperCase().split(" ");
	var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	var guessesLeft = 15;
	var guessesMade = [];
	var playerGuess = "";
	var answerDisplay = [];  

	var answer = [];// current presidents[presidentIndex]
	var presidentIndex = 0;
	
	//==============================================================
	
	
	// Event Handler. Monitors for 'key up'.
	// Assigns playerGuess that key.		
	// Error checks key is a letter.
	// 
	
	
	document.onkeyup = function(element){
		
		playerGuess = event.key.toUpperCase();

	
		//checks if key pressed is a letter.
		if (!isLetter(playerGuess)){
			alert("Woops! Please Guess a Letter!");
			return 0;			
		}
		
		if(guessesLeft === 15){
			presidentIndex = randomIndex(); 
			answer = presidents[presidentIndex].split("");
			setAnswerDisplay();
			askQuestion();
		}

		guessesLeft--;

		// checks if player already guessed letter.
		if (guessesMade.indexOf(playerGuess) > -1){
			alert("You've Already Guessed '" + playerGuess +"' ! Try Again.");
			return 0;
		}
		else{
			guessesMade.push(playerGuess);
			checkAnswer();
		}
		
		//If no more guesses you lose
		if (guessesLeft == 0){
			loseAlert();
			resetGame();
		}	
	
		showResults();
	
	}//END document.onkeyup = function(element)

	//==============================================================
	
	
	//Returns random number for index in presidents array.
	function randomIndex(){
			
		return  Math.floor(Math.random()*presidents.length);
		
	}// END randomPresident()

	//==============================================================
		
	//returns found indexes of char in array
	
	function searchString(string){

		for(var i = 0; i < string.length; i++)
			
			if(playerGuess === string[i]){
					foundIndexes.push(i);
		}	

	}//END searchString

	//==============================================================
	
	// Displays results of game to page.
	function showResults() {
	 	
	 	//	Current Word 	
	 	document.querySelector("#current-word").innerHTML= answerDisplay.join(" ");

	 	//	guesses left 	 	
	 	document.querySelector("#guesses-left").innerHTML= guessesLeft;

	 	//	Letters guessed 		 	
	 	document.querySelector("#letters-guessed").innerHTML= guessesMade.join(" ");

	 	//	wins 	 	
	 	document.querySelector("#wins").innerHTML= wins;
	 	
	 	//	losses 	 	
	 	document.querySelector("#losses").innerHTML= losses;
	 
	 }// END showResults()
	
	//==============================================================
	
	//Displays win alert, incriment wins, rest game.
	function winAlert(){
			
		alert("Win"); //some win action - play sound
		wins++;
		resetGame();  
return 0;	//
	}//END winAlert()
	//==============================================================
	function loseAlert(){
		alert("You Lose!");
		losses++;
	}
	//==============================================================

	//Resets game by setting 'Guesses Left' to ten and
	//clearing 'Your Guesses So Far: '.  
	function resetGame(){
		
		guessesLeft = 15;
		guessesMade = [];
		answerDisplay = [];

	}//END resetGame()


	function isLetter(x){
		if(letters.indexOf(x) > -1){
			return true;	
		}			
			return false;
	}//END isLetter

	//Assigns proper place holder array. 
	function setAnswerDisplay(){

		answerDisplay = answer.map(function(element){
				
			if(isLetter(element)){
				
				return("_");
			}
			else{
				
				return element;
			}
		});	

	}//END setAnserDisplay


	function checkAnswer(){

		for(var i = 0; i< answer.length; i++){
			if(playerGuess == answer[i]){
				answerDisplay[i] = playerGuess;
			}
			
			if(answerDisplay.join("") == answer.join("")){
				winAlert();
			}
		}

	}//END checkAnswer

	function superscript(){
	if((presidentIndex+1) == 11){
			return th;
		}
		else if((presidentIndex+1).toString().endsWith("1")){
			return "<sup>ST</sup>";
		}
		else if((presidentIndex+1).toString().endsWith("2")){

			return "<sup>ND</sup>";
		}
		else if((presidentIndex+1).toString().endsWith("3")){
			return "<sup>RD</sup>";
		}	
		return "<sup>TH</sup>";

	}//END superscript

	// displays answer
	function showAnswer(){



	}//END showAnswer

	// displays Question
	function askQuestion(){
		x = document.querySelector("#clue");
		x.innerHTML = "Who was the " + (presidentIndex+1) +superscript()+ " president of the United States";

	}//END askQuestion

	

