const button = document.querySelector("button");
const scoreElm = document.querySelector(".score");
const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
const info = document.querySelector("h2");

let score = 0;
let timeUp = false;

let actualMole = 1;
let refMole = 0;

const gameOver = () => {
	timeUp = true;
	info.classList.add("gameOver");
	info.textContent = "Game Over";
};

scoreElm.textContent = score;

const randomTime = (min, max) => {
	return Math.random() * (max - min) + min;
};

const randomHole = (holes) => {
	const index = Math.floor(Math.random() * holes.length);
	return holes[index];
};

const hide = () => {
	holes.forEach((hole) => {
		hole.classList.remove("active");
	});
	actualMole++;
	if (!timeUp) {
		peep();
	}
};

const peep = () => {
	const hole = randomHole(holes);
	const duration = randomTime(500, 1000);
	hole.classList.add("active");
	setTimeout(() => {
		refMole++;
		if (actualMole === refMole) {
			hide();
		}
	}, duration);
};

const whack = () => {
	score++;
	scoreElm.textContent = score;
};

moles.forEach((mole) => {
	mole.addEventListener("click", () => {
		whack();
		hide();
	});
});

button.addEventListener("click", () => {
	score = 0;
	scoreElm.textContent = score;
	timeUp = false;
	info.classList.remove("gameOver");
	info.innerText = "Whack 'em all!";
	setTimeout(gameOver, 15000);
	peep();
});
