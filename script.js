const shooter=document.getElementById("shooter");
const bullet=document.getElementById("bullet");
const score=document.getElementById("score");
const egg=document.getElementById("egg");
var bulletTop;
var shooterTop;
var shooterLeft;
var r=document.querySelector(':root');

//shooter jump
function jump() {
    shooter.classList.add("jump-animation");
    setTimeout(() =>
      shooter.classList.remove("jump-animation"), 500);
}

//bullet shoot
function remove_bullet(){
    bullet.classList.remove("shoot-animation");
    bullet.style.visibility="hidden";
}

function shoot(){
    bullet.style.visibility="visible";
    bullet.style.top=String(bulletTop)+"px";
    //bullet.style.left=String(shooterLeft+10)+"px";
    r.style.setProperty('--bulletLeft', String(shooterLeft)+"px");
    bullet.style.position="relative";
    bullet.classList.add("shoot-animation");
    setTimeout(() =>
    remove_bullet(), 500);
    
}

function egg_break(){    
    egg.classList.add("egg-animation");
    setTimeout(() =>
    egg.classList.remove("egg-animation"), 1200);

    
}



setInterval(() => {
    shooterTop = parseInt(window.getComputedStyle(shooter)
      .getPropertyValue('top'));
    bulletTop=shooterTop-75;
    shooterLeft=parseInt(window.getComputedStyle(shooter).getPropertyValue("Left"));
    if(!bullet.classList.contains("shoot-animation")){
        bullet.style.left=String(shooterLeft)+"px";
    }
    //collision detection
    if(bullet.classList.contains("shoot-animation")){
        let bulletLeft=parseInt(window.getComputedStyle(bullet).getPropertyValue("Left"));
        let bulletTop=parseInt(window.getComputedStyle(bullet).getPropertyValue("Top"));
        let eggLeft=parseInt(window.getComputedStyle(egg).getPropertyValue("Left"));
        let eggTop=parseInt(window.getComputedStyle(egg).getPropertyValue("Top"));
        if(bulletLeft>eggLeft && bulletLeft<eggLeft+70 &&bulletTop>eggTop &&bulletTop<eggTop+70){
            //collision happens
            //window.alert("collided");
            egg_break();
            
        }
    }
    
  }, 10);
  
//event listener
document.addEventListener('keypress', (event) => {
    if(event.code=="KeyS" && !bullet.classList.contains('shoot-animation')){
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

