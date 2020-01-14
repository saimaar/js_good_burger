document.addEventListener("DOMContentLoaded", () => {
  const burgerMenu = document.querySelector("#burger-menu")
  const orderUl = document.querySelector("#order-list")
  const burgerForm = document.querySelector("#custom-burger")


  fetch("http://localhost:3000/burgers")
  .then((resp) => {
    return resp.json()
  })
  .then((burgerArray) => {
    renderAllBurgers(burgerArray)
  })



function slapEachBurgerToDom(burger){
    const burDiv = document.createElement("div")
    burDiv.className = "burger"
    const h3 = document.createElement("h3")
    h3.className = "burger_title"
    h3.innerText = "Good Burger"
    const img = document.createElement("img")
    img.src = burger.image
    console.log(img);
    const p = document.createElement("p")
    p.class = "burger_description"
    p.innerText = burger.description
    const button = document.createElement("button")
    button.class = "button"
    button.innerText = "Add to Order"
    burDiv.append(h3, img, p, button)
    burgerMenu.append(burDiv)

    orderList(button, burger)
}

function orderList(button, burger){
  button.addEventListener("click", (evt) => {
    const li = document.createElement("li")
    li.innerText = burger.name
    orderUl.append(li)
  })

}


  burgerForm.addEventListener("submit", (evt) => {
      evt.preventDefault()
      burgerName = evt.target["burger-name"].value
      burgerDesc = evt.target["burger-description"].value
      burgerImage = evt.target["burger-image"].value

      fetch("http://localhost:3000/burgers", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: burgerName,
          description: burgerDesc,
          image: burgerImage
        })
      })
      .then((resp) => {
        return resp.json()
      })
      .then((burgerObj) => {
          slapEachBurgerToDom(burgerObj)
      })
  })





function renderAllBurgers(burgerArray){
  burgerArray.forEach((burger) => {
    slapEachBurgerToDom(burger)
  })
}




























})
