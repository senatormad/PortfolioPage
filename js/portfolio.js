// COFFEE CUPS
coffeeCups();
function coffeeCups() {
    let now = new Date();
    let start = new Date(now.getFullYear(), 0, 0);
    let diff = now - start;
    let day = Math.floor(diff / (1000 * 60 * 60 * 24));
    let cofeeCups = day * 2.5; // 2.5 -> average cups per day, very empirical data
    document.title = `Uroš Vulović had ${cofeeCups} cups of coffee this year! Pump the numbers or cut back?`;
}

// GET OTHER DATA
let requestOtherData = new XMLHttpRequest()


requestOtherData.open('GET', 'http://uros.vulovic.me/wp-json/wp/v2/pages/94', true)
requestOtherData.onload = function() {

  let data = JSON.parse(this.response)
  let otherData = [];

  if (requestOtherData.status >= 200 && requestOtherData.status < 400) {
    otherData = {
      name : data.acf.name,
      job : data.acf.job_title,
      img : data.acf.profile_img,
      linkedIn : data.acf.LinkedIn,
      mail : data.acf.mail,
      github : data.acf.github,
      cv : data.acf.cv
    }
    displayOtherData(otherData);

  } else {
    console.log('error')
  }
}

requestOtherData.send()



// GET TAGS
let requestTags = new XMLHttpRequest()


requestTags.open('GET', 'http://uros.vulovic.me/wp-json/wp/v2/tags', true)
requestTags.onload = function() {

  let data = JSON.parse(this.response)
  let tags = [];

  if (requestTags.status >= 200 && requestPosts.status < 400) {
    data.sort((a, b) => (a.id > b.id) ? 1 : -1)
    data.forEach(tag => {
      tags.push(tag.name);
    })
    displayTags(tags);

  } else {
    console.log('error')
  }
}

requestTags.send()


//GET POSTS

let requestPosts = new XMLHttpRequest()
let works = [];


requestPosts.open('GET', 'http://uros.vulovic.me/wp-json/wp/v2/posts', true)
requestPosts.onload = function() {

  let data = JSON.parse(this.response)
  let work = {};

  if (requestPosts.status >= 200 && requestPosts.status < 400) {
    let i = 0;
    data.forEach(post => {
      work = {
        id : i,
        title : post.title.rendered,
        main : post.tag_names,
        other : post.acf.other_stuff,
        logo : post.acf.logo,
        img : post.fimg_url,
        url : post.acf.url
      }
      works.push(work);
      i++;
    })
    displayWorks(works);

  } else {
    console.log('error')
  }
}

requestPosts.send()


// DISPLAY WORKS

let sectionWorks = document.getElementsByClassName("works");
let displayWorks = (works) => {
  works.forEach( (work) => {
    let sectionArticleLinked = document.createElement("a");
    sectionArticleLinked.setAttribute("class", "sectionArticleLinked");
    sectionArticleLinked.setAttribute("href", work.url);

    let sectionArticle = document.createElement("article");
    sectionArticle.setAttribute("onmouseenter", "grayscaling(this)");
    sectionArticle.setAttribute("onmouseleave", "grayscaling(this)");

    // left articleDiv
    let articleLeftDiv = document.createElement("div");
    articleLeftDiv.setAttribute("class", "leftDiv");

    // right articleDiv
    let articleRightDiv = document.createElement("div");
    articleRightDiv.setAttribute("class", "rightDiv");

    // logo
    let articleLogo = document.createElement("img");
    articleLogo.setAttribute("src", work.logo);
    articleLogo.setAttribute("alt", "Work Preview");
    articleLeftDiv.appendChild(articleLogo);

    // title
    let articleHeader = document.createElement("h4");
    articleHeader.innerHTML = work.title;
    articleLeftDiv.appendChild(articleHeader);

    // main "comment"
    let commentImp = document.createElement("p");
    commentImp.setAttribute("class", "commentImp");
    commentImp.innerHTML = "/* main */";
    articleLeftDiv.appendChild(commentImp);

    // main
    let articleMainStuff = document.createElement("p");
    let articleMainStuffSkill = "";
    for(let i = 0; i < work.main.length; i++){
      articleMainStuffSkill += work.main[i];
      (i != (work.main.length - 1)) && (articleMainStuffSkill += ", ");
    }
    articleMainStuff.innerHTML = articleMainStuffSkill;
    articleLeftDiv.appendChild(articleMainStuff);

    // other "comment"
    let commentOth = document.createElement("p");
    commentOth.setAttribute("class", "commentOth");
    commentOth.innerHTML = "/* other */";
    articleLeftDiv.appendChild(commentOth);

    // other
    let articleOtherStuff = document.createElement("p");
    articleOtherStuff.innerHTML = work.other;
    articleLeftDiv.appendChild(articleOtherStuff);

    // preview img
    let articleImg = document.createElement("div");
    articleImg.setAttribute("class", "previewImg");
    articleImg.setAttribute("style", `background-image: url(${work.img})`);
    articleRightDiv.appendChild(articleImg);

    // append divs to article and article to section
    articleLeftDiv.appendChild(articleRightDiv);
    sectionArticle.appendChild(articleLeftDiv);
    sectionArticleLinked.appendChild(sectionArticle);
    sectionWorks[0].appendChild(sectionArticleLinked);
  })
}


// DISPLAY SKILLS
let skills = document.getElementsByClassName("skills");
let displayTags = tags => {
  tags.forEach( tag => {
    let skill = document.createElement("span");
    skill.setAttribute("onclick", "blinkThat(this)");
    skill.innerHTML = tag;
    skills[0].appendChild(skill);
  })
  let skill = document.createElement("span");
  skill.setAttribute("onclick", "blinkThat(this)");
  skill.classList.add("resetSkills");
  skill.innerHTML = "ResetAll";
  skills[0].appendChild(skill);


}

// DISPLAY OTHER DATA
function displayOtherData (otherData) {
  document.getElementsByTagName("h1")[0].innerHTML = otherData.name;
  document.getElementById("job").innerHTML = otherData.job;
  document.querySelector(".profile-pic").setAttribute("src", otherData.img);
  document.querySelector(".hrefLinkein").setAttribute("href", otherData.linkedIn);
  document.querySelector(".hrefLinkeinFooter").setAttribute("href", otherData.linkedIn);
  document.querySelector(".hrefMail").setAttribute("href", `mailto:${otherData.mail}`);
  document.querySelector(".hrefMailFooter").setAttribute("href", `mailto:${otherData.mail}`);
  document.querySelector(".hrefGithub").setAttribute("href", otherData.github);
  document.querySelector(".hrefCV").setAttribute("href", otherData.cv);
}


// STYLE STUFF

window.onscroll = ev => {
  let footerQ = document.getElementsByClassName("inFooter");
  ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 150)) ? (footerQ[0].classList.add("fadeQ")) : (footerQ[0].classList.remove("fadeQ"))
  let scrollIcon = document.querySelector('.icon-scroll');
  scrollIcon.setAttribute("style", `opacity: ${0.5- window.scrollY/scrollIcon.offsetHeight/12 };`);

};

function spinThat(el) {
  el.getElementsByTagName("span")[0].classList.add("spintThatShit");
  setTimeout(function() { el.getElementsByTagName("span")[0].classList.remove("spintThatShit"); }, 1300);
}

let filterOfThis = []
let filteredWorks = {};
function blinkThat(el) {
  if(el.classList.contains("resetSkills")){
    var menu = document.querySelectorAll('.skills span');
    for (let bla of menu) {
      bla.classList.remove("blinking");
    }
    (sectionWorks[0].innerHTML != "") && (sectionWorksDefaults())
    filterOfThis = [];
    displayWorks(works);

  }
  else if(el.classList.contains("blinking")){
      el.classList.remove("blinking");
      filterOfThis = filterOfThis.filter(skill => skill != el.innerHTML);
      filteredWorks = works.filter(work => filterOfThis.every(v => work.main.includes(v)));
      (sectionWorks[0].innerHTML != "") && (sectionWorksDefaults())
      displayWorks(filteredWorks);

  } else {
    el.classList.add("blinking");
    filterOfThis.push(el.innerHTML);
    filteredWorks = works.filter(work => filterOfThis.every(v => work.main.includes(v)));
    (sectionWorks[0].innerHTML != "") && (sectionWorksDefaults())
    displayWorks(filteredWorks);

  }

}

function sectionWorksDefaults() {
  sectionWorks[0].innerHTML = ""
  let sectionTitle = document.createElement("h3");
  sectionTitle.innerHTML = "works";
  let sectionComment = document.createElement("p");
  sectionComment.setAttribute("class", "commentImp");
  sectionComment.innerHTML = "/* select skill/s to sort works */";

  sectionWorks[0].appendChild(sectionTitle);
  sectionWorks[0].appendChild(sectionComment);


}

function grayscaling (el) {
  let articleImg = el.getElementsByClassName("previewImg");
  articleImg[0].classList.toggle("grayscaling");
}



// HEADER SHIT

function consoleText(words, id, colors) {
 if (colors === undefined) colors = ['#fff'];
 var visible = true;
 var con = document.getElementById('console');
 var letterCount = 1;
 var x = 1;
 var waiting = false;
 var target = document.getElementById(id)
 target.setAttribute('style', 'color:' + colors[0])
 window.setInterval(function() {

   if (letterCount === 0 && waiting === false) {
     waiting = true;
     target.innerHTML = words[0].substring(0, letterCount)
     window.setTimeout(function() {
       var usedColor = colors.shift();
       colors.push(usedColor);
       var usedWord = words.shift();
       words.push(usedWord);
       x = 1;
       target.setAttribute('style', 'color:' + colors[0])
       letterCount += x;
       waiting = false;
     }, 1000)
   } else if (letterCount === words[0].length + 1 && waiting === false) {
     waiting = true;
     window.setTimeout(function() {
       x = -1;
       letterCount += x;
       waiting = false;
     }, 1000)
   } else if (waiting === false) {
     target.innerHTML = words[0].substring(0, letterCount)
     letterCount += x;
   }
 }, 120)
 window.setInterval(function() {
   if (visible === true) {
     con.className = 'console-underscore hidden'
     visible = false;

   } else {
     con.className = 'console-underscore'

     visible = true;
   }
 }, 400)
}

window.onload = function () {
  consoleText(['geeky one.', 'in love with JavaScript.', 'runner.', 'loves coffee.',], 'text',['#b827fc','#b8fd33','#fec837','#fd1892']);
  scrollDown();

  const hero = document.querySelector('header')
  const pic = document.querySelector('.profile-pic')
  const text = hero.querySelector('h1')
  const movement = 8
  const movementImg = 8

  function shadow(e) {
    const { offsetWidth: width, offsetHeight: height } = hero
    let { offsetX: x, offsetY: y } = e

    if (this !== e.target) {
      x = x + e.target.offsetLeft
      y = y + e.target.offsetTop
    }
    //calculate the maximum movements that we want to happen (total set above)
    const xMovement = Math.round((x / width * movement) - (movement / 2))
    const yMovement = Math.round((y / height * movement) - (movement / 2))

    const xMovementImg = Math.round((x / width * movementImg * 2) - (movementImg))
    const yMovementImg = Math.round((y / height * movementImg * 2) - (movementImg))

    calcShadow(xMovement, yMovement, xMovementImg, yMovementImg)
  }

  hero.addEventListener('mousemove', shadow)
  hero.addEventListener('scroll', shadow)

  function scrollShadow(e) {
    const yMovement = Math.round((window.scrollY / window.innerHeight) * movement * 6)
    const yMovementImg = Math.round((window.scrollY / window.innerHeight) * movement * 3)

    calcShadow(yMovement, yMovement, yMovementImg, yMovementImg)
  }
  window.addEventListener('scroll', scrollShadow)

  function calcShadow(xMovement, yMovement, xMovementImg, yMovementImg) {
    text.style.textShadow = `
    ${xMovement}px ${yMovement}px 0 rgba(255, 0, 255, 0.3),
    ${xMovement * -1}px ${yMovement}px 0 rgba(0, 255, 255, 0.3),
    ${xMovement}px ${yMovement * -1}px 0 rgba(0, 255, 0, 0.3),
    ${xMovement * -1}px ${yMovement * -1}px 0 rgba(0, 0, 255, 0.3)`
    pic.style.boxShadow = `
    ${xMovementImg}px ${yMovementImg}px 0 rgba(255, 0, 255, 0.3),
    ${xMovementImg * -1}px ${yMovementImg}px 0 rgba(0, 255, 255, 0.3),
    ${xMovementImg}px ${yMovementImg * -1}px 0 rgba(0, 255, 0, 0.3),
    ${xMovementImg * -1}px ${yMovementImg * -1}px 0 rgba(0, 0, 255, 0.3)`
  }

}


function scrollDown() {
  let scrollIcon = document.querySelector('.icon-scroll');
  setTimeout(function() { scrollIcon.classList.remove("hide"); }, 700);
}

console.log("Just to say Hi! I know you're peeking :)")
