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
	const randomColorNumber = (Math.floor(Math.random() * 4));
	switch (randomColorNumber) {
		case 0:
			return "hsl(0, 80%, 50%)";
			break;
		case 1:
			return "hsl(120, 80%, 50%)";
			break;
		case 2:
			return "hsl(240, 80%, 50%)";
			break;
		case 3:
			return "hsl(60, 80%, 50%)";
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
	svgElt.setAttribute("width", "90");
	svgElt.setAttribute("height", "50");
	rectElt.setAttribute("class", color);
	rectElt.setAttribute("id", index);
	rectElt.setAttribute("width", "90");
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
	const redContainersCount = document.getElementsByClassName("hsl(0, 80%, 50%)").length +
	  " red container(s) left";
	const greenContainersCount = document.getElementsByClassName("hsl(120, 80%, 50%)").length +
	  " green container(s) left";
	const blueContainersCount = document.getElementsByClassName("hsl(240, 80%, 50%)").length +
	  " blue container(s) left";
	const yellowContainersCount = document.getElementsByClassName("hsl(60, 80%, 50%)").length +
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

function redBricks(arr) {
	if (arr.length < 5) {
		return true;
	} else {
		let sliced = arr.slice(-5);
		if (sliced.indexOf("hsl(0, 80%, 50%)") !== -1) {
			return true;
		} else {
			return false;
		}
	}
};

function unloadContainer() {
	let score = 0;
	document.getElementById("score").innerHTML = score + " $";
	const unloadedContainersColorArray = [];
	for (let i = 0; i < document.getElementsByClassName("brick").length; i++) {
		document.getElementsByTagName("rect")[i].addEventListener("click", function(e) {
			if (isRemovable(e.target)) {
				if (document.getElementById("alert").style.visibility === "visible") {
					document.getElementById("alert").style.visibility = "hidden";
				}
				switch (e.target.getAttribute("fill")) {
					case "hsl(0, 80%, 50%)":
						redBricks(unloadedContainersColorArray);
						break;
					case "hsl(120, 80%, 50%)":
						console.log("green")
						break;
					case "hsl(240, 80%, 50%)":
						console.log("blue")
						break;
					case "hsl(60, 80%, 50%)":
						console.log("yellow")
						break;
				}
				e.target.parentNode.removeChild(e.target);
				displayContainersCount();
				score = displayScore(e.target, unloadedContainersColorArray, score);
			} else {
				cannotUnloadAlert();
			}	
		});
	}
};

function displayScore(target, arr, score) {	
	arr.push(target.getAttribute("fill"));
	for (let i = arr.length-1; i < arr.length; i++) {
		if (arr.length === 1 ||
		  arr[i-1] !== target.getAttribute("fill")) {
			score += 10;
		} else if (arr[i-1] === target.getAttribute("fill") &&
		  arr[i-2] === target.getAttribute("fill")) {
			score += 30;
		} else if (arr[i-1] === target.getAttribute("fill")) {
			score += 20;
		}
	}
	document.getElementById("score").innerHTML = score + ".000 $";
	return score;
};

function isRemovable(target) {
	let targetId = target.getAttribute("id");
	if (document.getElementsByClassName("brick")[targetId-10] === undefined ||
		  !document.getElementsByClassName("brick")[targetId-10].childNodes.length) {
		return true;
	} else {
		return false;
	}
}
//---------------------------------------------------------------------------//

/**
 * @function alreadyUnloadedAlert()
 * (=> displays a 5-second alert when clicking on an already empty storage location)
 */

function cannotUnloadAlert() {
	document.getElementById("alert").innerHTML = "";
	document.getElementById("alert").style.visibility = "visible";
	document.getElementById("alert").innerHTML += "you cannot remove this container " +
	  " => please start emptying on top of the stockpile";
	window.setTimeout(function() {
  		document.getElementById("alert").style.visibility = "hidden";
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

function remainingContainersArray() {
	const remainingContainersArray = [];
	const rectElt = document.getElementsByTagName("rect");
	for (let i = 0; i < rectElt.length; i++) {
		if (rectElt[i].getAttribute("id") !== null) {
			remainingContainersArray.push(rectElt[i].getAttribute("id"));
		}
	}
	return remainingContainersArray;
};

//---------------------------------------------------------------------------//

function selectRemainingContainers() {
	const rectElt = document.getElementsByTagName("rect");
	let max3 = 3;
	if (rectElt.length < 3) {
		max3 = rectElt.length;
	}
	const remainingContainers = remainingContainersArray();
	const randomContainers = [];
	for (var i = 0; i < max3; i++) {
		const randomRemainingContainer = Math.floor(Math.random()*remainingContainers.length);
		randomContainers.push(remainingContainers[randomRemainingContainer]);
		remainingContainers.splice(randomRemainingContainer, 1);
	}
	return randomContainers;
};

//---------------------------------------------------------------------------//

function extraDocker() {
	const dockers = document.getElementById("dockers");
	let extraDockers = 3;
	dockers.innerHTML = extraDockers + " extra dockers left";
	dockers.addEventListener("click", function() {
		if (extraDockers > 1) {
			extraDockers--;
			dockers.innerHTML = extraDockers + " extra dockers left";
			switchContainersColors();
		} else {
			switchContainersColors();
			extraDockers--;
			dockers.innerHTML = extraDockers + " extra docker left";
			dockers.disabled = true;
		}
	});	
};

//---------------------------------------------------------------------------//

function switchContainersColors() {
	const threeRemainingContainers = selectRemainingContainers();
	threeRemainingContainers.forEach(function(cont) {
		const basicColor = document.getElementById(cont).getAttribute("fill");
		let newColor = getRandomContainerColor();
		const blackMarket = Math.floor(Math.random() * 5);
		if (blackMarket === 0) {
			newColor = "hsl(0, 0%, 0%)";
		}
		while (basicColor === newColor) {
			newColor = getRandomContainerColor();
		}
		document.getElementById(cont).setAttribute("fill", newColor);
		document.getElementById(cont).setAttribute("class", newColor);
		displayContainersCount();
	});
};

//---------------------------------------------------------------------------//

function reloadGame() {
	document.getElementById("reload").addEventListener("click", function() {
		document.location.reload(true);
	});
};

//---------------------------------------------------------------------------//

/**
 * @function displayGame()
 * (=> executes all previously described functions / displays game onscreen)
 */

function displayGame() {
	displayFullDeck();
	displayContainersCount();
	unloadContainer();
	extraDocker();
	reloadGame();
};

//---------------------------------------------------------------------------//

displayGame();