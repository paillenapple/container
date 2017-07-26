//---------------------------------------------------------------------------//
//displayFullDeck() function and subfunctions--------------------------------//
//---------------------------------------------------------------------------//

/**
 * @function displayFullDeck() 
 * (=> displays 50 containers)
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
 * @const {number | integer} randomColorNumber - a random integer between 0 and 3
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
 * (=> generates a SVG random-colored rectangle)
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
//displayContainersCount() function------------------------------------------//
//---------------------------------------------------------------------------//

/**
 * @function displayContainersCount()
 * (=> displays the number of each color class' objects remaining onscreen)
 *
 * @const {string} redContainersCount - displays the number of remaining red containers
 * @const {string} GreenContainersCount - displays the number of remaining green containers
 * @const {string} blueContainersCount - displays the number of remaining blue containers
 * @const {string} yellowContainersCount - displays the number of remaining yellow containers
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
//displayContainersCount() function and subfunctions-------------------------//
//---------------------------------------------------------------------------//

/**
 * @function unloadContainer()
 * (=> allows to remove a container by clicking on it)
 *
 * @const {array} unloadedContainersColorArray - an empty array to be filled with each
 *  removed container's fill attribute
 * @const {array} unloadedContainersIdArray - an empty array to be filled with each
 *  removed container's id attribute
 * @const {array} singleColorStreak - an array to be incremented with an "x" for each removed
 *  container in the current color streak
 */

function unloadContainer() {
	
	let score = 0;
	document.getElementById("score").innerHTML = score + " $";

	const unloadedContainersColorArray = [];
	const unloadedContainersIdArray = [];
	const singleColorStreak = ["x"];
	
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
							score = displayScore(e.target, unloadedContainersColorArray, score, 10, 0, singleColorStreak);
							break;
						} else {
							score = displayScore(e.target, unloadedContainersColorArray, score, 0, 30, singleColorStreak);
							break;
						}
					case "hsl(120, 80%, 50%)":
						if(greenBricks(unloadedContainersColorArray)) {
							score = displayScore(e.target, unloadedContainersColorArray, score, 10, 0, singleColorStreak);
						} else {
							score = displayScore(e.target, unloadedContainersColorArray, score, 0, 30, singleColorStreak);
						}
						break;
					case "hsl(240, 80%, 50%)":
						if(blueBricks(unloadedContainersColorArray, unloadedContainersIdArray)) {
							score = displayScore(e.target, unloadedContainersColorArray, score, 10, 0, singleColorStreak);
						} else {
							score = displayScore(e.target, unloadedContainersColorArray, score, 0, 30, singleColorStreak);
						}
						break;
					case "hsl(60, 80%, 50%)":
						if(yellowBricks(unloadedContainersColorArray, unloadedContainersIdArray)) {
							score = displayScore(e.target, unloadedContainersColorArray, score, 10, 0, singleColorStreak);
						} else {
							score = displayScore(e.target, unloadedContainersColorArray, score, 0, 30, singleColorStreak);
						}
						break;
					case "hsl(0, 0%, 0%)":
						if(blackBricks(unloadedContainersColorArray)) {
							score = displayScore(e.target, unloadedContainersColorArray, score, 100, 0, singleColorStreak);
						} else {
							score = displayScore(e.target, unloadedContainersColorArray, score, 0, 150, singleColorStreak);
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
 * @function isRemovable()
 * (=> defines if a container is removable (= is on top of the stockpile) or not)
 * @param {object} target - the clicked container
 * @returns {boolean} - true if removable, false otherwise
 *
 * @const {string} targetId - the clicked container id attribute
 */

function isRemovable(target) {

	const targetId = target.getAttribute("id");
	
	if (document.getElementsByClassName("brick")[targetId-10] === undefined ||
		  !document.getElementsByClassName("brick")[targetId-10].childNodes.length) {
		return true;
	} else {
		return false;
	}
}

//---------------------------------------------------------------------------//

/**
 * @function cannotUnloadAlert()
 * (=> displays an alert when clicking on an irremovable container)
 *
 * @function hideAlert()
 * (=> hide the alert after 5 seconds)
 */

let timeoutId;

function cannotUnloadAlert() {
	window.clearTimeout(timeoutId);
	document.getElementById("alert").innerHTML = "";
	document.getElementById("alert").style.visibility = "visible";
	document.getElementById("alert").innerHTML += "you cannot remove this container " +
 	 " => please start emptying on top of the stockpile";
	hideAlert();
};

function hideAlert() {
	timeoutId = window.setTimeout(function() {
		document.getElementById("alert").style.visibility = "hidden";
	}, 5000);
}

//---------------------------------------------------------------------------//

/**
 * @function redBricks()
 * (=> when clicking on a red container, defines if the movement is allowed)
 * @param {array} colorArr - the now-filled array containing each removed container's fill attribute
 * @returns {boolean} - true if, according to the rules, the movement is allowed; false otherwise
 *
 * const {array} last5Colors - last five values of the (colorArr) array
 */

function redBricks(colorArr) {
	if (colorArr.length <= 5) {
		return true;
	} else {
		const last5colors = colorArr.slice(-6, -1);
		if (last5colors.indexOf("hsl(0, 80%, 50%)") !== -1) {
			return true;
		} else {

			return false;
		}
	}
};

//---------------------------------------------------------------------------//

/**
 * @function greenBricks()
 * (=> when clicking on a green container, defines if the movement is allowed)
 * @param {array} colorArr - the now-filled array containing each removed container's fill attribute
 * @returns {boolean} - true if, according to the rules, the movement is allowed; false otherwise
 */

function greenBricks(colorArr) {
	if (colorArr.length <= 1) {
		return true;
	} else {
		if (colorArr[colorArr.length-2] === "hsl(0, 80%, 50%)") {
			return false;
		} else {
			return true;
		}
	}
};

//---------------------------------------------------------------------------//

/**
 * @function blueBricks()
 * (=> when clicking on a blue container, defines if the movement is allowed)
 * @param {array} colorArr - the now-filled array containing each removed container's fill attribute
 * @param {array} idArr - the now-filled array containing each removed container's id attribute
 * @returns {boolean} - true if, according to the rules, the movement is allowed; false otherwise
 *
 * @const {string} x - the second last clicked container's id attribute
 * @const {string} y - the last clicked container's id attribute
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
 * @function yellowBricks()
 * (=> when clicking on a yellow container, defines if the movement is allowed)
 * @param {array} colorArr - the now-filled array containing each removed container's fill attribute
 * @param {array} idArr - the now-filled array containing each removed container's id attribute
 * @returns {boolean} - true if, according to the rules, the movement is allowed; false otherwise
 *
 * @const {arr} x - the second last clicked container's id attribute (integer), then
     splitted ("") into an array
 * @const {arr} y - the last clicked container's id attribute (integer), then
     splitted ("") into an array
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
 * @function blackBricks()
 * (=> when clicking on a black container, defines if the movement is allowed)
 * @param {array} colorArr - the now-filled array containing each removed container's fill attribute
 * @returns {boolean} - true if, according to the rules, the movement is allowed; false otherwise
 *
 * @const {arr} colors - the RGBY array
 * @const {arr} last4Colors - last four values of the (colorArr) array
 */

function blackBricks(colorArr) {
	const colors = ["hsl(0, 80%, 50%)", "hsl(120, 80%, 50%)", "hsl(240, 80%, 50%)", "hsl(60, 80%, 50%)"];
	const last4Colors = colorArr.slice(-5, -1);
	for (var i = 0; i < colors.length; i++) {
		if (!last4Colors.includes(colors[i])) {
			return false;
		}
	}

	return true;
}


//---------------------------------------------------------------------------//

/**
 * @function displayScore()
 * (=> increments/decrements and displays score/gains)
 * @param {object} target - the clicked container 
 * @param {array} colorArr - the now-filled array containing each removed container's fill attribute
 * @param {number | integer} score - score/gains as before this turn's increment/decrement
 * @param {number | integer} plus - number to be incremented to score parameter
 * @param {number | integer} minus - number to be decremented from score parameter
 * @param {array} singleColorStreak - an array filled with as many "x" as the current
     color streak length
 */

function displayScore(target, colorArr, score, plus, minus, singleColorStreak) {
	for (let i = colorArr.length-1; i < colorArr.length; i++) {
		if (plus) {
			if (colorArr[i] === colorArr[i-1]) {
				singleColorStreak.push("x");

				if (singleColorStreak.length >= 3) {
					score += 3 * plus;
				} else if (singleColorStreak.length === 2) {
					score += 2 * plus;
				} else {
					score += plus;
				}
			} else {
				for (let j = singleColorStreak.length; j > 1; j--) {
					singleColorStreak.pop();
				}
				score += plus;
			}
		} else {
			for (let j = singleColorStreak.length; j > 0; j--) {
				singleColorStreak.pop();
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
//extraDocker() function and subfunctions------------------------------------//
//---------------------------------------------------------------------------//

/**
* @function extraDocker()
 * (=> when clicking on the "extra docker" button, decrements the number of extra
     dockers by 1 - min = 0, max = 3)
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
 * @function switchContainersColors()
 * (=> switches from basic to new container's color after extraDocker() function has been called)
 *
 * @const {array} threeRemainingContainers - the return value of the selectRemainingContainers() function
 * @const {string} basicColor - container's color before extraDocker() function has been called
 * @const {number | integer} blackMarket - a random integer between 0 and 4
     which defines if the container is changed into an illegal container (a 20% chance
     for each container) or not
     
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
 * @function selectRemainingContainers()
 * (=> selects 0 to 3 containers among remaining containers and whose colors are designed to be changed)
 * @returns {array} - a now-filled array with 0 to 3 random container(s)
 *
 * @const {method} rectElt - a <rect> objects collecting method
 * @const {array} remainingContainers - the return value of the remainingContainersArray() function
 * @const {array} randomContainers - an empty array to be filled with 0 to 3 random
     container(s) object(s)
 */

function selectRemainingContainers() {

	const rectElt = document.getElementsByTagName("rect");
	let max3 = 3;
	const remainingContainers = remainingContainersArray();
	const randomContainers = [];

	if (rectElt.length < 3) {
		max3 = rectElt.length;
	}
	
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
 * @returns {array} - returns the now-filled remainingContainersArray
 *
 * @const {array} remainingContainersArray - an empty array to be filled with
     remaining containers' id
 * @const {method} rectElt - a <rect> objects collecting method
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
//reloadGame() function------------------------------------------------------//
//---------------------------------------------------------------------------//

/**
 * @function reloadGame()
 * (=> when clicking on the "new game" button, reloads the current page)
 */

function reloadGame() {

	document.getElementById("reload").addEventListener("click", function() {
		document.location.reload(true);
	});
};

//---------------------------------------------------------------------------//
//displayGame() function-----------------------------------------------------//
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