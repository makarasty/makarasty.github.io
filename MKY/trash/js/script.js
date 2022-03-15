 //антикопирка
window.onkeydown = function(evt) {
    //if (evt.keyCode == 123 || evt.keyCode == 85 || evt.keyCode == 17 || evt.keyCode == 16 || evt.keyCode == 74 || evt.keyCode == 116 || evt.keyCode == 73) return false
};
window.onkeypress = function(evt) {
    //if (evt.keyCode == 123 || evt.keyCode == 85 || evt.keyCode == 17 || evt.keyCode == 16 || evt.keyCode == 74 || evt.keyCode == 116 || evt.keyCode == 73) return false;
};
function r(e) {
    //if ((e.which || e.keyCode) == 116) e.preventDefault();
};
//$(document).on("keydown", r);
document.ondragstart = noselect;
document.onselectstart = noselect;
document.oncontextmenu = noselect;

function noselect() {
    return false;
}
//канвас
var canvas = document.getElementById('nokey'),
    can_w = parseInt(canvas.getAttribute('width')),
    can_h = parseInt(canvas.getAttribute('height')),
    ctx = canvas.getContext('2d');
var ball = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        r: 0,
        alpha: 1,
        phase: 0
    },
    ball_color = {
        r: 207,
        g: 255,
        b: 4
    },
    R = 2,
    balls = [],
    alpha_f = 0.03,
    alpha_phase = 0,

    // Line
    link_line_width = 0.8,
    dis_limit = 260,
    add_mouse_point = true,
    mouse_in = false,
    mouse_ball = {
        x: 0,
        y: 0,
        vx: 0,
        vy: 0,
        r: 0,
        type: 'mouse'
    };


// Random speed
function getRandomSpeed(pos) {
    var min = -2,
        max = 2;
    switch (pos) {
        case 'top':
            return [randomNumFrom(min, max), randomNumFrom(0.01, max)];
            break;
        case 'right':
            return [randomNumFrom(min, -0.01), randomNumFrom(min, max)];
            break;
        case 'bottom':
            return [randomNumFrom(min, max), randomNumFrom(min, -0.01)];
            break;
        case 'left':
            return [randomNumFrom(0.01, max), randomNumFrom(min, max)];
            break;
        default:
            return;
            break;
    }
}

function randomArrayItem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function randomNumFrom(min, max) {
    return Math.random() * (max - min) + min;
}
// Random Ball
function getRandomBall() {
    var pos = randomArrayItem(['top', 'right', 'bottom', 'left']);
    switch (pos) {
        case 'top':
            return {
                x: randomSidePos(can_w),
                y: -R,
                vx: getRandomSpeed('top')[0],
                vy: getRandomSpeed('top')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
        case 'right':
            return {
                x: can_w + R,
                y: randomSidePos(can_h),
                vx: getRandomSpeed('right')[0],
                vy: getRandomSpeed('right')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
        case 'bottom':
            return {
                x: randomSidePos(can_w),
                y: can_h + R,
                vx: getRandomSpeed('bottom')[0],
                vy: getRandomSpeed('bottom')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
        case 'left':
            return {
                x: -R,
                y: randomSidePos(can_h),
                vx: getRandomSpeed('left')[0],
                vy: getRandomSpeed('left')[1],
                r: R,
                alpha: 1,
                phase: randomNumFrom(0, 10)
            }
            break;
    }
}

function randomSidePos(length) {
    return Math.ceil(Math.random() * length);
}

// Draw Ball
function renderBalls() {
    Array.prototype.forEach.call(balls, function(b) {
        if (!b.hasOwnProperty('type')) {
            ctx.fillStyle = 'rgba(' + ball_color.r + ',' + ball_color.g + ',' + ball_color.b + ',' + "0" + ')';
            ctx.beginPath();
            ctx.arc(b.x, b.y, R, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        }
    });
}

// Update balls
function updateBalls() {
    var new_balls = [];
    Array.prototype.forEach.call(balls, function(b) {
        b.x += b.vx;
        b.y += b.vy;

        if (b.x > -(150) && b.x < (can_w + 150) && b.y > -(150) && b.y < (can_h + 150)) {
            new_balls.push(b);
        }

        // alpha change
        b.phase += alpha_f;
        b.alpha = Math.abs(Math.cos(b.phase));
    });

    balls = new_balls.slice(0);
}

// loop alpha
function loopAlphaInf() {

}

// Draw lines
function renderLines() {
    var fraction, alpha;
    for (var i = 0; i < balls.length; i++) {
        for (var j = i + 1; j < balls.length; j++) {

            fraction = getDisOf(balls[i], balls[j]) / dis_limit;

            if (fraction < 1) {
                alpha = (1 - fraction).toString();
                if (balls[i].y <can_h/1.85){
                    ctx.strokeStyle = 'rgba(0, 0, 255,' + alpha + ')';
                }else {
                    ctx.strokeStyle = 'rgba(252, 255, 0,' + alpha + ')';
                }
                if (balls[j].y <can_h/1.85){
                    ctx.strokeStyle = 'rgba(0, 0, 255,' + alpha + ')';
                }else {
                    ctx.strokeStyle = 'rgba(252, 255, 0,' + alpha + ')';
                }
                ctx.lineWidth = link_line_width;

                ctx.beginPath();
                ctx.moveTo(balls[i].x, balls[i].y);
                ctx.lineTo(balls[j].x, balls[j].y);
                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}

// calculate distance between two points
function getDisOf(b1, b2) {
    var delta_x = Math.abs(b1.x - b2.x),
        delta_y = Math.abs(b1.y - b2.y);

    return Math.sqrt(delta_x * delta_x + delta_y * delta_y);
}

// add balls if there a little balls
function addBallIfy() {
    if (balls.length < 100) {
        balls.push(getRandomBall());
    }
}

// Render
function render() {
    ctx.clearRect(0, 0, can_w, can_h);

    renderBalls();

    renderLines();

    updateBalls();

    addBallIfy();

    window.requestAnimationFrame(render);
}

// Init Balls
function initBalls(num) {
    for (var i = 1; i <= num; i++) {
        balls.push({
            x: randomSidePos(can_w),
            y: randomSidePos(can_h),
            vx: getRandomSpeed('top')[0],
            vy: getRandomSpeed('top')[1],
            r: R,
            alpha: 1,
            phase: randomNumFrom(0, 10)
        });
    }
}
// Init Canvas
function initCanvas() {
    canvas.setAttribute('width', window.innerWidth);
    canvas.setAttribute('height', window.innerHeight);

    can_w = parseInt(canvas.getAttribute('width'));
    can_h = parseInt(canvas.getAttribute('height'));
}
window.addEventListener('resize', function(e) {
    initCanvas();
});

function goMovie() {
    initCanvas();
    initBalls(100);
    window.requestAnimationFrame(render);
}
goMovie();

// Mouse effect
canvas.addEventListener('mouseenter', function() {
    mouse_in = true;
    balls.push(mouse_ball);
});
canvas.addEventListener('mouseleave', function() {
    mouse_in = false;
    var new_balls = [];
    Array.prototype.forEach.call(balls, function(b) {
        if (!b.hasOwnProperty('type')) {
            new_balls.push(b);
        }
    });
    balls = new_balls.slice(0);
});
canvas.addEventListener('mousemove', function(e) {
    var e = e || window.event;
    mouse_ball.x = e.pageX;
    mouse_ball.y = e.pageY;
});

//sometext()

function sometext() {
    console.clear();
    console.log("Приветствую тебя искатель! Как ты? Как твое самочуствие? Если ты уже зашел сюда и читаеш ето.., я очень шокирован ты большой молодец что нашел ету надпись, ето пасхалка, удачи тебе и знай всегда можно найти что что ты не ищиш) <3");
    console.log("Я очень сильно надеюсь что тебе понравилось оформления етого сайта, ето 2 версия моего сайта..");
    console.log("В своих душах мы тянемся к прекрасному, сами того не осознавая.. Пусть будет вокруг только прекрасное..")
    console.log("Я желаю тебе самых незабываемых ощущений от приходящего дня!")
    console.log("Позитивного тебе настроя, необычайной бодрости и всеохватывающего успеха!")
    console.log("By MaKarastY~")
}

function makarasty() {
    console.clear();
    console.log("Ты нашел ище 1 пасхалку!")
}
