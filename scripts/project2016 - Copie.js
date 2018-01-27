// YOUR NAME HERE
// HULSKEN ALEXANDRE 

// global variable for the project
var listes = document.getElementsByClassName("list");
var regles = ["news selection", {"couleur" : "gray", "bordure" : "solid white", "images" : ">>>"},
			  "news sciences", {"couleur" : "rgb(200,50,50)", "bordure" : "none", "images" :  "<img height = '20px' src = 'style/images/picto_sciences.png'/>"},
			  "news economie", {"couleur" : "rgb(50,50,100", "bordure" : "none", "images" : "<img height = '20px' src = 'style/images/picto_economie.png'/>"},
			  "news economy", {"couleur" : "rgb(50,50,100)", "bordure" : "none", "images" :  "<img height = '20px' src = 'style/images/picto_economie.png'/>"},
	          "news sport", {"couleur" : "rgb(50,150,50)", "bordure" : "none", "images" : "<img height = '20px' src = 'style/images/picto_sport.png'/>"},
		      "news culture", {"couleur" : "rgb(250,50,10)", "bordure" : "none", "images" : "<img height = '20px' src = 'style/images/picto_culture.png'/>"},
			  "news autres", {"couleur" : "darkcyan", "bordure" : "none", "images" : "<img height = '20px' src = 'style/images/picto_autres.png'/>"}];
var textcreer = "<input type='text' placeholder='votre titre' id='titre'/> <br/> <span>Si vous voulez entrer une image:</span> <input type='file'/> <p>ATTENTION: vous devrez importer vous même l'image dans le fichier image du projet si vous en selectionnez une</p> <br/> <textarea rows='10' cols='50' placeholder='Veuiller taper votre article'></textarea> <form><input type='radio' name='group' value='sciences'/>Sciences<input type='radio' name='group' value='economie'>Economie<input type='radio' name='group' value='sport'>Sport<input type='radio' name='group' value='culture'>Culture<input type='radio' name='group' value='autres'>Autres</form> <button>Créer</button>";
var creer = localStorage.getItem("creer");
if (creer){
	creer = JSON.parse(creer)
} else{
	creer = Array()
}
for (var i = 0; i<creer.length; i++){
	newsListData.push(creer[i])
}
// the number of the selected news displaid in #selectedNews
var selectedNewsNum = 0;

// the list of the numbers of kept news, diplaid in #favList
var favNewsList = localStorage.getItem("favoris");
if (favNewsList){
	favNewsList = JSON.parse(favNewsList);
} else{
	favNewsList = Array()
}//ici je retranscris la valeur que j'ai récupéré en tableau d'entiers et lui attribut un tableau vide si cette valeur est nulle

// YOUR CODE BELOW
function displaySelectedNews(){
	/* cette fonction affiche la news sélectionné dans le cadre principal
	Paramètre: aucun
	Résultat: aucun
	*/
	var titre = document.querySelectorAll("#selectedNews h1");
	var txt = document.getElementById("content");
	var figure = document.getElementsByTagName("figure");
	var im = figure[0].getElementsByTagName("img");
	var pin = document.getElementById("pinit");

	titre[0].innerHTML = newsListData[selectedNewsNum].title;
	if (newsListData[selectedNewsNum].image!="images/"){
		im[0].src = newsListData[selectedNewsNum].image;
		im[0].style.display = "";
	} else{
		im[0].style.display = "none"
	}//ici je fais disparaitre l'image principale si son article n'en possède pas, et la fait apparaitre dans le cas contraire
	pin.style.display = "";
	txt.innerHTML = newsListData[selectedNewsNum].content;
	
	punaise();
	selected();
}

function displayNewsList(){
	/* cette fonction crée la liste des news puis appelle la fonction displaySelectedNews et abonne un évènement sur chacun des éléments div qu'elle a crée
	Paramètre: aucun
	Résultat: aucun
	*/
	var filtre = document.getElementById("filter");
	var div = listes[0].getElementsByTagName("div");

	listes[0].innerHTML = "<div id='creation' class='news'>> Créer une news <</div>";
	if (filtre.value){
		var mots_cles = filtre.value.toLowerCase().split(" ");
		var cles = [];
		for (var i = 0; i<mots_cles.length; i++){
			if (mots_cles[i] != ""){
				cles.push(mots_cles[i])
			}
		}//ici je transforme la valeur du filtre en tableau de mots
		var poss=[];
		for (var i = 0; i<newsListData.length; i++){
			for (var e=0;e<cles.length;e++){
				if ((newsListData[i].title.toLowerCase().indexOf(cles[e])!=-1) && (poss.indexOf(i)==-1)){
					poss[poss.length]=i
				}
			}
		}// ici je garde en mémoire toutes les news dont l'un de ces mots apparait dans le titre
		for (var i = 0; i<poss.length; i++){
			listes[0].innerHTML = listes[0].innerHTML+createNewsItem(poss[i],"-news")
		}
	} else{
		for (var i = 0; i<newsListData.length; i++){
			listes[0].innerHTML = listes[0].innerHTML+createNewsItem(i,"-news")
		}
	}
	selected();
	
	div[0].addEventListener("click",nouvelle);
	for (var i = 1;i<div.length; i++){
		div[i].addEventListener("click",foncInt);
	}
}

function displayFavList(){
	/* cette fonction crée la liste des news favorites, appelle ensuite les fonctions punaise et selected puis abonne un évènement sur chacun des éléments crées
	Paramètre: aucun
	Résultat: aucun
	*/
	var div = listes[1].getElementsByTagName("div");
	
	listes[1].innerHTML = "";
	for (var i = 0; i<favNewsList.length; i++){
		listes[1].innerHTML = listes[1].innerHTML+createNewsItem(favNewsList[i],"-fav")
	}
	punaise()
	selected()
	
	for (var i = 0;i<div.length; i++){
		div[i].addEventListener("click",foncInt);
	}
}

function nouvelle(){
	/* cette fonction modifie le contenu de la partie principale de la page en une valeur particulière puis abonne un évènement sur l'un des boutons qu'elle a créé
	Paramètre: aucun
	Résultat: aucun
	*/
	var titre = document.querySelectorAll("#selectedNews h1");
	var txt = document.getElementById("content");
	var figure = document.getElementsByTagName("figure");
	var im = figure[0].getElementsByTagName("img");
	var pin = document.getElementById("pinit");
	var bouton = document.getElementsByTagName("button");

	selectedNewsNum = -1;
	selected();
	titre[0].innerHTML = "Créer une news";
	titre[0].style.textAlign = "center";
	im[0].style.display = "none";
	pin.style.display = "none";
	txt.innerHTML = textcreer;
	
	bouton[0].addEventListener("click",create)
}

function create(){
	/* cette fonction ajoute une nouvelle news créée à la liste newsListData puis l'affiche
	Paramètre: aucun
	Résultat: aucun
	*/
	var fenetre = document.getElementById("selectedNews");
	var inp = fenetre.getElementsByTagName("input");
	var article = fenetre.getElementsByTagName("textarea");
	var content = "";
	for (var i = 0;i<article[0].value.split("\n").length; i++){
		content = content+"<p>"+article[0].value.split("\n")[i]+"</p>"
	}
	var titre = inp[0].value;
	var valeur;
	for (var i = 0; i<inp.length; i++){
		if (inp[i].checked){
			valeur = inp[i].value
		}
	}// je cherche ici la valeur cochée
	var news = {"group":valeur,"title":titre,"image":"images/"+inp[1].value,"content":content};
	if (valeur && content && titre){
		newsListData.push(news);
		creer.push(news);
		localStorage.removeItem("creer");
		localStorage.setItem("creer",JSON.stringify(creer));
		selectedNewsNum = newsListData.length-1;
		displayNewsList();
		displaySelectedNews();
	} else{
		alert("Vous devez complèter les champs pour pouvoir créer une news.")
	}
}

function createNewsItem(n,id){
	/* cette fonction renvoie une chaine de caractères contenant un élément div correspondant à une news et ayant un id de la forme n suivit de la chaîne de caractères id
	Paramètres:
	  -<n> (entier): l'indice dans la liste liste newsListData
	  -<id> (chaîne de caractères): la chaîne qui va suivre l'indice dans l'id de la balise HTML
	Résultat:
	  une chaine de caractères contenant une balise HTML
	*/
	return "<div id='"+n+id+"' class='news "+newsListData[n].group+"'></div>"
}

function punaise(){
	/* cette fonction vérifie si l'indice selectedNewsNum est dans favNewsList et change l'image de la punaise en conséquence
	Paramètre: aucun
	Résultat: aucun
	*/
	var pin = document.getElementById("pinit");
	
	if (favNewsList.indexOf(selectedNewsNum)!=-1){
		pin.src = "style/images/pined.png"
	} else {
		pin.src = "style/images/unpined.png"
	}
}

function selected(){
	/* cette fonction sert à remettre les propriétées CSS de chacun des éléments div fils d'un élément de classe list puis modifie celles de la news sélectionnée
	Paramètre: aucun
	Résultat: aucun
	*/
	var div = listes[0].getElementsByTagName("div");
	var div2 = listes[1].getElementsByTagName("div");
	
	for (var i = 1; i<div.length; i++){
		div[i].className = "news "+newsListData[parseInt(div[i].getAttribute("id"))].group;
		if (parseInt(div[i].getAttribute("id"))==selectedNewsNum){
			div[i].className = "news selection";
		};
		div[i].innerHTML = regles[regles.indexOf(div[i].className)+1].images+" "+newsListData[parseInt(div[i].getAttribute("id"))].title;
		div[i].style.backgroundColor = regles[regles.indexOf(div[i].className)+1].couleur;
		div[i].style.borderTop = regles[regles.indexOf(div[i].className)+1].bordure;
		div[i].style.borderBottom = regles[regles.indexOf(div[i].className)+1].bordure;
	};
	for (var i = 0; i<div2.length; i++){
		div2[i].className = "news "+newsListData[parseInt(div2[i].getAttribute("id"))].group;
		if (parseInt(div2[i].getAttribute("id"))==selectedNewsNum){
			div2[i].className = "news selection";
		};
		div2[i].innerHTML = regles[regles.indexOf(div2[i].className)+1].images+" "+newsListData[parseInt(div2[i].getAttribute("id"))].title;
		div2[i].style.backgroundColor = regles[regles.indexOf(div2[i].className)+1].couleur;
		div2[i].style.borderTop = regles[regles.indexOf(div2[i].className)+1].bordure;
		div2[i].style.borderBottom = regles[regles.indexOf(div2[i].className)+1].bordure;
	};// ici je réattribut chacune des classes des éléments div et change celle correspondante à la news sélectionnée puis j'applique les règles CSS qui correspond à chacun de ces div
}

function foncInt(){
	/* cette fonction met à jour la valeur des selectedNewsNum puis appelle la fonction displaySelectedNews
	Paramètre: aucun
	Résultat: aucun
	*/
	selectedNewsNum = parseInt(this.getAttribute("id"));
	displaySelectedNews()
}

function favori(){
	/* cette fonction ajoute selectedNewsNum à favNewsList si il n'y est pas et l'enlève sinon puis appelle la fonction displayFavList
	Paramètre: aucun
	Résultat: aucun
	*/
	if (favNewsList.indexOf(selectedNewsNum) == -1){
		favNewsList[favNewsList.length] = selectedNewsNum;
	} else{
		favNewsList.splice(favNewsList.indexOf(selectedNewsNum),1);
	};
	localStorage.removeItem("favoris");
	localStorage.setItem("favoris",JSON.stringify(favNewsList));
	displayFavList();
}

function setupListener(){
	/* cette fonction gère l'ensemble des autres fonctions et leur ordre d'appel une fois qu'elle est appellée
	Paramètre: aucun
	Résultat: aucun
	*/
	var filtre = document.getElementById("filter");
	var pin = document.getElementById("pinit");
	var titre = document.getElementsByTagName("h1");
	
	displayNewsList();
	displaySelectedNews();
	displayFavList();
	
	filtre.addEventListener("keyup",displayNewsList);
	pin.addEventListener("click",favori);
}
window.addEventListener("load",setupListener)