function generateContainer(color) {
/*
** 
**
*/
	const svgElt = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	const rectElt = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	svgElt.setAttribute("version", "1.1");
	svgElt.setAttribute("class", "brick")
	svgElt.setAttribute("width", "50");
	svgElt.setAttribute("height", "25");
	rectElt.setAttribute("class", color);
	rectElt.setAttribute("width", "50");
	rectElt.setAttribute("height", "25");
	rectElt.setAttribute("fill", color);
	rectElt.setAttribute("stroke", "black");
	rectElt.setAttribute("stroke-width", "2");
	document.getElementById("deck").appendChild(svgElt);
	svgElt.appendChild(rectElt);
};

//---------------------------------------------------------------------------//

function getRandomContainerColor() {
/*
** 
**
*/
	const randomColorNumber = (Math.floor(Math.random() * 4)) + 1;
	switch (randomColorNumber) {
		case 1:
			return "red";
			break;
		case 2:
			return "green";
			break;
		case 3:
			return "blue";
			break;
		case 4:
			return "yellow";
			break;
	}
};
const displayContainer = generateContainer(getRandomContainerColor());

//---------------------------------------------------------------------------//

function displayFullDeck() {
/*
** 
**
*/
	for (let i = 1; i < 50; i++) {
		if ((i % 10 === 0) && (i !== 0)) {
			set10ContainerLayer();
		}
		generateContainer(getRandomContainerColor());
	}
};

//---------------------------------------------------------------------------//

function set10ContainerLayer() {
/*
** 
**
*/
	const brElt = document.createElement("br");
	document.getElementById("deck").appendChild(brElt);
};

//---------------------------------------------------------------------------//

function displayContainersCount() {
/*
** 
**
*/
	const redContainersCount = document.getElementsByClassName("red").length + " red containers left";
	const greenContainersCount = document.getElementsByClassName("green").length + " green containers left";
	const blueContainersCount = document.getElementsByClassName("blue").length + " blue containers left";
	const yellowContainersCount = document.getElementsByClassName("yellow").length + " yellow containers left";
	document.getElementById("redContainersLeft").textContent = redContainersCount;
	document.getElementById("greenContainersLeft").textContent = greenContainersCount;
	document.getElementById("blueContainersLeft").textContent = blueContainersCount;
	document.getElementById("yellowContainersLeft").textContent = yellowContainersCount;
};

//---------------------------------------------------------------------------//

function unloadContainer() {
	for (var i = 0; i < document.getElementsByClassName("brick").length; i++) {
		document.getElementsByClassName("brick")[i].addEventListener("click", function(e) {
			e.target.parentNode.removeChild(e.target);
			displayContainersCount();
		});
	}
};

//---------------------------------------------------------------------------//

function displayGame() {
/*
** 
**
*/
	displayFullDeck();
	displayContainersCount();
	unloadContainer();
};

//---------------------------------------------------------------------------//

displayGame();

