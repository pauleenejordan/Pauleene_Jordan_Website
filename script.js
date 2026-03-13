// Lockscreen Functions
function unlockScreen() {
    const lockscreen = document.getElementById('lockscreen');
    lockscreen.classList.add('hidden');
    setTimeout(() => {
        lockscreen.style.display = 'none';
    }, 500);
}

function updateLockscreenTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = now.getDate();
    
    document.getElementById('lockscreen-time').textContent = `${hours}:${minutes}`;
    document.getElementById('lockscreen-date').textContent = `${dayName}, ${monthName} ${date}`;
}

const canvas = document.getElementById("snakeCanvas");

if(canvas){

const ctx = canvas.getContext("2d");
const box = 20;

let snake;
let food;
let direction;
let score;
let game;

function initializeGame(){

snake=[{x:200,y:200}];
direction="RIGHT";
score=0;

document.getElementById("score").innerText=score;

food={
x:Math.floor(Math.random()*20)*box,
y:Math.floor(Math.random()*20)*box
};

}

document.addEventListener("keydown",changeDirection);

function changeDirection(event){

if(event.key==="ArrowLeft" && direction!=="RIGHT") direction="LEFT";
else if(event.key==="ArrowUp" && direction!=="DOWN") direction="UP";
else if(event.key==="ArrowRight" && direction!=="LEFT") direction="RIGHT";
else if(event.key==="ArrowDown" && direction!=="UP") direction="DOWN";

}

function draw(){

ctx.fillStyle="#ffeef6";
ctx.fillRect(0,0,400,400);

for(let i=0;i<snake.length;i++){

ctx.fillStyle=i===0 ? "#ff1493":"#ff85c1";
ctx.fillRect(snake[i].x,snake[i].y,box,box);

}

ctx.fillStyle="#ff3b6f";
ctx.fillRect(food.x,food.y,box,box);

let headX=snake[0].x;
let headY=snake[0].y;

if(direction==="LEFT") headX-=box;
if(direction==="UP") headY-=box;
if(direction==="RIGHT") headX+=box;
if(direction==="DOWN") headY+=box;

if(headX===food.x && headY===food.y){

score++;
document.getElementById("score").innerText=score;

food={
x:Math.floor(Math.random()*20)*box,
y:Math.floor(Math.random()*20)*box
};

}else{

snake.pop();

}

const newHead={x:headX,y:headY};

if(
headX<0 || headY<0 ||
headX>=400 || headY>=400 ||
snake.some(s=>s.x===headX && s.y===headY)
){

clearInterval(game);
document.getElementById("gameOverOverlay").style.display="flex";
return;

}

snake.unshift(newHead);

}

function startGame(){

clearInterval(game);
initializeGame();

document.getElementById("gameOverOverlay").style.display="none";

game=setInterval(draw,120);

}

function restartGame(){

clearInterval(game);
initializeGame();

document.getElementById("gameOverOverlay").style.display="none";

game=setInterval(draw,120);

}

initializeGame();

}
// App Navigation
function showApp(appName) {
    // Hide home screen
    document.getElementById('home-screen').classList.remove('active');
    
    // Show the requested app
    const appId = appName + '-screen';
    const appScreen = document.getElementById(appId);
    if (appScreen) {
        appScreen.classList.add('active');
    }
}

function goHome() {
    // Hide all app screens
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        if (screen.id !== 'home-screen') {
            screen.classList.remove('active');
        }
    });
    
    // Show home screen
    document.getElementById('home-screen').classList.add('active');
}

// Start Menu Toggle
function toggleStartMenu() {
    const startMenu = document.getElementById('start-menu');
    const searchResults = document.getElementById('search-results');
    
    startMenu.classList.toggle('active');
    
    // Close search results if open
    if (searchResults && searchResults.style.display !== 'none') {
        searchResults.style.display = 'none';
    }
}

function closeStartMenu() {
    const startMenu = document.getElementById('start-menu');
    startMenu.classList.remove('active');
}

// Search Bar Toggle
function toggleSearchResults() {
    const searchResults = document.getElementById('search-results');
    const startMenu = document.getElementById('start-menu');
    
    // Close start menu if open
    if (startMenu && startMenu.classList.contains('active')) {
        startMenu.classList.remove('active');
    }
    
    if (searchResults.style.display === 'none' || !searchResults.style.display) {
        searchResults.style.display = 'block';
    }
}

function closeSearch() {
    const searchResults = document.getElementById('search-results');
    searchResults.style.display = 'none';
}

// Update time and date
function updateDateTime() {
    const now = new Date();
    
    // Update time
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const timeDisplay = document.getElementById('time-display');
    if (timeDisplay) {
        timeDisplay.textContent = hours + ':' + minutes;
    }
    
    // Update date
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = now.getDate();
    
    const dateDisplay = document.getElementById('date-display');
    if (dateDisplay) {
        dateDisplay.textContent = dayName + ', ' + monthName + ' ' + date;
    }
}

// Close menus when clicking outside
document.addEventListener('click', function(event) {
    const startMenu = document.getElementById('start-menu');
    const startBtn = document.querySelector('.start-menu-btn');
    const searchContainer = document.querySelector('.search-bar-container');
    const searchResults = document.getElementById('search-results');
    
    if (startMenu && !startMenu.contains(event.target) && !startBtn.contains(event.target)) {
        startMenu.classList.remove('active');
    }
    
    if (searchResults && !searchContainer.contains(event.target)) {
        searchResults.style.display = 'none';
    }
});

// Initialize app icons
document.addEventListener('DOMContentLoaded', function() {
    // Initialize lockscreen time
    updateLockscreenTime();
    // Update lockscreen time every minute
    setInterval(updateLockscreenTime, 60000);
    
    const appIcons = document.querySelectorAll('.app-icon');
    
    appIcons.forEach(icon => {
        icon.addEventListener('click', function() {
            const appName = this.getAttribute('data-app');
            showApp(appName);
        });
    });
    
    // Initialize time and date
    updateDateTime();
    // Update every minute (60000 ms)
    setInterval(updateDateTime, 60000);
});