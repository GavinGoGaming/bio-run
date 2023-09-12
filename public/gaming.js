

// xor function in one place for easy modification
class xor {
    static encode(str) {
      return encodeURIComponent(
        str
          .toString()
          .split("")
          .map((char, ind) =>
            ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char
          )
          .join("")
      );
    }
    static decode(str) {
      if (str.charAt(str.length - 1) == "/") str = str.slice(0, -1);
      return decodeURIComponent(str)
        .split("")
        .map((char, ind) =>
          ind % 2 ? String.fromCharCode(char.charCodeAt() ^ 2) : char
        )
        .join("");
    }
    static uriencode(str) {
        return encodeURIComponent(str)
    }
  }

function EnableFrame(id,url) {
    let frame = document.querySelector(`#${id} > .window-body > iframe`);
    frame.src = url;
    frame.focus();
    document.querySelector(`#${id}`).classList.toggle('hidden');
}

var genObject = (isApp,name,image,url,id,width,height,left) => {
    return {window:`<div class="window hidden" id="${id}" style='left:${left?left:'10vw'};top:30px;width:${width?width:'80vw'};height:${height?height:'90vh'};'>
    <div class="title-bar">
        <div class="title-bar-text drag-handle" style="position:relative;">
            ${isApp?name:'Gamax | '+name}
        </div>

        <div class="title-bar-controls">
            <button aria-label="Minimize" onclick="this.parentElement.parentElement.parentElement.style.height='1px';this.parentElement.parentElement.parentElement.style.width='300px';"></button>
            <button aria-label="Maximize" onclick="this.parentElement.parentElement.parentElement.style.height='${height?height:'90vh'}';this.parentElement.parentElement.parentElement.style.width='${width?width:'80vw'}';"></button>
            <button aria-label="Close"
                onclick="this.parentElement.parentElement.parentElement.querySelector('.window-body > iframe').src='';this.parentElement.parentElement.parentElement.classList.toggle('hidden');"></button>
        </div>
    </div>
    <div class="window-body" style="padding: 0 !important;width:calc(100% - 6px);height:100%;margin: 0 3px !important;">
        <iframe frameborder="0" allow-pointer-lock style="overflow: scroll;
        border: 0;
        transform: scale(0.75);
        -ms-transform-origin: 0 0;
        -moz-transform-origin: 0 0;
        -o-transform-origin: 0 0;
        -webkit-transform-origin: 0 0;
        transform-origin: 0 0;margin:0;padding:0;width:133.3%;height:128%;"></iframe>
    </div>
</div>`,gridItem:`<div class="grid-item" onclick="EnableFrame('${id}','${url}')">
<img src="${image}" style="border-radius:10px;">
<div class="title">${name}</div>
</div>`};
}

document.addEventListener('DOMContentLoaded', ()=>{
    if(window.localStorage.signed == undefined || window.localStorage.signed == null || window.localStorage.signed == "null" || window.localStorage.signed == "undefined") {
        alert("You are not signed in! Please contact the person that gave you access - via discord or (preferablly) in person.");
        document.body.innerHTML = "<center><h2>Not signed in!</h2><br><h3 onclick='window.location.href=\"/login.html\"' style='cursor:pointer;color:blue;'>sign in</h3><br><br><h4>no user/pass? contact the person that gave you access!</h4></center>";
        document.body.style = "background-color:rgb(0,0,0) !important;color:white !important;"
        document.body.className = "";
        return;
    } 

var windows = document.querySelector('#windows');
var buttons = document.querySelector('#programbtns');
var appbtns = document.querySelector('#appbtns');
var osbtns = document.querySelector('#osbtns');
var games = [
    {
        name:"Java 1.5",
        image:"https://static.wikia.nocookie.net/minecraft_gamepedia/images/1/15/Minecraft_Java_%26_Bedrock_Edition_for_PC_square_key_art.jpg",
        url:"https://sd592g.github.io/zj684od4lfg/",
        id:"mc15",
    },
    {
        name:"Roblox (BETA)",
        image:"https://static.wikia.nocookie.net/logopedia/images/d/d6/Roblox_app_icon_2022.svg",
        url:"/games/roblox.html",
        id:"rbx",
        width: "260px",
        height: "165px",
        left: "40vw"
    },
    {
        name:"WebRetro",
        image:"https://forums.libretro.com/uploads/default/original/2X/3/3178f0212ceaf3d604accacf6b7f98bf14afa794.ico",
        url:"https://fox.klash.dev/main/games/core/",
        id:"webretro"
    },
    {"name":"Binding of Isaac","image":"https://thumbnails.pcgamingwiki.com/7/75/The_Binding_of_Isaac_Coverart.jpg/300px-The_Binding_of_Isaac_Coverart.jpg","url":"https://fox.klash.dev/main/games/bindingofissac/","id":"binding_of_isaac"},
    {"name":"n-gon","image":"https://fox.klash.dev/main/games/n-gon/favicon.ico","url":"https://fox.klash.dev/main/games/n-gon/","id":"n-gon"},{"name":"n","image":"/N 2a.ico","url":"https://fox.klash.dev/main/games/n/","id":"n"},{"name":"Hardest Game","image":"https://fox.klash.dev/main/games/worldshardestgame/images/splash.jpg","url":"https://fox.klash.dev/main/games/worldshardestgame/","id":"hardest_game"},{"name":"1v1LOL","image":"https://play-lh.googleusercontent.com/QYGRIDJbyVO7L7jH8CwiKJ4NumTGgcTVqU3ITooLWxro-eeNns1RZ0uwGGFe-r8M4co","url":"https://fox.klash.dev/main/games/1v1lol/","id":"1v1lol"},{"name":"Shell Shockers","image":"https://math.international/favicon.ico","url":"https://math.international/","id":"shell_shockers"},
    {
        name:"PUBG Mobile",
        image:"https://sm.ign.com/ign_in/cover/p/pubg-battl/pubg-battlegrounds_ydxm.jpg",
        url:"/games/pubg.html",
        id:"pubg",
        width: "260px",
        height: "165px",
        left: "40vw"
    },
    {
        name:"COD Mobile",
        image:"https://is3-ssl.mzstatic.com/image/thumb/Purple126/v4/e1/6e/63/e16e6345-266f-ddf1-bda2-4e1f43995b18/AppIcon-1x_U007emarketing-0-9-0-85-220.png/512x512bb.jpg",
        url:"/games/cod.html",
        id:"cod",
        width: "260px",
        height: "165px",
        left: "40vw"
    },
    {
        name:"NBA Mobile",
        image:"https://play-lh.googleusercontent.com/LSNNEr_f-M5oFDn-pPGyTBYK8os8aVzI7M3lKMT66f6Q4ojYQb0HIMfEt6mBNAEBHcU",
        url:"/games/ealmb.html",
        id:"nba",
        width: "260px",
        height: "165px",
        left: "40vw"
    },
    {
        name:"Vex 5",
        image:"https://fox.klash.dev/main/games/vex6/assets/icon.png",
        url:"https://fox.klash.dev/main/games/vex5/",
        id:"vex5",
    },
    {
        name:"Vex 6",
        image:"https://fox.klash.dev/main/games/vex6/assets/icon.png",
        url:"https://fox.klash.dev/main/games/vex6/",
        id:"vex6",
    },
    {
        name:"Classy 1.0",
        image:"/images/poki2-net-block-world.webp",
        url:"https://classic.minecraft.net/",
        id:"ClassicMC",
    },
    {
        name:"Celeste 2",
        image:"https://f4.bcbits.com/img/a2822252032_65",
        url:"https://fox.klash.dev/main/games/celeste2/",
        id:"cel2"
    },
    {
        name:"Celeste",
        image:"https://img.itch.zone/aW1hZ2UvMzEzMTgvMTMzNjQyLmdpZg==/347x500m/Ba742v.gif",
        url:"https://fox.klash.dev/main/games/celeste/",
        id:"cel"
    },
    {
        name:"Snow Rider 3D",
        image:"https://img.kbhgames.com/2020/12/Snow-Rider-3D.jpg",
        url:"https://fox.klash.dev/main/games/snowrider/",
        id:"snowrider"
    },
    {
        name:"Run 3",
        image:"https://fox.klash.dev/main/games/run3/favicon.png",
        url:"https://fox.klash.dev/main/games/run3/",
        id:"run"
    },
    {
        name:"Slope",
        image:"https://geometry-dash.co/upload/imgs/slope-game-logo4.jpg",
        url:"https://fox.klash.dev/main/games/slope/",
        id:"slope"
    },
    {
        name:"Sandspiel",
        image:"https://sandspiel.club/assets/favicon-16x16.png",
        url:"https://sandspiel.club/",
        id:"ssp"
    },
    {
        name:"Geo Dash",
        image:"https://geometrydashlite.io/favicon.ico",
        url:"https://geometrydashlite.io/",
        id:"geo"
    },
    {
        name:"Chrome Dino",
        image:"https://github.com/klashdevelopment/ChromeDino3D/blob/master/media/preloader-dino.png?raw=true",
        url:"https://pages.klash.dev/ChromeDino3D/",
        id:"cd3d"
    },
    {
        name:"Fortnite (XBOX)",
        image:"https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png",
        url:"https://meat.nabim.com/service/route?url="+xor.uriencode("https://www.xbox.com/play/"),
        id:"fn"
    },
    {
        name:"Fortnite (PC)",
        image:"https://store.tictactoys.cl/wp-content/uploads/fortnite-logo.png",
        url:"https://meat.nabim.com/service/route?url="+xor.uriencode("https://www.nvidia.com/en-us/geforce-now/"),
        id:"fn2"
    },
    {
        name:"FNAF 4",
        image:"https://static.wikia.nocookie.net/fivenightsatfreddys/images/6/6c/Fnaf_4_desktop_icon.jpg/revision/latest?cb=20150724183458",
        url:"https://fox.klash.dev/main/games/fnaf4",
        id:"fnaf4"
    },
    {
        name:"FNAF 1",
        image:"https://static.wikia.nocookie.net/triple-a-fazbear/images/8/8f/690x0w.png/revision/latest?cb=20191120060456",
        url:"https://fox.klash.dev/main/games/fnaf1",
        id:"fnaf1"
    },
    {
        name:"OvO",
        image:"https://fox.klash.dev/main/games/ovo/icon-256.png",
        url:"https://fox.klash.dev/main/games/ovo/game.html",
        id:"ovo"
    },
    {
        name:"SM64",
        image:"https://assets1.ignimgs.com/2019/05/31/mario-64---button-1559263987447.jpg",
        url:"https://fox.klash.dev/main/games/sm64/",
        id:"sm64"
    },
]
var apps = [
    {
        name:"Discord",
        image:"https://seeklogo.com/images/D/discord-icon-new-2021-logo-09772BF096-seeklogo.com.png",
        url:"https://meat.nabim.com/service/route?url="+xor.uriencode("https://discord.com/app"),
        id:"discord"
    },
    {
        name:"Little Fishy",
        image:"https://ih1.redbubble.net/image.4884909669.9538/st,small,507x507-pad,600x600,f8f8f8.u2.jpg",
        url:"https://fox.klash.dev/",
        id:"fish"
    },
    {
        name:"XBOX Cloud",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Xbox_app_logo.svg/2048px-Xbox_app_logo.svg.png",
        url:"https://meat.nabim.com/service/route?url="+xor.uriencode("https://xbox.com/play"),
        id:"xbcloud"
    },
    {
        name:"GeForce NOW",
        image:"https://play-lh.googleusercontent.com/vobh63LuLl3B59tlHTCrSdpWzH0b_IfOsOtpVFaLK-hNQnJiWntiUgQpnhlKeIeYXBM",
        url:"https://meat.nabim.com/service/route?url="+xor.uriencode("https://www.nvidia.com/en-us/geforce-now/"),
        id:"now"
    },
];


var oses = [
    {
        name:"Windows 10",
        image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQVeyBIPVEjZtjHrS5nxgFQYvAIKTXwuj_K4tS42mZZFsmhd41DSwcYFPgLjtsG_82HbU&usqp=CAU",
        url:"/noaccess.html",
        id:"windows10kasm"
    },
    {
        name:"SteamOS",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Steam_icon_logo.svg/2048px-Steam_icon_logo.svg.png",
        url:"/noaccess.html",
        id:"steamoskasm"
    },
    {
        name:"Debian Linux",
        image:"https://www.nesabamedia.com/wp-content/uploads/2022/11/Linux-Debian-Logo-1.png",
        url:"/noaccess.html",
        id:"debiankasm"
    },
    {
        name:"Ubuntu",
        image:"https://www.xilinx.com/content/xilinx/en/products/design-tools/embedded-software/ubuntu/_jcr_content/root/parsysFullWidth/xilinxflexibleslab/xilinxflexibleslab-parsys/xilinxcolumns_149128/childParsys-2/xilinximage.img.png/1629757312962.png",
        url:"/noaccess.html",
        id:"ubuntukasm"
    },
    {
        name:"KASM",
        image:"https://yt3.googleusercontent.com/3rluQxpU8S060uGKY_Uk4qbQUa1wqJ4p7WQ1wF5rMPgMCjljUWhNt0Hd9pWggMY25Q9-5C3gww=s900-c-k-c0x00ffffff-no-rj",
        url:"/noaccess.html",
        id:"kasm"
    },
]

    games.forEach(game => {
        var object = genObject(false, game.name,game.image,game.url,game.id,game.width,game.height,game.left);
        windows.insertAdjacentHTML('beforeend', object.window);
        buttons.insertAdjacentHTML('beforeend', object.gridItem);
    })
    oses.forEach(os => {
        var object = genObject(true, os.name,os.image,os.url,os.id,os.width,os.height,os.left);
        windows.insertAdjacentHTML('beforeend', object.window);
        osbtns.insertAdjacentHTML('beforeend', object.gridItem);
    })
    apps.forEach(app => {
        var object = genObject(true, app.name,app.image,app.url,app.id,app.width,app.height,app.left);
        windows.insertAdjacentHTML('beforeend', object.window);
        appbtns.insertAdjacentHTML('beforeend', object.gridItem);
    })
});

setTimeout(()=>{
    document.querySelector('#dothing').src = "https://this.url.is.long.and.is.owned.by.klash.dev"
},2000);