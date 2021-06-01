var player = document.getElementsByClassName('player');
var topPlayer = document.getElementById('top-player');
var bottomPlayer = document.getElementById('bottom-player');
var ball = document.getElementById('ball');
// var screenWidth = window.screen.width * window.devicePixelRatio;
// screen width was used originally, now body width used to resize game acc to browser width
var bodyWidth = document.body.clientWidth;
var bodyHeight = window.innerHeight;
var started = false;
// on pressing any key on keyboard following arrow function is invoked
document.addEventListener('keypress', e => {
    // console.log(e.key);
    // we detect the key and then get the left coordinates of first player
    var left = (player[0].getBoundingClientRect().left);
    // console.log(left);
    
    if (e.code === 'Enter') {
        if(!started)
            startGame();
        started = true;
    }

    if (started && (e.key == 'a' || e.key == 'A')) {
        // console.log('go left');
        // math.max is used so the margin left does not go in negative thus player always stays on screen
        player[0].style.marginLeft = Math.max(0, (left - 15)) + "px";
        player[1].style.marginLeft = Math.max(0, (left - 15)) + "px";
    } else if (started && (e.key == 'd' || e.key == 'D')) {
        // console.log('go right');

        // since 200 is the width of the player thus 200 is deducted
        player[0].style.marginLeft = Math.min(bodyWidth - 150, (left + 15)) + "px";
        player[1].style.marginLeft = Math.min(bodyWidth - 150, (left + 15)) + "px";
    } 
});


var score = 0;
var ballSpeedX = 2;
var ballSpeedY = 2;
function startGame(){
    if (started===false){
        started=true;
        var ballRect = ball.getBoundingClientRect();
        
        var ballX = ballRect.x;
        // console.log(ballX);
        var ballY = ballRect.y;
        // console.log(ballY);
        var ballDia = ballRect.width;
        // console.log(ballDia);
        // console.log('in here');
        let topPlayerHeight = topPlayer.offsetHeight;
        let bottomPlayerHeight = bottomPlayer.offsetHeight;
        // console.log(playerHeight);
        let topPlayerWidth = topPlayer.offsetWidth;
        let bottomPlayerWidth = bottomPlayer.offsetWidth;
        // console.log(playerWidth);
        movement = setInterval(function(){
            ballX += ballSpeedX;
            ballY += ballSpeedY;
            topPlayerX = topPlayer.getBoundingClientRect().x;
            bottomPlayerX = bottomPlayer.getBoundingClientRect().x;

            ball.style.left = ballX + 'px';
            ball.style.top = ballY + 'px';
            console.log(ballX+ballDia);
            console.log("compare to ",bodyWidth);
            if ((ballX + ballDia) > bodyWidth || ballX < 0) {
                ballSpeedX = -ballSpeedX; // Reverses the direction
            }

            let ballPos = ballX + ballDia / 2;

            // Check for Rod 1
            if (ballY <= topPlayerHeight) {
                ballSpeedY = -ballSpeedY; 
                score++;    
                if ((ballPos < topPlayerX) || (ballPos > (topPlayerX + topPlayerWidth))) {
                    window.alert(`Player 2 wins with a score of ${score}`);
                    resetGame();
                }
            }

            else if ((ballY + ballDia) >= (bodyHeight - bottomPlayerHeight)) {
                ballSpeedY = -ballSpeedY;
                score++;
                if ((ballPos < bottomPlayerX) || (ballPos > (bottomPlayerX + bottomPlayerWidth))) {
                    window.alert(`Player 1 wins with a score of ${score}`);
                    resetGame();
                }
            }

        },10);
    }
}


function resetGame(){
    topPlayer.style.marginLeft = '45%';
    bottomPlayer.style.marginLeft = '45%';
    ball.style.left = '49%';
    clearInterval(movement);
    score = 0;
    started = false;
}