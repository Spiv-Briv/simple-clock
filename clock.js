const canvas = document.getElementById('clock');
let ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
const half = width / 2;
ctx.translate(half, half);
ctx.strokeStyle = "black";
ctx.lineWidth = 3;
ctx.textAlign = "center";
ctx.textBaseline = "middle";
ctx.font = "20px serif";
background();
clockFace();

const startDate = new Date();
textArrow(startDate.getHours(), 12, 150, 4);
textArrow(startDate.getMinutes(), 60, 175, 5);
textArrow(startDate.getSeconds(), 60, 200, 6);

setInterval(() => {
    ctx.reset();
    ctx.translate(half, half);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "20px serif";
    background();
    clockFace();

    const date = new Date();
    if(document.getElementById('partial-arrow').checked) {
        // partial text arrows
        funkyTextArrow(date.getSeconds(), 60, 200, 6, date.getMilliseconds()/1000);
        funkyTextArrow(date.getMinutes(), 60, 175, 5, date.getSeconds()/60);
        funkyTextArrow(date.getHours(), 12, 150, 4, date.getMinutes()/60);
    }
    else {
        // Regular text arrows
        textArrow(date.getHours(), 12, 150, 4);
        textArrow(date.getMinutes(), 60, 175, 5);
        textArrow(date.getSeconds(), 60, 200, 6);
    }

    
}, 100);

function textArrow(value, ticks, length, size) {
    const clockSize = document.getElementById('clock-size');
    const angleModifier = (Math.PI * (360 / ticks)) / 180;
    const angle = value * angleModifier;
    const space = length / size;
    for (let i = 1; i <= size; i++) {
        if(parseInt(clockSize.value)<parseInt(space*(i+1))) {
            break;
        }
        ctx.fillText(value, Math.sin(angle) * (space * i), -Math.cos(angle) * (space * i));
    }
}

function funkyTextArrow(value, ticks, length, size, part) {
    const clockSize = document.getElementById('clock-size');
    const angleModifier = (Math.PI * (360 / ticks)) / 180;
    const angle = value * angleModifier;
    const space = length / size;
    for (let i = 1; i <= size; i++) {
        if(parseInt(clockSize.value)<parseInt(space*(i+1))) {
            break;
        }
        if(parseFloat(i*space/length) < parseFloat(part)) {
            ctx.fillText(value+1, Math.sin(angle+angleModifier) * (space * i), -Math.cos(angle+angleModifier) * (space * i));
        }
        else {
            ctx.fillText(value, Math.sin(angle) * (space * i), -Math.cos(angle) * (space * i));
        }
    }
}

function clockFace() {
    const clockface = document.getElementById('clock-face').children;
    const clockFrame = document.getElementById('clock-frame').children;
    const clockSize = document.getElementById('clock-size');

    ctx.beginPath();
    ctx.arc(0, 0, clockSize.value, 0, 2 * Math.PI);
    ctx.fillStyle = `rgb(${clockface[0].value},${clockface[1].value},${clockface[2].value})`;
    ctx.fill();
    
    ctx.beginPath();
    ctx.strokeStyle = `rgb(${clockFrame[0].value},${clockFrame[1].value},${clockFrame[2].value})`;
    ctx.arc(0, 0, clockSize.value, 0, 2 * Math.PI);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.fillStyle = `rgb(${clockFrame[0].value},${clockFrame[1].value},${clockFrame[2].value})`;
    ctx.arc(0, 0, 5, 0, 2 * Math.PI);
    ctx.fill();
}

function background() {
    const background = document.getElementById('background').children;
    document.getElementsByTagName('body')[0].style.backgroundColor = `rgb(${background[0].value},${background[1].value},${background[2].value})`;
}