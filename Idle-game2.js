window.onload = function(){
	updateAll();
	startTickVar();
	upgradeCheckStart();
	areaCheck();
	updatePostable();
	updateTimeUntilNewQuests()
}
// Stop enter button spam
function stopRKey(evt) {
  var evt = (evt) ? evt : ((event) ? event : null);
  var node = (evt.target) ? evt.target : ((evt.srcElement) ? evt.srcElement : null);
  if (evt.keyCode == 13)  {return false;}
}
document.onkeypress = stopRKey;
// var
var tickVar=[1000,1000,1000,1000,1000,1000,1000,1000,1000];
	
// Save
var save={
	ore:[0,0,0,0],//copper, iron, silver, gold
	oreTotal:[0,0,0,0],
	wood:[0,0,0,0],//soft, hard, ebony, pearl
	woodTotal:[0,0,0,0],
	bar:[0,0,0,0],//copper, iron, silver, gold
	barTotal:[0,0,0,0],
	plank:[0,0,0,0],//soft, hard. ebony, pearl
	plankTotal:[0,0,0,0],
	buildings:[0,0,0,0,0,0,0,0,0,0],//mine, smeltery, lumber yard, sawmill, tavern, blacksmith, woodshop, market, bank, lab
	smeltProgress:[0,0,0,0],//c,i,s,g
	planeProgress:[0,0,0,0],//s,h,e,p
	mineProgress:0,
	chopProgress:0,
	oreUnlocked:[false,false,false],//iron,silver,gold
	woodUnlocked:[false,false,false],//hard,ebony,pearl
	buildingsUnlocked:[false,false,false,false,false,false,false,false,false,false],//mine, smeltery, lumber yard, sawmill, tavern, blacksmith, woodshop, market, bank, lab
	mineUpgraded:[false,false,false],
	refineryUpgraded:[false,false,false],
	yardUpgraded:[false,false,false],
	sawUpgraded:[false,false,false],
	labUpgraded:[false,false,false],
	thinkProgress:0,
	thinkPoints:0,
	thinkPointsTotal:0,
	townUnlocked:false,
	thinkOneOffs:[false,false],
	chopOneOffs:[false,false],
	mineOneOffs:[false,false],
	planeOneOffs:[false,false,false,false,false,false,false,false],
	smeltOneOffs:[false,false,false,false,false,false,false,false],
	location:0,
	quest:[],
	onQuest:false,
	townXP:0,
	questDeleted:[false,false,false,false],
	questRefreshTime:300,
};
var quests=[]//type,time,cost,adventurers,xp
if(	localStorage.getItem('idleGame2.quests') !== null){
	quests=JSON.parse(localStorage.getItem('idleGame2.quests'));
};
var save3 = Object.assign({}, save); //JSON.parse(JSON.stringify(save));
var save2 = JSON.parse(localStorage.getItem('idleGame2.save'));
if(	localStorage.getItem('idleGame2.save') !== null){//if there is a save
		Object.assign(save,save2);//copies loaded save overtop blank save ensuring all old saves get new save conent/features
}
// Settings
var PColor=0;
if(	localStorage.getItem('idleGame2.PColor') !== null){
	PColor=JSON.parse(localStorage.getItem('idleGame2.PColor'));
};

function gameSave(){
	window.localStorage['idleGame2.save'] = JSON.stringify(save);
	window.localStorage['idleGame2.quests'] = JSON.stringify(quests);
}


// Timers
var saveTick = window.setInterval(function(){gameSave()},1000);
	upgradeCheckTick = window.setInterval(function(){upgradeCheck();},500);
	// genQuestTick=window.setInterval(function(){genAllAdventures();},300000);
	// updateTick =window.setInterval(function(){updateThinkPoints();},1000);
	questTimeRemainTick=window.setInterval(function(){updateCurrentAdventureTime();updateTimeUntilNewQuests();},1000);
	
function buildingTick(id){
	window.setTimeout(function(){buildingCheck(id);updateTickVar(id);},tickVar[id]);
}
function updateTickVar(id){
	tickVar[id]=(1000/save.buildings[id]);
	// console.log(tickVar);
	buildingTick(id);
}
function startTickVar(){
	updateTickVar(0);
	updateTickVar(1);
	updateTickVar(2);
	updateTickVar(3);
	updateTickVar(9);
}



function areaCheck(){
	switch(save.location){
		case 0:
			navigateTo(0);
		break;
		case 1:
			navigateTo(1);
		break; 
	}
}
// visual updates
function updateResources(id){
	switch(true){
		case save.location==1:
		break;
		case id==5:
			if(save.ore[0]>=1000000){
				document.getElementById("copperOre").innerHTML=save.ore[0].toExponential(2)
			}else{document.getElementById("copperOre").innerHTML=save.ore[0].toLocaleString();};
			if(save.ore[1]>=1000000){
				document.getElementById("ironOre").innerHTML=save.ore[1].toExponential(2)
			}else{document.getElementById("ironOre").innerHTML=save.ore[1].toLocaleString();};
			if(save.ore[2]>=1000000){
				document.getElementById("silverOre").innerHTML=save.ore[2].toExponential(2)
			}else{document.getElementById("silverOre").innerHTML=save.ore[2].toLocaleString();};
			if(save.ore[3]>=1000000){
				document.getElementById("goldOre").innerHTML=save.ore[3].toExponential(2)
			}else{document.getElementById("goldOre").innerHTML=save.ore[3].toLocaleString();};
		break;
		case id==6:
			if(save.wood[0]>=1000000){
				document.getElementById("softWood").innerHTML=save.wood[0].toExponential(2)
			}else{document.getElementById("softWood").innerHTML=save.wood[0].toLocaleString();};
			if(save.wood[1]>=1000000){
				document.getElementById("hardWood").innerHTML=save.wood[1].toExponential(2)
			}else{document.getElementById("hardWood").innerHTML=save.wood[1].toLocaleString();};
			if(save.wood[2]>=1000000){
				document.getElementById("ebonyWood").innerHTML=save.wood[2].toExponential(2)
			}else{document.getElementById("ebonyWood").innerHTML=save.wood[2].toLocaleString();};
			if(save.wood[3]>=1000000){
				document.getElementById("pearlWood").innerHTML=save.wood[3].toExponential(2)
			}else{document.getElementById("pearlWood").innerHTML=save.wood[3].toLocaleString();};
		break;
		case id==00:
			if(save.ore[0]>=1000000){
				document.getElementById("copperOre").innerHTML=save.ore[0].toExponential(2)
			}else{document.getElementById("copperOre").innerHTML=save.ore[0].toLocaleString();};
			if(save.bar[0]>=1000000){
				document.getElementById("copperBar").innerHTML=save.bar[0].toExponential(2)
			}else{document.getElementById("copperBar").innerHTML=save.bar[0].toLocaleString();};
		break;
		case id==01:
			if(save.ore[1]>=1000000){
				document.getElementById("ironOre").innerHTML=save.ore[1].toExponential(2)
			}else{document.getElementById("ironOre").innerHTML=save.ore[1].toLocaleString();};
			if(save.bar[1]>=1000000){
				document.getElementById("ironBar").innerHTML=save.bar[1].toExponential(2)
			}else{document.getElementById("ironBar").innerHTML=save.bar[1].toLocaleString();};
		break;
		case id==02:
			if(save.ore[2]>=1000000){
				document.getElementById("silverOre").innerHTML=save.ore[2].toExponential(2)
			}else{document.getElementById("silverOre").innerHTML=save.ore[2].toLocaleString();};
			if(save.bar[2]>=1000000){
				document.getElementById("silverBar").innerHTML=save.bar[2].toExponential(2)
			}else{document.getElementById("silverBar").innerHTML=save.bar[2].toLocaleString();};
		break;
		case id==03:
			if(save.ore[3]>=1000000){
				document.getElementById("goldOre").innerHTML=save.ore[3].toExponential(2)
			}else{document.getElementById("goldOre").innerHTML=save.ore[3].toLocaleString();};
			if(save.bar[3]>=1000000){
				document.getElementById("goldBar").innerHTML=save.bar[3].toExponential(2)
			}else{document.getElementById("goldBar").innerHTML=save.bar[3].toLocaleString();};
		break;
		case id==10:
			if(save.wood[0]>=1000000){
				document.getElementById("softWood").innerHTML=save.wood[0].toExponential(2)
			}else{document.getElementById("softWood").innerHTML=save.wood[0].toLocaleString();};
			if(save.plank[0]>=1000000){
				document.getElementById("softPlank").innerHTML=save.plank[0].toExponential(2)
			}else{document.getElementById("softPlank").innerHTML=save.plank[0].toLocaleString();};
		break;
		case id==11:
			if(save.wood[1]>=1000000){
				document.getElementById("hardWood").innerHTML=save.wood[1].toExponential(2)
			}else{document.getElementById("hardWood").innerHTML=save.wood[1].toLocaleString();};
			if(save.plank[1]>=1000000){
				document.getElementById("hardPlank").innerHTML=save.plank[1].toExponential(2)
			}else{document.getElementById("hardPlank").innerHTML=save.plank[1].toLocaleString();};
		break;
		case id==12:
			if(save.wood[2]>=1000000){
				document.getElementById("ebonyWood").innerHTML=save.wood[2].toExponential(2)
			}else{document.getElementById("ebonyWood").innerHTML=save.wood[2].toLocaleString();};
			if(save.plank[2]>=1000000){
				document.getElementById("ebonyPlank").innerHTML=save.plank[2].toExponential(2)
			}else{document.getElementById("ebonyPlank").innerHTML=save.plank[2].toLocaleString();};
		break;
		case id==13:
			if(save.wood[3]>=1000000){
				document.getElementById("pearlWood").innerHTML=save.wood[3].toExponential(2)
			}else{document.getElementById("pearlWood").innerHTML=save.wood[3].toLocaleString();};
			if(save.plank[3]>=1000000){
				document.getElementById("pearlPlank").innerHTML=save.plank[3].toExponential(2)
			}else{document.getElementById("pearlPlank").innerHTML=save.plank[3].toLocaleString();};
		break;
	}
}
function updateBuildings(){
	document.getElementById("mineCount").innerHTML=save.buildings[0].toLocaleString();
	document.getElementById("refineryCount").innerHTML=save.buildings[1].toLocaleString();
	document.getElementById("yardCount").innerHTML=save.buildings[2].toLocaleString();
	document.getElementById("sawCount").innerHTML=save.buildings[3].toLocaleString();
	document.getElementById("tavernCount").innerHTML=save.buildings[4].toLocaleString();
	document.getElementById("blacksmithCount").innerHTML=save.buildings[5].toLocaleString();
	document.getElementById("woodshopCount").innerHTML=save.buildings[6].toLocaleString();
	document.getElementById("marketCount").innerHTML=save.buildings[7].toLocaleString();
	document.getElementById("bankCount").innerHTML=save.buildings[8].toLocaleString();
	document.getElementById("labCount").innerHTML=save.buildings[9].toLocaleString();
	// document.getElementById("tavernCountT").innerHTML=save.buildings[4].toLocaleString();
	// document.getElementById("blacksmithCountT").innerHTML=save.buildings[5].toLocaleString();
	// document.getElementById("woodshopCountT").innerHTML=save.buildings[6].toLocaleString();
	// document.getElementById("marketCountT").innerHTML=save.buildings[7].toLocaleString();
	// document.getElementById("bankCountT").innerHTML=save.buildings[8].toLocaleString();
}
var quest0Targets=["Boars","Tigers","Bears","Wolves","Bandits","Thugs","Slimes","Spiders","Zombies","Skeletons","Giant Rats","Gorillas","Eagles","Pythons"];
var quest1Targets=["Cave","Fort","Dungeon","Castle","Camp","Cavern","Crypt","Burrows","Pits","Tunnels","Labyrinth","Catacombs","Delves","Tombs","Quarters","Vault","Grotto","Keep","Tower"];
var quest2Targets=["Golda","Cristie","Annika","Elmira","Kathey","Loreta","Iluminada","Wanda","Olevia","Delana","Tammy","Janetta","Abigail","Corinna","Tandra","Providencia","Ricarda","Natashia","Berenice","Lynsey","Jodee","Alejandrina","Larhonda","Eleanora","Shanae","Cassie","Marylouise","Pennie","Gracie","Nerissa","Luanna","Anissa","Agustina","Donnette","Paulita","Meghan","Anh","Shellie","Teresa","Letty","Kimber","Carlie","Joi","Adell","Elfreda","Vada","Riva","Caren","Hans","Sonny","Sherman","Alex","Titus","Jordon","Dewitt","Jamal","Kirby","Monte","Frederick","Shad","Blair","Ambrose","Clifford","Jonas","Wilford","Bob","Mckinley","Kyle","Ted","Conrad","Andy","Long","Nathaniel","Ray","Alexis","Boyce","Brant","Gerry","Humberto","Kristopher","Tom","Augustus","Nicky","Ty","Gordon","Esteban","Reuben","Adolfo","Dylan","Gary","Jerrold","Sterling","Quinn","Modesto","Ethan","Arlie","Cleo","Pearla","Sliver","Espen","Alfonz","Emmi"]
var quest3Targets=["a pair of earrings","a slipper","a blowdryer","a pair of tongs","a sheet of paper","a rock","a magnet","a toy car","some milk","a fork","a bag","a toothpick","a plate","some eye liner","a ring","a lighter","a safety pin","a squirrel","a shawl","a belt","a cement stone","a candy bar","a carrot","a coffee pot","a pocketknife","a bottle cap","a dagger","a bottle of ink","a knife","a box of tissues","a spool of string","an incense holder","a toy soldier","a nail filer","a wrench","some food","a rubber duck","a pair of knitting needles","a candy wrapper","a zipper","a paintbrush","a hair tie","a pair of socks","a salt shaker","a wallet","an egg timer","a pocketwatch","an empty bottle","a lime","a coffee mug","a butter knife","a soccer ball","a scallop shell","a necklace","a bottle of glue","a candlestick","a plastic fork","a carton of ice cream","a matchbook","a needle","a plush dinosaur","a pair of sunglasses","a lamp","a bag of popcorn","a map","a jar of jam","a tomato","a picture frame","a pen","a bonesaw","a box of crayons","a wine glass","a sponge","a flashlight","a lamp shade","a pillow","a can of beans"];
var quest4Targets=["mushrooms","herbs","leaves","berries","sticks","snails","butterflies","ants","bones","tusks","horns","claws","shells","fruit","beetles"]
var questAdj=["Angry","Fierce","Grumpy","Helpless","Itchy","Jealous","Lazy","Mysterious","Nervous","Obnoxious","Pitiful","Repulsive","Scary","Vast","Immense","Enormous","Spacious","Exorbitant","Gross","Foul","Disturbed","Screeching","Horrible","Defiant","Puzzling","Tranquil","Gamy","Agonizing","Roasted","Damaged","Aluring","Pale","Lewd","Uppity","Demonic","Mighty","Flawless"];

function updateCurrentAdventure(){
	switch(save.quest[0]){
		case 0://kill X of Y
			document.getElementById("adventureCurrentTitle").innerHTML="Kill "+save.quest[6]+" "+quest0Targets[save.quest[5]];
		break;
		case 1://clear X location
			document.getElementById("adventureCurrentTitle").innerHTML="Clear the "+questAdj[save.quest[6]]+" "+quest1Targets[save.quest[5]];
		break;
		case 2://kill X target
			document.getElementById("adventureCurrentTitle").innerHTML="Kill "+quest2Targets[save.quest[5]]+" the "+questAdj[save.quest[6]];
		break;
		case 3://Get X object
			document.getElementById("adventureCurrentTitle").innerHTML="Obtain "+quest3Targets[save.quest[5]];
		break;
		case 4://Gather X amount of things
			document.getElementById("adventureCurrentTitle").innerHTML="Gather "+save.quest[6]+" "+quest4Targets[save.quest[5]];
		break;
	}
	document.getElementById("adventureCurrentAdv").innerHTML="Adventurers Questing: "+"<span class=highlightedText>"+save.quest[1]+"</span>";
	let m=Math.floor(save.quest[2]/60);
	let s=save.quest[2]-(m*60);
	document.getElementById("adventureCurrentTimeRemain").innerHTML="Time Remaining: "+"<span class=highlightedText>"+m+":"+s.toLocaleString(undefined,{minimumIntegerDigits: 2})+"</span>";
	document.getElementById("adventureCurrentXp").innerHTML="XP Reward: "+"<span class=highlightedText>"+save.quest[4]+"</span>";
}
function updateAdventures(slot){
	let quest=quests[slot];
	if(save.questDeleted[slot]==true){document.getElementById("adventure"+slot+"Type").innerHTML="---"}else{
		switch(quest.type){
			case 0://kill X of Y
				document.getElementById("adventure"+slot+"Type").innerHTML="Kill "+quest.amt+" "+quest0Targets[quest.trgt];
			break;
			case 1://clear X location
				document.getElementById("adventure"+slot+"Type").innerHTML="Clear the "+questAdj[quest.amt]+" "+quest1Targets[quest.trgt];
			break;
			case 2://kill X target
				document.getElementById("adventure"+slot+"Type").innerHTML="Kill "+quest2Targets[quest.trgt]+" the "+questAdj[quest.amt];
			break;
			case 3://Get X object
				document.getElementById("adventure"+slot+"Type").innerHTML="Obtain "+quest3Targets[quest.trgt];
			break;
			case 4://Gather X amount of things
				document.getElementById("adventure"+slot+"Type").innerHTML="Gather "+quest.amt+" "+quest4Targets[quest.trgt];
			break;
		}
		document.getElementById("adventure"+slot+"Time").innerHTML="Time="+quest.time;
		document.getElementById("adventure"+slot+"Cost").innerHTML="Cost="+quest.cost;
		document.getElementById("adventure"+slot+"Adv").innerHTML="Adv="+quest.adv;
		document.getElementById("adventure"+slot+"Xp").innerHTML="Xp="+quest.xp;
	}
}
function updateCurrentAdventureTime(){
	let m=Math.floor(save.quest[2]/60);
	let s=save.quest[2]-(m*60);
	switch(true){
		case save.quest[2]>=1:
			save.quest[2]--;
			document.getElementById("adventureCurrentTimeRemain").innerHTML="Time Remaining: "+"<span class=highlightedText>"+m+":"+s.toLocaleString(undefined,{minimumIntegerDigits: 2})+"</span>";
		break;
		case save.quest[2]==0 && save.onQuest==true:
			questComplete();
		break;
		case save.quest[2]==0:
			document.getElementById("adventureCurrentTimeRemain").innerHTML="Time Remaining: <span class=highlightedText>Complete</span>"
			updatePostable();
		break;
		
	}
}
function updateTimeUntilNewQuests(){
	let m=Math.floor(save.questRefreshTime/60);
	let s=save.questRefreshTime-(m*60);
	switch(save.questRefreshTime){
		case 0:
			genAllAdventures();
			save.questRefreshTime=300;
		default:
			save.questRefreshTime--;
			document.getElementById("adventureTimeUntilNew").innerHTML="Time until new quests: "+m+":"+s.toLocaleString(undefined,{minimumIntegerDigits: 2});
		break;
	}
	
}
function updateAllAdventures(){
	let x;
	for (x=0;x<4;x++){
		updateAdventures(x);
	}
}
function updatePostable(){
	switch(save.onQuest){
		case true:
			for (x=0;x<4;x++){
				disableItem("adventure"+x+"Button");
			}
		break;
		case false:
			for (x=0;x<4;x++){
				if(save.questDeleted[x]==false){
					enableItem("adventure"+x+"Button");
				}
			}
		break;
	}
}
function updateSpeed(){
	let a=document.getElementById("mineSpeed");
	switch(true){
		case save.mineUpgraded[2]==true:
			a.innerHTML=((0.2*save.buildings[0])*4).toFixed(2)+" Ore/sec";
		break;
		case save.mineUpgraded[1]==true:
			a.innerHTML=((0.2*save.buildings[0])*3).toFixed(2)+" Ore/sec";
		break;
		case save.mineUpgraded[0]==true:
			a.innerHTML=((0.2*save.buildings[0])*2).toFixed(2)+" Ore/sec";
		break;
		default:
			a.innerHTML=(0.2*save.buildings[0]).toFixed(2)+" Ore/sec";
		break;
	}
	let b=document.getElementById("chopSpeed");
	switch(true){
		case save.yardUpgraded[2]==true:
			b.innerHTML=((0.2*save.buildings[2])*4).toFixed(2)+" Wood/sec";
		break;
		case save.yardUpgraded[1]==true:
			b.innerHTML=((0.2*save.buildings[2])*3).toFixed(2)+" Wood/sec";
		break;
		case save.yardUpgraded[2]==true:
			b.innerHTML=((0.2*save.buildings[2])*2).toFixed(2)+" Wood/sec";
		break;
		default:
			b.innerHTML=(0.2*save.buildings[2]).toFixed(2)+" Wood/sec";
		break;
	}
	let c=document.getElementById("thinkSpeed");
	switch(true){
		case save.labUpgraded[2]==true:
			c.innerHTML=(((1/13)*save.buildings[9])*4).toFixed(2)+" TP/sec";
		break;
		case save.labUpgraded[1]==true:
			c.innerHTML=(((1/13)*save.buildings[9])*3).toFixed(2)+" TP/sec";
		break;
		case save.labUpgraded[0]==true:
			c.innerHTML=(((1/13)*save.buildings[9])*2).toFixed(2)+" TP/sec";
		break;
		default:
			c.innerHTML=((1/13)*save.buildings[9]).toFixed(2)+" TP/sec";
		break;
	}
	let d=document.getElementById("smeltInfo")
	switch(true){
		case save.refineryUpgraded[0]==true:
			d.innerHTML="2:1 | "+(0.2*save.buildings[1]).toFixed(2)+" Bar/s/Ea";
		break;
		case save.buildings[1]>=1:
			d.innerHTML="2:1 | "+(0.2*save.buildings[1]).toFixed(2)+" Bar/sec";
		break;
		default:
			d.innerHTML="2:1";
		break;
	}
	let e=document.getElementById("planeInfo")
	switch(true){
		case save.sawUpgraded[0]==true:
			e.innerHTML="2:4 | "+((0.2*save.buildings[3]).toFixed(2)*2)+" Plank/s/Ea";
		break;
		case save.buildings[3]>=1:
			e.innerHTML="2:4 | "+((0.2*save.buildings[3]).toFixed(2)*2)+" Plank/sec";
		break;
		default:
			e.innerHTML="2:4";
		break;
	}
}
function updateBuildingCost(id){
	switch(id){
		case 0:
			switch(true){
				case save.buildings[0]>=0 && save.buildings[0]<=9:
					document.getElementById("mineInfo").innerHTML=parseInt(2+save.buildings[0],10)+"x<span class=copper>▰</span>, " + parseInt(8+save.buildings[0]*4,10)+"x<span class=soft>▬</span>";
				break;
				case save.buildings[0]>=10 && save.buildings[0]<=19:
					document.getElementById("mineInfo").innerHTML=parseInt(save.buildings[0]-8,10)+"x<span class=iron>▰</span>, "+parseInt(save.buildings[0]*4-32,10)+"x<span class=hard>▬</span>";
				break;
				case save.buildings[0]>=20 && save.buildings[0]<=29:
					document.getElementById("mineInfo").innerHTML=parseInt(2+save.buildings[0]-20,10)+"x<span class=silver>▰</span>, "+parseInt(save.buildings[0]*4-72,10)+"x<span class=ebony>▬</span>";
				break;
				case save.buildings[0]>=30 && save.buildings[0]<=39:
					document.getElementById("mineInfo").innerHTML=parseInt(save.buildings[0]-28,10)+"x<span class=gold>▰</span>, "+parseInt(save.buildings[0]*4-112,10)+"x<span class=pearl>▬</span>";
				break;
				case save.buildings[0]>=40:
					document.getElementById("mineInfo").innerHTML="Max Reached";
					disableItem("buyMine");
				break;
			}
		break;
		case 1:
			switch(true){
				case save.buildings[1]>=0 && save.buildings[1]<=9:
					document.getElementById("refineryInfo").innerHTML=parseInt(2+save.buildings[1],10)+"x<span class=copper>▰</span>, " + parseInt(8+save.buildings[1]*4,10)+"x<span class=soft>▬</span>";
				break;
				case save.buildings[1]>=10 && save.buildings[1]<=19:
					document.getElementById("refineryInfo").innerHTML=parseInt(save.buildings[1]-8,10)+"x<span class=iron>▰</span>, "+parseInt(save.buildings[1]*4-32,10)+"x<span class=hard>▬</span>";
				break;
				case save.buildings[1]>=20 && save.buildings[1]<=29:
					document.getElementById("refineryInfo").innerHTML=parseInt(2+save.buildings[1]-20,10)+"x<span class=silver>▰</span>, "+parseInt(save.buildings[1]*4-72,10)+"x<span class=ebony>▬</span>";
				break;
				case save.buildings[1]>=30 && save.buildings[0]<=39:
					document.getElementById("refineryInfo").innerHTML=parseInt(save.buildings[1]-28,10)+"x<span class=gold>▰</span>, "+parseInt(save.buildings[1]*4-112,10)+"x<span class=pearl>▬</span>";
				break;
				case save.buildings[1]>=40:
					document.getElementById("refineryInfo").innerHTML="Max Reached";
					disableItem("buyRefinery");
				break;
			}
		break;
		case 2:
			switch(true){
				case save.buildings[2]>=0 && save.buildings[2]<=9:
					document.getElementById("yardInfo").innerHTML=parseInt(2+save.buildings[2],10)+"x<span class=copper>▰</span>, " + parseInt(8+save.buildings[2]*4,10)+"x<span class=soft>▬</span>";
				break;
				case save.buildings[2]>=10 && save.buildings[2]<=19:
					document.getElementById("yardInfo").innerHTML=parseInt(save.buildings[2]-8,10)+"x<span class=iron>▰</span>, "+parseInt(save.buildings[2]*4-32,10)+"x<span class=hard>▬</span>";
				break;
				case save.buildings[2]>=20 && save.buildings[2]<=29:
					document.getElementById("yardInfo").innerHTML=parseInt(2+save.buildings[2]-20,10)+"x<span class=silver>▰</span>, "+parseInt(save.buildings[2]*4-72,10)+"x<span class=ebony>▬</span>";
				break;
				case save.buildings[2]>=30 && save.buildings[0]<=39:
					document.getElementById("yardInfo").innerHTML=parseInt(save.buildings[2]-28,10)+"x<span class=gold>▰</span>, "+parseInt(save.buildings[2]*4-112,10)+"x<span class=pearl>▬</span>";
				break;
				case save.buildings[2]>=40:
					document.getElementById("yardInfo").innerHTML="Max Reached";
					disableItem("buyYard");
				break;
			}
		break;
		case 3:
			switch(true){
				case save.buildings[3]>=0 && save.buildings[3]<=9:
					document.getElementById("sawInfo").innerHTML=parseInt(2+save.buildings[3],10)+"x<span class=copper>▰</span>, " + parseInt(8+save.buildings[3]*4,10)+"x<span class=soft>▬</span>";
				break;
				case save.buildings[3]>=10 && save.buildings[3]<=19:
					document.getElementById("sawInfo").innerHTML=parseInt(save.buildings[3]-8,10)+"x<span class=iron>▰</span>, "+parseInt(save.buildings[3]*4-32,10)+"x<span class=hard>▬</span>";
				break;
				case save.buildings[3]>=20 && save.buildings[3]<=29:
					document.getElementById("sawInfo").innerHTML=parseInt(2+save.buildings[3]-20,10)+"x<span class=silver>▰</span>, "+parseInt(save.buildings[3]*4-72,10)+"x<span class=ebony>▬</span>";
				break;
				case save.buildings[3]>=30 && save.buildings[0]<=39:
					document.getElementById("sawInfo").innerHTML=parseInt(save.buildings[3]-28,10)+"x<span class=gold>▰</span>, "+parseInt(save.buildings[3]*4-112,10)+"x<span class=pearl>▬</span>";
				break;
				case save.buildings[3]>=40:
					document.getElementById("sawInfo").innerHTML="Max Reached";
					disableItem("buySaw");
				break;
			}
		break;
		case 4:
			switch(true){
				case save.buildings[4]>=0 && save.buildings[4]<=9:
					document.getElementById("tavernInfo").innerHTML=parseInt(2+save.buildings[4],10)+"x<span class=copper>▰</span>, " + parseInt(8+save.buildings[4]*4,10)+"x<span class=soft>▬</span>";
				break;
				case save.buildings[4]>=10 && save.buildings[4]<=19:
					document.getElementById("tavernInfo").innerHTML=parseInt(save.buildings[4]-8,10)+"x<span class=iron>▰</span>, "+parseInt(save.buildings[4]*4-32,10)+"x<span class=hard>▬</span>";
				break;
				case save.buildings[4]>=20 && save.buildings[4]<=29:
					document.getElementById("tavernInfo").innerHTML=parseInt(2+save.buildings[4]-20,10)+"x<span class=silver>▰</span>, "+parseInt(save.buildings[4]*4-72,10)+"x<span class=ebony>▬</span>";
				break;
				case save.buildings[4]>=30 && save.buildings[0]<=39:
					document.getElementById("tavernInfo").innerHTML=parseInt(save.buildings[4]-28,10)+"x<span class=gold>▰</span>, "+parseInt(save.buildings[4]*4-112,10)+"x<span class=pearl>▬</span>";
				break;
				case save.buildings[4]>=40:
					document.getElementById("tavernInfo").innerHTML="Max Reached";
					disableItem("buyTavern");
				break;
			}
		break;
		case 5:
			switch(true){
				case save.buildings[5]>=0 && save.buildings[5]<=9:
					document.getElementById("blacksmithInfo").innerHTML=parseInt(2+save.buildings[5],10)+"x<span class=copper>▰</span>, " + parseInt(8+save.buildings[5]*4,10)+"x<span class=soft>▬</span>";
				break;
				case save.buildings[5]>=10 && save.buildings[5]<=19:
					document.getElementById("blacksmithInfo").innerHTML=parseInt(save.buildings[5]-8,10)+"x<span class=iron>▰</span>, "+parseInt(save.buildings[5]*4-32,10)+"x<span class=hard>▬</span>";
				break;
				case save.buildings[5]>=20 && save.buildings[5]<=29:
					document.getElementById("blacksmithInfo").innerHTML=parseInt(2+save.buildings[5]-20,10)+"x<span class=silver>▰</span>, "+parseInt(save.buildings[5]*4-72,10)+"x<span class=ebony>▬</span>";
				break;
				case save.buildings[5]>=30 && save.buildings[0]<=39:
					document.getElementById("blacksmithInfo").innerHTML=parseInt(save.buildings[5]-28,10)+"x<span class=gold>▰</span>, "+parseInt(save.buildings[5]*4-112,10)+"x<span class=pearl>▬</span>";
				break;
				case save.buildings[5]>=40:
					document.getElementById("blacksmithInfo").innerHTML="Max Reached";
					disableItem("buyBlacksmith");
				break;
			}
		break;
		case 6:
			switch(true){
				case save.buildings[6]>=0 && save.buildings[6]<=9:
					document.getElementById("woodshopInfo").innerHTML=parseInt(2+save.buildings[6],10)+"x<span class=copper>▰</span>, " + parseInt(8+save.buildings[6]*4,10)+"x<span class=soft>▬</span>";
				break;
				case save.buildings[6]>=10 && save.buildings[6]<=19:
					document.getElementById("woodshopInfo").innerHTML=parseInt(save.buildings[6]-8,10)+"x<span class=iron>▰</span>, "+parseInt(save.buildings[6]*4-32,10)+"x<span class=hard>▬</span>";
				break;
				case save.buildings[6]>=20 && save.buildings[6]<=29:
					document.getElementById("woodshopInfo").innerHTML=parseInt(2+save.buildings[6]-20,10)+"x<span class=silver>▰</span>, "+parseInt(save.buildings[6]*4-72,10)+"x<span class=ebony>▬</span>";
				break;
				case save.buildings[6]>=30 && save.buildings[0]<=39:
					document.getElementById("woodshopInfo").innerHTML=parseInt(save.buildings[6]-28,10)+"x<span class=gold>▰</span>, "+parseInt(save.buildings[6]*4-112,10)+"x<span class=pearl>▬</span>";
				break;
				case save.buildings[6]>=40:
					document.getElementById("woodshopInfo").innerHTML="Max Reached";
					disableItem("buyWoodshop");
				break;
			}
		break;
		case 7:
			switch(true){
				case save.buildings[7]>=0 && save.buildings[7]<=9:
					document.getElementById("marketInfo").innerHTML=parseInt(2+save.buildings[7],10)+"x<span class=copper>▰</span>, " + parseInt(8+save.buildings[7]*4,10)+"x<span class=soft>▬</span>";
				break;
				case save.buildings[7]>=10 && save.buildings[7]<=19:
					document.getElementById("marketInfo").innerHTML=parseInt(save.buildings[7]-8,10)+"x<span class=iron>▰</span>, "+parseInt(save.buildings[7]*4-32,10)+"x<span class=hard>▬</span>";
				break;
				case save.buildings[7]>=20 && save.buildings[7]<=29:
					document.getElementById("marketInfo").innerHTML=parseInt(2+save.buildings[7]-20,10)+"x<span class=silver>▰</span>, "+parseInt(save.buildings[7]*4-72,10)+"x<span class=ebony>▬</span>";
				break;
				case save.buildings[7]>=30 && save.buildings[0]<=39:
					document.getElementById("marketInfo").innerHTML=parseInt(save.buildings[7]-28,10)+"x<span class=gold>▰</span>, "+parseInt(save.buildings[7]*4-112,10)+"x<span class=pearl>▬</span>";
				break;
				case save.buildings[7]>=40:
					document.getElementById("marketInfo").innerHTML="Max Reached";
					disableItem("buyMarket");
				break;
			}
		break;
		case 8:
			switch(true){
				case save.buildings[8]>=0 && save.buildings[8]<=9:
					document.getElementById("bankInfo").innerHTML=parseInt(2+save.buildings[8],10)+"x<span class=copper>▰</span>, " + parseInt(8+save.buildings[8]*4,10)+"x<span class=soft>▬</span>";
				break;
				case save.buildings[8]>=10 && save.buildings[8]<=19:
					document.getElementById("bankInfo").innerHTML=parseInt(save.buildings[8]-8,10)+"x<span class=iron>▰</span>, "+parseInt(save.buildings[8]*4-32,10)+"x<span class=hard>▬</span>";
				break;
				case save.buildings[8]>=20 && save.buildings[8]<=29:
					document.getElementById("bankInfo").innerHTML=parseInt(2+save.buildings[8]-20,10)+"x<span class=silver>▰</span>, "+parseInt(save.buildings[8]*4-72,10)+"x<span class=ebony>▬</span>";
				break;
				case save.buildings[8]>=30 && save.buildings[0]<=39:
					document.getElementById("bankInfo").innerHTML=parseInt(save.buildings[8]-28,10)+"x<span class=gold>▰</span>, "+parseInt(save.buildings[8]*4-112,10)+"x<span class=pearl>▬</span>";
				break;
				case save.buildings[8]>=40:
					document.getElementById("bankInfo").innerHTML="Max Reached";
					disableItem("buyBank");
				break;
			}
		break;
		case 9:
			switch(true){
				case save.buildings[9]>=0 && save.buildings[9]<=12:
					document.getElementById("labInfo").innerHTML=parseInt(2+save.buildings[9],10)+"x<span class=copper>▰</span>, " + parseInt(8+save.buildings[9]*4,10)+"x<span class=soft>▬</span>";
				break;
				case save.buildings[9]>=13 && save.buildings[9]<=25:
					document.getElementById("labInfo").innerHTML=parseInt(save.buildings[9]-11,10)+"x<span class=iron>▰</span>, "+parseInt(save.buildings[9]*4-44,10)+"x<span class=hard>▬</span>";
				break;
				case save.buildings[9]>=26 && save.buildings[9]<=38:
					document.getElementById("labInfo").innerHTML=parseInt(2+save.buildings[9]-26,10)+"x<span class=silver>▰</span>, "+parseInt(save.buildings[9]*4-96,10)+"x<span class=ebony>▬</span>";
				break;
				case save.buildings[9]>=39 && save.buildings[9]<=51:
					document.getElementById("labInfo").innerHTML=parseInt(save.buildings[9]-37,10)+"x<span class=gold>▰</span>, "+parseInt(save.buildings[9]*4-148,10)+"x<span class=pearl>▬</span>";
				break;
				case save.buildings[9]>=52:
					document.getElementById("labInfo").innerHTML="Max Reached";
					disableItem("buyLab");
				break;
			}
		break;
	}
}
function updateBuildingCosts(){
	updateBuildingCost(0);
	updateBuildingCost(1);
	updateBuildingCost(2);
	updateBuildingCost(3);
	updateBuildingCost(4);
	updateBuildingCost(5);
	updateBuildingCost(6);
	updateBuildingCost(7);
	updateBuildingCost(8);
	updateBuildingCost(9);
}
function updateSmeltProgress(id){
	switch(true){
		case save.location==1:
		break;
		case id==0:
			switch(true){
				case save.buildings[2]>=40:
					if(save.ore[0]<=1){unlockItem("smeltProgress06");lockItem("smeltProgress06")}else{unlockItem("smeltProgress06");};
				break;
				case save.buildings[2]>=30:
					switch(true){
						case save.smeltOneOffs[1]==false:
							unlockItem("smeltProgress04");
							unlockItem("smeltProgress05");
							lockItem("smeltProgress04");
							lockItem("smeltProgress05");
							save.smeltOneOffs[1]=true;
						break;
						case save.smeltProgress[0]>=1:
							unlockItem("smeltProgress06");
						break;
						default:
							unlockItem("smeltProgress06");
							lockItem("smeltProgress06");
						break;
					}
				break;
				case save.buildings[2]>=20:
					switch(true){
						case save.smeltOneOffs[0]==false:
							unlockItem("smeltProgress00");
							unlockItem("smeltProgress01");
							unlockItem("smeltProgress02");
							unlockItem("smeltProgress03");
							lockItem("smeltProgress00");
							lockItem("smeltProgress01");
							lockItem("smeltProgress02");
							lockItem("smeltProgress03");
							save.smeltOneOffs[0]=true;
						break;
						case save.smeltProgress[0]>=3:
							unlockItem("smeltProgress04");
							unlockItem("smeltProgress05");
						break;
						case save.smeltProgress[0]>=1:
							unlockItem("smeltProgress04");
						break;
						default:
							unlockItem("smeltProgress04");
							unlockItem("smeltProgress05");
							lockItem("smeltProgress04");
							lockItem("smeltProgress05");
						break;
					}
				break;
				default:
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
						default:
							unlockItem("smeltProgress00");
							unlockItem("smeltProgress01");
							unlockItem("smeltProgress02");
							unlockItem("smeltProgress03");
							lockItem("smeltProgress00");
							lockItem("smeltProgress01");
							lockItem("smeltProgress02");
							lockItem("smeltProgress03");
						break;
					}
				break;
			}
		break;
		case id==1:
			switch(true){
				case save.buildings[2]>=40:
				if(save.ore[1]<=1){unlockItem("smeltProgress16");lockItem("smeltProgress16")}else{unlockItem("smeltProgress16");};
				break;
				case save.buildings[2]>=30:
					switch(true){
						case save.smeltOneOffs[3]==false:
							unlockItem("smeltProgress14");
							unlockItem("smeltProgress15");
							lockItem("smeltProgress14");
							lockItem("smeltProgress15");
							save.smeltOneOffs[3]=true;
						break;
						case save.smeltProgress[1]>=1:
							unlockItem("smeltProgress16");
						break;
						default:
							unlockItem("smeltProgress16");
							lockItem("smeltProgress16");
						break;
					}
				break;
				case save.buildings[2]>=20:
					switch(true){
						case save.smeltOneOffs[2]==false:
							unlockItem("smeltProgress10");
							unlockItem("smeltProgress11");
							unlockItem("smeltProgress12");
							unlockItem("smeltProgress13");
							lockItem("smeltProgress10");
							lockItem("smeltProgress11");
							lockItem("smeltProgress12");
							lockItem("smeltProgress13");
							save.smeltOneOffs[2]=true;
						break;
						case save.smeltProgress[1]>=3:
							unlockItem("smeltProgress14");
							unlockItem("smeltProgress15");
						break;
						case save.smeltProgress[1]>=1:
							unlockItem("smeltProgress14");
						break;
						default:
							unlockItem("smeltProgress14");
							unlockItem("smeltProgress15");
							lockItem("smeltProgress14");
							lockItem("smeltProgress15");
						break;
					}
				break;
				default:
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
						default:
							unlockItem("smeltProgress10");
							unlockItem("smeltProgress11");
							unlockItem("smeltProgress12");
							unlockItem("smeltProgress13");
							lockItem("smeltProgress10");
							lockItem("smeltProgress11");
							lockItem("smeltProgress12");
							lockItem("smeltProgress13");
						break;
					}
				break;
			}
		break;
		case id==2:
			switch(true){
				case save.buildings[2]>=40:
					if(save.ore[2]<=1){unlockItem("smeltProgress26");lockItem("smeltProgress26")}else{unlockItem("smeltProgress26");};
				break;
				case save.buildings[2]>=30:
					switch(true){
						case save.smeltOneOffs[5]==false:
							unlockItem("smeltProgress24");
							unlockItem("smeltProgress25");
							lockItem("smeltProgress24");
							lockItem("smeltProgress25");
							save.smeltOneOffs[5]=true;
						break;
						case save.smeltProgress[2]>=1:
							unlockItem("smeltProgress26");
						break;
						default:
							unlockItem("smeltProgress26");
							lockItem("smeltProgress26");
						break;
					}
				break;
				case save.buildings[2]>=20:
					switch(true){
						case save.smeltOneOffs[4]==false:
							unlockItem("smeltProgress20");
							unlockItem("smeltProgress21");
							unlockItem("smeltProgress22");
							unlockItem("smeltProgress23");
							lockItem("smeltProgress20");
							lockItem("smeltProgress21");
							lockItem("smeltProgress22");
							lockItem("smeltProgress23");
							save.smeltOneOffs[4]=true;
						break;
						case save.smeltProgress[2]>=3:
							unlockItem("smeltProgress24");
							unlockItem("smeltProgress25");
						break;
						case save.smeltProgress[2]>=1:
							unlockItem("smeltProgress24");
						break;
						default:
							unlockItem("smeltProgress24");
							unlockItem("smeltProgress25");
							lockItem("smeltProgress24");
							lockItem("smeltProgress25");
						break;
					}
				break;
				default:
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
						default:
							unlockItem("smeltProgress20");
							unlockItem("smeltProgress21");
							unlockItem("smeltProgress22");
							unlockItem("smeltProgress23");
							lockItem("smeltProgress20");
							lockItem("smeltProgress21");
							lockItem("smeltProgress22");
							lockItem("smeltProgress23");
						break;
					}
				break;
			}
		break;
		case id==3:
			switch(true){
				case save.buildings[2]>=40:
					if(save.ore[3]<=1){unlockItem("smeltProgress36");lockItem("smeltProgress36")}else{unlockItem("smeltProgress36");};
				break;
				case save.buildings[2]>=30:
					switch(true){
						case save.smeltOneOffs[7]==false:
							unlockItem("smeltProgress34");
							unlockItem("smeltProgress35");
							lockItem("smeltProgress34");
							lockItem("smeltProgress35");
							save.smeltOneOffs[7]=true;
						break;
						case save.smeltProgress[3]>=1:
							unlockItem("smeltProgress36");
						break;
						default:
							unlockItem("smeltProgress36");
							lockItem("smeltProgress36");
						break;
					}
				break;
				case save.buildings[2]>=20:
					switch(true){
						case save.smeltOneOffs[6]==false:
							unlockItem("smeltProgress30");
							unlockItem("smeltProgress31");
							unlockItem("smeltProgress32");
							unlockItem("smeltProgress33");
							lockItem("smeltProgress30");
							lockItem("smeltProgress31");
							lockItem("smeltProgress32");
							lockItem("smeltProgress33");
							save.smeltOneOffs[6]=true;
						break;
						case save.smeltProgress[3]>=3:
							unlockItem("smeltProgress34");
							unlockItem("smeltProgress35");
						break;
						case save.smeltProgress[3]>=1:
							unlockItem("smeltProgress34");
						break;
						default:
							unlockItem("smeltProgress34");
							unlockItem("smeltProgress35");
							lockItem("smeltProgress34");
							lockItem("smeltProgress35");
						break;
					}
				break;
				default:
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
						default:
							unlockItem("smeltProgress30");
							unlockItem("smeltProgress31");
							unlockItem("smeltProgress32");
							unlockItem("smeltProgress33");
							lockItem("smeltProgress30");
							lockItem("smeltProgress31");
							lockItem("smeltProgress32");
							lockItem("smeltProgress33");
						break;
					}
				break;
			}
		break;
	}
}
function updatePlaneProgress(id){
	switch(true){
		case save.location==1:
		break;
		case id==0:
			switch(true){
				case save.buildings[4]>=40:
					if(save.wood[0]<=1){unlockItem("planeProgress06");lockItem("planeProgress06")}else{unlockItem("planeProgress06");};
				break;
				case save.buildings[4]>=30:
					switch(true){
						case save.planeOneOffs[1]==false:
							unlockItem("planeProgress04");
							unlockItem("planeProgress05");
							lockItem("planeProgress04");
							lockItem("planeProgress05");
							save.planeOneOffs[1]=true;
						break;
						case save.planeProgress[0]>=1:
							unlockItem("planeProgress06");
						break;
						default:
							unlockItem("planeProgress06");
							lockItem("planeProgress06");
						break;
					}
				break;
				case save.buildings[4]>=20:
					switch(true){
						case save.planeOneOffs[0]==false:
							unlockItem("planeProgress00");
							unlockItem("planeProgress01");
							unlockItem("planeProgress02");
							unlockItem("planeProgress03");
							lockItem("planeProgress00");
							lockItem("planeProgress01");
							lockItem("planeProgress02");
							lockItem("planeProgress03");
							save.planeOneOffs[0]=true;
						break;
						case save.planeProgress[0]>=3:
							unlockItem("planeProgress04");
							unlockItem("planeProgress05");
						break;
						case save.planeProgress[0]>=1:
							unlockItem("planeProgress04");
						break;
						default:
							unlockItem("planeProgress04");
							unlockItem("planeProgress05");
							lockItem("planeProgress04");
							lockItem("planeProgress05");
						break;
					}
				break;
				default:
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
						default:
							unlockItem("planeProgress00");
							unlockItem("planeProgress01");
							unlockItem("planeProgress02");
							unlockItem("planeProgress03");
							lockItem("planeProgress00");
							lockItem("planeProgress01");
							lockItem("planeProgress02");
							lockItem("planeProgress03");
						break;
					}
				break;
			}
		break;
		case id==1:
			switch(true){
				case save.buildings[4]>=40:
					if(save.wood[1]<=1){unlockItem("planeProgress16");lockItem("planeProgress16")}else{unlockItem("planeProgress16");};
				break;
				case save.buildings[4]>=30:
					switch(true){
						case save.planeOneOffs[3]==false:
							unlockItem("planeProgress14");
							unlockItem("planeProgress15");
							lockItem("planeProgress14");
							lockItem("planeProgress15");
							save.planeOneOffs[3]=true;
						break;
						case save.planeProgress[1]>=1:
							unlockItem("planeProgress16");
						break;
						default:
							unlockItem("planeProgress16");
							lockItem("planeProgress16");
						break;
					}
				break;
				case save.buildings[4]>=20:
					switch(true){
						case save.planeOneOffs[2]==false:
							unlockItem("planeProgress10");
							unlockItem("planeProgress11");
							unlockItem("planeProgress12");
							unlockItem("planeProgress13");
							lockItem("planeProgress10");
							lockItem("planeProgress11");
							lockItem("planeProgress12");
							lockItem("planeProgress13");
							save.planeOneOffs[2]=true;
						break;
						case save.planeProgress[1]>=3:
							unlockItem("planeProgress14");
							unlockItem("planeProgress15");
						break;
						case save.planeProgress[1]>=1:
							unlockItem("planeProgress14");
						break;
						default:
							unlockItem("planeProgress14");
							unlockItem("planeProgress15");
							lockItem("planeProgress14");
							lockItem("planeProgress15");
						break;
					}
				break;
				default:
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
						default:
							unlockItem("planeProgress10");
							unlockItem("planeProgress11");
							unlockItem("planeProgress12");
							unlockItem("planeProgress13");
							lockItem("planeProgress10");
							lockItem("planeProgress11");
							lockItem("planeProgress12");
							lockItem("planeProgress13");
						break;
					}
				break;
			}
		break;
		case id==2:
			switch(true){
				case save.buildings[4]>=40:
					if(save.wood[2]<=1){unlockItem("planeProgress26");lockItem("planeProgress26")}else{unlockItem("planeProgress26");};
				break;
				case save.buildings[4]>=30:
					switch(true){
						case save.planeOneOffs[5]==false:
							unlockItem("planeProgress24");
							unlockItem("planeProgress25");
							lockItem("planeProgress24");
							lockItem("planeProgress25");
							save.planeOneOffs[5]=true;
						break;
						case save.planeProgress[2]>=1:
							unlockItem("planeProgress26");
						break;
						default:
							unlockItem("planeProgress26");
							lockItem("planeProgress26");
						break;
					}
				break;
				case save.buildings[4]>=20:
					switch(true){
						case save.planeOneOffs[4]==false:
							unlockItem("planeProgress20");
							unlockItem("planeProgress21");
							unlockItem("planeProgress22");
							unlockItem("planeProgress23");
							lockItem("planeProgress20");
							lockItem("planeProgress21");
							lockItem("planeProgress22");
							lockItem("planeProgress23");
							save.planeOneOffs[4]=true;
						break;
						case save.planeProgress[2]>=3:
							unlockItem("planeProgress24");
							unlockItem("planeProgress25");
						break;
						case save.planeProgress[2]>=1:
							unlockItem("planeProgress24");
						break;
						default:
							unlockItem("planeProgress24");
							unlockItem("planeProgress25");
							lockItem("planeProgress24");
							lockItem("planeProgress25");
						break;
					}
				break;
				default:
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
						default:
							unlockItem("planeProgress20");
							unlockItem("planeProgress21");
							unlockItem("planeProgress22");
							unlockItem("planeProgress23");
							lockItem("planeProgress20");
							lockItem("planeProgress21");
							lockItem("planeProgress22");
							lockItem("planeProgress23");
						break;
					}
				break;
			}
		break;
		case id==3:
			switch(true){
				case save.buildings[4]>=40:
					if(save.wood[3]<=1){unlockItem("planeProgress36");lockItem("planeProgress36")}else{unlockItem("planeProgress36");};
				break;
				case save.buildings[4]>=30:
					switch(true){
						case save.planeOneOffs[7]==false:
							unlockItem("planeProgress34");
							unlockItem("planeProgress35");
							lockItem("planeProgress34");
							lockItem("planeProgress35");
							save.planeOneOffs[7]=true;
						break;
						case save.planeProgress[3]>=1:
							unlockItem("planeProgress36");
						break;
						default:
							unlockItem("planeProgress36");
							lockItem("planeProgress36");
						break;
					}
				break;
				case save.buildings[4]>=20:
					switch(true){
						case save.planeOneOffs[6]==false:
							unlockItem("planeProgress30");
							unlockItem("planeProgress31");
							unlockItem("planeProgress32");
							unlockItem("planeProgress33");
							lockItem("planeProgress30");
							lockItem("planeProgress31");
							lockItem("planeProgress32");
							lockItem("planeProgress33");
							save.planeOneOffs[6]=true;
						break;
						case save.planeProgress[3]>=3:
							unlockItem("planeProgress34");
							unlockItem("planeProgress35");
						break;
						case save.planeProgress[3]>=1:
							unlockItem("planeProgress34");
						break;
						default:
							unlockItem("planeProgress34");
							unlockItem("planeProgress35");
							lockItem("planeProgress34");
							lockItem("planeProgress35");
						break;
					}
				break;
				default:
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
						default:
							unlockItem("planeProgress30");
							unlockItem("planeProgress31");
							unlockItem("planeProgress32");
							unlockItem("planeProgress33");
							lockItem("planeProgress30");
							lockItem("planeProgress31");
							lockItem("planeProgress32");
							lockItem("planeProgress33");
						break;
					}
				break;
			}
		break;
	}
}
function updateThinkProgress(){
	switch(true){
		case save.location==1:
		break;
		case save.buildings[9]>=39:
			switch(true){
				case save.thinkOneOffs[1]==false:
					unlockItem("thinkProgress12");
					unlockItem("thinkProgress13");
					unlockItem("thinkProgress14");
					unlockItem("thinkProgress15");
					unlockItem("thinkProgress16");
					unlockItem("thinkProgress17");
					lockItem("thinkProgress12");
					lockItem("thinkProgress13");
					lockItem("thinkProgress14");
					lockItem("thinkProgress15");
					lockItem("thinkProgress16");
					lockItem("thinkProgress17");
					save.thinkOneOffs[1]=true;
				break;
				case save.thinkProgress>=9:
					unlockItem("thinkProgress18");
					unlockItem("thinkProgress19");
					unlockItem("thinkProgress20");
				break;
				case save.thinkProgress>=5:
					unlockItem("thinkProgress18");
					unlockItem("thinkProgress19");
				break;
				case save.thinkProgress>=1:
					unlockItem("thinkProgress18");
				break;
				default:
					unlockItem("thinkProgress18");
					unlockItem("thinkProgress19");
					unlockItem("thinkProgress20");
					lockItem("thinkProgress18");
					lockItem("thinkProgress19");
					lockItem("thinkProgress20");
				break;
			}
		break;
		case save.buildings[9]>=26:
			switch(true){
				case save.thinkOneOffs[0]==false:
					unlockItem("thinkProgress0");
					unlockItem("thinkProgress1");
					unlockItem("thinkProgress2");
					unlockItem("thinkProgress3");
					unlockItem("thinkProgress4");
					unlockItem("thinkProgress5");
					unlockItem("thinkProgress6");
					unlockItem("thinkProgress7");
					unlockItem("thinkProgress8");
					unlockItem("thinkProgress9");
					unlockItem("thinkProgress10");
					unlockItem("thinkProgress11");
					lockItem("thinkProgress0");
					lockItem("thinkProgress1");
					lockItem("thinkProgress2");
					lockItem("thinkProgress3");
					lockItem("thinkProgress4");
					lockItem("thinkProgress5");
					lockItem("thinkProgress6");
					lockItem("thinkProgress7");
					lockItem("thinkProgress8");
					lockItem("thinkProgress9");
					lockItem("thinkProgress10");
					lockItem("thinkProgress11");
					save.thinkOneOffs[0]=true;
				break;
				case save.thinkProgress>=11:
					unlockItem("thinkProgress12");
					unlockItem("thinkProgress13");
					unlockItem("thinkProgress14");
					unlockItem("thinkProgress15");
					unlockItem("thinkProgress16");
					unlockItem("thinkProgress17");
				break;
				case save.thinkProgress>=9:
					unlockItem("thinkProgress12");
					unlockItem("thinkProgress13");
					unlockItem("thinkProgress14");
					unlockItem("thinkProgress15");
					unlockItem("thinkProgress16");
				break;
				case save.thinkProgress>=7:
					unlockItem("thinkProgress12");
					unlockItem("thinkProgress13");
					unlockItem("thinkProgress14");
					unlockItem("thinkProgress15");
				break;
				case save.thinkProgress>=5:
					unlockItem("thinkProgress12");
					unlockItem("thinkProgress13");
					unlockItem("thinkProgress14");
				break;
				case save.thinkProgress>=3:
					unlockItem("thinkProgress12");
					unlockItem("thinkProgress13");
				break;
				case save.thinkProgress>=1:
					unlockItem("thinkProgress12");
				break;
				default:
					unlockItem("thinkProgress12");
					unlockItem("thinkProgress13");
					unlockItem("thinkProgress14");
					unlockItem("thinkProgress15");
					unlockItem("thinkProgress16");
					unlockItem("thinkProgress17");
					lockItem("thinkProgress12");
					lockItem("thinkProgress13");
					lockItem("thinkProgress14");
					lockItem("thinkProgress15");
					lockItem("thinkProgress16");
					lockItem("thinkProgress17");
				break;
			}
		break;
		default:
			switch(true){
				case save.thinkProgress==1:
					unlockItem("thinkProgress0");
				break;
				case save.thinkProgress==2:
					unlockItem("thinkProgress0");
					unlockItem("thinkProgress1");
				break;
				case save.thinkProgress==3:
					unlockItem("thinkProgress0");
					unlockItem("thinkProgress1");
					unlockItem("thinkProgress2");
				break;
				case save.thinkProgress==4:
					unlockItem("thinkProgress0");
					unlockItem("thinkProgress1");
					unlockItem("thinkProgress2");
					unlockItem("thinkProgress3");
				break;
				case save.thinkProgress==5:
					unlockItem("thinkProgress0");
					unlockItem("thinkProgress1");
					unlockItem("thinkProgress2");
					unlockItem("thinkProgress3");
					unlockItem("thinkProgress4");
				break;
				case save.thinkProgress==6:
					unlockItem("thinkProgress0");
					unlockItem("thinkProgress1");
					unlockItem("thinkProgress2");
					unlockItem("thinkProgress3");
					unlockItem("thinkProgress4");
					unlockItem("thinkProgress5");
				break;
				case save.thinkProgress==7:
					unlockItem("thinkProgress0");
					unlockItem("thinkProgress1");
					unlockItem("thinkProgress2");
					unlockItem("thinkProgress3");
					unlockItem("thinkProgress4");
					unlockItem("thinkProgress5");
					unlockItem("thinkProgress6");
				break;
				case save.thinkProgress==8:
					unlockItem("thinkProgress0");
					unlockItem("thinkProgress1");
					unlockItem("thinkProgress2");
					unlockItem("thinkProgress3");
					unlockItem("thinkProgress4");
					unlockItem("thinkProgress5");
					unlockItem("thinkProgress6");
					unlockItem("thinkProgress7");
				break;
				case save.thinkProgress==9:
					unlockItem("thinkProgress0");
					unlockItem("thinkProgress1");
					unlockItem("thinkProgress2");
					unlockItem("thinkProgress3");
					unlockItem("thinkProgress4");
					unlockItem("thinkProgress5");
					unlockItem("thinkProgress6");
					unlockItem("thinkProgress7");
					unlockItem("thinkProgress8");
				break;
				case save.thinkProgress==10:
					unlockItem("thinkProgress0");
					unlockItem("thinkProgress1");
					unlockItem("thinkProgress2");
					unlockItem("thinkProgress3");
					unlockItem("thinkProgress4");
					unlockItem("thinkProgress5");
					unlockItem("thinkProgress6");
					unlockItem("thinkProgress7");
					unlockItem("thinkProgress8");
					unlockItem("thinkProgress9");
				break;
				case save.thinkProgress==11:
					unlockItem("thinkProgress0");
					unlockItem("thinkProgress1");
					unlockItem("thinkProgress2");
					unlockItem("thinkProgress3");
					unlockItem("thinkProgress4");
					unlockItem("thinkProgress5");
					unlockItem("thinkProgress6");
					unlockItem("thinkProgress7");
					unlockItem("thinkProgress8");
					unlockItem("thinkProgress9");
					unlockItem("thinkProgress10");
				break;
				case save.thinkProgress==12:
					unlockItem("thinkProgress0");
					unlockItem("thinkProgress1");
					unlockItem("thinkProgress2");
					unlockItem("thinkProgress3");
					unlockItem("thinkProgress4");
					unlockItem("thinkProgress5");
					unlockItem("thinkProgress6");
					unlockItem("thinkProgress7");
					unlockItem("thinkProgress8");
					unlockItem("thinkProgress9");
					unlockItem("thinkProgress10");
					unlockItem("thinkProgress11");
				break;
				default:
					unlockItem("thinkProgress0");
					unlockItem("thinkProgress1");
					unlockItem("thinkProgress2");
					unlockItem("thinkProgress3");
					unlockItem("thinkProgress4");
					unlockItem("thinkProgress5");
					unlockItem("thinkProgress6");
					unlockItem("thinkProgress7");
					unlockItem("thinkProgress8");
					unlockItem("thinkProgress9");
					unlockItem("thinkProgress10");
					unlockItem("thinkProgress11");
					lockItem("thinkProgress0");
					lockItem("thinkProgress1");
					lockItem("thinkProgress2");
					lockItem("thinkProgress3");
					lockItem("thinkProgress4");
					lockItem("thinkProgress5");
					lockItem("thinkProgress6");
					lockItem("thinkProgress7");
					lockItem("thinkProgress8");
					lockItem("thinkProgress9");
					lockItem("thinkProgress10");
					lockItem("thinkProgress11");
				break;
			}
		break;
	}
}
function updateSmeltPlane‌ThinkOnStart(){
	updateSmeltProgress(0);
	updateSmeltProgress(1);
	updateSmeltProgress(2);
	updateSmeltProgress(3);
	updatePlaneProgress(0);
	updatePlaneProgress(1);
	updatePlaneProgress(2);
	updatePlaneProgress(3);
	updateThinkProgress();
}

function updateAllResources(){
	updateResources(00);
	updateResources(01);
	updateResources(02);
	updateResources(03);
	updateResources(10);
	updateResources(11);
	updateResources(12);
	updateResources(13);
}
function updateMineProgress(){
	switch(true){
		case save.location==1:
		break;
		case save.buildings[0]>=40:
			unlockItem("mineProgress6");
		break;
		case save.buildings[0]>=30:
			switch(true){
				case save.mineOneOffs[1]==false:
					unlockItem("mineProgress5");
					unlockItem("mineProgress4");
					lockItem("mineProgress5");
					lockItem("mineProgress4");
					save.mineOneOffs[1]=true;
				break;
				case save.mineProgress>=1:
					unlockItem("mineProgress6");
				break;
				default:
					lockItem("mineProgress6");
				break;
			}
		break;
		case save.buildings[0]>=20:
			switch(true){
				case save.mineOneOffs[0]==false:
					unlockItem("mineProgress0");
					unlockItem("mineProgress1");
					unlockItem("mineProgress2");
					unlockItem("mineProgress3");
					lockItem("mineProgress0");
					lockItem("mineProgress1");
					lockItem("mineProgress2");
					lockItem("mineProgress3");
					save.mineOneOffs[0]=true;
				break;
				case save.mineProgress>=3:
					unlockItem("mineProgress4");
					unlockItem("mineProgress5");
				break;
				case save.mineProgress>=1:
					unlockItem("mineProgress4");
				break;
				default:
					unlockItem("mineProgress4");
					unlockItem("mineProgress5");
					lockItem("mineProgress4");
					lockItem("mineProgress5");
				break;
			}
		break;
		default:
			switch(true){
				case save.mineProgress==1:
					unlockItem("mineProgress0");
				break;
				case save.mineProgress==2:
					unlockItem("mineProgress0");
					unlockItem("mineProgress1");
				break;
				case save.mineProgress==3:
					unlockItem("mineProgress0");
					unlockItem("mineProgress1");
					unlockItem("mineProgress2");
				break;
				case save.mineProgress==4:
					unlockItem("mineProgress0");
					unlockItem("mineProgress1");
					unlockItem("mineProgress2");
					unlockItem("mineProgress3");
				break;
				default:
					unlockItem("mineProgress0");
					unlockItem("mineProgress1");
					unlockItem("mineProgress2");
					unlockItem("mineProgress3");
					unlockItem("mineProgress4");
					lockItem("mineProgress0");
					lockItem("mineProgress1");
					lockItem("mineProgress2");
					lockItem("mineProgress3");
					lockItem("mineProgress4");
				break;
			}
		break;
	}
}
function updateChopProgress(){
	switch(true){
		case save.location==1:
		break;
		case save.buildings[0]>=40:
			unlockItem("chopProgress6");
		break;
		case save.buildings[2]>=30:
			switch(true){
				case save.chopOneOffs[1]==false:
					unlockItem("chopProgress5");
					unlockItem("chopProgress4");
					lockItem("chopProgress5");
					lockItem("chopProgress4");
					save.chopOneOffs[1]=true;
				break;
				case save.chopProgress>=1:
					unlockItem("chopProgress6");
				break;
				default:
					lockItem("chopProgress6");
				break;
			}
		break;
		case save.buildings[2]>=20:
			switch(true){
				case save.chopOneOffs[0]==false:
					unlockItem("chopProgress0");
					unlockItem("chopProgress1");
					unlockItem("chopProgress2");
					unlockItem("chopProgress3");
					lockItem("chopProgress0");
					lockItem("chopProgress1");
					lockItem("chopProgress2");
					lockItem("chopProgress3");
					save.chopOneOffs[0]=true;
				break;
				case save.chopProgress>=3:
					unlockItem("chopProgress5");
					unlockItem("chopProgress4");
				break;
				case save.chopProgress>=1:
					unlockItem("chopProgress4");
				break;
				default:
					unlockItem("chopProgress4");
					unlockItem("chopProgress5");
					lockItem("chopProgress4");
					lockItem("chopProgress5");
				break;
			}
		break;
		default:
			switch(true){
				case save.chopProgress==1:
					unlockItem("chopProgress0");
				break;
				case save.chopProgress==2:
					unlockItem("chopProgress0");
					unlockItem("chopProgress1");
				break;
				case save.chopProgress==3:
					unlockItem("chopProgress0");
					unlockItem("chopProgress1");
					unlockItem("chopProgress2");
				break;
				case save.chopProgress==4:
					unlockItem("chopProgress0");
					unlockItem("chopProgress1");
					unlockItem("chopProgress2");
					unlockItem("chopProgress3");
				break;
				default:
					unlockItem("chopProgress0");
					unlockItem("chopProgress1");
					unlockItem("chopProgress2");
					unlockItem("chopProgress3");
					lockItem("chopProgress0");
					lockItem("chopProgress1");
					lockItem("chopProgress2");
					lockItem("chopProgress3");
				break;
			}
		break;
	}
}
function updateAll(){
	updateSmeltPlane‌ThinkOnStart();
	updateAllResources();
	updateBuildings();
	updateBuildingCosts();
	updateProgressColors();
	updateMineProgress();
	updateChopProgress();
	updateSpeed();
	upgradeCheck();
	updateThinkPoints();
	updateAllAdventures();
	updateCurrentAdventure();
}
function updateProgressColors(){
	switch(true){
		case PColor==0:
			document.querySelector("body").style.setProperty("--progress-color", "#FFEB3B")
		break;
		case PColor==1:
			document.querySelector("body").style.setProperty("--progress-color", "#3BFFC0")
		break;
		case PColor==2:
			document.querySelector("body").style.setProperty("--progress-color", "#FF3B56")
		break;
		case PColor==3:
			document.querySelector("body").style.setProperty("--progress-color", "#B7E47C")
		break;
		case PColor==4:
			document.querySelector("body").style.setProperty("--progress-color", "#9A7FBA")
		break;
		
	}
}
function changeColor(value){
	switch(value){
		case 0:
			PColor=0;
		break;
		case 1:
			PColor=1;
		break;
		case 2:
			PColor=2;
		break;
		case 3:
			PColor=3;
		break;
		case 4:
			PColor=4;
		break;
	}
	window.localStorage['idleGame2.PColor'] = JSON.stringify(PColor);
	updateProgressColors();
}
function updateThinkPoints(){
	switch(true){
		case save.location==1:
		break;
		case save.thinkPoints>=1000000:
					document.getElementById("thinkShopPoints").innerHTML="TP: "+save.thinkPoints.toExponential(2);
		break;
		case save.buildings[9]>=1 || save.thinkPoints>=1000:
			document.getElementById("thinkShopPoints").innerHTML="TP: "+save.thinkPoints.toLocaleString();
		break;
		default:
			document.getElementById("thinkShopPoints").innerHTML="Think Points: "+save.thinkPoints.toLocaleString();
		break;
	}
}
// Think
function doThink(){
	save.thinkProgress+=1;
	if(save.thinkProgress>=13){
		save.thinkProgress=0;
			switch(true){
				case save.labUpgraded[2]==true:
					save.thinkPointsTotal+=4;
					save.thinkPoints+=4;
				break;
				case save.labUpgraded[1]==true:
					save.thinkPointsTotal+=3;
					save.thinkPoints+=3;
				break;
				case save.labUpgraded[0]==true:
					save.thinkPointsTotal+=2;
					save.thinkPoints+=2;
				break;
				default:
					save.thinkPointsTotal+=1;
					save.thinkPoints+=1;
				break;
			}
		updateThinkPoints();
		upgradeCheck();
	}
	updateThinkProgress();
	
}
// Mine
function mine(){
	save.mineProgress+=1;
	if(save.mineProgress>=5){
		save.mineProgress=0;
		switch(true){
			case save.mineUpgraded[2]==true:
				let a;
				for(a=0;a<=3;a++){
					doMine();
				}
			break;
			case save.mineUpgraded[1]==true:
				let b;
				for(b=0;b<=2;b++){
					doMine();
				}
			break;
			case save.mineUpgraded[0]==true:
				let c;
				for(c=0;c<=1;c++){
					doMine();
				}
			break;
			default:
				doMine();
			break;
		}
	}
	updateMineProgress();
}
function doMine(){
	let result=randomInt(0,9);
	switch(true){
		case save.oreUnlocked[2]==true:
			switch(true){
				case result>=9:
					save.ore[3]+=1;
					save.oreTotal[3]+=1;
					if(save.ore[3]>=2){enableItem("smeltButton3")};
				break;
				case result>=7:
					save.ore[2]+=1;
					save.oreTotal[2]+=1;
					if(save.ore[2]>=2){enableItem("smeltButton2")};
				break;
				case result>=4:
					save.ore[1]+=1;
					save.oreTotal[1]+=1;
					if(save.ore[1]>=2){enableItem("smeltButton1")};
				break;
				default:
					save.ore[0]+=1;
					save.oreTotal[0]+=1;
					if(save.ore[0]>=2){enableItem("smeltButton0")};
				break;
			}
		break;
		case save.oreUnlocked[1]==true:
			switch(true){
				case result>=8:
					save.ore[2]+=1;
					save.oreTotal[2]+=1;
					if(save.ore[2]>=2){enableItem("smeltButton2")};
				break;
				case result>=5:
					save.ore[1]+=1;
					save.oreTotal[1]+=1;
					if(save.ore[1]>=2){enableItem("smeltButton1")};
				break;
				default:
					save.ore[0]+=1;
					save.oreTotal[0]+=1;
					if(save.ore[0]>=2){enableItem("smeltButton0")};
				break;
			}
		break;
		case save.oreUnlocked[0]==true:
			switch(true){
				case result>=7:
					save.ore[1]+=1;
					save.oreTotal[1]+=1;
					if(save.ore[1]>=2){enableItem("smeltButton1")};
				break;
				default:
					save.ore[0]+=1;
					save.oreTotal[0]+=1;
					if(save.ore[0]>=2){enableItem("smeltButton0")};
				break;
			}
		break;
		default:
			save.ore[0]+=1;
			save.oreTotal[0]+=1;
			if(save.ore[0]>=2){enableItem("smeltButton0")};
		break;
	}
	updateResources(5);
}
// Chop
function chop(){
	save.chopProgress+=1;
	if(save.chopProgress>=5){
		save.chopProgress=0;
		switch(true){
			case save.yardUpgraded[2]==true:
				let a;
				for(a=0;a<=3;a++){
					doChop();
				}
			break;
			case save.yardUpgraded[1]==true:
				let b;
				for(b=0;b<=2;b++){
					doChop();
				}
			break;
			case save.yardUpgraded[0]==true:
				let c;
				for(c=0;c<=1;c++){
					doChop();
				}
			break;
			default:
				doChop();
			break;
		}
	}
	updateChopProgress();
}
function doChop(){
	let result=randomInt(0,9);
	switch(true){
		case save.woodUnlocked[2]==true:
			switch(true){
				case result>=9:
					save.wood[3]+=1;
					save.woodTotal[3]+=1;
					if(save.wood[3]>=1){enableItem("planeButton3")};
				break;
				case result>=7:
					save.wood[2]+=1;
					save.woodTotal[2]+=1;
					if(save.wood[2]>=1){enableItem("planeButton2")};
				break;
				case result>=4:
					save.wood[1]+=1;
					save.woodTotal[1]+=1;
					if(save.wood[1]>=1){enableItem("planeButton1")};
				break;
				default:
					save.wood[0]+=1;
					save.woodTotal[0]+=1;
					if(save.wood[0]>=1){enableItem("planeButton0")};
				break;
			}
		break;
		case save.woodUnlocked[1]==true:
			switch(true){
				case result>=8:
					save.wood[2]+=1;
					save.woodTotal[2]+=1;
					if(save.wood[2]>=1){enableItem("planeButton2")};
				break;
				case result>=5:
					save.wood[1]+=1;
					save.woodTotal[1]+=1;
					if(save.wood[1]>=1){enableItem("planeButton1")};
				break;
				default:
					save.wood[0]+=1;
					save.woodTotal[0]+=1;
					if(save.wood[0]>=1){enableItem("planeButton0")};
				break;
			}
		break;
		case save.woodUnlocked[0]==true:
			switch(true){
				case result>=7:
					save.wood[1]+=1;
					save.woodTotal[1]+=1;
					if(save.wood[1]>=1){enableItem("planeButton1")};
				break;
				default:
					save.wood[0]+=1;
					save.woodTotal[0]+=1;
					if(save.wood[0]>=1){enableItem("planeButton0")};
				break;
			}
		break;
		default:
			save.wood[0]+=1;
			save.woodTotal[0]+=1;
			if(save.wood[0]>=1){enableItem("planeButton0")};
		break;
	}
	updateResources(6);
	
}// Smelt
// Smelt
function smelt(id){
	if(save.ore[id]>=2){
		save.smeltProgress[id]+=1;
		if(save.smeltProgress[id]>=5){
			save.bar[id]+=1;
			save.barTotal[id]+=1;
			save.ore[id]-=2;
			save.smeltProgress[id]=0;
			updateResources("0"+id);
			if(save.ore[id]<=1){disableItem("smeltButton"+id);};
		}
		updateSmeltProgress(id);
	}
}
// Plane
function plane(id){
	if(save.wood[id]>=2){
		save.planeProgress[id]+=1;
		if(save.planeProgress[id]>=5){
			save.plank[id]+=4;
			save.plankTotal[id]+=4;
			save.wood[id]-=2;
			save.planeProgress[id]=0;
			updateResources("1"+id);
			if(save.wood[id]<=1){disableItem("planeButton"+id)};
		}
		updatePlaneProgress(id);
	}
}
// Buildings
function buyBuilding(id){
	switch(id){
		case 0:
			switch(true){
				case save.buildings[0]>=40:
					
				break;
				case save.buildings[0]>=30:
					if(save.bar[3]>=save.buildings[0]-28 && save.plank[2]>=save.buildings[0]*4-112){
					save.bar[3]-=save.buildings[0]-28;
					save.plank[3]-=save.buildings[0]*4-112;
					save.buildings[0]+=1;
					}
				break;
				case save.buildings[0]>=20:
					if(save.bar[2]>=save.buildings[0]-18 && save.plank[2]>=save.buildings[0]*4-72){
					save.bar[2]-=save.buildings[0]-18;
					save.plank[2]-=save.buildings[0]*4-72;
					save.buildings[0]+=1;
					}
				break;
				case save.buildings[0]>=10:
					if(save.bar[1]>=save.buildings[0]-8 && save.plank[1]>=save.buildings[0]*4-32){
					save.bar[1]-=save.buildings[0]-8;
					save.plank[1]-=save.buildings[0]*4-32;
					save.buildings[0]+=1;
					}
				break;
				case save.buildings[0]>=0:
					if(save.bar[0]>=2+save.buildings[0]  && save.plank[0]>=8+save.buildings[0]*4 ){
					save.bar[0]-=2+save.buildings[0];
					save.plank[0]-=8+save.buildings[0]*4;
					save.buildings[0]+=1;
					}
				break;
			}
			updateBuildingCost(0);
		break;
		case 1:
			switch(true){
				case save.buildings[0]>=40:
					
				break;
				case save.buildings[1]>=30:
					if(save.bar[3]>=save.buildings[1]-28 && save.plank[2]>=save.buildings[1]*4-112){
					save.bar[3]-=save.buildings[1]-28;
					save.plank[3]-=save.buildings[1]*4-112;
					save.buildings[1]+=1;
					}
				break;
				case save.buildings[1]>=20:
					if(save.bar[2]>=save.buildings[1]-18 && save.plank[2]>=save.buildings[1]*4-72){
					save.bar[2]-=save.buildings[1]-18;
					save.plank[2]-=save.buildings[1]*4-72;
					save.buildings[1]+=1;
					}
				break;
				case save.buildings[1]>=10:
					if(save.bar[1]>=save.buildings[1]-8 && save.plank[1]>=save.buildings[1]*4-32){
					save.bar[1]-=save.buildings[1]-8;
					save.plank[1]-=save.buildings[1]*4-32;
					save.buildings[1]+=1;
					}
				break;
				case save.buildings[1]>=0:
					if(save.bar[0]>=2+save.buildings[1]  && save.plank[0]>=8+save.buildings[1]*4 ){
					save.bar[0]-=2+save.buildings[1];
					save.plank[0]-=8+save.buildings[1]*4;
					save.buildings[1]+=1;
					}
				break;
			}
			updateBuildingCost(1);
		break;
		case 2:
			switch(true){
				case save.buildings[0]>=40:
					
				break;
				case save.buildings[2]>=30:
					if(save.bar[3]>=save.buildings[2]-28 && save.plank[2]>=save.buildings[2]*4-112){
					save.bar[3]-=save.buildings[2]-28;
					save.plank[3]-=save.buildings[2]*4-112;
					save.buildings[2]+=1;
					}
				break;
				case save.buildings[2]>=20:
					if(save.bar[2]>=save.buildings[2]-18 && save.plank[2]>=save.buildings[2]*4-72){
					save.bar[2]-=save.buildings[2]-18;
					save.plank[2]-=save.buildings[2]*4-72;
					save.buildings[2]+=1;
					}
				break;
				case save.buildings[2]>=10:
					if(save.bar[1]>=save.buildings[2]-8 && save.plank[1]>=save.buildings[2]*4-32){
					save.bar[1]-=save.buildings[2]-8;
					save.plank[1]-=save.buildings[2]*4-32;
					save.buildings[2]+=1;
					}
				break;
				case save.buildings[2]>=0:
					if(save.bar[0]>=2+save.buildings[2]  && save.plank[0]>=8+save.buildings[2]*4 ){
					save.bar[0]-=2+save.buildings[2];
					save.plank[0]-=8+save.buildings[2]*4;
					save.buildings[2]+=1;
					}
				break;
			}
			updateBuildingCost(2);
		break;
		case 3:
			switch(true){
				case save.buildings[0]>=40:
					
				break;
				case save.buildings[3]>=30:
					if(save.bar[3]>=save.buildings[3]-28 && save.plank[2]>=save.buildings[3]*4-112){
					save.bar[3]-=save.buildings[3]-28;
					save.plank[3]-=save.buildings[3]*4-112;
					save.buildings[3]+=1;
					}
				break;
				case save.buildings[3]>=20:
					if(save.bar[2]>=save.buildings[3]-18 && save.plank[2]>=save.buildings[3]*4-72){
					save.bar[2]-=save.buildings[3]-18;
					save.plank[2]-=save.buildings[3]*4-72;
					save.buildings[3]+=1;
					}
				break;
				case save.buildings[3]>=10:
					if(save.bar[1]>=save.buildings[3]-8 && save.plank[1]>=save.buildings[3]*4-32){
					save.bar[1]-=save.buildings[3]-8;
					save.plank[1]-=save.buildings[3]*4-32;
					save.buildings[3]+=1;
					}
				break;
				case save.buildings[3]>=0:
					if(save.bar[0]>=2+save.buildings[3]  && save.plank[0]>=8+save.buildings[3]*4 ){
					save.bar[0]-=2+save.buildings[3];
					save.plank[0]-=8+save.buildings[3]*4;
					save.buildings[3]+=1;
					}
				break;
			}
			updateBuildingCost(3);
		break;
		case 4:
			switch(true){
				case save.buildings[0]>=40:
					
				break;
				case save.buildings[4]>=30:
					if(save.bar[3]>=save.buildings[4]-28 && save.plank[2]>=save.buildings[4]*4-112){
					save.bar[3]-=save.buildings[4]-28;
					save.plank[3]-=save.buildings[4]*4-112;
					save.buildings[4]+=1;
					}
				break;
				case save.buildings[4]>=20:
					if(save.bar[2]>=save.buildings[4]-18 && save.plank[2]>=save.buildings[4]*4-72){
					save.bar[2]-=save.buildings[4]-18;
					save.plank[2]-=save.buildings[4]*4-72;
					save.buildings[4]+=1;
					}
				break;
				case save.buildings[4]>=10:
					if(save.bar[1]>=save.buildings[4]-8 && save.plank[1]>=save.buildings[4]*4-32){
					save.bar[1]-=save.buildings[4]-8;
					save.plank[1]-=save.buildings[4]*4-32;
					save.buildings[4]+=1;
					}
				break;
				case save.buildings[4]>=0:
					if(save.bar[0]>=2+save.buildings[4]  && save.plank[0]>=8+save.buildings[4]*4 ){
					save.bar[0]-=2+save.buildings[4];
					save.plank[0]-=8+save.buildings[4]*4;
					save.buildings[4]+=1;
					}
				break;
			}
			updateBuildingCost(4);
		break;
		case 5:
			switch(true){
				case save.buildings[0]>=40:
					
				break;
				case save.buildings[5]>=30:
					if(save.bar[3]>=save.buildings[5]-28 && save.plank[2]>=save.buildings[5]*4-112){
					save.bar[3]-=save.buildings[5]-28;
					save.plank[3]-=save.buildings[5]*4-112;
					save.buildings[5]+=1;
					}
				break;
				case save.buildings[5]>=20:
					if(save.bar[2]>=save.buildings[5]-18 && save.plank[2]>=save.buildings[5]*4-72){
					save.bar[2]-=save.buildings[5]-18;
					save.plank[2]-=save.buildings[5]*4-72;
					save.buildings[5]+=1;
					}
				break;
				case save.buildings[5]>=10:
					if(save.bar[1]>=save.buildings[5]-8 && save.plank[1]>=save.buildings[5]*4-32){
					save.bar[1]-=save.buildings[5]-8;
					save.plank[1]-=save.buildings[5]*4-32;
					save.buildings[5]+=1;
					}
				break;
				case save.buildings[5]>=0:
					if(save.bar[0]>=2+save.buildings[5]  && save.plank[0]>=8+save.buildings[5]*4 ){
					save.bar[0]-=2+save.buildings[5];
					save.plank[0]-=8+save.buildings[5]*4;
					save.buildings[5]+=1;
					}
				break;
			}
			updateBuildingCost(5);
		break;
		case 6:
			switch(true){
				case save.buildings[0]>=40:
					
				break;
				case save.buildings[6]>=30:
					if(save.bar[3]>=save.buildings[6]-28 && save.plank[2]>=save.buildings[6]*4-112){
					save.bar[3]-=save.buildings[6]-28;
					save.plank[3]-=save.buildings[6]*4-112;
					save.buildings[6]+=1;
					}
				break;
				case save.buildings[6]>=20:
					if(save.bar[2]>=save.buildings[6]-18 && save.plank[2]>=save.buildings[6]*4-72){
					save.bar[2]-=save.buildings[6]-18;
					save.plank[2]-=save.buildings[6]*4-72;
					save.buildings[6]+=1;
					}
				break;
				case save.buildings[6]>=10:
					if(save.bar[1]>=save.buildings[6]-8 && save.plank[1]>=save.buildings[6]*4-32){
					save.bar[1]-=save.buildings[6]-8;
					save.plank[1]-=save.buildings[6]*4-32;
					save.buildings[6]+=1;
					}
				break;
				case save.buildings[6]>=0:
					if(save.bar[0]>=2+save.buildings[6]  && save.plank[0]>=8+save.buildings[6]*4 ){
					save.bar[0]-=2+save.buildings[6];
					save.plank[0]-=8+save.buildings[6]*4;
					save.buildings[6]+=1;
					}
				break;
			}
			updateBuildingCost(6);
		break;
		case 7:
			switch(true){
				case save.buildings[0]>=40:
					
				break;
				case save.buildings[7]>=30:
					if(save.bar[3]>=save.buildings[7]-28 && save.plank[2]>=save.buildings[7]*4-112){
					save.bar[3]-=save.buildings[7]-28;
					save.plank[3]-=save.buildings[7]*4-112;
					save.buildings[7]+=1;
					}
				break;
				case save.buildings[7]>=20:
					if(save.bar[2]>=save.buildings[7]-18 && save.plank[2]>=save.buildings[7]*4-72){
					save.bar[2]-=save.buildings[7]-18;
					save.plank[2]-=save.buildings[7]*4-72;
					save.buildings[7]+=1;
					}
				break;
				case save.buildings[7]>=10:
					if(save.bar[1]>=save.buildings[7]-8 && save.plank[1]>=save.buildings[7]*4-32){
					save.bar[1]-=save.buildings[7]-8;
					save.plank[1]-=save.buildings[7]*4-32;
					save.buildings[7]+=1;
					}
				break;
				case save.buildings[7]>=0:
					if(save.bar[0]>=2+save.buildings[7]  && save.plank[0]>=8+save.buildings[7]*4 ){
					save.bar[0]-=2+save.buildings[7];
					save.plank[0]-=8+save.buildings[7]*4;
					save.buildings[7]+=1;
					}
				break;
			}
			updateBuildingCost(7);
		break;
		case 8:
			switch(true){
				case save.buildings[8]>=40:
					
				break;
				case save.buildings[8]>=30:
					if(save.bar[3]>=save.buildings[8]-28 && save.plank[2]>=save.buildings[8]*4-112){
					save.bar[3]-=save.buildings[8]-28;
					save.plank[3]-=save.buildings[8]*4-112;
					save.buildings[8]+=1;
					}
				break;
				case save.buildings[8]>=20:
					if(save.bar[2]>=save.buildings[8]-18 && save.plank[2]>=save.buildings[8]*4-72){
					save.bar[2]-=save.buildings[8]-18;
					save.plank[2]-=save.buildings[8]*4-72;
					save.buildings[8]+=1;
					}
				break;
				case save.buildings[8]>=10:
					if(save.bar[1]>=save.buildings[8]-8 && save.plank[1]>=save.buildings[8]*4-32){
					save.bar[1]-=save.buildings[8]-8;
					save.plank[1]-=save.buildings[8]*4-32;
					save.buildings[8]+=1;
					}
				break;
				case save.buildings[8]>=0:
					if(save.bar[0]>=2+save.buildings[8]  && save.plank[0]>=8+save.buildings[8]*4 ){
					save.bar[0]-=2+save.buildings[8];
					save.plank[0]-=8+save.buildings[8]*4;
					save.buildings[8]+=1;
					}
				break;
			}
			updateBuildingCost(8);
		break;
		case 9:
			switch(true){
				case save.buildings[9]>=52:
					
				break;
				case save.buildings[9]>=39:
					if(save.bar[3]>=save.buildings[9]-37 && save.plank[2]>=save.buildings[9]*4-148){
					save.bar[3]-=save.buildings[9]-37;
					save.plank[3]-=save.buildings[9]*4-148;
					save.buildings[9]+=1;
					}
				break;
				case save.buildings[9]>=26:
					if(save.bar[2]>=save.buildings[9]-26 && save.plank[2]>=save.buildings[9]*4-96){
					save.bar[2]-=save.buildings[9]-26;
					save.plank[2]-=save.buildings[9]*4-96;
					save.buildings[9]+=1;
					}
				break;
				case save.buildings[9]>=13:
					if(save.bar[1]>=save.buildings[9]-11 && save.plank[1]>=save.buildings[9]*4-44){
					save.bar[1]-=save.buildings[9]-11;
					save.plank[1]-=save.buildings[9]*4-44;
					save.buildings[9]+=1;
					}
				break;
				case save.buildings[9]>=0:
					if(save.bar[0]>=2+save.buildings[9]  && save.plank[0]>=2+save.buildings[9] ){
					save.bar[0]-=2+save.buildings[9];
					save.plank[0]-=8+save.buildings[9]*4;
					save.buildings[9]+=1;
					}
				break;
			}
			updateBuildingCost(9);
		break;
	}
	updateBuildings();
	updateAllResources();
	updateSpeed();
}
//building checks
function buildingCheck(id){
	switch(id){
		case 0:
			if(save.buildings[0]>=1){
				mine();
			}
		break;
		case 1:
			if(save.buildings[1]>=1){
				switch(true){
					case save.refineryUpgraded[2]==true:
						smelt(0);
						smelt(1);
						smelt(2);
						smelt(3);
					break;
					case save.refineryUpgraded[1]==true:
						smelt(0);
						smelt(1);
						smelt(2);
					break;
					case save.refineryUpgraded[0]==true:
						smelt(0);
						smelt(1);
					break;
					default:
						smelt(0);
					break;
				}
			}
		break;
		//This way picks a random ore from the possible choices and adds progress to that. Useful...but not what we want.
		// case 1:
			// if(save.buildings[1]>=1){
				// let ore2=[];
				// save.ore.forEach(oreForEach);
				// function oreForEach(value, index, array){
					// if (value>=1){
					// ore2.push(index);
					// }
				// }
					// let result=randomInt(0,ore2.length-1)
					// smelt(ore2[result]);
				// }
		// break;
		case 2:
			if(save.buildings[2]>=1){
				chop();
			}
		break;
		case 3:
			if(save.buildings[3]>=1){
				switch(true){
					case save.sawUpgraded[2]==true:
						plane(0);
						plane(1);
						plane(2);
						plane(3);
					break;
					case save.sawUpgraded[1]==true:
						plane(0);
						plane(1);
						plane(2);
					break;
					case save.sawUpgraded[0]==true:
						plane(0);
						plane(1);
					break;
					default:
						plane(0);
					break;
				}
			}
		break;
		case 4:
		break;
		case 9:
			if(save.buildings[9]>=1){
				doThink();
			}
		break;
	}
}
//upgrade checks
function upgradeCheckStart(){
	if(save.buildingsUnlocked[8]==true){
		unlockItem("bankName");
		unlockItem("bankCount");
		unlockItem("buyBank");
		unlockItem("buildingTownWrapper");
	}			
	if(save.buildingsUnlocked[7]==true){
		unlockItem("marketName");
		unlockItem("marketCount");
		unlockItem("buyMarket");
		unlockItem("buildingTownWrapper");
	}
	if(save.buildingsUnlocked[6]==true){
		unlockItem("woodshopName");
		unlockItem("woodshopCount");
		unlockItem("buyWoodshop");
		unlockItem("buildingTownWrapper");
	}
	if(save.buildingsUnlocked[5]==true){
		unlockItem("blacksmithName");
		unlockItem("blacksmithCount");
		unlockItem("buyBlacksmith");
		unlockItem("buildingTownWrapper");
	}
	if(save.buildingsUnlocked[4]==true){
		unlockItem("tavernName");
		unlockItem("tavernCount");
		unlockItem("buyTavern");
		unlockItem("buildingTownWrapper");
	}	
	if(save.buildingsUnlocked[9]==true){
		unlockItem("labName");
		unlockItem("labCount");
		unlockItem("buyLab");
		unlockItem("buildingTownWrapper");
	}
	if(save.buildingsUnlocked[1]==true){
		unlockItem("refineryName");
		unlockItem("refineryCount");
		unlockItem("buyRefinery");
		unlockItem("buildingCraftingWrapper");
	}
	if(save.buildingsUnlocked[3]==true){
		unlockItem("sawName");
		unlockItem("sawCount");
		unlockItem("buySaw");
		unlockItem("buildingCraftingWrapper");
	}
	if(save.buildingsUnlocked[2]==true){
		unlockItem("yardName");
		unlockItem("yardCount");
		unlockItem("buyYard");
		unlockItem("buildingCraftingWrapper");
	}
	if(save.buildingsUnlocked[0]==true){
		unlockItem("mineName");
		unlockItem("mineCount");
		unlockItem("buyMine");
		unlockItem("buildingCraftingWrapper");
	}
	if(save.thinkPointsTotal>=1){
		unlockItem("thinkShopWrapper");
		unlockItem("thinkShopPoints");
	}
	if(save.ore[0]>=2){enableItem("smeltButton0")}else{disableItem("smeltButton0")};
	if(save.ore[1]>=2){enableItem("smeltButton1")}else{disableItem("smeltButton1")};
	if(save.ore[2]>=2){enableItem("smeltButton2")}else{disableItem("smeltButton2")};
	if(save.ore[3]>=2){enableItem("smeltButton3")}else{disableItem("smeltButton3")};
	if(save.wood[0]>=1){enableItem("planeButton0")}else{disableItem("planeButton0")};
	if(save.wood[1]>=1){enableItem("planeButton1")}else{disableItem("planeButton1")};
	if(save.wood[2]>=1){enableItem("planeButton2")}else{disableItem("planeButton2")};
	if(save.wood[3]>=1){enableItem("planeButton3")}else{disableItem("planeButton3")};
	if(save.townUnlocked==true){unlockItem("townButton")};
}
function upgradeCheck(){
	switch(true){//amount of thinkpoints needed to unlock. also unlocks everything below it.
		case save.thinkPointsTotal>=200:
			if(save.buildingsUnlocked[8]==false){
				unlockItem("unlockButton8");
			}
		case save.thinkPointsTotal>=125:
			if(save.buildingsUnlocked[7]==false){
				unlockItem("unlockButton7");
			}
		case save.thinkPointsTotal>=80:
			if(save.buildingsUnlocked[6]==false){
				unlockItem("unlockButton6");
			}
		case save.thinkPointsTotal>=45:
			if(save.buildingsUnlocked[5]==false){
				unlockItem("unlockButton5");
			}
		case save.thinkPointsTotal>=20:
			if(save.buildingsUnlocked[4]==false){
				unlockItem("unlockButton4");
			}
		case save.thinkPointsTotal>=7:
			if(save.buildingsUnlocked[9]==false){
				unlockItem("unlockButton9");
			}
		case save.thinkPointsTotal>=5:
			if(save.buildingsUnlocked[1]==false){
				unlockItem("unlockButton1");
			}
			if(save.buildingsUnlocked[3]==false){
				unlockItem("unlockButton3");
			}
		case save.thinkPointsTotal>=2:
			if(save.buildingsUnlocked[2]==false){
				unlockItem("unlockButton2");
			}
		case save.thinkPointsTotal>=1:
			if(save.buildingsUnlocked[0]==false){
				unlockItem("unlockButton0");
			}
			unlockItem("thinkShopWrapper");
			unlockItem("thinkShopPoints");
		case save.thinkPointsTotal>=0:

			if(save.labUpgraded[0]==false){
				unlockItem("unlockButton28");
			}
			if(save.labUpgraded[1]==false){
				unlockItem("unlockButton29");
			}
			if(save.labUpgraded[2]==false){
				unlockItem("unlockButton30");
			}
		break;
	}
	switch(true){
		case save.buildings[0]>=30 && save.buildings[1]>=30 && save.refineryUpgraded[2]==true:
			if(save.mineUpgraded[2]==false){
				unlockItem("unlockButton18");
			}
		break;
		case save.buildings[0]>=20 && save.buildings[1]>=20 && save.refineryUpgraded[1]==true:
			if(save.mineUpgraded[1]==false){
				unlockItem("unlockButton17");
			}
		break;
		case save.buildings[0]>=10 && save.buildings[1]>=10 && save.refineryUpgraded[0]==true:
			if(save.mineUpgraded[0]==false){
				unlockItem("unlockButton16");
			}
		break;
	}
	switch(true){
		case save.buildings[2]>=30 && save.buildings[3]>=30 && save.sawUpgraded[2]==true:
			if(save.yardUpgraded[2]==false){
				unlockItem("unlockButton24");
			}
		break;
		case save.buildings[2]>=20 && save.buildings[3]>=20 && save.sawUpgraded[1]==true:
			if(save.yardUpgraded[1]==false){
				unlockItem("unlockButton23");
			}
		break;
		case save.buildings[2]>=10 && save.buildings[3]>=10 && save.sawUpgraded[0]==true:
			if(save.yardUpgraded[0]==false){
				unlockItem("unlockButton22");
			}
		break;
	}
	switch(true){
		case save.buildings[0]>=30:
			if(save.oreUnlocked[2]==false){
				unlockItem("unlockButton12");
			}
		case save.buildings[0]>=20:
			if(save.oreUnlocked[1]==false){
				unlockItem("unlockButton11");
			}
		case save.buildings[0]>=10:
			if(save.oreUnlocked[0]==false){
				unlockItem("unlockButton10");
			}
		case save.buildings[0]>=1:
			unlockItem("mineSpeed");
		break;
	}
	switch(true){
		case save.buildings[2]>=30:
			if(save.woodUnlocked[2]==false){
				unlockItem("unlockButton15");
			}
		case save.buildings[2]>=20:
			if(save.woodUnlocked[1]==false){
				unlockItem("unlockButton14");
			}
		case save.buildings[2]>=10:
			if(save.woodUnlocked[0]==false){
				unlockItem("unlockButton13");
			}
		case save.buildings[2]>=1:
			unlockItem("chopSpeed");
		break;
	}
	switch(true){
		case save.buildings[1]>=30:
			if(save.refineryUpgraded[2]==false && save.oreUnlocked[2]==true){
				unlockItem("unlockButton21");
			}
		case save.buildings[1]>=20:
			if(save.refineryUpgraded[1]==false && save.oreUnlocked[1]==true){
				unlockItem("unlockButton20");
			}
		case save.buildings[1]>=10:
			if(save.refineryUpgraded[0]==false && save.oreUnlocked[0]==true){
				unlockItem("unlockButton19");
			}
		break;
	}
	switch(true){
		case save.buildings[3]>=30:
			if(save.sawUpgraded[2]==false && save.woodUnlocked[2]==true){
				unlockItem("unlockButton27");
			}
		case save.buildings[3]>=20:
			if(save.sawUpgraded[1]==false && save.woodUnlocked[1]==true){
				unlockItem("unlockButton26");
			}
		case save.buildings[3]>=10:
			if(save.sawUpgraded[0]==false && save.woodUnlocked[0]==true){
				unlockItem("unlockButton25");
			}
		break;
	}
	if(save.buildings[9]>=1){
		unlockItem("thinkSpeed");
		updateThinkPoints();
	}
	if(save.oreTotal[0]>=1){
		unlockItem("oreWrapper");
		unlockItem("copperOreName");
		unlockItem("copperOre");
	}
	if(save.oreTotal[0]>=2){
		unlockItem("smeltButton0");
		unlockItem("smeltInfo");
	}
	if(save.barTotal[0]>=1){
		unlockItem("barWrapper");
		unlockItem("copperBarName");
		unlockItem("copperBar");
	}
	if(save.barTotal[0]>=2){
		unlockItem("chopButton");
	}
	if(save.oreTotal[1]>=1){
		unlockItem("ironOreName");
		unlockItem("ironOre");
		unlockItem("smeltButton1");
		unlockItem("ironBarName");
		unlockItem("ironBar");
	}
	if(save.oreTotal[2]>=1){
		unlockItem("silverOreName");
		unlockItem("silverOre");
		unlockItem("smeltButton2");
		unlockItem("silverBarName");
		unlockItem("silverBar");
	}
	if(save.oreTotal[3]>=1){
		unlockItem("goldOreName");
		unlockItem("goldOre");
		unlockItem("smeltButton3");
		unlockItem("goldBarName");
		unlockItem("goldBar");
	}
	if(save.woodTotal[0]>=1){
		unlockItem("woodWrapper");
		unlockItem("softWoodName");
		unlockItem("softWood");
		unlockItem("planeButton0");
		unlockItem("planeInfo");
	}
	if(save.plankTotal[0]>=1){
		unlockItem("plankWrapper");
		unlockItem("softPlankName");
		unlockItem("softPlank");
	}
	if(save.woodTotal[1]>=1){
		unlockItem("hardWoodName");
		unlockItem("hardWood");
		unlockItem("planeButton1");
		unlockItem("hardPlankName");
		unlockItem("hardPlank");
	}
	if(save.woodTotal[2]>=1){
		unlockItem("ebonyWoodName");
		unlockItem("ebonyWood");
		unlockItem("planeButton2");
		unlockItem("ebonyPlankName");
		unlockItem("ebonyPlank");
	}
	if(save.woodTotal[3]>=1){
		unlockItem("pearlWoodName");
		unlockItem("pearlWood");
		unlockItem("planeButton3");
		unlockItem("pearlPlankName");
		unlockItem("pearlPlank");
	}
	if(save.barTotal[0]>=2 && save.plankTotal[0]>=4){
		unlockItem("thinkButton")
	}
	if(save.buildings[4]>=1 || save.buildings[5]>=1 || save.buildings[6]>=1 || save.buildings[7]>=1 ||save.buildings[8]>=1){
		unlockItem("townButton");
	}
}
function unlockUpgrade(id){
	switch(id){
		case 30:
			save.labUpgraded[2]=true;
			lockItem("unlockButton30");
			updateSpeed();
		break;
		case 29:
			save.labUpgraded[1]=true;
			lockItem("unlockButton29");
			updateSpeed();
		break;
		case 28:
			save.labUpgraded[0]=true;
			lockItem("unlockButton28");
			updateSpeed();
		break;
		case 27:
			if(save.plank[3]>=40){
				save.sawUpgraded[2]=true;
				save.plank[3]-=40;
				lockItem("unlockButton27");
			}
		break;
		case 26:
			if(save.plank[2]>=40){
				save.sawUpgraded[1]=true;
				save.plank[2]-=40;
				lockItem("unlockButton26");
			}
		break;
		case 25:
			if(save.plank[1]>=40){
				save.sawUpgraded[0]=true;
				save.plank[1]-=40;
				lockItem("unlockButton25");
				updateSpeed();
			}
		break;
		case 24:
			if(save.plank[2]>=40 && save.plank[3]>=40){
				save.yardUpgraded[2]=true;
				save.plank[2]-=40;
				save.plank[3]-=40;
				lockItem("unlockButton24");
				updateSpeed();
			}
		break;
		case 23:
			if(save.plank[1]>=40 && save.plank[2]>=40){
				save.yardUpgraded[1]=true;
				save.plank[1]-=40;
				save.plank[2]-=40;
				lockItem("unlockButton23");
				updateSpeed();
		}
		break;
		case 22:
			if(save.plank[0]>=40 && save.plank[1]>=40){
				save.yardUpgraded[0]=true;
				save.plank[0]-=40;
				save.plank[1]-=40;
				lockItem("unlockButton22");
				updateSpeed();
		}
		break;
		case 21:
			if(save.bar[3]>=10){
				save.refineryUpgraded[2]=true;
				save.bar[3]-=10;
				lockItem("unlockButton21");
			}
		break;
		case 20:
			if(save.bar[2]>=10){
				save.refineryUpgraded[1]=true;
				save.bar[2]-=10;
				lockItem("unlockButton20");
			}
		break;
		case 19:
			if(save.bar[1]>=10){
				save.refineryUpgraded[0]=true;
				save.bar[1]-=10;
				lockItem("unlockButton19");
				updateSpeed();
			}
		break;
		case 18:
			if(save.bar[2]>=10 && save.bar[3]>=10){
				save.mineUpgraded[2]=true;
				save.bar[2]-=10;
				save.bar[3]-=10;
				lockItem("unlockButton18");
				updateSpeed();
			}
		break;
		case 17:
			if(save.bar[1]>=10 && save.bar[2]>=10){
				save.mineUpgraded[1]=true;
				save.bar[1]-=10;
				save.bar[2]-=10;
				lockItem("unlockButton17");
				updateSpeed();
			}
		break;
		case 16:
			if(save.bar[0]>=10 && save.bar[1]>=10){
				save.mineUpgraded[0]=true;
				save.bar[0]-=10;
				save.bar[1]-=10;
				lockItem("unlockButton16");
				updateSpeed();
			}
		break;
		case 15:
			if(save.plank[2]>=600){
				save.woodUnlocked[2]=true;
				save.plank[2]-=600;
				lockItem("unlockButton15");
			}
		break;
		case 14:
			if(save.plank[1]>=400){
				save.woodUnlocked[1]=true;
				save.plank[1]-=400;
				lockItem("unlockButton14");
			}
		break;
		case 13:
			if(save.plank[0]>=100){
				save.woodUnlocked[0]=true;
				save.plank[0]-=100;
				lockItem("unlockButton13");
			}
		break;
		case 12:
			if(save.bar[2]>=150){
				save.oreUnlocked[2]=true;
				save.bar[2]-=50;
				lockItem("unlockButton12");
				updateResources(02);
			}
		break;
		case 11:
			if(save.bar[1]>=100){
				save.oreUnlocked[1]=true;
				save.bar[1]-=50;
				lockItem("unlockButton11");
				updateResources(01);
			}
		break;
		case 10:
			if(save.bar[0]>=50){
				save.oreUnlocked[0]=true;
				save.bar[0]-=50;
				lockItem("unlockButton10");
				updateResources(00);
			}
		break;
		case 9:
			if(save.thinkPoints>=3){
				save.buildingsUnlocked[9]=true;
				lockItem("unlockButton9");
				unlockItem("labName");
				unlockItem("labCount");
				unlockItem("buyLab");
				unlockItem("buildingCraftingWrapper");
				save.thinkPoints-=3;
			}
		break;
		case 8:
			if(save.thinkPoints>=100){
				save.buildingsUnlocked[8]=true;
				lockItem("unlockButton8");
				unlockItem("bankName");
				unlockItem("bankCount");
				unlockItem("buyBank");
				unlockItem("buildingTownWrapper");
				save.thinkPoints-=100;
			}
		break;
		case 7:
			if(save.thinkPoints>=50){
				save.buildingsUnlocked[7]=true;
				lockItem("unlockButton7");
				unlockItem("marketName");
				unlockItem("marketCount");
				unlockItem("buyMarket");
				unlockItem("buildingTownWrapper");
				save.thinkPoints-=50;
			}
		break;
		case 6:
			if(save.thinkPoints>=40){
				save.buildingsUnlocked[6]=true;
				lockItem("unlockButton6");
				unlockItem("woodshopName");
				unlockItem("woodshopCount");
				unlockItem("buyWoodshop");
				unlockItem("buildingTownWrapper");
				save.thinkPoints-=40;
			}
		break;
		case 5:
			if(save.thinkPoints>=30){
				save.buildingsUnlocked[5]=true;
				lockItem("unlockButton5");
				unlockItem("blacksmithName");
				unlockItem("blacksmithCount");
				unlockItem("buyBlacksmith");
				unlockItem("buildingTownWrapper");
				save.thinkPoints-=30;
			}
		break;
		case 4:
			if(save.thinkPoints>=20){
				save.buildingsUnlocked[4]=true;
				lockItem("unlockButton4");
				unlockItem("tavernName");
				unlockItem("tavernCount");
				unlockItem("buyTavern");
				unlockItem("buildingTownWrapper");
				save.thinkPoints-=20;
			}
		break;
		case 3:
			if(save.thinkPoints>=2){
				save.buildingsUnlocked[3]=true;
				lockItem("unlockButton3");
				unlockItem("sawName");
				unlockItem("sawCount");
				unlockItem("buySaw");
				unlockItem("buildingCraftingWrapper");
				save.thinkPoints-=2;
			}
		break;
		case 2:
			if(save.thinkPoints>=1){
				save.buildingsUnlocked[2]=true;
				lockItem("unlockButton2");
				unlockItem("yardName");
				unlockItem("yardCount");
				unlockItem("buyYard");
				unlockItem("buildingCraftingWrapper");
				save.thinkPoints-=2;
			}
		break;
		case 1:
			if(save.thinkPoints>=2){
				save.buildingsUnlocked[1]=true;
				lockItem("unlockButton1");
				unlockItem("refineryName");
				unlockItem("refineryCount");
				unlockItem("buyRefinery");
				unlockItem("buildingCraftingWrapper");
				save.thinkPoints-=2;
			}
		break;
		case 0:
			if(save.thinkPoints>=1){
				save.buildingsUnlocked[0]=true;
				lockItem("unlockButton0");
				unlockItem("mineName");
				unlockItem("mineCount");
				unlockItem("buyMine");
				unlockItem("buildingCraftingWrapper");
				save.thinkPoints-=1;
			}
		break;
	}
	updateThinkPoints();
}
var adventuresOpen=0;
function openAdventures(){
	switch(adventuresOpen){
		case 0:
		unlockItem("adventureWrapper");
		adventuresOpen=1;
		break;
		case 1:
		lockItem("adventureWrapper");
		adventuresOpen=0;
		break;
	}
}
function genAllAdventures(){
	let x;
	for (x=0;x<4;x++){
		genAdventure(x);
	}
}
function genAdventure(slot){
	let type=randomInt(0,4);
	let adv;
	let time;
	let cost;
	let xp;
	let trgt;
	let amt;
	switch(type){
		case 0://kill X of Y
			trgt=randomInt(0,13);
			amt=randomInt(5,25);
			adv=randomInt(1,4);
			time=randomInt(60,180);
			cost=randomInt(60,250);
			xp=randomInt(80,160)
		break;
		case 1://clear X location
			trgt=randomInt(0,18);
			amt=randomInt(0,36);
			adv=randomInt(1,4);
			time=randomInt(60,180);
			cost=randomInt(80,300);
			xp=randomInt(100,300)
		break;
		case 2://kill X target
			trgt=randomInt(0,101);
			amt=randomInt(0,36);
			adv=randomInt(2,4);
			time=randomInt(90,180);
			cost=randomInt(100,500);
			xp=randomInt(300,600)
		break;
		case 3://Get X object
			trgt=randomInt(0,76);
			adv=randomInt(1,4);
			time=randomInt(60,120);
			cost=randomInt(20,60);
			xp=randomInt(50,200)
		break;
		case 4://Gather X amount of things
			trgt=randomInt(0,14);
			amt=randomInt(5,50);
			adv=randomInt(1,2);
			time=randomInt(60,90);
			cost=randomInt(0,20);
			xp=randomInt(25,100)
		break;
	}
	quests[slot]={type,time,cost,adv,xp,trgt,amt};
	save.questDeleted[slot]=false;
	updateAdventures(slot);
	updatePostable();
}
function postAdventure(slot){
	let quest=quests[slot];
	save.quest[0]=quest.type;
	save.quest[1]=quest.adv;
	save.quest[2]=quest.time;
	save.quest[3]=quest.cost;
	save.quest[4]=quest.xp;
	save.quest[5]=quest.trgt;
	save.quest[6]=quest.amt;
	// genAdventure(slot);
	deleteQuest(slot);
	save.onQuest=true;
	updatePostable();
	updateCurrentAdventure();
}
function questComplete(){
	document.getElementById("adventureCurrentTimeRemain").innerHTML="Time Remaining: <span class=highlightedText>Complete</span>";
	save.townXP+=save.quest[4];
	save.onQuest=false;
	updatePostable();
}
function deleteQuest(slot){
	document.getElementById("adventure"+slot+"Type").innerHTML="---";
	document.getElementById("adventure"+slot+"Time").innerHTML="";
	document.getElementById("adventure"+slot+"Cost").innerHTML="";
	document.getElementById("adventure"+slot+"Adv").innerHTML="";
	document.getElementById("adventure"+slot+"Xp").innerHTML="";
	save.questDeleted[slot]=true;
}

function navigateTo(page){
	switch(page){
		case 0:
			unlockItem("theMountain");
			unlockItem("theTown");
			lockItem("theTown");
			save.location=0;
			highlightItem("mountainButton");
			unhighlightItem("townButton");
		break;
		case 1:
			unlockItem("theMountain");
			unlockItem("theTown");
			lockItem("theMountain");
			save.location=1;
			highlightItem("townButton");
			unhighlightItem("mountainButton");
		break;
	}
}

function lockOnReset(){
	unlockItem("mineName");
	unlockItem("mineCount");
	unlockItem("buyMine");
	unlockItem("refineryName");
	unlockItem("refineryCount");
	unlockItem("buyRefinery");
	unlockItem("yardName");
	unlockItem("yardCount");
	unlockItem("buyYard");
	unlockItem("sawName");
	unlockItem("sawCount");
	unlockItem("buySaw");
	unlockItem("tavernName");
	unlockItem("tavernCount");
	unlockItem("buyTavern");
	unlockItem("blacksmithName");
	unlockItem("blacksmithCount");
	unlockItem("buyBlacksmith");
	unlockItem("woodshopName");
	unlockItem("woodshopCount");
	unlockItem("buyWoodshop");
	unlockItem("marketName");
	unlockItem("marketCount");
	unlockItem("buyMarket");
	unlockItem("bankName");
	unlockItem("bankCount");
	unlockItem("buyBank");
	unlockItem("labName");
	unlockItem("labCount");
	unlockItem("buyLab");
	unlockItem("buildingCraftingWrapper");
	unlockItem("buildingTownWrapper");
	unlockItem("unlockButton0");
	unlockItem("unlockButton1");
	unlockItem("unlockButton2");
	unlockItem("unlockButton3");
	unlockItem("unlockButton4");
	unlockItem("unlockButton5");
	unlockItem("unlockButton6");
	unlockItem("unlockButton7");
	unlockItem("unlockButton8");
	unlockItem("unlockButton9");
	unlockItem("unlockButton10");
	unlockItem("unlockButton11");
	unlockItem("unlockButton12");
	unlockItem("unlockButton13");
	unlockItem("unlockButton14");
	unlockItem("unlockButton15");
	unlockItem("unlockButton16");
	unlockItem("unlockButton17");
	unlockItem("unlockButton18");
	unlockItem("unlockButton19");
	unlockItem("unlockButton20");
	unlockItem("unlockButton21");
	unlockItem("unlockButton22");
	unlockItem("unlockButton23");
	unlockItem("unlockButton24");
	unlockItem("unlockButton25");
	unlockItem("unlockButton26");
	unlockItem("unlockButton27");
	unlockItem("unlockButton28");
	unlockItem("unlockButton29");
	unlockItem("unlockButton30");
	unlockItem("thinkSpeed");
	unlockItem("mineSpeed");
	unlockItem("chopSpeed");
	unlockItem("thinkShopWrapper");
	unlockItem("thinkShopPoints");
	unlockItem("thinkButton");
	unlockItem("chopButton");
	unlockItem("planeButton0");
	unlockItem("planeButton1");
	unlockItem("planeButton2");
	unlockItem("planeButton3");
	unlockItem("smeltButton0");
	unlockItem("smeltButton1");
	unlockItem("smeltButton2");
	unlockItem("smeltButton3");
	unlockItem("softPlank");
	unlockItem("softPlankName");
	unlockItem("hardPlank");
	unlockItem("hardPlankName");
	unlockItem("ebonyPlank");
	unlockItem("ebonyPlankName");
	unlockItem("pearlPlank");
	unlockItem("pearlPlankName");
	unlockItem("copperBar");
	unlockItem("copperBarName");
	unlockItem("ironBar");
	unlockItem("ironBarName");
	unlockItem("silverBar");
	unlockItem("silverBarName");
	unlockItem("goldBar");
	unlockItem("goldBarName");
	unlockItem("softWood");
	unlockItem("softWoodName");
	unlockItem("hardWood");
	unlockItem("hardWoodName");
	unlockItem("ebonyWood");
	unlockItem("ebonyWoodName");
	unlockItem("pearlWood");
	unlockItem("pearlWoodName");
	unlockItem("copperOre");
	unlockItem("copperOreName");
	unlockItem("ironOre");
	unlockItem("ironOreName");
	unlockItem("silverOre");
	unlockItem("silverOreName");
	unlockItem("goldOre");
	unlockItem("goldOreName");
	unlockItem("oreWrapper");
	unlockItem("barWrapper");
	unlockItem("woodWrapper");
	unlockItem("plankWrapper");
	unlockItem("smeltInfo");
	unlockItem("planeInfo");
	unlockItem("mountainButton");
	unlockItem("townButton");
	unlockItem("smeltProgress04");
	unlockItem("smeltProgress05");
	unlockItem("smeltProgress06");
	unlockItem("smeltProgress14");
	unlockItem("smeltProgress15");
	unlockItem("smeltProgress16");
	unlockItem("smeltProgress24");
	unlockItem("smeltProgress25");
	unlockItem("smeltProgress26");
	unlockItem("smeltProgress34");
	unlockItem("smeltProgress35");
	unlockItem("smeltProgress36");
	unlockItem("planeProgress04");
	unlockItem("planeProgress05");
	unlockItem("planeProgress06");
	unlockItem("planeProgress14");
	unlockItem("planeProgress15");
	unlockItem("planeProgress16");
	unlockItem("planeProgress24");
	unlockItem("planeProgress25");
	unlockItem("planeProgress26");
	unlockItem("planeProgress34");
	unlockItem("planeProgress35");
	unlockItem("planeProgress36");
	unlockItem("thinkProgress12");
	unlockItem("thinkProgress13");
	unlockItem("thinkProgress14");
	unlockItem("thinkProgress15");
	unlockItem("thinkProgress16");
	unlockItem("thinkProgress17");
	unlockItem("thinkProgress18");
	unlockItem("thinkProgress19");
	unlockItem("thinkProgress20");
	unlockItem("mineProgress4");
	unlockItem("mineProgress5");
	unlockItem("mineProgress6");
	unlockItem("chopProgress4");
	unlockItem("chopProgress5");
	unlockItem("chopProgress6");
	lockItem("mineName");
	lockItem("mineCount");
	lockItem("buyMine");
	lockItem("refineryName");
	lockItem("refineryCount");
	lockItem("buyRefinery");
	lockItem("yardName");
	lockItem("yardCount");
	lockItem("buyYard");
	lockItem("sawName");
	lockItem("sawCount");
	lockItem("buySaw");
	lockItem("tavernName");
	lockItem("tavernCount");
	lockItem("buyTavern");
	lockItem("blacksmithName");
	lockItem("blacksmithCount");
	lockItem("buyBlacksmith");
	lockItem("woodshopName");
	lockItem("woodshopCount");
	lockItem("buyWoodshop");
	lockItem("marketName");
	lockItem("marketCount");
	lockItem("buyMarket");
	lockItem("bankName");
	lockItem("bankCount");
	lockItem("buyBank");
	lockItem("labName");
	lockItem("labCount");
	lockItem("buyLab");
	lockItem("buildingCraftingWrapper");
	lockItem("buildingTownWrapper");
	lockItem("unlockButton0");
	lockItem("unlockButton1");
	lockItem("unlockButton2");
	lockItem("unlockButton3");
	lockItem("unlockButton4");
	lockItem("unlockButton5");
	lockItem("unlockButton6");
	lockItem("unlockButton7");
	lockItem("unlockButton8");
	lockItem("unlockButton9");
	lockItem("unlockButton10");
	lockItem("unlockButton11");
	lockItem("unlockButton12");
	lockItem("unlockButton13");
	lockItem("unlockButton14");
	lockItem("unlockButton15");
	lockItem("unlockButton16");
	lockItem("unlockButton17");
	lockItem("unlockButton18");
	lockItem("unlockButton19");
	lockItem("unlockButton20");
	lockItem("unlockButton21");
	lockItem("unlockButton22");
	lockItem("unlockButton23");
	lockItem("unlockButton24");
	lockItem("unlockButton25");
	lockItem("unlockButton26");
	lockItem("unlockButton27");
	lockItem("unlockButton28");
	lockItem("unlockButton29");
	lockItem("unlockButton30");
	lockItem("thinkSpeed");
	lockItem("mineSpeed");
	lockItem("chopSpeed");
	lockItem("thinkShopWrapper");
	lockItem("thinkShopPoints");
	lockItem("thinkButton");
	lockItem("chopButton");
	lockItem("planeButton0");
	lockItem("planeButton1");
	lockItem("planeButton2");
	lockItem("planeButton3");
	lockItem("smeltButton0");
	lockItem("smeltButton1");
	lockItem("smeltButton2");
	lockItem("smeltButton3");
	lockItem("softPlank");
	lockItem("softPlankName");
	lockItem("hardPlank");
	lockItem("hardPlankName");
	lockItem("ebonyPlank");
	lockItem("ebonyPlankName");
	lockItem("pearlPlank");
	lockItem("pearlPlankName");
	lockItem("copperBar");
	lockItem("copperBarName");
	lockItem("ironBar");
	lockItem("ironBarName");
	lockItem("silverBar");
	lockItem("silverBarName");
	lockItem("goldBar");
	lockItem("goldBarName");
	lockItem("softWood");
	lockItem("softWoodName");
	lockItem("hardWood");
	lockItem("hardWoodName");
	lockItem("ebonyWood");
	lockItem("ebonyWoodName");
	lockItem("pearlWood");
	lockItem("pearlWoodName");
	lockItem("copperOre");
	lockItem("copperOreName");
	lockItem("ironOre");
	lockItem("ironOreName");
	lockItem("silverOre");
	lockItem("silverOreName");
	lockItem("goldOre");
	lockItem("goldOreName");
	lockItem("oreWrapper");
	lockItem("barWrapper");
	lockItem("woodWrapper");
	lockItem("plankWrapper");
	lockItem("smeltInfo");
	lockItem("planeInfo");
	lockItem("townButton");
	lockItem("smeltProgress04");
	lockItem("smeltProgress05");
	lockItem("smeltProgress06");
	lockItem("smeltProgress14");
	lockItem("smeltProgress15");
	lockItem("smeltProgress16");
	lockItem("smeltProgress24");
	lockItem("smeltProgress25");
	lockItem("smeltProgress26");
	lockItem("smeltProgress34");
	lockItem("smeltProgress35");
	lockItem("smeltProgress36");
	lockItem("planeProgress04");
	lockItem("planeProgress05");
	lockItem("planeProgress06");
	lockItem("planeProgress14");
	lockItem("planeProgress15");
	lockItem("planeProgress16");
	lockItem("planeProgress24");
	lockItem("planeProgress25");
	lockItem("planeProgress26");
	lockItem("planeProgress34");
	lockItem("planeProgress35");
	lockItem("planeProgress36");
	lockItem("thinkProgress12");
	lockItem("thinkProgress13");
	lockItem("thinkProgress14");
	lockItem("thinkProgress15");
	lockItem("thinkProgress16");
	lockItem("thinkProgress17");
	lockItem("thinkProgress18");
	lockItem("thinkProgress19");
	lockItem("thinkProgress20");
	lockItem("mineProgress4");
	lockItem("mineProgress5");
	lockItem("mineProgress6");
	lockItem("chopProgress4");
	lockItem("chopProgress5");
	lockItem("chopProgress6");
}
var settingsOpen=0;
function openSettings(){
	switch(settingsOpen){
		case 0:
		unlockItem("settingsWrapper");
		settingsOpen=1;
		break;
		case 1:
		lockItem("settingsWrapper");
		settingsOpen=0;
		break;
	}
}

function devMode(value){
	save.oreTotal[0]+=value;save.oreTotal[1]+=value;save.oreTotal[2]+=value;save.oreTotal[3]+=value;save.woodTotal[0]+=value;save.woodTotal[1]+=value;save.woodTotal[2]+=value;save.woodTotal[3]+=value;save.barTotal[0]+=value;save.barTotal[1]+=value;save.barTotal[2]+=value;save.barTotal[3]+=value;save.plankTotal[0]+=value;save.plankTotal[1]+=value;save.plankTotal[2]+=value;save.plankTotal[3]+=value;save.ore[0]+=value;save.ore[1]+=value;save.ore[2]+=value;save.ore[3]+=value;save.wood[0]+=value;save.wood[1]+=value;save.wood[2]+=value;save.wood[3]+=value;save.bar[0]+=value;save.bar[1]+=value;save.bar[2]+=value;save.bar[3]+=value;save.plank[0]+=value;save.plank[1]+=value;save.plank[2]+=value;save.plank[3]+=value;save.thinkPoints+=value;save.thinkPointsTotal+=value;updateAll();
}
function devMode2(value){
	let x;
	for(x=0;x<save.buildings.length;x++){
		save.buildings[x]+=value;
		save.buildingsUnlocked[x]=true;
	}
	upgradeCheckStart();
	updateAll();
}
function devMode3(){
	let x;
	for(x=0;x<50;x++){
		unlockUpgrade(x);
	}
}
// lock and unlock
function lockItem(item){
document.getElementById(item).className = document.getElementById(item).className + " locked";
}
function unlockItem(item){
document.getElementById(item).className = document.getElementById(item).className.replace(" locked","");
}
function highlightItem(item){
document.getElementById(item).className = document.getElementById(item).className + " highlighted";
}
function unhighlightItem(item){
document.getElementById(item).className = document.getElementById(item).className.replace(" highlighted","");
}
// disable and enable
function disableItem(item){
document.getElementById(item).disabled=true;
}
function enableItem(item){
document.getElementById(item).disabled=false;
}

//reset save
function resetAll(){
	Object.assign(save,save3);
	gameSave();
	updateAll();
	lockOnReset();
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
