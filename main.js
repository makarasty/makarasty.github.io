window.onkeydown = evt => { if (evt.keyCode == 123 || evt.keyCode == 85 || evt.keyCode == 17 || evt.keyCode == 16 || evt.keyCode == 74 || evt.keyCode == 116 || evt.keyCode == 73) return false }
window.onkeypress = evt => { if (evt.keyCode == 123 || evt.keyCode == 85 || evt.keyCode == 17 || evt.keyCode == 16 || evt.keyCode == 74 || evt.keyCode == 116 || evt.keyCode == 73) return false }
document.ondragstart = () => false
document.onselectstart = () => false
document.oncontextmenu = () => false
document.querySelector('.large-header').style.background = 'rgb(0, 0, 0)'
document.getElementById("pash").style.visibility = 'hidden'
document.getElementById("pash").style.display = "none"
var canv = true, i = 0, a, canvasNumber = 1
const requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) { window.setTimeout(callback, 1000 / 60) }
const randomItemsCase = n => {
	switch (n) {
		case 'brigitte': {
			return [
				'https://wallpapercave.com/wp/wp3028712.jpg',
				'https://wallpapercave.com/wp/wp3028776.jpg',
				'https://www.hd-tecnologia.com/imagenes/articulos/2018/03/brigitte-ya-se-puede-disfrutar-en-overwatch.jpg',
				'https://wallpapercave.com/wp/wp3028692.jpg',
				'https://www.pixel4k.com/wp-content/uploads/2018/11/brigitte-overwatch-character-4k_1543621087.jpg',
				'https://images.hdqwalls.com/download/brigitte-overwatch-5k-2018-d4-5120x2880.jpg',
				'https://images.noob-club.ru/news/2018/03/q5588b1j32.jpg',
				'https://cdn.discordapp.com/attachments/717073717020065863/1046166861282295840/photo_2022-11-26_23-53-48.jpg',
				'https://picstatio.com/large/bb0146/Brigitte-Overwatch-girl.jpg',
				'https://images.noob-club.ru/news/2018/03/9co40m51vw.jpg',
				'https://cdn.discordapp.com/attachments/717073717020065863/1046167015074840726/photo_2022-11-26_23-54-58.jpg'
			]
		}
		case 'reinhard': {
			return [
				'https://wallpaperaccess.com/full/2302380.jpg',
				'https://hdqwalls.com/wallpapers/reinhardt-in-overwatch-ap.jpg',
				'https://wallpapertops.com/walldb/original/c/3/9/133576.jpg',
				'https://www.top10esports.com/wp-content/uploads/2019/10/reinhardt-screenshot-007.jpg',
				'https://wallpaperaccess.com/full/2302411.jpg',
				'https://wallpapertops.com/walldb/original/d/c/4/111394.jpg',
				'https://images7.alphacoders.com/693/693269.png',
			]
		}
		case 'reaper': {
			return [
				'https://hdqwalls.com/wallpapers/reaper-overwatch-5k-ix.jpg',
				'https://www.gamephd.com/wp-content/uploads/2016/07/Overwatch-Reaper-4K-Wallpaper.jpg',
				'https://wallpapercave.com/wp/wp1953077.jpg',
				'https://getwallpapers.com/wallpaper/full/8/c/1/1127429-top-overwatch-reaper-wallpapers-3840x2160-for-mobile.jpg',
				'https://www.pixel4k.com/wp-content/uploads/2020/01/genji-overwatch-2-4k-38-3840x2160-1.jpg',
				'https://images8.alphacoders.com/914/914471.jpg',
				'https://images.hdqwalls.com/wallpapers/reaper-overwatch-artwork-sd.jpg',
				'https://hdqwalls.com/wallpapers/reaper-overwatch-halloween-4k-7h.jpg',
				'https://wallpapertag.com/wallpaper/full/8/1/5/370115-free-download-overwatch-reaper-wallpaper-2560x1440-ipad-retina.jpg',
			]
		}
		case 'd.va': {
			return [
				'https://wallpaperaccess.com/full/1121358.jpg',
				'https://www.wallpaperflare.com/static/414/186/412/d-va-overwatch-overwatch-d-va-wallpaper.jpg',
				'https://wallpapercave.com/wp/wp3640234.jpg',
				'https://images.hdqwalls.com/download/dva-overwatch-to-2048x1152.jpg',
				'https://images2.alphacoders.com/814/814677.jpg',
				'https://wallpapertag.com/wallpaper/full/7/2/c/199233-overwatch-dva-wallpaper-3840x2160-for-iphone-6.jpg',
				'https://wallpapercrafter.com/desktop/115142-Overwatch-video-games-D.Va-Overwatch-anime-digital-art-tight-clothing.jpg',
				'https://picstatio.com/download/3840x2160/fb56ca/dva-overwatch-game-robot.jpg',
				'https://wallpapercave.com/wp/wp3640202.jpg',
			]
		}
		case 'mercy': {
			return [
				'https://hdqwalls.com/wallpapers/overwatch-mercy-fanart-xn.jpg',
				'https://www.pixel4k.com/wp-content/uploads/2019/10/mercy-overwatch-art_1570393329.jpg',
				'https://wallpapercave.com/wp/wp5019877.jpg',
				'https://hdqwalls.com/wallpapers/mercy-overwatch-digital-art-5k-fi.jpg',
				'https://hdqwalls.com/wallpapers/mercy-overwatch-blackwatch-5k-01.jpg',
				'https://hdqwalls.com/wallpapers/overwatch-mercy-image.jpg',
				'https://images.hdqwalls.com/download/mercy-overwatch-2-4k-ug-2560x1600.jpg',
				'https://hdqwalls.com/wallpapers/mercy-overwatch-fantasy-5k-td.jpg',
				'https://cdn1.dotesports.com/wp-content/uploads/2018/08/11120728/bc69c3a6-4ea1-42b8-87fa-f23f2452be37.jpg',
			]
		}
		case 'cat': {
			return [
				'😺',
				'😸',
				'😹',
				'😻',
				'😼',
				'😽',
				'🙀',
				'😿',
				'😾'
			]
		}
		case 'heart': {
			return [
				'💜',
				'💚',
				'🧡',
				'💛',
				'💙'
			]
		}
		case 'text': {
			return [
				'reaper',
				'reinhard',
				'brigitte',
				'd.va',
				'mercy',
				'',
				'',
			]
		}
	}
}
function randomItem(n) {
	let arr = randomItemsCase(n)
	return arr[Math.floor(Math.random() * arr.length)]
}
function loadAllImges() {
	const allCases = [].concat(
		randomItemsCase('brigitte'),
		randomItemsCase('reinhard'),
		randomItemsCase('reaper'),
		randomItemsCase('d.va'),
		randomItemsCase('mercy')
	)
	for (link of allCases) {
		new Image(0, 0).src = link
	}
}
function SetTheme(options = {}) {
	title = options.title, bcimg = options.bcimg, text1 = options.text1, text2 = options.text2, text3 = options.text3, mky = options.mky, js = options.js, bc = options.bc
	document.title = !title ? `MKY - BY MaKarastY ${randomItem('heart')}` : title
	document.body.style.backgroundImage = !bcimg ? '' : `url(${randomItem(bcimg)}`
	clearInterval(a)
	a = setInterval(() => { document.body.style.backgroundImage = `url(${randomItem(bcimg)}` }, 8000)
	!bc
		? document.querySelector('.large-header').style.removeProperty('background')
		: document.querySelector('.large-header').style.background = 'rgb(0, 0, 0)'
	canv = options.canv
	document.getElementById("pash").style.visibility = mky ? 'hidden' : 'visible'
	document.getElementById("pash").style.display = mky ? "none" : "block"
	document.getElementById("mky").style.visibility = !mky ? 'hidden' : 'visible'
	document.getElementById("mky").style.display = !mky ? "none" : "block"
	document.getElementById("onjs").innerHTML = js ? 'Turn on JavaScript' : js
	document.getElementById("text1").innerHTML = !text1 ? '' : text1
	document.getElementById("text2").innerHTML = !text2 ? '' : text2
	document.getElementById("text3").innerHTML = !text3 ? '' : text3
}
document.onkeydown = (e) => {
	document.title = e.key === ' ' ? `MKY - BY MaKarastY ${randomItem('cat')}` : `MKY - BY MaKarastY ${randomItem('heart')}`
	if (e.key === 'Backspace') {
		if (i < 5) return i++
		let _text = randomItem('text')
		loadAllImges()
		switch (_text) {
			case 'mercy': {
				i = 0, canvasNumber = 2
				return SetTheme({
					title: '',
					text1: 'герои не умерают',
					text2: '',
					text3: '',
					canv: false,
					bc: false,
					mky: false,
					bcimg: 'mercy',
					js: '',
				})
			}
			case 'reaper': {
				i = 0, canvasNumber = 2
				return SetTheme({
					title: '',
					text1: 'шаг во тьме',
					text2: '',
					text3: 'Джонни топ игрок',
					canv: false,
					bc: false,
					mky: false,
					bcimg: 'reaper',
					js: '',
				})
			}
			case 'd.va': {
				i = 0, canvasNumber = 2
				return SetTheme({
					title: '',
					text1: 'попробуйка это занерфить <3',
					text2: '',
					text3: '',
					canv: false,
					bc: false,
					mky: false,
					bcimg: 'd.va',
					js: '',
				})
			}
			case 'reinhard': {
				i = 0, canvasNumber = 2
				return SetTheme({
					title: '',
					text1: 'моооооолооооооот пошееееееел',
					text2: '',
					text3: '',
					canv: false,
					bc: false,
					mky: false,
					bcimg: 'reinhard',
					js: '',
				})
			}
			case 'brigitte': {
				i = 0, canvasNumber = 2
				return SetTheme({
					title: '',
					text1: 'нужно больше дочурности в дочурках',
					text2: '',
					text3: '',
					canv: false,
					bc: false,
					mky: false,
					bcimg: 'brigitte',
					js: '',
				})
			}
			default: {
				i = 0, canvasNumber = 1
				return SetTheme({
					title: '',
					text1: '',
					text2: '',
					text3: '',
					canv: true,
					bc: true,
					mky: true,
					bcimg: '',
					js: '1',
				})
			}
		}
	}
}
document.addEventListener('visibilitychange', () => { document.title = `MKY - BY MaKarastY ${heart()}` }, false)
window.addEventListener('resize', () => initCanvas())
let canvas = document.getElementById('nokey'), can_w = parseInt(canvas.getAttribute('width')), can_h = parseInt(canvas.getAttribute('height')), ctx = canvas.getContext('2d')
let ball = { x: 0, y: 0, vx: 0, vy: 0, r: 0, alpha: 1, phase: 0 }
let R = 2, balls = [], alpha_f = 1, dis_limit = 260, mouse_ball = { x: 0, y: 0, vx: 0, vy: 0, r: 0, type: 'mouse' }
const randomSidePos = length => Math.ceil(Math.random() * length)
const randomArrayItem = arr => arr[Math.floor(Math.random() * arr.length)]
const randomNumFrom = (min, max) => Math.random() * (max - min) + min
const getDisOf = (b1, b2) => Math.sqrt(Math.abs(b1.x - b2.x) ** 2 + Math.abs(b1.y - b2.y) ** 2)
const addBallIfy = () => { if (balls.length < dotstospawn) balls.push(getRandomBall()) }
const getRandomSpeed = pos => {
	switch (pos) {
		case 'top': return [randomNumFrom(-2, 2), randomNumFrom(0.05, 2)]
		case 'right': return [randomNumFrom(-2, -0.05), randomNumFrom(-2, 2)]
		case 'bottom': return [randomNumFrom(-2, 2), randomNumFrom(-2, -0.05)]
		case 'left': return [randomNumFrom(0.05, 2), randomNumFrom(-2, 2)]
		default: return
	}
}
const getRandomBall = () => {
	switch (randomArrayItem(['top', 'right', 'bottom', 'left'])) {
		case 'top': return {
			x: randomSidePos(can_w),
			y: -R,
			vx: getRandomSpeed('top')[0],
			vy: getRandomSpeed('top')[1],
			r: R,
			alpha: 1,
			phase: randomNumFrom(0, 10)
		}
		case 'right': return {
			x: can_w + R,
			y: randomSidePos(can_h),
			vx: getRandomSpeed('right')[0],
			vy: getRandomSpeed('right')[1],
			r: R,
			alpha: 1,
			phase: randomNumFrom(0, 10)
		}
		case 'bottom': return {
			x: randomSidePos(can_w),
			y: can_h + R,
			vx: getRandomSpeed('bottom')[0],
			vy: getRandomSpeed('bottom')[1],
			r: R,
			alpha: 1,
			phase: randomNumFrom(0, 10)
		}
		case 'left': return {
			x: -R,
			y: randomSidePos(can_h),
			vx: getRandomSpeed('left')[0],
			vy: getRandomSpeed('left')[1],
			r: R,
			alpha: 1,
			phase: randomNumFrom(0, 10)
		}
	}
}
const updateBalls = () => {
	let new_balls = []
	Array.prototype.forEach.call(balls, function (b) {
		b.x += b.vx, b.y += b.vy
		if (b.x > -(200) && b.x < (can_w + 200) && b.y > -(200) && b.y < (can_h + 200)) new_balls.push(b)
		b.phase += alpha_f
		b.alpha = Math.abs(Math.cos(b.phase))
	})
	balls = new_balls.slice(0)
}
const renderLines = () => {
	let fraction, alpha
	for (let i = 0; i < balls.length; i++) {
		for (let j = i + 1; j < balls.length; j++) {
			fraction = getDisOf(balls[i], balls[j]) / dis_limit
			if (fraction < 1) {
				alpha = (1 - fraction).toString()
				if (balls[i].y < can_h / 1.85) ctx.strokeStyle = 'rgba(0, 0, 255,' + alpha + ')'
				else ctx.strokeStyle = 'rgba(252, 255, 0,' + alpha + ')'
				ctx.lineWidth = 0.8
				ctx.beginPath()
				ctx.moveTo(balls[i].x, balls[i].y)
				ctx.lineTo(balls[j].x, balls[j].y)
				ctx.stroke()
				ctx.closePath()
			}
		}
	}
}

function render() {
	if (canv) {
		ctx.clearRect(0, 0, can_w, can_h)
		renderLines()
		updateBalls()
		addBallIfy()
	}
	window.requestAnimationFrame(render)
}
function initBalls(num) {
	for (let i = 1; i <= num; i++) {
		balls.push({ x: randomSidePos(can_w), y: randomSidePos(can_h), vx: getRandomSpeed('top')[0], vy: getRandomSpeed('top')[1], r: R, alpha: 1, phase: randomNumFrom(0, 10) })
	}
}
function initCanvas() {
	canvas.setAttribute('width', window.innerWidth)
	canvas.setAttribute('height', window.innerHeight)
	can_w = parseInt(canvas.getAttribute('width'))
	can_h = parseInt(canvas.getAttribute('height'))
	if (can_w > 2000) dotstospawn = 120
	else if (can_w > 1500) dotstospawn = 100
	else if (can_w > 1000) dotstospawn = 80
	else if (can_w > 600) dotstospawn = 60
	else if (can_w > 400) dotstospawn = 50
	else dotstospawn = 30
}
function goMovie() {
	initCanvas()
	initBalls(dotstospawn)
	window.requestAnimationFrame(render)
}
goMovie()