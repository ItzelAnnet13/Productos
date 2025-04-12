const main = document.getElementsByTagName("main").item(0);
const URLMain = "https://fakestoreapi.com/products/";
const mainProds = document.getElementById("mainProds");
const ulMenu = document.getElementById("ulMenu");


function getData(cat){
    const options = {"method":"GET"};
    fetch(URLMain+cat, options)
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

getData("");


function getCategories(){
    const options = {"method":"GET"};
    fetch(URLMain+"categories/", options)
    .then((response) => {
        //console.log(response);
        response.json().then((res)=>{
            // console.log(res.length); //20
            // console.log(res[0].title);
            //console.log("categories: ", res);
            res.forEach((cat)=>{
                ulMenu.insertAdjacentHTML("afterbegin", 
                `<li><a class="dropdown-item" style="cursor:pointer;" onclick="getData('category/${(cat.replace("'","%27"))}');"> ${cat} </a></li>`);
            });            
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

getCategories();


function createCards(prods) {
    mainProds.innerHTML = "";

    prods.forEach((prod, x) => {
        const modal = `Modal-${x}`;
        mainProds.insertAdjacentHTML("beforeend", 
            `<div class="card" style="width: 16rem;">
                <img src="${prod.image}" class="card-img-top" alt="${prod.title}" style="height:300px; object-fit:contain;">
                <div class="card-body">
                    <h5 class="card-title">${prod.title}</h5>
                    <p class="card-text">${prod.description.slice(0, 100)}</p>
                    <p class="card-text">$ ${prod.price}</p>
                    <a href="#" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#${modal}">
                        Ver más
                    </a>
                    <!-- Modal -->
                    <div class="modal fade" id="${modal}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                        <div class="modal-dialog">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h1 class="modal-title fs-5" id="modalTitle-${x}">${prod.title}</h1>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                </div>
                                <div class="modal-body">
                                    ${prod.description}
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                    <button type="button" class="btn btn-primary">Comprar</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`);
    });
}




