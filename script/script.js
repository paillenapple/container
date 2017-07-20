const deck = document.getElementById("deck");
const containerClass = document.getElementsByClassName("container");
const countClass = document.getElementsByClassName("count");
let count = 0;


function toggleLoading() {
	const toggleButton = document.getElementById("toggle");
	toggleButton.addEventListener("click", function() {
		if (toggleButton.textContent === "start loading") {
			for (let i = 0; i < containerClass.length; i++) {
				containerClass[i].disabled = false;
				toggleButton.textContent = "stop loading";
			}
		} else {
			for (let i = 0; i < containerClass.length; i++) {
				containerClass[i].disabled = true;
				toggleButton.textContent = "start loading";
			}
		}
	});
};

function erase() {
	const eraser = document.getElementById("erase");
	eraser.addEventListener("click", function() {
		deck.innerHTML = "";
		count = 0;
		for (var i = 0; i < countClass.length; i++) {
			countClass[i].textContent = count;
		}
	});
};

function addContainer(color) {
	if ((count % 10 === 0) && (count !== 0)) {
		addBrTag();
	}
	const span = document.createElement("span");
	const svg = document.createElementNS("http://www.w3.org/2000/svg","svg");
	const container = document.createElementNS("http://www.w3.org/2000/svg","rect");
	span.className = "containers";
	svg.setAttribute("version", "1.1");
	svg.setAttribute("width", "50");
	svg.setAttribute("height", "25");
	container.setAttribute("width", "50");
	container.setAttribute("height", "25");
	container.setAttribute("fill", color);
	container.setAttribute("stroke", "black");
	container.setAttribute("stroke-width", "1");
	deck.appendChild(span);
	span.appendChild(svg);
	svg.appendChild(container);
	/* console.log("top-left : " + container.getBoundingClientRect().top + ", "+ container.getBoundingClientRect().left); */
	count += 1;
}

function countContainers(color) {
	document.getElementById("" + color + "Count").textContent =
	  parseInt(document.getElementById("" + color + "Count").textContent) + 1;
	document.getElementById("totalCount").textContent = count;
}

function addBrTag() {
	const brTag = document.createElement("br");
	deck.appendChild(brTag);
}




for (let i = 0; i < containerClass.length; i++) {
	for (let j = 0; j < countClass.length; j++) {
		countClass[j].textContent = 0;
	}
	containerClass[i].addEventListener("click", function(e) {
		addContainer(e.target.id);
		countContainers(e.target.id);
	});
}

toggleLoading();
erase();