var player = document.getElementsByClassName('player');
var topPlayer = document.getElementById('top-player');
var bottomPlayer = document.getElementById('bottom-player');
var screenWidth = window.screen.width * window.devicePixelRatio;
// on pressing any key on keyboard following arrow function is invoked
document.addEventListener('keypress', e => {
    console.log(e.key);
    // we detect the key and then get the left coordinates of first player
    var left = (player[0].getBoundingClientRect().left);
    console.log(left);
    if (e.key == 'a' || e.key == 'A') {
        console.log('go left');
        // math.max is used so the margin left does not go in negative thus player always stays on screen
        player[0].style.marginLeft = Math.max(0, (left - 10)) + "px";
        player[1].style.marginLeft = Math.max(0, (left - 10)) + "px";
    } else if (e.key == 'd' || e.key == 'D') {
        console.log('go right');
        // screen width in px as calculated above
        // since 200 is the width of the player thus 200 is deducted
        player[0].style.marginLeft = Math.min(screenWidth - 200, (left + 10)) + "px";
        player[1].style.marginLeft = Math.min(screenWidth - 200, (left + 10)) + "px";
    } else {
        console.log('galat button daba ke kya sabit krna chahte ho?');
    }
});