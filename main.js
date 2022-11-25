// window.onkeydown = (evt) => { if (evt.keyCode == 123 || evt.keyCode == 85 || evt.keyCode == 17 || evt.keyCode == 16 || evt.keyCode == 74 || evt.keyCode == 116 || evt.keyCode == 73) return false }
// window.onkeypress = (evt) => { if (evt.keyCode == 123 || evt.keyCode == 85 || evt.keyCode == 17 || evt.keyCode == 16 || evt.keyCode == 74 || evt.keyCode == 116 || evt.keyCode == 73) return false }
document.ondragstart = () => { return false }
document.onselectstart = () => { return false }
document.oncontextmenu = () => { return false }
document.querySelector('.large-header').style.background = 'rgb(0, 0, 0)'
const cat = () => {
	let cats = ['😺', '😸', '😹', '😻', '😼', '😽', '🙀', '😿', '😾']
	return cats[Math.floor(Math.random() * cats.length)]
}
const heart = () => {
	let hearts = ['💜', '💚', '🧡', '💛', '💙']
	return hearts[Math.floor(Math.random() * hearts.length)]
}
var canv = true
const text = () => {
	let texts = [
		'шаг во тьме',
		`мяу ${heart()}`,
		`mycryup ${heart()}`,
		'моооооолооооооот пошееееееел',
		'🇺🇦 Please Close The Sky Over Ukraine',
		`overwatch ${heart()}`,
		`minecraft ${heart()}`,
		`js, nodejs ${heart()}`
	]
	return texts[Math.floor(Math.random() * texts.length)]
}
document.onkeydown = (e) => {
	if (e.key === ' ') document.title = `MKY - BY MaKarastY ${cat()}`
	else document.title = `MKY - BY MaKarastY ${heart()}`

	if (e.key === 'Backspace') {
		let _text = text()

		switch (_text) {
			case 'шаг во тьме': {
				canv = false
				document.querySelector('.large-header').style.removeProperty('background')
				document.getElementById("onjs").innerHTML = ''
				document.body.style.backgroundImage = "url('https://hdqwalls.com/wallpapers/reaper-overwatch-5k-ix.jpg')"
				document.getElementById("text1").innerHTML = ''
				document.getElementById("text2").innerHTML = _text
				document.getElementById("text3").innerHTML = 'Джонни топ игрок'
				break
			}
			case 'моооооолооооооот пошееееееел': {
				canv = false
				document.querySelector('.large-header').style.removeProperty('background')
				document.getElementById("onjs").innerHTML = ''
				document.body.style.backgroundImage = "url('https://wallpaperaccess.com/full/2302380.jpg')"
				document.getElementById("text1").innerHTML = ''
				document.getElementById("text2").innerHTML = _text
				document.getElementById("text3").innerHTML = ''
				break
			}
			default: {
				canv = true
				document.querySelector('.large-header').style.background = 'rgb(0, 0, 0)'
				document.getElementById("onjs").innerHTML = 'Turn on JavaScript'
				document.getElementById("text3").innerHTML = ''
				document.getElementById("text2").innerHTML = ''
				document.getElementById("text1").innerHTML = _text
				break
			}
		}
	}
}
document.addEventListener('visibilitychange',
	() => {
		document.title = `MKY - BY MaKarastY ${heart()}`
	}, false
)

window.addEventListener('resize', () => initCanvas())
let canvas = document.getElementById('nokey'),
	can_w = parseInt(canvas.getAttribute('width')),
	can_h = parseInt(canvas.getAttribute('height')),
	ctx = canvas.getContext('2d')

let ball = {
	x: 0,
	y: 0,
	vx: 0,
	vy: 0,
	r: 0,
	alpha: 1,
	phase: 0
}

let R = 2,
	balls = [],
	alpha_f = 0.03,
	alpha_phase = 0,
	link_line_width = 0.8,
	dis_limit = 260,
	add_mouse_point = true,
	mouse_ball = {
		x: 0,
		y: 0,
		vx: 0,
		vy: 0,
		r: 0,
		type: 'mouse'
	}

const randomSidePos = (length) => { return Math.ceil(Math.random() * length) }
const randomArrayItem = (arr) => { return arr[Math.floor(Math.random() * arr.length)] }
const randomNumFrom = (min, max) => { return Math.random() * (max - min) + min }
const getDisOf = (b1, b2) => { return Math.sqrt(Math.abs(b1.x - b2.x) ** 2 + Math.abs(b1.y - b2.y) ** 2) }
const addBallIfy = () => { if (balls.length < dotstospawn) balls.push(getRandomBall()) }
const getRandomSpeed = (pos) => {
	switch (pos) {
		case 'top': return [randomNumFrom(-2, 2), randomNumFrom(0.01, 2)]
		case 'right': return [randomNumFrom(-2, -0.01), randomNumFrom(-2, 2)]
		case 'bottom': return [randomNumFrom(-2, 2), randomNumFrom(-2, -0.01)]
		case 'left': return [randomNumFrom(0.01, 2), randomNumFrom(-2, 2)]
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
const renderBalls = () => {
	Array.prototype.forEach.call(balls, function (b) {
		if (!b.hasOwnProperty('type')) {
			ctx.beginPath()
			ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true)
			ctx.closePath()
			ctx.fill()
		}
	})
}
const updateBalls = () => {
	let new_balls = []
	Array.prototype.forEach.call(balls, function (b) {
		b.x += b.vx
		b.y += b.vy
		if (b.x > -(150) && b.x < (can_w + 150) && b.y > -(150) && b.y < (can_h + 150)) new_balls.push(b)
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
				if (balls[j].y < can_h / 1.85) ctx.strokeStyle = 'rgba(0, 0, 255,' + alpha + ')'
				else ctx.strokeStyle = 'rgba(252, 255, 0,' + alpha + ')'
				ctx.lineWidth = link_line_width
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
	ctx.clearRect(0, 0, can_w, can_h)
	if (canv) {
		renderBalls()
		renderLines()
		updateBalls()
		addBallIfy()
	}
	window.requestAnimationFrame(render)
}
function initBalls(num) {
	for (let i = 1; i <= num; i++) {
		balls.push({
			x: randomSidePos(can_w),
			y: randomSidePos(can_h),
			vx: getRandomSpeed('top')[0],
			vy: getRandomSpeed('top')[1],
			r: R,
			alpha: 1,
			phase: randomNumFrom(0, 10)
		})
	}
}
function initCanvas() {
	canvas.setAttribute('width', window.innerWidth)
	canvas.setAttribute('height', window.innerHeight)
	can_w = parseInt(canvas.getAttribute('width'))
	can_h = parseInt(canvas.getAttribute('height'))
	if (can_w > 2000) dotstospawn = 150
	else if (can_w > 1500) dotstospawn = 120
	else if (can_w > 1000) dotstospawn = 100
	else if (can_w > 600) dotstospawn = 80
	else if (can_w > 400) dotstospawn = 60
	else dotstospawn = 50
}
function goMovie() {
	initCanvas()
	initBalls(dotstospawn)
	window.requestAnimationFrame(render)
}

canvas.addEventListener('mouseenter', function () { balls.push(mouse_ball) })
canvas.addEventListener('mousemove', function (e) { mouse_ball.x = e.pageX, mouse_ball.y = e.pageY })
canvas.addEventListener('mouseleave', function () {
	let new_balls = []
	Array.prototype.forEach.call(balls, function (b) { if (!b.hasOwnProperty('type')) new_balls.push(b) })
	balls = new_balls.slice(0)
})

goMovie()