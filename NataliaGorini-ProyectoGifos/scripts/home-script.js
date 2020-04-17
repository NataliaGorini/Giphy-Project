const giphyKey = 'e5StqUk5aqX4j4POSwzm2IEBOMj9LeDI';
let section = document.getElementById("search_result");
const boton = document.getElementById("searchbutton").addEventListener("click", (e) =>{ 
  e.preventDefault();
    const searchInput = document.getElementById("searchinput").value;
    const url = `https://api.giphy.com/v1/gifs/search?q=${searchInput}&api_key=${giphyKey}&limit=20`;
    giphySearch(url)
      .then(saveSearchs(searchInput))
    .then (response => {
      const divTitle = document.createElement("div");
      divTitle.classList.add("section_titles");
      const p = document.createElement("p");
      p.innerHTML = searchInput;
      section.appendChild(divTitle);
      divTitle.appendChild(p);
      section.classList.add("suggest");
      const divCont = document.createElement("div");
      divCont.classList.add("result")
      section.appendChild(divCont)
      appendGif(response,divCont)
    })
    removeResult();
});
// search -------------------
async function giphySearch (url) {
    const resp = await fetch(url);
    const data = await resp.json();
    return data
}
// DOM manipulation for append results --------------
function appendGif(response, output) {
  response.data.forEach(gif => {
      let img = document.createElement('img');
      response.data.title = gif.title;
      img.src = gif.images.fixed_height.url;
      img.alt = gif.title;
      output.appendChild(img)
  })
};
document.getElementById("searchinput").onkeyup = () => {
  document.querySelector(".states--container").style.display = "flex";
  const searchInput = document.getElementById("searchinput").value;
  state1.innerHTML = searchInput + " grumpy";
  state2.innerHTML = searchInput + " funny";
  state3.innerHTML = searchInput + " psicodelic";
  state1.onclick = () => {document.querySelector(".states--container").style.display = "none";
  }
  state2.onclick = () => {document.querySelector(".states--container").style.display = "none";
  }
  state3.onclick = () => {document.querySelector(".states--container").style.display = "none";
  }
  if(document.querySelector(".states--container").style.display !== "flex"){
    document.getElementById("searchbutton").className("buttonsearch")
  }else {
    document.getElementById("searchbutton").style.background = "#F7C9F3";
    document.getElementById("searchbutton").style.color = "#110038";
  }
}
document.getElementById("searchinput").onclick = () => {
  document.querySelector(".states--container").style.display = "none";
}
document.getElementById("searchbutton").onclick = () => {
  document.querySelector(".states--container").style.display = "none";
}
// sugest search adjetives--------------------------------
const state1 = document.getElementById("state1");
state1.addEventListener("click", () => {
  const searchInput = document.getElementById("searchinput").value;
  const url = `https://api.giphy.com/v1/gifs/search?q=${searchInput}+grumpy&api_key=${giphyKey}&limit=20`;
  state1.innerHTML = searchInput + " grumpy";
  giphySearch(url)
  .then (response => {
    const divTitle = document.createElement("div");
    divTitle.classList.add("section_titles");
    const p = document.createElement("p");
    p.innerHTML = searchInput;
    section.appendChild(divTitle);
    divTitle.appendChild(p);
    section.classList.add("suggest");
    const div = document.createElement("div");
    div.classList.add("result")
    section.appendChild(div)
    appendGif(response,div)
  })
  removeResult();
})
const state2 = document.getElementById("state2")
state2.addEventListener("click", () =>{
  const searchInput = document.getElementById("searchinput").value;
  const url = `https://api.giphy.com/v1/gifs/search?q=${searchInput}+funny&api_key=${giphyKey}&limit=20`;
  giphySearch(url)
  .then (response => {
    const divTitle = document.createElement("div");
    divTitle.classList.add("section_titles");
    const p = document.createElement("p");
    p.innerHTML = searchInput;
    section.appendChild(divTitle);
    divTitle.appendChild(p);
    section.classList.add("suggest");
    const div = document.createElement("div");
    div.classList.add("result")
    section.appendChild(div)
    appendGif(response,div)
  })
  removeResult();
})
const state3 = document.getElementById("state3")
state3.addEventListener("click", () =>{
  const searchInput = document.getElementById("searchinput").value;
  const url = `https://api.giphy.com/v1/gifs/search?q=${searchInput}+psicodelic&api_key=${giphyKey}&limit=20`;
  giphySearch(url)
  .then (response => {
    const divTitle = document.createElement("div");
    divTitle.classList.add("section_titles");
    const p = document.createElement("p");
    p.innerHTML = searchInput;
    section.appendChild(divTitle);
    divTitle.appendChild(p);
    section.classList.add("suggest");
    const div = document.createElement("div");
    div.classList.add("result")
    section.appendChild(div)
    appendGif(response,div)
  })
  removeResult();
})

// creador de btn hashtags y localstorage -----------------
let arrayHistory = []
let searchOnLS = localStorage.getItem('searchItem');

function saveSearchs(item) {
  arrayHistory.push(item);
  localStorage.setItem('searchItem', arrayHistory);
  if (searchOnLS === null || searchOnLS === undefined) {
      console.log('No se guardo ninguna busqueda');
  } else {
      arrayHistory.slice(-1).forEach ((item)=>{
        const father = document.querySelector(".hashtags");
        const buttonHash = document.createElement("button");
        buttonHash.classList.add("buttonhash_day");
        father.appendChild(buttonHash);
        buttonHash.innerHTML = ("#" + item);
        buttonHash.addEventListener("click",() => {
          const url = `https://api.giphy.com/v1/gifs/search?q=${item}&api_key=${giphyKey}&limit=20`;
          giphySearch (url)
            .then (response =>{
              const divTitle = document.createElement("div");
              divTitle.classList.add("section_titles");
              const p = document.createElement("p");
              p.innerHTML = item;
              section.appendChild(divTitle);
              divTitle.appendChild(p);
              section.classList.add("suggest");
              const div = document.createElement("div");
              div.classList.add("result")
              section.appendChild(div)
              appendGif(response,div)
          })
          removeResult()
        })
    }) 
  }
};
// remove result --------------------------------------
function removeResult(){
  if (document.getElementById("search_result").className === "suggest"){
    document.getElementById("search_result").innerHTML="";
  }
};
// show dropdown --------------------------------------
document.querySelector(".dropdown").addEventListener("click", getDrop);
function getDrop (){
  let innerMenu = document.querySelector(".indrop").classList.toggle("show")
  if("show" == !true){
    innerMenu.classList.remove("show")
  }
};
// change themes ------------------------------------------
function changeThemes () {
  if(sessionStorage.getItem("theme") == "dark"){
    sessionStorage.setItem("theme","dark");
  }else{
    sessionStorage.getItem("theme") == "light"
  }
}
document.getElementById("night").addEventListener("click", () =>{ 
  document.getElementById("body").setAttribute('theme', 'dark')
  sessionStorage.setItem("theme","dark");
  changeThemes()
  document.querySelector(".logo").setAttribute("src","assets/gifOFLogoDark.png");
});
document.getElementById("day").addEventListener("click", () =>{ 
  document.getElementById("body").setAttribute('theme', 'light')
  sessionStorage.setItem("theme","light");
  changeThemes()
  document.querySelector(".logo").setAttribute("src","assets/gifOF_logo.png");
});

// suggest function harcode------------------------------
async function suggestRes(){
  const url = `https://api.giphy.com/v1/gifs/search?q=comedy&api_key=${giphyKey}&limit=4`;
  const resp = await fetch(url);
  const data = await resp.json();
  let section = document.getElementById("suggest--result");
  section.classList.add("result");
  data.data.forEach(gif => {
    const div = document.createElement("div");
    div.classList.add("div_suggest");
    const name = document.createElement("p");
    const cruz = document.createElement("img");
    const img = document.createElement("img");
    const button = document.createElement("button");
    cruz.src = "/assets/button3.svg";
    img.src = gif.images.fixed_height.url;
    img.alt = gif.title;
    button.innerHTML = "Ver más...";
    name.innerHTML = "#" + gif.title.substring(0,10);
    img.classList.add("result_img");
    button.classList.add("vermas--btn");
    section.appendChild(div);
    div.appendChild(name);
    name.appendChild(cruz);
    div.appendChild(img);
    div.appendChild(button);
    button.onclick = () => {
      const container = document.getElementById("suggest--vermas");
      const urlmore = `https://api.giphy.com/v1/gifs/search?q=comedy&api_key=${giphyKey}&limit=8`;
      giphySearch(urlmore)
        .then (response =>{
          const div = document.createElement("div");
          container.classList.add("result");
          container.appendChild(div)
          appendGif(response,div)
        })
    };
    return data;
  })
};
window.onload = suggestRes();

// trending fuction change every day -------------------
async function trending(){
  const url = `https://api.giphy.com/v1/gifs/trending?&api_key=${giphyKey}&limit=20`;
  const resp = await fetch(url);
  const data = await resp.json();
  console.log(data);
  data.data.forEach(gif => {
    let container = document.getElementById("trendresult");
    let div = document.createElement("div");
    let img = document.createElement("img");
    let title = document.createElement("h4");
    let slug = getHashtags(gif)
    title.innerHTML= slug
    title.classList.add("slug--trending")
    img.src = gif.images.fixed_height.url;
    container.appendChild(div);
    div.classList.add("div--trend")
    div.appendChild(img);
    img.classList.add("result_img");
    div.appendChild(title)
    
  });
  return data;
};
window.onload = trending();

function getHashtags(gif) {
  let hashtags = ""
  let slugArray = gif.slug.split('-')
  slugArray.pop()
  if (slugArray.length !== 0) {
      slugArray = slugArray.map(e => `#${e}`)
      if (slugArray.length > 3) {
          slugArray.splice(2, slugArray.length - 1)
      }
      hashtags = slugArray.join(' ')
  } else {
      if (gif.title != "") {
          let title = gif.title.trim()
          title = title.substring(0, title.indexOf(" GIF"))
          hashtags = title.split(' ').map(e => `#${e}`).join(' ')
      }
  }
  return hashtags;
}
// my gifos -----------------
document.querySelector(".mygi").addEventListener("click", () =>{
  getMyGifs()
  document.querySelector(".searcher").style.display = "none";
  document.querySelector(".hashtags").style.display = "none";
  document.getElementById("search_result").style.display = "none";
  document.getElementById("suggest").style.display = "none";
  document.querySelector(".trending").style.display = "none";
})
async function getMyGifs (){
  document.querySelector(".own--gifos").style.display = "flex";
  const myGifsId = localStorage.getItem("arrayOwnGifs");
  const gifUrlById = `https://api.giphy.com/v1/gifs?api_key=${giphyKey}&ids=${myGifsId}`
  const res = await fetch (gifUrlById);
  const data = await res.json();
  console.log(data)
  data.data.forEach (gif => {
      const container = document.querySelector(".my--gifos")
      const div = document.createElement("div");
      const img = document.createElement("img");
      img.src = gif.images.fixed_height.url;
      container.appendChild(div);
      div.appendChild(img);
  })
}