//  Ya no se llaman las funciones automaticamente sino llamarlo desde este archivo cuando el location o hash change avise en qué vista está (principal u otra)

window.addEventListener('DOMContentLoaded', navigator, false); // Llamarlo para la primera carga de la app
window.addEventListener('hashchange', navigator, false); //Se llama cuando el url cambia

function navigator(){
    console.log({location});

    if(location.hash.startsWith('#trends')){
        trendsPage();
    } else if(location.hash.startsWith('#search=')){
        searchPage();
    } else if(location.hash.startsWith('#movie=')){
        movieDetailsPage();
    } else if(location.hash.startsWith('#category=')){
        categoriesPage();
    } else{
        homePage();
    }
    location.hash
}

function homePage(){
    console.log('Home Page');
    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function trendsPage(){
    console.log('Trends Page');
}

function searchPage(){
    console.log('Search Page');
}

function movieDetailsPage(){
    console.log('Movie Page');
}

function categoriesPage(){
    console.log('Categories Page');
}