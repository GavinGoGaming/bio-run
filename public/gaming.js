

window.popupWithOptions = window.popupWithOptions||function(cancelCallbackAsString, confirmCallbackAsString, text="Are you sure you want to do this?"){
    var htmlContent = `<div class="popup-confirm">
    <div class="popup-confirm-body">
        <div class="popup-confirm-body-text">${text}</div>
        <div class="popup-confirm-body-buttons">
            <button class="popup-confirm-body-button" onclick="document.querySelector('.popup-confirm').classList.add('hidden');${cancelCallbackAsString}">Cancel</button>
            <button class="popup-confirm-body-button" onclick="document.querySelector('.popup-confirm').classList.add('hidden');${confirmCallbackAsString}">OK</button>
        </div>
    </div>
</div>`

    document.querySelector('.popup-confirm').outerHTML = htmlContent;
    document.querySelector('.popup-confirm').classList.remove('hidden');
}
window.addBackCover = window.addBackCover||function(){
    document.body.insertAdjacentHTML('afterbegin', `<div style="width:100vw;height:100vh;background-size:300%;z-index:10000;background-image: url(/images/bghd.jpeg);background-repeat: no-repeat;position:absolute;background-position:50% 50%;display:flex;align-items:center;justify-content:center;" class="noblur hidden" id="imagecoveringscreen">
    <a style="top:200px;position:absolute;z-index:10003;color:white;font-weight:600;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size:3.75rem;" id="_time_screen">5:29 PM</a>
    <a style="top:280px;position:absolute;z-index:10003;color:white;font-weight:400;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen,Ubuntu,Cantarell,Fira Sans,Droid Sans,Helvetica Neue,sans-serif;font-size:1.125rem;" id="_date_screen">Monday, January 0</a>
    <button id="sign">Sign In</button>
    </div>`);
    var timeInHours24hr = (new Date(Date.now())).getHours();
    var timeInHoursAMPM = timeInHours24hr > 12 ? timeInHours24hr - 12 : timeInHours24hr;
    var AMorPM = timeInHours24hr > 12 ? 'PM' : 'AM';
    var minutes = (new Date(Date.now())).getMinutes() < 10 ? '0'+(new Date(Date.now())).getMinutes() : (new Date(Date.now())).getMinutes();
    document.querySelector('#_time_screen').textContent = ``+timeInHoursAMPM+':'+minutes+` `+AMorPM;
    document.querySelector('#sign').addEventListener('click', () => {
        document.querySelector('#imagecoveringscreen').classList.add('movingup')
        setTimeout(() => {
            document.querySelector('#imagecoveringscreen').remove()
            
            document.body.id = ''
        }, 500);
    });
}

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
window.xor = xor;
function EnableFrame(id,url) {
    let frame = document.querySelector(`#${id} > .w11-body > iframe`);
    frame.src = url;
    frame.focus();
    document.querySelector(`#${id}`).classList.toggle('hidden');
}
window.maskopen = function(link) {
    // const tab = window.open('about:blank', '_blank');
    // const iframe = tab.document.createElement('iframe');
    // const stl = iframe.style;
    // stl.border = stl.outline = 'none';
    // stl.width = '100vw';
    // stl.height = '100vh';
    // stl.position = 'fixed';
    // stl.left = stl.right = stl.top = stl.bottom = '0';
    // iframe.src = link;
    // tab.document.body.appendChild(iframe);
    window.open(link);
}

var genObject = (isApp,name,image,url,id,width,height,left) => {
    return {window:`<div class="w11-window acrylic shadow hidden" id="${id}" style='left:${left?left:'10vw'};top:30px;width:${width?width:'80vw'};height:${height?height:'90vh'};'>
            <div class="w11-titlebar">
                <span id="w11-title">${isApp?name:'Gamax | '+name}</span>
                <div class="icon" onclick="this.parentElement.parentElement.classList.toggle('hidden');document.querySelector('#${id}>.w11-body>iframe').src='';" style="right:0;border-top-right-radius: 10px;">x</div>
                <div class="icon" onclick="" style="right:40px;">-</div>
                <div class="icon" onclick="window.maskopen(\`${url}\`)" style="right:80px;">+</div>
            </div>
            <div class="w11-body">
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
    if(window.localStorage.logged == undefined || window.localStorage.logged == null || window.localStorage.logged == "null" || window.localStorage.logged == "undefined") {
        document.body.innerHTML = "<center><h2>Not signed in!</h2><br><h3 onclick='window.location.href=\"/login.html\"' style='cursor:pointer;color:blue;'>CLICK HERE TO SIGN IN</h3><br><br><h4>use your SCHOOL email & password</h4></center>";
        document.body.style = "background-color:#333 !important;color:white !important;background-image:none !important;"
        document.body.id = "";
        document.body.className = "";
        return;
    }

var windows = document.querySelector('#windows');
var buttons = document.querySelector('#programbtns');
var appbtns = document.querySelector('#appbtns');
var osbtns = document.querySelector('#osbtns');
var games = [
    {name:"MC1.8 + SINGLEPLAYER",image:"https://static.wikia.nocookie.net/minecraft_gamepedia/images/1/15/Minecraft_Java_%26_Bedrock_Edition_for_PC_square_key_art.jpg",url:"/uv/service/"+xor.encode('https://sus-shhnowisnottheti-me.ipns.gateway.eaglercraft.online/EaglercraftX_1.8_Ultimate_u20/'),id:"mc18"},
    {
        name:"Roblox",
        image:"https://static.wikia.nocookie.net/logopedia/images/d/d6/Roblox_app_icon_2022.svg",
        url:"/quick/https://now.gg",
        id:"rbxa",
    },
    {name:"Fortnite (with Prime)",image:"https://upload.wikimedia.org/wikipedia/commons/7/7c/Fortnite_F_lettermark_logo.png",url:"/quick/https://luna.amazon.com/detail/B0BTRVRN6M",id:"fn_tut"},
    {
        name:"Discord",
        image:"https://seeklogo.com/images/D/discord-icon-new-2021-logo-09772BF096-seeklogo.com.png",
        url:"https://topg.minecraft.pe/uv/service/hvtrs8%2F-dksaopd%2Ccmm-cjalnglq%2FBmg",
        id:"discordgame"
    },{
        name:"TikTok",
        image:"/images/tiktok.avif",
        url:"/uv/service/hvtrs8%2F-tkkvoi.aoo%2F",
        id:"tiktokgame"
    },
    {name:"OvO Mods",image:"/quick/https://ovo-alpha.vercel.app/favicon.ico",url:"/quick/https://ovo-alpha.vercel.app/",id:"ovomod"},
    {
        name:"backup",
        image:"https://static.wikia.nocookie.net/logopedia/images/d/d6/Roblox_app_icon_2022.svg",
        url:`/uv/service/${xor.encode('https://beta2.apktbg.com/demo')}`,
        id:"rbxb",
    },

    {name:"",image:"/images/blank.png",url:"",id:"placeholder3"},
    {name:"",image:"/images/blank.png",url:"",id:"placeholder4"},
    {name:"",image:"/images/blank.png",url:"",id:"placeholder5"},
    {name:"",image:"/images/blank.png",url:"",id:"placeholder6"},
    {name:"",image:"/images/blank.png",url:"",id:"placeholder7"},
    {
        name:"Retro Emulation",
        image:"https://forums.libretro.com/uploads/default/original/2X/3/3178f0212ceaf3d604accacf6b7f98bf14afa794.ico",
        url:"https://fox.klash.dev/main/games/core/",
        id:"webretro"
    },
    {"name":"1v1LOL","image":"https://play-lh.googleusercontent.com/QYGRIDJbyVO7L7jH8CwiKJ4NumTGgcTVqU3ITooLWxro-eeNns1RZ0uwGGFe-r8M4co","url":"https://fox.klash.dev/main/games/1v1lol/","id":"onevonelol"},
    {"name":"Shell Shockers","image":"https://math.international/favicon.ico","url":"https://math.international/","id":"shell_shockers"},
    
    {"name":"Binding of Isaac","image":"https://thumbnails.pcgamingwiki.com/7/75/The_Binding_of_Isaac_Coverart.jpg/300px-The_Binding_of_Isaac_Coverart.jpg","url":"https://fox.klash.dev/main/games/bindingofissac/","id":"binding_of_isaac"},
    {"name":"n-gon","image":"https://fox.klash.dev/main/games/n-gon/favicon.ico","url":"https://fox.klash.dev/main/games/n-gon/","id":"n-gon"},{"name":"n","image":"/N 2a.ico","url":"https://fox.klash.dev/main/games/n/","id":"n"},
    {"name":"Hardest Game","image":"https://fox.klash.dev/main/games/worldshardestgame/images/splash.jpg","url":"https://fox.klash.dev/main/games/worldshardestgame/","id":"hardest_game"},
    {"name":"Papa Louie 1","image":"https://img.poki.com/cdn-cgi/image/quality=78,width=600,height=600,fit=cover,f=auto/f54dee3512ad75e89cc256c6bec22f06.jpeg","url":"https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/1ee20621-61bc-4ec8-a8ec-5e839c2e6edc%2Fpapa-louie-when-pizzas-attack.xml","id":"papa_louie_1:_when_pizzas_attack"},
    {"name":"Run","image":"https://run4unblocked.files.wordpress.com/2016/08/run-1-unblocked.png","url":"https://fox.klash.dev/main/games/run","id":"run"},
    {"name":"Alien Hominid","image":"https://lh6.googleusercontent.com/UlueOJT4yIcBQ7xY8MJgKJXhjB7XjDoNY-_8zpSM3SbchAd_Ue90mfdeYgFF6vCvsatvv4WDwsVXOs9WllmW7BeQ0KjJaBXTlNQ7xMk2jAwZhOfS_U8DFShwjMrBj9Z7gw=w1280","url":"https://bloxorzunblocked.github.io/","id":"alien_hominid"},
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
        url:"/uv/service/"+xor.encode("https://www.xbox.com/play/"),
        id:"fn"
    },
    {
        name:"Fortnite (PC)",
        image:"https://store.tictactoys.cl/wp-content/uploads/fortnite-logo.png",
        url:"/uv/service/"+xor.encode("https://www.nvidia.com/en-us/geforce-now/"),
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
    {
        name:"Funny Shooter 2",
        image:"/uv/service/"+xor.encode("https://images.crazygames.com/funny-shooter-2/20220823175815/funny-shooter-2-cover?auto=format%2Ccompress&q=75&cs=strip&w=960&ch=DPR"),
        url:"/uv/service/"+xor.encode("https://games.crazygames.com/en_US/funny-shooter-2/index.html"),
        id: "funnyshooter2"
    },
    {
        name:"Papa's Freezeria",
        image:"https://lh3.googleusercontent.com/0N9nq1L7VjQ2qZt6u2f1ZKj5o0r6e4kG3jX4XJ2wZb3W6v3OZ1VZj1q8OJvUJ4Z9qg",
        url:"https://games.poki.com/458768/f34a9475-1f14-432c-9457-d41097efb88f?tag=pg-v3.127.0&site_id=3&iso_lang=en&country=US&poki_url=https://poki.com/en/g/papas-freezeria&gdhoist=yes&nonPersonalized=n&familyFriendly=n&categories=18,37,69,96,388,839,873,1140,1141,1154&special_condition=landing",
        id:"freezeria"
    },
    {
        name:"Papa's Bakeria",
        image:"https://lh3.googleusercontent.com/0N9nq1L7VjQ2qZt6u2f1ZKj5o0r6e4kG3jX4XJ2wZb3W6v3OZ1VZj1q8OJvUJ4Z9qg",
        url:"https://games.poki.com/458768/116c3853-042e-40da-bb48-a1ebd47b3811?tag=pg-v3.127.0&site_id=3&iso_lang=en&country=US&poki_url=https://poki.com/en/g/papas-bakeria&gdhoist=yes&nonPersonalized=n&familyFriendly=n&categories=18,37,69,388,839,873,1141,1154&special_condition=landing",
        id:"bakeria"
    },
    {
        name:"Papa's Pancakeria",
        image:"https://lh3.googleusercontent.com/0N9nq1L7VjQ2qZt6u2f1ZKj5o0r6e4kG3jX4XJ2wZb3W6v3OZ1VZj1q8OJvUJ4Z9qg",
        url:"https://games.poki.com/458768/b1d28727-5791-4b62-bfa2-022a2f25b52d?tag=pg-v3.127.0&site_id=3&iso_lang=en&country=US&poki_url=https://poki.com/en/g/papas-pancakeria&gdhoist=yes&nonPersonalized=n&familyFriendly=n&categories=37,66,69,388,839,873&special_condition=landing",
        id:"pancakeria"
    },
    {
        name:"Papa's Pizzeria",
        image:"https://lh3.googleusercontent.com/0N9nq1L7VjQ2qZt6u2f1ZKj5o0r6e4kG3jX4XJ2wZb3W6v3OZ1VZj1q8OJvUJ4Z9qg",
        url:"https://games.poki.com/458768/c5859517-0d4a-4aed-87dc-ff26ca0240c4?tag=pg-v3.127.0&site_id=3&iso_lang=en&country=US&poki_url=https://poki.com/en/g/papas-pizzeria&gdhoist=yes&nonPersonalized=n&familyFriendly=n&categories=18,37,69,96,277,388,839,873,1109,1126,1140,1154&special_condition=landing",
        id:"pizzeria"
    },
    //Burgeria, Cheezeria, Taco Mia, Hotdoggeria (LEAVE THE URL BLANK FOR THESE ONES):
    {
        name:"Papa's Burgeria",
        image:"https://lh3.googleusercontent.com/0N9nq1L7VjQ2qZt6u2f1ZKj5o0r6e4kG3jX4XJ2wZb3W6v3OZ1VZj1q8OJvUJ4Z9qg",
        url:"https://games.poki.com/458768/eef773ae-c2b1-45d3-8aeb-ec0145ab81dc?tag=pg-v3.127.0&site_id=3&iso_lang=en&country=US&poki_url=https://poki.com/en/g/papas-burgeria&gdhoist=yes&nonPersonalized=n&familyFriendly=n&categories=18,37,69,96,388,839,873,1109,1140,1141,1154&special_condition=landing",
        id:"burgeria"
    },
    {
        name:"Papa's Cheezeria",
        image:"https://lh3.googleusercontent.com/0N9nq1L7VjQ2qZt6u2f1ZKj5o0r6e4kG3jX4XJ2wZb3W6v3OZ1VZj1q8OJvUJ4Z9qg",
        url:"https://games.poki.com/458768/acb24546-6baa-476c-8948-9389513bd185?tag=pg-v3.127.0&site_id=3&iso_lang=en&country=US&poki_url=https://poki.com/en/g/papas-cheeseria&gdhoist=yes&nonPersonalized=n&familyFriendly=n&categories=4,18,37,69,96,388,839,873,1141,1154&special_condition=landing",
        id:"cheezeria"
    },
    {
        name:"Papa's Taco Mia",
        image:"https://lh3.googleusercontent.com/0N9nq1L7VjQ2qZt6u2f1ZKj5o0r6e4kG3jX4XJ2wZb3W6v3OZ1VZj1q8OJvUJ4Z9qg",
        url:"https://games.poki.com/458768/ccb6ad3c-1888-4c24-bdd6-985672179a60?tag=pg-v3.127.0&site_id=3&iso_lang=en&country=US&poki_url=https://poki.com/en/g/papas-taco-mia&gdhoist=yes&nonPersonalized=n&familyFriendly=n&categories=18,69,96,388,839,873,1141,1154&special_condition=landing",
        id:"tacomia"
    },
    {
        name:"Papa's Hotdoggeria",
        image:"https://lh3.googleusercontent.com/0N9nq1L7VjQ2qZt6u2f1ZKj5o0r6e4kG3jX4XJ2wZb3W6v3OZ1VZj1q8OJvUJ4Z9qg",
        url:"https://games.poki.com/458768/2162cb5c-5325-4dd8-bf9f-cdf254b77c15?tag=pg-v3.127.0&site_id=3&iso_lang=en&country=US&poki_url=https://poki.com/en/g/papas-hotdoggeria&gdhoist=yes&nonPersonalized=n&familyFriendly=n&categories=18,37,69,96,388,839,873,1126,1141,1154&special_condition=landing",
        id:"hotdoggeria"
    },
    {"name":"Effing Worms 1","image":"https://lh4.googleusercontent.com/RrtCqhTWxmOT03Q6y89YXYdC-N4NLkA_4Hj1qlLJO-6MCyu5n9Dm74yiJuw-2a2dGYeIn7caVGyviDIhB3G4unYo_I2IvCBrZ2BhGzizPU2QPJAyAQJjA0nFY890vwRyJw=w1280","url":"https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/1ee20621-61bc-4ec8-a8ec-5e839c2e6edc%2Feffing-worms.xml","id":"effing_worms_1"}, {"name":"Effing Worms 2","image":"https://lh4.googleusercontent.com/z-JROxK9csfMFDnhetnmZ_YnPRkHAivEGvOVPEeKBLXgxt3TqQuSxVB8aorZ3Nheky2O45c4N4FPQUwFjHMteFBOTn-YhHxIQifaf3KGMW5gotl8SYggFKe-FZzLuhIWJQ=w1280","url":"https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/1ee20621-61bc-4ec8-a8ec-5e839c2e6edc%2Feffing-worms-2.xml","id":"effing_worms_2"}, {"name":"Friday Night Funkin","image":"https://lh5.googleusercontent.com/69qHEgk4SCYUNDZN5ONGXT2FekrIEMycx3Xa1VL-C875P0oa2AuWAZSFPLErbKRmZaND05_4H6FMqvWvXkdFEJkBrdTXM7mZssSioAAftQ029SZNoIHHxYkK2LhuR7z3ag=w1280","url":"https://v6p9d9t4.ssl.hwcdn.net/html/2876359-359162/index.html","id":"friday_night_funkin"},{"name":"Bloons Tower Defense 2","image":"https://lh4.googleusercontent.com/rYh7jTv68wQp14j4x3IGgntC4ybse3x9-JRpBc_gTQwP-z0WmpjzXSzQO7tE63A-vcLWq5zzvs-q_YnB9JaqbPJVbgyvrk-XZm6oI-gjgiOMgq-Vvbo2rjFLJ5M_aeldKA=w1280","url":"https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/1ee20621-61bc-4ec8-a8ec-5e839c2e6edc%2Fbloons_tower_defense_2.xml","id":"bloons_tower_defense_2"}, {"name":"Bloons Tower Defense 3","image":"https://lh6.googleusercontent.com/8fVwNolsbz-rM_wLmIi8wdZedcW6I2JHGS9y4zJOwTyrc3ZMu67WUaNWvwSGofr2VetmN-Jx7hAUYoFhWjyBr30wjXuJdorK4bcAhTLXRQnuWWelfahdEBv0lAViGEq-jA=w1280","url":"https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/1ee20621-61bc-4ec8-a8ec-5e839c2e6edc%2Fbloons-td-3.xml","id":"bloons_tower_defense_3"}, {"name":"Learn to Fly 1","image":"https://lh6.googleusercontent.com/kfgyg4yTu1NYZpU4xsJYkkZBRemBADRDxiEtcFtQSmyzfza35unzkFUSPjET4_nfJm7PmFXU0nTtiKb24lWx_wNmpDc03jeiUfF04ZwGmZtNOd0Z2pzMFV88uCDBIhwiHA=w1280","url":"https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/8c491f21-7353-4f1f-b2a0-9544824c4d28%2Flearn_to_fly.xml","id":"learn_to_fly_1"}, {"name":"Learn to Fly 2","image":"https://lh5.googleusercontent.com/qHRgYwQw_TlG1zGyWIJ2AUR4AWVuklovWwTelq0cjjogztLLUJ2fnO3vFQv4o3xk3f_ZdwsPsjj8uY8So5dTdqM=w1280","url":"https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/1ee20621-61bc-4ec8-a8ec-5e839c2e6edc%2Flearn-to-fly-2.xml","id":"learn_to_fly_2"},{"name":"Bloons 1","image":"https://lh4.googleusercontent.com/o9-TC_Vzyhz9Utfsux2rGq9xpAo5gbn3443N6auam7grXozjdxwkkoDGSBcSINECvjsvRszgOtW0xPejUrH_5UFW4CYODiUL8Twm9wfyk4SDhR1suZhIILyPKXY66Wg3Yg=w1280","url":"https://cdn2.addictinggames.com/addictinggames-content/ag-assets/content-items/html5-games/bloons/index.html","id":"bloons_1"},{"name":"Bloxorz","image":"https://slopegame.io/upload/imgs/bloxorz-logo.jpg","url":"https://bloxorzunblocked.github.io/","id":"bloxorz"}, {"name":"Super Smash Flash","image":"https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Super_Smash_Flash_logo.png/250px-Super_Smash_Flash_logo.png","url":"https://gg-opensocial.googleusercontent.com/gadgets/ifr?url=https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/1ee20621-61bc-4ec8-a8ec-5e839c2e6edc%2Fsuper-smash-flash.xml","id":"super_smash_flash"}, {"name":"Ultimate Flash Sonic","image":"https://lh3.googleusercontent.com/P6fkQnRvOaDeEioNaOHc8TAh4g7ZcANRXJ-9hd__l16tGtFXJBMfG7tf0ewQNN4wQsoZSrR161BK6-DdZF4dchZXNz-nwA8xNopyu-VBY4GReMPQ7rjtBzO5ch_DTM-eqg=w1280","url":"https://gg-opensocial.googleusercontent.com/gadgets/ifr?url=https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/1ee20621-61bc-4ec8-a8ec-5e839c2e6edc%2Fultimate-flash-sonic.xml","id":"ultimate_flash_sonic"}, {"name":"Swing Monkey","image":"https://lh3.googleusercontent.com/mSFFJFrxc8GrahR1hj250qk7I-8k1KBd4O-R6ClPibULofIC6nXROyBawTKTaI_2RMMT8UGLw8Fkphy1yc2K4XhKlf0GcLaHqmR1jcIsNtxZJkzG5w7JyBnSb2sjKIJQ0w=w1280","url":"https://www.hoodamath.com/mobile/games/swing-monkey/game.html?nocheckorient=1","id":"swing_monkey"}, {"name":"Bloons Tower Defense 1","image":"https://lh6.googleusercontent.com/NeNnh-5Vw7eio_mxzZhuZEcoINtO3APMl_CE9uE18-KFl-kEoGR5mL2mR4KtQ2lnNEs4bi5u13eUdGme0ZXGT4A5foqnAqWJCT1YYGH44PCwT5wIk-OJpqLiBT9pCbBbLg=w1280","url":"https://images-opensocial.googleusercontent.com/gadgets/ifr?url=https://s3.amazonaws.com/production-assetsbucket-8ljvyr1xczmb/1ee20621-61bc-4ec8-a8ec-5e839c2e6edc%2Fbloons_tower_defense.xml","id":"bloons_tower_defense_1"},
]
var apps = [
    {
        name:"Discord",
        image:"https://seeklogo.com/images/D/discord-icon-new-2021-logo-09772BF096-seeklogo.com.png",
        url:"https://topg.minecraft.pe/uv/service/hvtrs8%2F-dksaopd%2Ccmm-cjalnglq%2FBmg",
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
        url:"/uv/service/"+xor.encode("https://xbox.com/play"),
        id:"xbcloud"
    },
    {
        name:"GeForce NOW",
        image:"https://play-lh.googleusercontent.com/vobh63LuLl3B59tlHTCrSdpWzH0b_IfOsOtpVFaLK-hNQnJiWntiUgQpnhlKeIeYXBM",
        url:"/uv/service/"+xor.encode("https://www.nvidia.com/en-us/geforce-now/"),
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
    document.querySelector('#dothing').src = "/search.html";
});
var blob = document.querySelector('#cursor_blob');
document.body.onpointermove = event => {
    const {clientX, clientY} = event;
    blob.animate({left: clientX + 'px',
    top: clientY + 'px'},{duration:3000,fill:"forwards"});
}