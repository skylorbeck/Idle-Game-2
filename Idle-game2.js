window.onload = function(){
	updateResources();
	updateBuildings();
	updateSmeltPlaneOnStart();
}
// Stop enter button spam
function stopRKey(evt) {
  var evt = (evt) ? evt : ((event) ? event : null);
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
  if (evt.keyCode == 13)  {return false;}
}
document.onkeypress = stopRKey;
// var


// Save
var save={
	ore:[0,0,0,0],//copper, iron, silver, gold
	wood:[0,0,0,0],//soft, hard, ebony, pearl
	bar:[0,0,0,0],//copper, iron, silver, gold
	plank:[0,0,0,0],//soft, hard. ebony, pearl
	buildings:[0,0,0,0,0,0,0,0,0],//mine, smeltery, lumber yard, sawmill, tavern, hostel, brothel, market, bank
	upgrades:[],
	smeltProgress:[0,0,0,0],//c,i,s,g
	planeProgress:[0,0,0,0],//s,h,e,p
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
function updateBuildings(){
	document.getElementById("mineCount").innerHTML=save.buildings[0].toLocaleString();
	document.getElementById("refineryCount").innerHTML=save.buildings[1].toLocaleString();
	document.getElementById("yardCount").innerHTML=save.buildings[2].toLocaleString();
	document.getElementById("sawCount").innerHTML=save.buildings[3].toLocaleString();
	document.getElementById("tavernCount").innerHTML=save.buildings[4].toLocaleString();
	document.getElementById("hostelCount").innerHTML=save.buildings[5].toLocaleString();
	document.getElementById("brothelCount").innerHTML=save.buildings[6].toLocaleString();
	document.getElementById("marketCount").innerHTML=save.buildings[7].toLocaleString();

}
function updateSmeltProgress(id){
	switch(true){
		case id==0:
			switch(true){
				case save.smeltProgress[0]==1:
					unlockItem("smeltProgress00");
				break;
				case save.smeltProgress[0]==2:
					unlockItem("smeltProgress00");
					unlockItem("smeltProgress01");
				break;
				case save.smeltProgress[0]==3:
					unlockItem("smeltProgress00");
					unlockItem("smeltProgress01");
					unlockItem("smeltProgress02");
				break;
				case save.smeltProgress[0]==4:
					unlockItem("smeltProgress00");
					unlockItem("smeltProgress01");
					unlockItem("smeltProgress02");
					unlockItem("smeltProgress03");
				break;
				case save.smeltProgress[0]>=5:
					lockItem("smeltProgress00");
					lockItem("smeltProgress01");
					lockItem("smeltProgress02");
					lockItem("smeltProgress03");
					save.smeltProgress[id]=0;
				break;
			}
		break;
		case id==1:
			switch(true){
				case save.smeltProgress[1]==1:
					unlockItem("smeltProgress10");
				break;
				case save.smeltProgress[1]==2:
					unlockItem("smeltProgress10");
					unlockItem("smeltProgress11");
				break;
				case save.smeltProgress[1]==3:
					unlockItem("smeltProgress10");
					unlockItem("smeltProgress11");
					unlockItem("smeltProgress12");
				break;
				case save.smeltProgress[1]==4:
					unlockItem("smeltProgress10");
					unlockItem("smeltProgress11");
					unlockItem("smeltProgress12");
					unlockItem("smeltProgress13");
				break;
				case save.smeltProgress[1]>=5:
					lockItem("smeltProgress10");
					lockItem("smeltProgress11");
					lockItem("smeltProgress12");
					lockItem("smeltProgress13");
					save.smeltProgress[id]=0;
				break;
			}
		break;
		case id==2:
			switch(true){
				case save.smeltProgress[2]==1:
					unlockItem("smeltProgress20");
				break;
				case save.smeltProgress[2]==2:
					unlockItem("smeltProgress20");
					unlockItem("smeltProgress21");
				break;
				case save.smeltProgress[2]==3:
					unlockItem("smeltProgress20");
					unlockItem("smeltProgress21");
					unlockItem("smeltProgress22");
				break;
				case save.smeltProgress[2]==4:
					unlockItem("smeltProgress20");
					unlockItem("smeltProgress21");
					unlockItem("smeltProgress22");
					unlockItem("smeltProgress23");
				break;
				case save.smeltProgress[2]>=5:
					lockItem("smeltProgress20");
					lockItem("smeltProgress21");
					lockItem("smeltProgress22");
					lockItem("smeltProgress23");
					save.smeltProgress[id]=0;
				break;
			}
		break;
		case id==3:
			switch(true){
				case save.smeltProgress[3]==1:
					unlockItem("smeltProgress30");
				break;
				case save.smeltProgress[3]==2:
					unlockItem("smeltProgress30");
					unlockItem("smeltProgress31");
				break;
				case save.smeltProgress[3]==3:
					unlockItem("smeltProgress30");
					unlockItem("smeltProgress31");
					unlockItem("smeltProgress32");
				break;
				case save.smeltProgress[3]==4:
					unlockItem("smeltProgress30");
					unlockItem("smeltProgress31");
					unlockItem("smeltProgress32");
					unlockItem("smeltProgress33");
				break;
				case save.smeltProgress[3]>=5:
					lockItem("smeltProgress30");
					lockItem("smeltProgress31");
					lockItem("smeltProgress32");
					lockItem("smeltProgress33");
					save.smeltProgress[id]=0;
				break;
			}
		break;
	}
}
function updatePlaneProgress(id){
	switch(true){
		case id==0:
			switch(true){
				case save.planeProgress[0]==1:
					unlockItem("planeProgress00");
				break;
				case save.planeProgress[0]==2:
					unlockItem("planeProgress00");
					unlockItem("planeProgress01");
				break;
				case save.planeProgress[0]==3:
					unlockItem("planeProgress00");
					unlockItem("planeProgress01");
					unlockItem("planeProgress02");
				break;
				case save.planeProgress[0]==4:
					unlockItem("planeProgress00");
					unlockItem("planeProgress01");
					unlockItem("planeProgress02");
					unlockItem("planeProgress03");
				break;
				case save.planeProgress[0]>=5:
					lockItem("planeProgress00");
					lockItem("planeProgress01");
					lockItem("planeProgress02");
					lockItem("planeProgress03");
					save.planeProgress[id]=0;
				break;
			}
		break;
		case id==1:
			switch(true){
				case save.planeProgress[1]==1:
					unlockItem("planeProgress10");
				break;
				case save.planeProgress[1]==2:
					unlockItem("planeProgress10");
					unlockItem("planeProgress11");
				break;
				case save.planeProgress[1]==3:
					unlockItem("planeProgress10");
					unlockItem("planeProgress11");
					unlockItem("planeProgress12");
				break;
				case save.planeProgress[1]==4:
					unlockItem("planeProgress10");
					unlockItem("planeProgress11");
					unlockItem("planeProgress12");
					unlockItem("planeProgress13");
				break;
				case save.planeProgress[1]>=5:
					lockItem("planeProgress10");
					lockItem("planeProgress11");
					lockItem("planeProgress12");
					lockItem("planeProgress13");
					save.planeProgress[id]=0;
				break;
			}
		break;
		case id==2:
			switch(true){
				case save.planeProgress[2]==1:
					unlockItem("planeProgress20");
				break;
				case save.planeProgress[2]==2:
					unlockItem("planeProgress20");
					unlockItem("planeProgress21");
				break;
				case save.planeProgress[2]==3:
					unlockItem("planeProgress20");
					unlockItem("planeProgress21");
					unlockItem("planeProgress22");
				break;
				case save.planeProgress[2]==4:
					unlockItem("planeProgress20");
					unlockItem("planeProgress21");
					unlockItem("planeProgress22");
					unlockItem("planeProgress23");
				break;
				case save.planeProgress[2]>=5:
					lockItem("planeProgress20");
					lockItem("planeProgress21");
					lockItem("planeProgress22");
					lockItem("planeProgress23");
					save.planeProgress[id]=0;
				break;
			}
		break;
		case id==3:
			switch(true){
				case save.planeProgress[3]==1:
					unlockItem("planeProgress30");
				break;
				case save.planeProgress[3]==2:
					unlockItem("planeProgress30");
					unlockItem("planeProgress31");
				break;
				case save.planeProgress[3]==3:
					unlockItem("planeProgress30");
					unlockItem("planeProgress31");
					unlockItem("planeProgress32");
				break;
				case save.planeProgress[3]==4:
					unlockItem("planeProgress30");
					unlockItem("planeProgress31");
					unlockItem("planeProgress32");
					unlockItem("planeProgress33");
				break;
				case save.planeProgress[3]>=5:
					lockItem("planeProgress30");
					lockItem("planeProgress31");
					lockItem("planeProgress32");
					lockItem("planeProgress33");
					save.planeProgress[id]=0;
				break;
			}
		break;
	}
}
function updateSmeltPlaneOnStart(){
	updateSmeltProgress(0);
	updateSmeltProgress(1);
	updateSmeltProgress(2);
	updateSmeltProgress(3);
	updatePlaneProgress(0);
	updatePlaneProgress(1);
	updatePlaneProgress(2);
	updatePlaneProgress(3);
}
// Mine
function mine(id){
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
// Chop
function chop(id){
let result=randomInt(0,99);
	switch(true){
		case result>=0 && result<=39:
			save.wood[0]+=1;
		break;
		case result>=40 && result<=69:
			save.wood[1]+=1;
		break;
		case result>=70 && result<=89:
			save.wood[2]+=1;
		break;
		case result>=90 && result<=99:
			save.wood[3]+=1;
		break;
	}
	updateResources();
}
// Smelt
function smelt(id){
	if(save.ore[id]>=2){
		save.smeltProgress[id]+=1;
		if(save.smeltProgress[id]>=5){
			save.bar[id]+=1;
			save.ore[id]-=2;
		}
		updateResources();
		updateSmeltProgress(id);
	}
}
// Plane
function plane(id){
	if(save.wood[id]>=2){
		save.planeProgress[id]+=1;
		if(save.planeProgress[id]>=5){
			save.plank[id]+=4;
			save.wood[id]-=1;
		}
		updateResources();
		updatePlaneProgress(id);
	}
}
// Buildings
function buyBuilding(id){
	switch(true){
		case id==0:
			if(save.bar[0]>=10 && save.plank[0]>=10){
				save.bar[0]-=10;
				save.plank[0]-=10;
				save.buildings[0]+=1;
			}
		break;
		case id==1:
			if(save.bar[0]>=10 && save.plank[0]>=10){
				save.bar[0]-=10;
				save.plank[0]-=10;
				save.buildings[1]+=1;
			}
		break;
		case id==2:
			if(save.bar[0]>=10 && save.plank[0]>=10){
				save.bar[0]-=10;
				save.plank[0]-=10;
				save.buildings[2]+=1;
			}
		break;
		case id==3:
			if(save.bar[0]>=10 && save.plank[0]>=10){
				save.bar[0]-=10;
				save.plank[0]-=10;
				save.buildings[3]+=1;
			}
		break;
		case id==4:
			if(save.bar[0]>=10 && save.plank[0]>=10){
				save.bar[0]-=10;
				save.plank[0]-=10;
				save.buildings[4]+=1;
			}
		break;
		case id==5:
			if(save.bar[0]>=10 && save.plank[0]>=10){
				save.bar[0]-=10;
				save.plank[0]-=10;
				save.buildings[5]+=1;
			}
		break;
		case id==6:
			if(save.bar[0]>=10 && save.plank[0]>=10){
				save.bar[0]-=10;
				save.plank[0]-=10;
				save.buildings[6]+=1;
			}
		break;
		case id==7:
			if(save.bar[0]>=10 && save.plank[0]>=10){
				save.bar[0]-=10;
				save.plank[0]-=10;
				save.buildings[7]+=1;
			}
		break;
		case id==8:
			if(save.bar[0]>=10 && save.plank[0]>=10){
				save.bar[0]-=10;
				save.plank[0]-=10;
				save.buildings[8]+=1;
			}
		break;
	}
	updateBuildings();
}

// lock and unlock
function lockItem(item){
document.getElementById(item).className = document.getElementById(item).className + " locked";
}
function unlockItem(item){
document.getElementById(item).className = document.getElementById(item).className.replace(" locked","");
}

// disable and enable
function disableItem(item){
document.getElementById(item).disabled=true;
}
function enableItem(item){
document.getElementById(item).disabled=false;
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
