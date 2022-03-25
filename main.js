//WAITING FOR DOMCONTENTLOADED

window.addEventListener("DOMContentLoaded", init);

function init(event) {
  getData();
}

async function getData() {
  let result = await fetch(
    "https://thordiskara.com/recreate-bikeshop/wp-json/wp/v2/bike?_embed"
  );
  showBike(await result.json());
}

async function showBike(bikeArray) {
  console.log(bikeArray);
  const template = document.querySelector(".biketemplate").content;
  const parentElement = document.querySelector("main");
  bikeArray.forEach((bike) => {
    const copy = template.cloneNode(true);
    copy.querySelector("h4").textContent = bike.title.rendered;
    copy.querySelector(".brand").textContent = bike.brand;
    copy.querySelector(".priceinfo").textContent = bike.price;
    copy.querySelector(".colorinfo").textContent = bike.colour;
    copy.querySelector(".stockinfo").textContent = bike.stock;
    copy.querySelector("img").src =
      bike._embedded[
        "wp:featuredmedia"
      ][0].media_details.sizes.large.source_url;
    parentElement.appendChild(copy);
  });
}
