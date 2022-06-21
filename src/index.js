let addToy = false;
let toyList = []

function getToys(){
  return fetch("http://localhost:3000/toys")
  .then(resp => resp.json())
}

getToys().then(toys => {
  toys.forEach(toy => {
    const newDiv = document.createElement("div")
    newDiv.childNode = toy
    newDiv.class = "card"
    const toyHeader = document.getElementById("toy-collection")
    toyHeader.appendChild(newDiv)
    let h2 = document.createElement('h2')
    h2.innerText = toy.name

    let img = document.createElement('img')
    img.setAttribute('src', toy.image)
    img.setAttribute('class', 'toy-avatar')

    let p = document.createElement('p')
    p.innerText = `${toy.likes} likes`

    let btn = document.createElement('button')
    btn.setAttribute('class', 'like-btn')
    btn.setAttribute('id', toy.id)
    btn.innerText = "like ❤️"
    btn.addEventListener('click', (event) => {
      console.log(event.target.dataset);
      likes(event)})
    newDiv.append(h2, img, p, btn)
  })
})

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      toyFormContainer.addEventListener('submit', event => {
        event.preventDefault()
        addToys(event.target)
    })} else {
      toyFormContainer.style.display = "none";
    }
  });
});

function addToys(toy){
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      "name": toy.name.value,
      "image": toy.image.value,
      "likes": 0
    })
  })
  .then(resp => resp.json())
  .then((toys) => {
    const newDiv = document.createElement("div")
    newDiv.childNode = toys
    newDiv.class = "card"
    const toyHeader = document.getElementById("toy-collection")
    toyHeader.appendChild(newDiv)
    let h2 = document.createElement('h2')
    h2.innerText = toys.name

    let img = document.createElement('img')
    img.setAttribute('src', toys.image)
    img.setAttribute('class', 'toy-avatar')

    let p = document.createElement('p')
    p.innerText = `${toys.likes} likes`

    let btn = document.createElement('button')
    btn.setAttribute('class', 'like-btn')
    btn.setAttribute('id', toy.id)
    btn.innerText = "like ❤️"
    btn.addEventListener('click', (event) => {
      console.log(event.target.dataset);
      likes(event)})
    newDiv.append(h2, img, p, btn)
  })
}

function likes(event){
  event.preventDefault()
  let like = parseInt(event.target.previousElementSibling.innerText) + 1
  fetch(`http://localhost:3000/toys/${event.target.id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      "likes": like
    })
  })
  .then(res => res.json())
  .then((likeresp => {
    event.target.previousElementSibling.innerText = `${like} likes`;
  }))
}
