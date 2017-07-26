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
			brElt();
		}
		generateContainer(getRandomContainerColor(), i);
	}
};

//---------------------------------------------------------------------------//

/**
 * @function brElt()
 * (=> inserts a <br /> tag)
 *
 * @const {method} brElt - a <br> tag creating method
 */

function brElt() {
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
//---------------------------------------------------------------------------//

/**
 *
 *
 *
 *
 *
 *
 */

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
	let score = 0;
	document.getElementById("score").innerHTML = score + " $";
	const unloadedContainersColorArray = [];
	const unloadedContainersIdArray = [];
	const scoreArray = [];
	const serie = ["x"];
	
	for (let i = 0; i < document.getElementsByClassName("brick").length; i++) {
		document.getElementsByTagName("rect")[i].addEventListener("click", function(e) {
			if (isRemovable(e.target)) {
				window.clearTimeout(timeoutId);
				document.getElementById("alert").style.visibility = "hidden";
				unloadedContainersColorArray.push(e.target.getAttribute("fill"));
				unloadedContainersIdArray.push(e.target.getAttribute("id"));
				switch (e.target.getAttribute("fill")) {
					case "hsl(0, 80%, 50%)":
						if (redBricks(unloadedContainersColorArray)) {
							score = displayScore(e.target, unloadedContainersColorArray, score, 10, 0, serie);
							break;
						} else {
							score = displayScore(e.target, unloadedContainersColorArray, score, 0, 30, serie);
							break;
						}
					case "hsl(120, 80%, 50%)":
						if(greenBricks(unloadedContainersColorArray)) {
							score = displayScore(e.target, unloadedContainersColorArray, score, 10, 0, serie);
						} else {
							score = displayScore(e.target, unloadedContainersColorArray, score, 0, 30, serie);
						}
						break;
					case "hsl(240, 80%, 50%)":
						if(blueBricks(unloadedContainersColorArray, unloadedContainersIdArray)) {
							score = displayScore(e.target, unloadedContainersColorArray, score, 10, 0, serie);
						} else {
							score = displayScore(e.target, unloadedContainersColorArray, score, 0, 30, serie);
						}
						break;
					case "hsl(60, 80%, 50%)":
						if(yellowBricks(unloadedContainersColorArray, unloadedContainersIdArray)) {
							score = displayScore(e.target, unloadedContainersColorArray, score, 10, 0, serie);
						} else {
							score = displayScore(e.target, unloadedContainersColorArray, score, 0, 30, serie);
						}
						break;
					case "hsl(0, 0%, 0%)":
						if(blackBricks(unloadedContainersColorArray)) {
							score = displayScore(e.target, unloadedContainersColorArray, score, 50, 0, serie);
						} else {
							score = displayScore(e.target, unloadedContainersColorArray, score, 0, 150, serie);
						}
						break;
				}
				e.target.parentNode.removeChild(e.target);
				displayContainersCount();
			} else {
				cannotUnloadAlert();
			}	
		});
	}
};

//---------------------------------------------------------------------------//

/**
 *
 *
 *
 *
 *
 *
 */

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
let timeoutId;

function eraseAlert() {
	timeoutId = window.setTimeout(function() {
		document.getElementById("alert").style.visibility = "hidden";
	}, 5000);
}

function cannotUnloadAlert() {
	window.clearTimeout(timeoutId);
	document.getElementById("alert").innerHTML = "";
	document.getElementById("alert").style.visibility = "visible";
	document.getElementById("alert").innerHTML += "you cannot remove this container " +
 	 " => please start emptying on top of the stockpile";
	eraseAlert();
};

//---------------------------------------------------------------------------//

/**
 *
 *
 *
 *
 *
 *
 */

function redBricks(arr) {
	if (arr.length <= 5) {
		return true;
	} else {
		const sliced = arr.slice(-6, -1);
		if (sliced.indexOf("hsl(0, 80%, 50%)") !== -1) {
			return true;
		} else {

			return false;
		}
	}
};

//---------------------------------------------------------------------------//

/**
 *
 *
 *
 *
 *
 *
 */

function greenBricks(arr) {
	if (arr.length <= 1) {
		return true;
	} else {
		if (arr[arr.length-2] === "hsl(0, 80%, 50%)") {
			return false;
		} else {
			return true;
		}
	}
};

//---------------------------------------------------------------------------//

/**
 *
 *
 *
 *
 *
 *
 */

function blueBricks(colorArr, idArr) {
	const x = idArr[idArr.length-2];
	const y = idArr[idArr.length-1];
	if (colorArr[colorArr.length-2] === "hsl(240, 80%, 50%)") {
		if ((x >= 0 && x < 10) && (y >= 0 && y < 10) ||
		  (x >= 10 && x < 20) && (y >= 10 && y < 20) ||
		  (x >= 20 && x < 30) && (y >= 20 && y < 30) ||
		  (x >= 30 && x < 40) && (y >= 30 && y < 40) ||
		  (x >= 40 && x < 50) && (y >= 40 && y < 50)) {
			return false;
		} else {
			return true
		}
	} else {
		return true;
	}
};

//---------------------------------------------------------------------------//

/**
 *
 *
 *
 *
 *
 *
 */

function yellowBricks(colorArr, idArr) {
	if (idArr.length === 1) {
		return true;
	} else {
		const x = idArr[idArr.length-2].split("");
		const y = idArr[idArr.length-1].split("");
		if (colorArr[colorArr.length-2] === "hsl(60, 80%, 50%)") {
			if (x[x.length-1] === y[y.length-1]) {
				return false;
			} else {
				return true;
			}
		} else {
			return true;
		}
	}
}

//---------------------------------------------------------------------------//

/**
 *
 *
 *
 *
 *
 *
 */

function blackBricks(arr) {
	const colors = ["hsl(0, 80%, 50%)", "hsl(120, 80%, 50%)", "hsl(240, 80%, 50%)", "hsl(60, 80%, 50%)"];
	const sliced = arr.slice(-5, -1);
	for (var i = 0; i < colors.length; i++) {
		if (!sliced.includes(colors[i])) {
			console.log(false);
			return false;
		}
	}
	console.log(true);
	return true;
}


//---------------------------------------------------------------------------//

/**
 *
 *
 *
 *
 *
 *
 */

function displayScore(target, colorArr, score, plus, minus, serie) {
	for (let i = colorArr.length-1; i < colorArr.length; i++) {
		if (plus) {
			if (colorArr[i] === colorArr[i-1]) {
				serie.push("x");
				if (serie.length >= 3) {
					score += 3 * plus;
				} else if (serie.length === 2) {
					score += 2 * plus;
				} else {
					score += plus;
				}
			} else {
				for (let j = serie.length; j > 1; j--) {
					serie.pop();
				}
				score += plus;
			}
		} else {
			for (let j = serie.length; j > 0; j--) {
				serie.pop();
			}
			score -= minus;
		}	
	}

	if (score) {
		document.getElementById("score").innerHTML = score + ".000 $";
	} else {
		document.getElementById("score").innerHTML = score + " $";
	}
	return score;
};

//---------------------------------------------------------------------------//
//---------------------------------------------------------------------------//

/**
 *
 *
 *
 *
 *
 *
 */

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

/**
 *
 *
 *
 *
 *
 *
 */

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

/**
 *
 *
 *
 *
 *
 *
 */

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

/**
 * @function remainingContainersArray()
 * (=> creates an empty array, then fills it through a loop with indexes of all
 *   containers remaining onscreen)
 *
 * @const {array} remainingContainersArray - an empty array
 * @const {method} rectElt - a <rect> tag name collecting method
 */

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
//---------------------------------------------------------------------------//

/**
 *
 *
 *
 *
 *
 *
 */

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