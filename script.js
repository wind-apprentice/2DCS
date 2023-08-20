const shooter=document.getElementById("shooter")
const bullet=document.getElementById("bullet")
const score=document.getElementById("score")
var bulletTop;
var shooterTop;
var shooterLeft;

//shooter jump
function jump() {
    shooter.classList.add("jump-animation");
    setTimeout(() =>
      shooter.classList.remove("jump-animation"), 500);
}

//bullet shoot
function shoot(){
    bullet.style.top=String(bulletTop)+"px";
    bullet.style.left=String(shooterLeft+10)+"px";
    bullet.style.position="relative";
    bullet.classList.add("shoot-animation");
    setTimeout(() =>
    bullet.classList.remove("shoot-animation"), 500);
}


setInterval(() => {
    shooterTop = parseInt(window.getComputedStyle(shooter)
      .getPropertyValue('top'));
    bulletTop=shooterTop-75;
    shooterLeft=parseInt(window.getComputedStyle(shooter).getPropertyValue("Left"));
    if(!bullet.classList.contains("shoot-animation")){
        bullet.style.left="-300px";
    }
  }, 10);
  
//event listener
document.addEventListener('keypress', (event) => {
    if(event.code=="KeyS"){
        /*!bullet.classList.contains('shoot-animation')*/
        /*window.alert("shoot");*/
        shoot();
    }
    else if(event.code=="KeyJ" && !shooter.classList.contains('jump-animation')){
        jump();
    }
    else if(event.code=="Space"){
        window.alert("pause");
    }
    else if(event.code=="KeyA"){
        shooter.style.left=String(shooterLeft-5)+"px";
    }
    else if(event.code=="KeyD"){
        shooter.style.left=String(shooterLeft+5)+"px";
    }
})

