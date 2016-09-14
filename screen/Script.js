function start()
{
	setTimeout(actuallyStart,2000);
}
function actuallyStart()
{
	setInterval(update,1000);
}
function update()
{
	var date=new Date();
	setDateSection(date);
	setTimeSection(date);
	setDaySection(date);
}
var dayNames=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
var monthNames=["January","February","March","April","May","June","July","August","September","October","November","December"];
function setDateSection(date)
{
	var output=dayNames[date.getDay()];
	output+=", ";
	output+=monthNames[date.getMonth()];
	output+=" ";
	output+=date.getDate();
	output+=", ";
	output+=date.getFullYear();
	var dateSection=document.getElementById("dateSection");
	dateSection.innerHTML=output;
}
function setTimeSection(date)
{
	var hour=date.getHours();
	var minute=date.getMinutes();
	var am=true;
	if(hour>12)
	{
		am=false;
		hour=hour-12;
	}
	if(minute<10)
	{
		minute="0"+minute;
	}
	var output=hour;
	output+=":";
	output+=minute;
	output+="<font id=\"timeSmallFont\"> ";
	if(am)
	{
		output+="AM";
	}
	else
	{
		output+="PM";
	}
	output+="</font>";
	var timeSection=document.getElementById("timeSection");
	timeSection.innerHTML=output;
}
function setDaySection(date)
{
	var output="Day ";
	if(date.getDate()%2==0)
	{
		output+="2";
	}
	else
	{
		output+="1";
	}
	var daySection=document.getElementById("daySection");
	daySection.innerHTML=output;
}
function fullscreen()
{
	if(document.documentElement.requestFullScreen)
	{
		document.documentElement.requestFullScreen();
	}
	else if(document.documentElement.webkitRequestFullScreen)
	{
		document.documentElement.webkitRequestFullScreen();
	}
	else if(document.documentElement.mozRequestFullScreen)
	{
		document.documentElement.mozRequestFullScreen();
	}
}