/**
 * @typedef {Object} IDefaultBall
 * @property {number} x
 * @property {number} y
 * @property {number} vx
 * @property {number} vy
 * @property {number} r
 * @property {number} alpha
 * @property {number} phase
 */

/**
 * @typedef {Object} IDefaultBackGround
 * @property {boolean} mkyMainEnabled
 * @property {boolean} renderCanvas
 * @property {string} mainTitle
 * @property {string} secondTitle
 * @property {string} thirdTitle
 * @property {string[]} imgs
 * @property {function(Event): void} func
 */

/**
 * @typedef {'top' | 'right' | 'bottom' | 'left'} IDirectionsEnum
 */

var letsUpdateCanvas = true
var letsRainbow = false
var titleEmoji = null

var extraBallsCount = 0
var extraBallsSpeed = 0

var enterPressCounter = 0

const HsvSaturation = 1;
const HsvValue = 1;

const mainTitle = 'MKY starlight'

const starsEmojis = ['✨', '🌠']
const heartsEmojis = ['💗', '🧡', '💛', '💚', '💙', '💜', '🤎', '🤍', '❤️']
const catsEmojis = ['😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾']

/**
 * @type {number}
 */
var enterInterval

var lastInput = ''

/**
 * @type {?number}
 */
var maybeSetIntervalId

const possibleKeys = new Set(['anime', 'wallpapers'].map(a => a.split()).join())

/**
 * @type {IDirectionsEnum[]}
 */
const possibleDirections = ['top', 'right', 'bottom', 'left']

const blockedKeysForMain = new Set(['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F12', 'Alt']);

const allBackgrounds = ['(1).jpeg', '(1).jpg', '(1).png', '(10).jpg', '(11).jpg', '(12).jpg', '(13).jpg', '(14).jpg', '(15).jpg', '(16).jpg', '(17).jpg', '(18).jpg', '(19).jpg', '(2).jpeg', '(2).jpg', '(2).png', '(20).jpg', '(21).jpg', '(22).jpg', '(23).jpg', '(24).jpg', '(25).jpg', '(26).jpg', '(27).jpg', '(28).jpg', '(29).jpg', '(3).jpeg', '(3).jpg', '(30).jpg', '(31).jpg', '(32).jpg', '(33).jpg', '(34).jpg', '(35).jpg', '(36).jpg', '(37).jpg', '(38).jpg', '(39).jpg', '(4).jpg', '(40).jpg', '(41).jpg', '(42).jpg', '(43).jpg', '(44).jpg', '(45).jpg', '(46).jpg', '(47).jpg', '(48).jpg', '(49).jpg', '(5).jpg', '(50).jpg', '(51).jpg', '(52).jpg', '(53).jpg', '(54).jpg', '(56).jpg', '(57).jpg', '(58).jpg', '(59).jpg', '(6).jpg', '(60).jpg', '(61).jpg', '(62).jpg', '(63).jpg', '(64).jpg', '(65).jpg', '(66).jpg', '(67).jpg', '(68).jpg', '(69).jpg', '(7).jpg', '(70).jpg', '(71).jpg', '(72).jpg', '(73).jpg', '(8).jpg', '(9).jpg']

var balls = []
var maximumBalls = 0

const ballRadius = 1
const lineDistanceLimit = 290

var rainbowIndex = -1
var fpsTime = 0;

const canvas = /**@type {HTMLCanvasElement}*/(document.getElementById('star-fall'));
const context = canvas.getContext('2d')

var maxPossibleWidth = parseInt(canvas.getAttribute('width'))
var maxPossibleHeight = parseInt(canvas.getAttribute('height'))

const softData = document.getElementById('soft-data');

const mainPage = document.getElementById('main-page')

const anyImg = /**@type {HTMLImageElement}*/(document.getElementById('any-img'))

setImgVisibility(false, null)

/**
 * @param {Event} event
 */
function breakEvent(event) {
	event.preventDefault()
	return false
}

/**
 * @param {string} title
 * @param {?string} emoji
 */
function setTitle(title, emoji = null) {
	titleEmoji = emoji
	document.title = `${title} ${emoji || ''}`
}

/**
 * @param {boolean} visible
 */
function setHeaderVisibility(visible) {
	mainPage.style.display = visible ? 'block' : 'none'
}

/**
 * @param {boolean} visible
 * @param {?string} url
 */
function setImgVisibility(visible, url = null, customImg = null) {
	const display = visible ? 'block' : 'none';
	const src = url ? `./common/imgs/%20 ${url}` : customImg;

	anyImg.style.display = display;
	anyImg.src = src;
}

/**
 * @param {string} base
 * @param {number?} offset
 */
async function getImgFromReddit(base, offset = 86) {
	const sortOptions = ['hot', 'new', 'top'];
	const sort = randomFromArray(sortOptions);
	const randomOffset = randomNumberFrom(0, offset);

	const url = `${base}restrict_sr=1&sort=${sort}&limit=100&count=100&after=t3_${randomOffset}`;

	const proxy = 'https://corsproxy.io/?' + encodeURIComponent(url);

	try {
		const response = await fetch(proxy);

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const data = await response.json();
		const posts = data.data.children
			.filter(post => post.data.post_hint === 'image')
			.map(post => post.data.url);

		if (posts.length === 0) {
			throw new Error("Failed to find suitable posts");
		}

		return randomFromArray(posts);
	} catch (error) {
		console.error('Error during request execution:', error);

		throw new Error("An error occurred while retrieving data")
	}
}

function defaultAllClear() {
	letsUpdateCanvas = false
	letsRainbow = false

	setHeaderVisibility(false)
	context.clearRect(0, 0, maxPossibleWidth, maxPossibleHeight);

	clearInterval(enterInterval)
}

/**
 * @param {string} redditURL
 */
async function defaultImgFromReddit(redditURL) {
	const amineWallpaperURL = await getImgFromReddit(redditURL)

	defaultAllClear()

	setImgVisibility(true, undefined, amineWallpaperURL)

	enterInterval = setInterval(async () => {
		const amineWallpaperURL = await getImgFromReddit(redditURL)

		setImgVisibility(true, undefined, amineWallpaperURL)
	}, 10000)
}

/**
 * @param {KeyboardEvent} event
 */
async function onKeyDownEvent(event) {
	//console.log(event.key);

	if (blockedKeysForMain.has(event.key.toUpperCase())) {
		return breakEvent(event)
	}

	if (possibleKeys.has(event.key.toLowerCase())) {
		lastInput += event.key.toLowerCase()
	} else {
		lastInput = ''
	}

	if (lastInput.endsWith("wallpapers")) {
		const thatRedisUrl = 'https://www.reddit.com/r/wallpaper.json?'
		await defaultImgFromReddit(thatRedisUrl)
	}

	if (lastInput.endsWith("anime")) {
		const thatRedisUrl = 'https://www.reddit.com/r/Animewallpaper/search.json?q=flair_name%3A%22Desktop%22&'
		await defaultImgFromReddit(thatRedisUrl)
	}

	switch (event.key) {
		case ' ': {
			const randomCat = getRandomCat()

			setTitle(mainTitle, randomCat)
			break
		}
		case 'ArrowUp': {
			++extraBallsCount
			break
		}
		case 'ArrowDown': {
			--extraBallsCount
			break
		}
		case 'ArrowLeft': {
			extraBallsSpeed -= 0.1
			break
		}
		case 'ArrowRight': {
			extraBallsSpeed += 0.1
			break
		}

		case 'Backspace': case 'Delete': {
			letsRainbow = false
			titleEmoji = null

			extraBallsCount = 0
			extraBallsSpeed = 0
			enterPressCounter = 0

			letsUpdateCanvas = true

			clearInterval(enterInterval)

			setTitle(mainTitle, null)
			setHeaderVisibility(true)
			setImgVisibility(false, null)
			break
		}
		case 'Meta': case 'ContextMenu': {
			letsRainbow = !letsRainbow;
			setTitle(mainTitle, letsRainbow ? '🌈' : null);
			break
		}
		case 'Enter': {
			enterPressCounter = (enterPressCounter + 1) % 30;

			if (enterPressCounter === 10) {
				defaultAllClear()

				clearInterval(enterInterval)

				const randomImgName = randomFromArray(allBackgrounds)
				setImgVisibility(true, randomImgName)

				enterInterval = setInterval(() => {
					const randomImgName = randomFromArray(allBackgrounds)
					setImgVisibility(true, randomImgName)
				}, 5000)
			}
			if (enterPressCounter === 20) {
				clearInterval(enterInterval)

				setHeaderVisibility(true)
				letsUpdateCanvas = true

				setImgVisibility(false, null)
			}
			break
		}
		default: {
			if (!letsRainbow) {
				const randomHeart = getRandomHeart()

				setTitle(mainTitle, randomHeart)
			}
			break
		}
	}
}

/**
 * @param {string} emoji
 * @returns {[number, number, number]}
 */
function getEmojiColor(emoji) {
	switch (emoji) {
		case '💜':
			return [159, 33, 198];
		case '💚':
			return [0, 128, 0];
		case '🧡':
			return [255, 165, 0];
		case '💛':
			return [255, 255, 0];
		case '💙':
			return [0, 0, 255];
		case '💗':
			return [255, 192, 203];
		case '🤎':
			return [165, 42, 42];
		case '🤍':
			return [255, 255, 255];
		case '❤️':
			return [255, 0, 0];
		default:
			return [0, 0, 0];
	}
}

/**
 * @param {Event} event
 */
function visibilityChangeEvent(event) {
	clearInterval(maybeSetIntervalId)

	if (document.hidden) {
		maybeSetIntervalId = setInterval(() => {
			const randomEmoji = randomFromArray(starsEmojis)
			setTitle(mainTitle, randomEmoji)
		}, 3000);
	} else {
		setTitle(mainTitle)
	}
}

/**
 * @param {Event} event
 */
function onResize(event) {
	initCanvas()
}

/**
 * @param {any[]} array
 */
function randomFromArray(array) {
	return array[Math.round(Math.random() * array.length)]
}

function getRandomHeart() {
	return randomFromArray(heartsEmojis)
}

function getRandomCat() {
	return randomFromArray(catsEmojis)
}

/**
 * @param {number} length
 */
function randomSidePos(length) {
	return Math.round(Math.random() * length)
}

/**
 * @param {number} min
 * @param {number} max
 */
function randomNumberFrom(min, max) {
	return Math.random() * (max - min) + min
}

/**
 * @param {number} i
 */
function generateGradientColor(i) {
	const hue = i % 360;
	const chroma = HsvValue * HsvSaturation;
	const huePrime = hue / 60;
	const x = chroma * (1 - Math.abs(huePrime % 2 - 1));

	let r1, g1, b1;

	switch (Math.floor(huePrime)) {
		case 0:
			[r1, g1, b1] = [chroma, x, 0];
			break;
		case 1:
			[r1, g1, b1] = [x, chroma, 0];
			break;
		case 2:
			[r1, g1, b1] = [0, chroma, x];
			break;
		case 3:
			[r1, g1, b1] = [0, x, chroma];
			break;
		case 4:
			[r1, g1, b1] = [x, 0, chroma];
			break;
		default:
			[r1, g1, b1] = [chroma, 0, x];
			break;
	}

	const m = HsvValue - chroma;
	const r = Math.round((r1 + m) * 255);
	const g = Math.round((g1 + m) * 255);
	const b = Math.round((b1 + m) * 255);

	return [r, g, b];
}

/**
 * @param {IDefaultBall} ball1
 * @param {IDefaultBall} ball2
 */
function getDistanceOf(ball1, ball2) {
	const dx = ball1.x - ball2.x;
	const dy = ball1.y - ball2.y;

	return Math.hypot(dx, dy);
}

function addNewBalls() {
	if (balls.length < maximumBalls + extraBallsCount) {
		balls.push(getRandomBall())
	}
}

/**
 * @param {IDirectionsEnum} pos
 * @returns {[number, number]}
*/
function getRandomSpeeds(pos) {
	const minVxLeft = 0.04, maxVxLeft = 1.5 + extraBallsSpeed;
	const minVxRight = -1.5 - extraBallsSpeed, maxVxRight = -0.04;
	const minVyBottom = -1.5 - extraBallsSpeed, maxVyBottom = -0.04;
	const minVyTop = 0.04, maxVyTop = 1.5 + extraBallsSpeed;
	let minVx, maxVx, minVy, maxVy;

	switch (pos) {
		case 'left':
			minVx = minVxLeft;
			maxVx = maxVxLeft;
			break;
		case 'right':
			minVx = minVxRight;
			maxVx = maxVxRight;
			break;
		default:
			minVx = minVxRight;
			maxVx = maxVxLeft;
	}

	switch (pos) {
		case 'bottom':
			minVy = minVyBottom;
			maxVy = maxVyBottom;
			break;
		case 'top':
			minVy = minVyTop;
			maxVy = maxVyTop;
			break;
		default:
			minVy = minVyBottom;
			maxVy = maxVyTop;
	}

	return [randomNumberFrom(minVx, maxVx), randomNumberFrom(minVy, maxVy)];
}

function getRandomBall() {
	const phase = 100;
	const randomDirection = randomFromArray(possibleDirections);
	const speeds = getRandomSpeeds(randomDirection);
	const randomSidePosition = randomSidePos.bind(null, maxPossibleWidth, maxPossibleHeight);

	const ball = {
		r: ballRadius,
		alpha: 1,
		phase,
		vx: speeds[0],
		vy: speeds[1]
	};

	switch (randomDirection) {
		case 'top':
			ball.x = randomSidePosition(maxPossibleWidth);
			ball.y = -ballRadius;
			break;
		case 'right':
			ball.x = maxPossibleWidth + ballRadius;
			ball.y = randomSidePosition();
			break;
		case 'bottom':
			ball.x = randomSidePosition(maxPossibleWidth);
			ball.y = maxPossibleHeight + ballRadius;
			break;
		case 'left':
			ball.x = -ballRadius;
			ball.y = randomSidePosition();
			break;
	}

	return ball;
}

/**
 * @param {number} num
 */
function initBalls(num) {
	for (let i = 1; i == num; i++) {
		const [vx, vy] = getRandomSpeeds('top');

		balls.push({
			x: randomSidePos(maxPossibleWidth),
			y: randomSidePos(maxPossibleHeight),
			vx,
			vy,
			r: ballRadius,
			alpha: 0.8,
			phase: 100
		})
	}
}

function updateBalls() {
	const maxX = maxPossibleWidth + 200;
	const maxY = maxPossibleHeight + 200;
	const newBalls = [];

	for (let i = 0, len = balls.length; i < len; i++) {
		const ball = balls[i];
		ball.x += ball.vx;
		ball.y += ball.vy;

		if (ball.x > -200 && ball.x < maxX && ball.y > -200 && ball.y < maxY) {
			ball.phase += 1;
			ball.alpha = Math.abs(Math.cos(ball.phase));
			newBalls.push(ball);
		}
	}

	balls = newBalls;
}

function renderLines() {
	rainbowIndex = (rainbowIndex + 0.3) % (360 * 2);

	for (let i = 0, len = balls.length - 1; i < len; i++) {
		for (let j = i + 1; j < len + 1; j++) {

			const fraction = getDistanceOf(balls[i], balls[j]) / lineDistanceLimit;
			if (fraction < 1) {
				const alpha = (0.85 - fraction).toString();

				var ballColor

				if (letsRainbow) {
					ballColor = generateGradientColor(rainbowIndex / 2)
				} else {
					ballColor = heartsEmojis.includes(titleEmoji)
						? getEmojiColor(titleEmoji)
						: balls[i].y < (maxPossibleHeight / 1.85) ? [0, 0, 255] : [255, 255, 0];
				}

				context.strokeStyle = `rgba(${ballColor}, ${alpha})`;
				context.lineWidth = 1;
				context.beginPath();
				context.moveTo(balls[i].x, balls[i].y);
				context.lineTo(balls[j].x, balls[j].y);
				context.stroke();
			}
		}
	}
}

/**
 * @param {number} nexFrameTime
 */
function renderCanvasNewFrame(nexFrameTime) {
	if (letsUpdateCanvas) {
		context.clearRect(0, 0, maxPossibleWidth, maxPossibleHeight);
		renderLines();
		updateBalls();
		addNewBalls();
		const fps = `000${Math.round(1000 / (nexFrameTime - fpsTime))}`.slice(-3);
		softData.innerHTML = `fps: ${fps} | (${extraBallsCount} / ${extraBallsSpeed.toFixed(1)})`;
		fpsTime = nexFrameTime;
	}

	requestAnimationFrame(renderCanvasNewFrame);
};

function initCanvas() {
	const { innerWidth, innerHeight } = window;

	canvas.width = innerWidth;
	canvas.height = innerHeight;
	maxPossibleWidth = innerWidth;
	maxPossibleHeight = innerHeight;
	maximumBalls = Math.floor(innerWidth / 10);
}

function initialize() {
	initCanvas();
	initBalls(maximumBalls);

	requestAnimationFrame(renderCanvasNewFrame);
}

document.addEventListener('DOMContentLoaded', initialize);
window.addEventListener('resize', onResize);
document.addEventListener('visibilitychange', visibilityChangeEvent);
document.addEventListener('keydown', onKeyDownEvent);
document.addEventListener('dragstart', breakEvent);
document.addEventListener('selectstart', breakEvent);
document.addEventListener('contextmenu', breakEvent);