//parameters
var bullet_speed=500;



//

var root=document.querySelector(':root');
const shooter=document.getElementById("shooter");
const bullet=document.getElementById("bullet");
const score=document.getElementById("score");
const egg=document.getElementById("egg");
const egg_bullet=document.getElementById("egg-bullet");
const heart1=document.getElementById("heart1");
const heart2=document.getElementById("heart2");
const heart3=document.getElementById("heart3");
var bulletTop;
var bulletLeft;
var shooterTop;
var shooterLeft;
var eggTop;
var eggLeft;
var eggBulletLeft;
var eggBulletTop;
var heart=3;
//shooter function
function jump(){
    shooter.classList.add("jump-animation");
    setTimeout(() => {
        shooter.classList.remove("jump-animation");
    }, 500);
}
function left_move(){
    shooter.style.left=String(shooterLeft-5)+"px";
}
function right_move(){
    shooter.style.left=String(shooterLeft+5)+"px";
}
//egg function
function egg_jump(){
    egg.classList.add("jump-animation");
    setTimeout(() => {
        egg.classList.remove("jump-animation");
    }, 500);
}
//bullet function
function shoot(){
    //determine bullet position by shooter position
    parse_positions();
    root.style.setProperty("--bullet_left_start",String(shooterLeft+20)+"px");
    root.style.setProperty("--bullet_left_end",String(shooterLeft+800+20)+"px");
    root.style.setProperty("--bullet_top_start",String(shooterTop)+"px");
    root.style.setProperty("--bullet_top_end",String(shooterTop)+"px");
    //add bullet fly animation
    bullet.classList.add("shoot-animation");
    setTimeout(()=>{
        bullet.classList.remove("shoot-animation");
    },500);
}
//egg bullet function
function egg_shoot(){
    //determine bullet position by shooter position
    parse_positions();
    root.style.setProperty("--egg_left_start",String(eggLeft-20)+"px");
    root.style.setProperty("--egg_left_end",String(eggLeft-800-20)+"px");
    root.style.setProperty("--egg_top_start",String(eggTop)+"px");
    root.style.setProperty("--egg_top_end",String(eggTop)+"px");
    //add bullet fly animation
    egg_bullet.classList.add("egg-shoot-animation");
    setTimeout(()=>{
    egg_bullet.classList.remove("egg-shoot-animation");
    },500);
}

//collision function
function egg_break(eggT,eggL,buT,buL){
    if(buT>eggT-10 && buT<(eggT+75-10) && buL>eggL && buL<(eggL+75) && !egg.classList.contains("egg-break")){
        //window.alert("egg break");
        egg.classList.add("egg-break");
        setTimeout(()=>{
            egg.classList.remove("egg-break");
            score.innerHTML++;
        },500);
    }
}
function shooter_damage(shT,shL,buT,buL){
    if(buT>shT-10 && buT<(shT+75-10) && buL>shL && buL<(shL+75)){
        //window.alert("shooter damage!");
        heart--;
    }
}
//parse posistion function
function parse_positions(){
    bulletTop=parseInt(window.getComputedStyle(bullet).getPropertyValue("Top"));
    bulletLeft=parseInt(window.getComputedStyle(bullet).getPropertyValue("Left"));
    shooterTop=parseInt(window.getComputedStyle(shooter).getPropertyValue("Top"));
    shooterLeft=parseInt(window.getComputedStyle(shooter).getPropertyValue("Left"));
    eggTop=parseInt(window.getComputedStyle(egg).getPropertyValue("Top"));
    eggLeft=parseInt(window.getComputedStyle(egg).getPropertyValue("Left"));
    eggBulletTop=parseInt(window.getComputedStyle(egg_bullet).getPropertyValue("Top"));
    eggBulletLeft=parseInt(window.getComputedStyle(egg_bullet).getPropertyValue("Left"));
}


//set interval
setInterval(()=>{
    //parse position for objects
    parse_positions();
    //detect collision between egg and bullet
    egg_break(eggTop,eggLeft,bulletTop,bulletLeft);
    //detect collision between shooter and egg bullet
    shooter_damage(shooterTop,shooterLeft,eggBulletTop,eggBulletLeft);
    //shooter heart display
    if(heart==2)heart3.style.visibility="hidden";
    if(heart==1)heart2.style.visibility="hidden";
    if(heart==0){
        heart1.style.visibility="hidden";
        window.alert("game over!");
        heart++;//temporary
    }

},20);

//keyboard eventlistener
document.addEventListener('keypress',(event)=>{
    //bullet
    if(event.code=="KeyS" && !bullet.classList.contains('shoot-animation')){
        /*!bullet.classList.contains('shoot-animation')*/
        /*window.alert("shoot");*/
        shoot();
    }
    //shooter
    else if(event.code=="KeyW" && !shooter.classList.contains('jump-animation')){
        jump();
    }
    else if(event.code=="KeyA" && !shooter.classList.contains('jump-animation')){
        left_move();
    }
    else if(event.code=="KeyD" && !shooter.classList.contains('jump-animation')){
        right_move();
    }
    //egg_bullet
    else if(event.code=="KeyK" && !egg_bullet.classList.contains('egg-shoot-animation')){
        /*!bullet.classList.contains('shoot-animation')*/
        /*window.alert("shoot");*/
        egg_shoot();
    }
    //egg
    else if(event.code=="KeyI" && !egg.classList.contains('jump-animation')){
        egg_jump();
    }
    //other function
    else if(event.code=="KeyP"){
        parse_positions();
        s="bulletTop "+String(bulletTop)+"\n"+"eggTop "+String(eggTop)+"\n"+"bulletLeft "+String(bulletLeft)+"\n"+"eggLeft "+String(eggLeft);
        //window.alert();
        window.alert(s);
        //window.alert("bulletLeft "+String(bulletLeft));
        //window.alert("eggLeft "+String(eggLeft));
        
    }

    else{
        //window.alert(event.code);
    }

});