window.onload = function(){

}
// Save
var save={
	ore:[0,0,0,0],//copper, iron, silver, gold
	wood:[0,0,0,0],//soft, hard, ebony, pearl
	bar:[0,0,0,0],//copper, iron, silver, gold
	plank:[0,0,0,0],//soft, hard. ebony, pearl
	buildings:[0,0,0,0,0,0,0,0,0],//mine, smeltery, lumber yard, sawmill, bar, tavern, brothel, market, bank
	upgrades:[],
};
var save2 = JSON.parse(localStorage.getItem('idleGame2.save'));
if(	localStorage.getItem('idleGame2.save') !== null){//if there is a save
		Object.assign(save,save2);//copies loaded save overtop blank save ensuring all old saves get new save conent/features
		
}
function gameSave(){
	window.localStorage['idleGame2.save'] = JSON.stringify(save);
}


// Timers
var saveTick = window.setInterval(function(){gameSave()},1000);
	updateTick =window.setInterval(function(){updateResources()},1000);


// visual updates
function updateResources(){
	document.getElementById("copperOre").innerHTML=save.ore[0].toLocaleString();
	document.getElementById("ironOre").innerHTML=save.ore[1].toLocaleString();
	document.getElementById("silverOre").innerHTML=save.ore[2].toLocaleString();
	document.getElementById("goldOre").innerHTML=save.ore[3].toLocaleString();
	document.getElementById("copperBar").innerHTML=save.bar[0].toLocaleString();
	document.getElementById("ironBar").innerHTML=save.bar[1].toLocaleString();
	document.getElementById("silverBar").innerHTML=save.bar[2].toLocaleString();
	document.getElementById("goldBar").innerHTML=save.bar[3].toLocaleString();
	document.getElementById("softWood").innerHTML=save.wood[0].toLocaleString();
	document.getElementById("hardWood").innerHTML=save.wood[1].toLocaleString();
	document.getElementById("ebonyWood").innerHTML=save.wood[2].toLocaleString();
	document.getElementById("pearlWood").innerHTML=save.wood[3].toLocaleString();
	document.getElementById("softPlank").innerHTML=save.plank[0].toLocaleString();
	document.getElementById("hardPlank").innerHTML=save.plank[1].toLocaleString();
	document.getElementById("ebonyPlank").innerHTML=save.plank[2].toLocaleString();
	document.getElementById("pearlPlank").innerHTML=save.plank[3].toLocaleString();

}
// Mine
function mine(){
	let result=randomInt(0,99);
	switch(true){
		case result>=0 && result<=39:
			save.ore[0]+=1;
		break;
		case result>=40 && result<=69:
			save.ore[1]+=1;
		break;
		case result>=70 && result<=89:
			save.ore[2]+=1;
		break;
		case result>=90 && result<=99:
			save.ore[3]+=1;
		break;
	}
	updateResources();
}


// code stolen from stackoverflow
function getDigitCount(number) {
  return Math.max(Math.floor(Math.log10(Math.abs(number))), 0) + 1;
}
function getDigit(number, n, fromLeft) {
	const location = fromLeft ? getDigitCount(number) + 1 - n : n;
	return Math.floor((number / Math.pow(10, location - 1)) % 10);
}
function randomInt(min, max){
	return Math.floor((Math.random()*(max-min+1)) + min);
}
