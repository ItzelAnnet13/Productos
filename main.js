const main = document.getElementsByTagName("main").item(0);
const URLMain = "https://fakestoreapi.com/products/";
const cardsContainer = document.getElementById("cardsContainer");
const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

function getData(){
    fetch(URLMain)
    .then((response) => {
        console.log(response);
        response.json().then((res)=>{
            // console.log(res.length); //20
            // console.log(res[0].title);
            createCards(res);
            
        });
        
    }

    )
    .catch((err) => {
        main.insertAdjacentHTML("beforeend", 
                         `<div class="alert alert-danger" role="alert">
                             ${err.message}
                         </div>`);
    })
}

getData();

function createCards(prods) {
    // crea las cartas vasado en el arreglo de los productos 
    prods.forEach((products) => {
        cardsContainer.insertAdjacentHTML("beforeend", 
            `<div class="col-sm-6 col-md-4 col-lg-3 d-flex">
            <div class="card" style="width: 18rem;">
                <img src="${products.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${products.title}</h5>
                    <p class="card-text"> $${products.price}</p>
                    <p class="card-text">${products.description}</p>
                    <button type="button" class="btn btn-primary show-modal-btn"
                            data-title="${products.title}"
                            data-desc="${products.description}"
                            data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            Ver más
                    </button>                 
                </div>
            </div>
            </div>`);
    });
}


