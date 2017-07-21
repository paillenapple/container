/**
 * @function generateContainer()
 * (=> displays 50 times a basic "container" / SVG rectangle)
 * @param {callback} getRandomContainerColor - a random color picker function
 * @param {number | integer} i - the loop index
 * 
 * OR (on condition)
 *
 * @function set10ContainerLayer()
 * (=> inserts a <br /> tag)
 */

function displayFullDeck() {
	for (let i = 0; i < 50; i++) {
		if ((i % 10 === 0) && (i !== 0)) {
			set10ContainerLayer();
		}
		generateContainer(getRandomContainerColor(), i);
	}
};

//---------------------------------------------------------------------------//

/**
 * @function set10ContainerLayer()
 * (=> inserts a <br /> tag)
 *
 * @const {method} brElt - a <br> tag creating method
 */

function set10ContainerLayer() {
	const brElt = document.createElement("br");
	document.getElementById("deck").appendChild(brElt);
};

//---------------------------------------------------------------------------//

/**
 * @function getRandomContainerColor()
 * (=> set a random color)
 *
 * @const {number | integer} randomColorNumber - a random integer between 1 and 4
 *   which defines a random color (R, G, B, or Y)
 */

function getRandomContainerColor() {
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

//---------------------------------------------------------------------------//

/**
 * @function generateContainer()
 * (=> generates a SVG random-color rectangle)
 * @param {string} color - the random color defined by getRandomContainerColor() function
 * @param {number | integer} index - the displayfullDeck() function loop index
 *
 * @const {method} svgElt - a SVG object creating method
 * @const {method} rectElt - a SVG rectangle creating method
 */

function generateContainer(color, index) {
	const svgElt = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	const rectElt = document.createElementNS("http://www.w3.org/2000/svg", "rect");
	svgElt.setAttribute("version", "1.1");
	svgElt.setAttribute("class", "brick");
	svgElt.setAttribute("width", "100");
	svgElt.setAttribute("height", "50");
	rectElt.setAttribute("class", color);
	rectElt.setAttribute("id", index);
	rectElt.setAttribute("width", "100");
	rectElt.setAttribute("height", "50");
	rectElt.setAttribute("fill", color);
	rectElt.setAttribute("stroke", "black");
	rectElt.setAttribute("stroke-width", "2");
	document.getElementById("deck").appendChild(svgElt);
	svgElt.appendChild(rectElt);
};

//---------------------------------------------------------------------------//

/**
 * @function displayContainersCount()
 * (=> displays the number of each color class' objects remaining onscreen)
 *
 * @const {method} redContainersCount - a "red" classname objects collecting method
 * @const {method} GreenContainersCount - a "green" classname objects collecting method
 * @const {method} blueContainersCount - a "blue" classname objects collecting method
 * @const {method} yellowContainersCount - a "yellow" classname objects collecting method
 */

function displayContainersCount() {
	const redContainersCount = document.getElementsByClassName("red").length +
	  " red container(s) left";
	const greenContainersCount = document.getElementsByClassName("green").length +
	  " green container(s) left";
	const blueContainersCount = document.getElementsByClassName("blue").length +
	  " blue container(s) left";
	const yellowContainersCount = document.getElementsByClassName("yellow").length +
	  " yellow container(s) left";
	document.getElementById("remainingRedContainers").textContent = redContainersCount;
	document.getElementById("remainingGreenContainers").textContent = greenContainersCount;
	document.getElementById("remainingBlueContainers").textContent = blueContainersCount;
	document.getElementById("remainingYellowContainers").textContent = yellowContainersCount;
};

//---------------------------------------------------------------------------//

/**
 * @function unloadContainer()
 * (=> allows to remove a container by clicking on it)
 *
 * @method e.target.parentNode.removeChild(e.target)
 * (=> removes a container by clicking on it)
 * @function displayContainersCount()
 * (=> updates number of remaining containers when removing one)
 *
 * OR (on condition)
 *
 * @function alreadyUnloadedAlert()
 * (=> displays a 5-second alert when clicking on an already empty storage location)
 */

function unloadContainer() {
	for (let i = 0; i < document.getElementsByClassName("brick").length; i++) {
		document.getElementsByClassName("brick")[i].addEventListener("click", function(e) {
			if (e.target.getAttribute("class") !== "brick") {
				e.target.parentNode.removeChild(e.target);
				displayContainersCount();
			} else {
				alreadyUnloadedAlert();
			}
		});
	}
};

//---------------------------------------------------------------------------//

/**
 * @function alreadyUnloadAlert()
 * (=> displays a 5-second alert when clicking on an already empty storage location)
 */

function alreadyUnloadedAlert() {
	document.getElementById("alert").innerHTML = "";
	document.getElementById("alert").innerHTML += "this container has already" +
	  " been unloaded => choose another, please";
	window.setTimeout(function() {
  		document.getElementById("alert").innerHTML = "";
	}, 5000);
};

//---------------------------------------------------------------------------//

/**
 * @function getRemainingContainersId()
 * (=> creates an empty array, then fills it through a loop with indexes of all
 *   containers remaining onscreen)
 *
 * @const {array} remainingContainersArray - an empty array
 * @const {method} rectElt - a <rect> tag name collecting method
 */

function getRemainingContainersId() {
	const remainingContainersArray = [];
	const rectElt = document.getElementsByTagName("rect");
	for (let i = 0; i < rectElt.length; i++) {
		if (rectElt[i].getAttribute("id") !== null) {
			remainingContainersArray.push(rectElt[i].getAttribute("id"));
		}
	}
	console.log(remainingContainersArray);
}

//---------------------------------------------------------------------------//

/**
 * @function displayGame()
 * (=> executes all previously described functions / displays game onscreen)
 */

function displayGame() {
	displayFullDeck();
	displayContainersCount();
	unloadContainer();
	document.getElementById("display").addEventListener("click", getRemainingContainersId);
};

//---------------------------------------------------------------------------//

displayGame();
