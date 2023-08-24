const shooter=document.getElementById("shooter");
const bullet=document.getElementById("bullet");
const score=document.getElementById("score");
const egg=document.getElementById("egg");
const egg_bullet=document.getElementById("egg-bullet");
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

//egg break
function egg_break(){    
    //window.alert("egg break");
    if(egg.classList.contains("egg-jump")){
        egg.classList.remove("egg-jump");
    }
    egg.classList.add("egg-animation");
    setTimeout(() =>{
        egg.classList.remove("egg-animation");
        score.innerHTML++;//egg break bonus
    }, 2000);
    
}
//egg jump and shoot
function egg_jump() {
    egg.classList.add("egg-jump");
    setTimeout(() =>
      egg.classList.remove("egg-jump"), 500);
}
//bullet shoot
function remove_eggbullet(){
    egg_bullet.classList.remove("egg-shoot-animation");
    egg_bullet.style.visibility="hidden";
}

function egg_shoot(){
    egg_bullet.style.visibility="visible";
    //egg_bullet.style.top=String(eggTop)+"px";
    //bullet.style.left=String(shooterLeft+10)+"px";
    r.style.setProperty('--eggbulletLeft', String(eggLeft)+"px");
    egg_bullet.style.position="relative";
    egg_bullet.classList.add("egg-shoot-animation");
    setTimeout(() =>
    remove_eggbullet(), 500);
    
}

setInterval(() =>{
    score.innerHTML++;
    
},500);

setInterval(()=>{
    if(!egg.classList.contains("egg-jump") && !egg.classList.contains("egg-animation"))egg_jump();

},20)


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
    else if(event.code=="KeyK" && !egg_bullet.classList.contains('egg-shoot-animation')){
        /*!bullet.classList.contains('shoot-animation')*/
        /*window.alert("shoot");*/
        egg_shoot();
    }
})

