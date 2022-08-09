let username = document.getElementById("username");
let password = document.getElementById("password");
let login_btn = document.getElementById("login_btn");
let WelcomeScreen = document.getElementById("WelcomeScreen");
let LoginScreen = document.getElementById("LoginScreen");
let HomeScreen = document.getElementById("HomeScreen");
let body = document.getElementById("body");
let error = document.getElementById("error");
function fadeIn(target, speed){
    // fade in effect
    let opacity = .1;
    let timer = setInterval(() => {
        if (opacity >= 1){
            clearInterval(timer);
            if(target.getAttribute("id") == "WelcomeScreen"){
                WelcomeScreen.style.visibility = "hidden";
                LoginScreen.style.visibility = "visible";
            }
        }
        target.style.opacity = opacity;
        target.style.filter = "alpha(opacity=" + opacity*100 + ")";
    
        opacity += speed;
    }, 50);


}
fadeIn(WelcomeScreen, .01);

document.addEventListener("keypress", function(event){
    if(event.keyCode == 13 || event.key == "q"){
        event.preventDefault();
        login_btn.click();
    }
});

// user database
let database = [
    {
        username: "Harrison",
        password: "321"
    },
    {
        username: "Derick",
        password: "123"
    },
    {
        username: "Michael",
        password: "123"
    },
    {
        username: "Andrew",
        password: "123"
    },
    {
        username: "Jamie",
        password: "123"
    },
    {
        username: "Mark",
        password: "123"
    },
    {
        username: "Liston",
        password: "123"
    }
];

let newsFeed = [
    {
        username: "Derick",
        timeline: "Welcome to Fakebook"
    },
    {
        username: "Michael",
        timeline: "\"Me at the zoo\" should be the most watched video ever"
    },
    {
        username: "Andrew",
        timeline: "Hey there. It's Friday."
    },
    {
        username: "Jamie",
        timeline: "I started my SIWES at ITF recently. Let's goo!"
    },
    {
        username: "Mark",
        timeline: "Best summer ever."
    },
    {
        username: "Liston",
        timeline: "Stressful day from all that coding. Off to bed."
    }
];


let isUserValid = (username, password) => {
    return new Promise((resolve, reject) => {
        for(var i = 0; i < database.length; i++){
            if(username.toLowerCase() === database[i].username.toLowerCase() && password === database[i].password) resolve("user exists");
        }
        reject("user does not exists");
    });
}
function signIn(username, password){
    isUserValid(username, password)
    .then(() => {
        loadHomePage(username);
    })
    .catch(() => {
        fadeIn(error, .05);
    })
}
function loginClicked(){
    if (username.value.trim() && password.value)
        signIn(username.value.trim(), password.value);
}
function loadHomePage(username){
    LoginScreen.style.visibility = "hidden";
    HomeScreen.style.visibility = "visible";
    let people = document.getElementById("people");
    database.forEach((user) => {
        let avatar_num = Math.floor(Math.random()*456.789);
        if (user.username != username)
        people.innerHTML += '<div class="person user_story_body"><img src="https://picsum.photos/' + avatar_num + '" alt="avatar" class="add_story_btn user_story_avatar" /><p class="story_username">' + user.username + '</p></div>';
    });
    
    let news_feed = document.getElementById("news_feed");
    newsFeed.forEach((news) => {
        let avatar_num = Math.floor(Math.random()*456.789);
        let timeline_pic = Math.floor(Math.random()*456.789);
        let post_time = Math.floor(Math.random()*4.56);
        if (news.username != username)
            news_feed.innerHTML += '<div class="feed_box"><div class="feed_header"><img src="https://picsum.photos/' + avatar_num + '" class="feed_avatar" /><div id="feed_title"><span id="feed_username"><b>' + news.username + '</b></span><br /><span id="feed_time">' + post_time + ' hrs . Fakebook for Android</span></div><button id="feed_menu">...</button></div><p id="timeline">' + news.timeline + '</p><img class="timeline_pic" src="https://picsum.photos/' + timeline_pic + '" /></div>';
    });
}
function displayUserInfo(){
    alert("Logged in as " + username.value.trim());
}
