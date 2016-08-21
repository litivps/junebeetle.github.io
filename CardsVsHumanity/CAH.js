var whiteCount=460;
var blackCount=90;

var playerCardCount;
var playerCount;

var playerCardCountInput;
var playerCountInput;

var currentPlayer;
var currentJudge;

var currentBlackCard;

var cardsUsed;
var blackCardsUsed;

var playerCards;
var playerChoices;
var playerPoints;

function start()
{
	document.body.style.background="#EEEEEE";
	document.body.style.fontFamily="Helvetica,sans-serif";
	document.body.style.fontSize="24px";
	
	addTitle();
	
	var playerCardCountLabel=document.createTextNode("Cards Per Player: ");
	document.body.appendChild(playerCardCountLabel);
	playerCardCountInput=document.createElement("input");
	playerCardCountInput.value="10";
	document.body.appendChild(playerCardCountInput);
	
	addLineBreak();
	
	var playerCountLabel=document.createTextNode("Players: ");
	document.body.appendChild(playerCountLabel);
	playerCountInput=document.createElement("input");
	playerCountInput.value="3";
	document.body.appendChild(playerCountInput);
	
	addLineBreak();
	addLineBreak();
	
	var startButton=document.createElement("button");
	startButton.innerHTML="Play";
	startButton.onclick=startGame;
	document.body.appendChild(startButton);
	
	addLineBreak();
	
	var credits=document.createElement("p");
	var creditsLink=document.createElement("a");
	creditsLink.href="https://cardsagainsthumanity.com/";
	creditsLink.innerHTML="https://cardsagainsthumanity.com/";
	credits.innerHTML="All credit to ";
	credits.appendChild(creditsLink);
	credits.innerHTML+=".";
	document.body.appendChild(credits);
}

function startGame()
{
	playerCardCount=parseInt(playerCardCountInput.value);
	playerCount=parseInt(playerCountInput.value);
	
	currentPlayer=1;
	currentJudge=-1;
	
	cardsUsed=new Array();
	for(cardIndex=0;cardIndex<whiteCount;cardIndex++)
	{
		cardsUsed[cardIndex]=false;
	}
	
	blackCardsUsed=new Array();
	for(cardIndex=0;cardIndex<blackCount;cardIndex++)
	{
		blackCardsUsed[cardIndex]=false;
	}
	
	playerCards=new Array();
	for(playerIndex=0;playerIndex<playerCount;playerIndex++)
	{
		playerCards[playerIndex]=new Array();
		refreshCards(playerIndex);
	}
	
	playerPoints=new Array();
	for(playerIndex=0;playerIndex<playerCount;playerIndex++)
	{
		playerPoints[playerIndex]=0;
	}
	
	startRound();
}

function startRound()
{
	currentJudge++;
	currentJudge=currentJudge%playerCount;	
	
	playerChoices=new Array();
	for(playerIndex=0;playerIndex<playerCount;playerIndex++)
	{
		playerChoices[playerIndex]=new Array();
	}
	
	currentPlayer=0;
	
	currentBlackCard=randomBlackCard();
	
	showShowButton();
}

function showShowButton()
{
	if(currentPlayer==currentJudge)
	{
		currentPlayer++;
	}
	if(currentPlayer==playerCount)
	{
		currentPlayer=currentJudge;
	}
	
	clearBody();
	
	addTitle();
	
	var showText1=document.createTextNode("Give the computer to Player "+(currentPlayer+1)+".");
	document.body.appendChild(showText1);
	
	addLineBreak();
	
	var showText2=document.createTextNode("Then, press Show to show your cards.");
	document.body.appendChild(showText2);
	
	addLineBreak();
	addLineBreak();
	
	var showButton=document.createElement("button");
	showButton.innerHTML="Show";
	showButton.onclick=startTurn;
	document.body.appendChild(showButton);
}

function startTurn()
{	
	refreshCards(currentPlayer);
	
	clearBody();
	
	addTitle();
	
	var judgeDisplay=document.createElement("p");
	judgeDisplay.style.margin="0px";
	judgeDisplay.innerHTML="Judge: "+(currentJudge+1);
	document.body.appendChild(judgeDisplay);

	var playerDisplay=document.createElement("p");
	playerDisplay.style.margin="0px";
	playerDisplay.innerHTML="Current Player: "+(currentPlayer+1);
	document.body.appendChild(playerDisplay);
	
	addLineBreak();
	
	var blackCardImage=document.createElement("img");
	blackCardImage.src=getBlackCardImage(currentBlackCard);
	highlightOff(blackCardImage);
	document.body.appendChild(blackCardImage);
	
	addLineBreak();
	
	if(currentPlayer==currentJudge)
	{
		for(playerIndex=0;playerIndex<playerCount;playerIndex++)
		{
			if(playerIndex!=currentJudge)
			{
				var playerRow=document.createElement("div");
				playerRow.style.display="inline-block";
				highlightOff(playerRow);
				playerRow.onmouseenter=mouseOver;
				playerRow.onmouseleave=mouseOff;
				playerRow.onclick=choiceMouseClick;
				playerRow.id=playerIndex;
				document.body.appendChild(playerRow);
				for(cardIndex=0;cardIndex<playerChoices[playerIndex].length;cardIndex++)
				{
					var cardImage=document.createElement("img");
					cardImage.src=getWhiteCardImage(playerChoices[playerIndex][cardIndex]);
					playerRow.appendChild(cardImage);
				}
				addLineBreak();
			}
		}
	}
	else
	{
		for(cardIndex=0;cardIndex<playerCards[currentPlayer].length;cardIndex++)
		{
			var cardImage=document.createElement("img");
			cardImage.src=getWhiteCardImage(playerCards[currentPlayer][cardIndex]);
			highlightOff(cardImage);
			cardImage.onmouseenter=mouseOver;
			cardImage.onmouseleave=mouseOff;
			cardImage.onclick=cardMouseClick;
			cardImage.id=playerCards[currentPlayer][cardIndex];
			document.body.appendChild(cardImage);
		}
	
		addLineBreak();
		addLineBreak();
	
		var nextButton=document.createElement("button");
		nextButton.innerHTML="Next Player";
		nextButton.onclick=nextPlayer;
		document.body.appendChild(nextButton);
		addLineBreak();
	}
	
	addLineBreak();
	
	var scoresTitle=document.createElement("u");
	scoresTitle.innerHTML="Scores";
	document.body.appendChild(scoresTitle);
	for(playerIndex=0;playerIndex<playerCount;playerIndex++)
	{
		var playerDisplay=document.createElement("p");
		playerDisplay.style.margin="0px";
		playerDisplay.innerHTML="Player "+(playerIndex+1)+": "+playerPoints[playerIndex];
		document.body.appendChild(playerDisplay);
	}
}

function nextPlayer()
{
	currentPlayer++;
	showShowButton();
}

function addTitle()
{
	var title=document.createElement("u");
	title.innerHTML="JavaScript Cards Against Humanity";
	document.body.appendChild(title);
	addLineBreak();
	addLineBreak();
}

function refreshCards(playerIndex)
{
	while(playerCards[playerIndex].length<playerCardCount)
	{
		playerCards[playerIndex].push(randomWhiteCard());
	}
}

function getWhiteCardImage(cardIndex)
{
	return getCardImage(cardIndex,"White");
}

function mouseOver(event)
{
	highlightOn(event.target);
}

function mouseOff(event)
{
	highlightOff(event.target);
}

function cardMouseClick(event)
{
	var chosenCard=parseInt(event.target.id);
	document.body.removeChild(event.target);
	playerChoices[currentPlayer].push(chosenCard);
	var removeCard=playerCards[currentPlayer].indexOf(chosenCard);
	playerCards[currentPlayer].splice(removeCard,1);
	cardsUsed[chosenCard]=false;
}

function choiceMouseClick(event)
{
	var chosenPlayer=parseInt(event.target.parentNode.id);
	playerPoints[chosenPlayer]++;
	startRound();
}

function highlightOn(item)
{
	item.style.border="4px solid #5555DD";
}

function highlightOff(item)
{
	item.style.border="4px solid #EEEEEE";
}

function getBlackCardImage(cardIndex)
{
	return getCardImage(cardIndex,"Black");
}

function getCardImage(cardIndex,namePrefix)
{
	return "Cards/"+namePrefix+"Card"+cardIndex+".png";
}

function randomWhiteCard()
{
	var 	cardIndex=randomNumber(0,whiteCount);
	while(cardsUsed[cardIndex])
	{
		cardIndex=randomNumber(0,whiteCount);
	}
	cardsUsed[cardIndex]=true;
	return cardIndex;
}

function randomBlackCard()
{
	var 	cardIndex=randomNumber(0,blackCount);
	while(blackCardsUsed[cardIndex])
	{
		cardIndex=randomNumber(0,blackCount);
	}
	blackCardsUsed[cardIndex]=true;
	return cardIndex;
}

function addLineBreak()
{
	document.body.appendChild(document.createElement("br"));
}

function clearBody()
{
	while(document.body.firstChild)
	{
		document.body.removeChild(document.body.firstChild);
	}
}

function randomNumber(start,end)
{
	return Math.floor(Math.random()*(end-start)+start);
}
