//  Ya no se llaman las funciones automaticamente sino llamarlo desde este archivo cuando el location o hash change avise en qué vista está (principal u otra)

searchFormBtn.addEventListener('click', () => {
    location.hash = '#search='+ searchFormInput.value; //Buscar el valor que escribio el usuario y concatenarlo a la busqueda
});

trendingBtn.addEventListener('click', () => {
    location.hash = '#trends=';
});

arrowBtn.addEventListener('click', () => {
    location.hash = '#home';
})

window.addEventListener('DOMContentLoaded', navigator, false); // Llamarlo para la primera carga de la app
window.addEventListener('hashchange', navigator, false); //Se llama cuando el url cambia

function navigator(){
    console.log({location});

    //Uso de operadores terniarios
    location.hash.startsWith('#trends')
    ? trendsPage()       :
    location.hash.startsWith('#search=')
    ? searchPage()       :
    location.hash.startsWith('#movie=')
    ? movieDetailsPage() :
    location.hash.startsWith('#category=')
    ? categoriesPage()   :
    homePage()

    smoothscroll();
}

function smoothscroll(){
     const currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
    if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo (0,currentScroll - (currentScroll/5));
    }

    /* Esta es otra forma de hacerlo
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0; */
};

function homePage(){
    console.log('Home Page');

    headerSection.classList.remove('header-container--long'); //Para removerlo de esa sección
    headerSection.style.background = ''; //imagen para tener efecto de la pelicula
    arrowBtn.classList.add('inactive'); //Para que no aparezca en esa sección
    arrowBtn.classList.remove('header-arrow--white'); //Para que aparezca la flecha en blanco y no morado
    headerTitle.classList.remove('inactive'); // En caso que lo llegue a tener, quitarle la clase inactive para que se muestre
    headerCategoryTitle.classList.add('inactive'); //Esconderlo porque no estamos en categoría
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.remove('inactive');
    categoriesPreviewSection.classList.remove('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.add('inactive');

    getTrendingMoviesPreview();
    getCategoriesPreview();
}

function trendsPage(){
    console.log('Trends Page');

    headerSection.classList.remove('header-container--long'); //Para removerlo de esa sección
    headerSection.style.background = ''; //imagen para tener efecto de la pelicula
    arrowBtn.classList.remove('inactive'); //Para que no aparezca en esa sección
    arrowBtn.classList.remove('header-arrow--white'); //Para que aparezca la flecha en blanco y no morado
    headerTitle.classList.add('inactive'); // En caso que lo llegue a tener, quitarle la clase inactive para que se muestre
    headerCategoryTitle.classList.remove('inactive'); //Esconderlo porque no estamos en categoría
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive'); //Quitar clase inactive
    movieDetailSection.classList.add('inactive');
}

function searchPage(){
    console.log('Search Page');

    headerSection.classList.remove('header-container--long'); //Para removerlo de esa sección
    headerSection.style.background = ''; //imagen para tener efecto de la pelicula
    arrowBtn.classList.remove('inactive'); //Para que no aparezca en esa sección
    arrowBtn.classList.remove('header-arrow--white'); //Para que aparezca la flecha en blanco y no morado
    headerTitle.classList.add('inactive'); // En caso que lo llegue a tener, quitarle la clase inactive para que se muestre
    headerCategoryTitle.classList.add('inactive'); //Esconderlo porque no estamos en categoría
    searchForm.classList.remove('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive'); //Quitar clase inactive
    movieDetailSection.classList.add('inactive');

    // ['#search'], 'LoQUeSEHayaBuscado']
    const [_, query] = location.hash.split("="); //convertir en un array lo que se tenga en un string
    getMoviesBySEarch(query);
}

function movieDetailsPage(){
    console.log('Movie Page');

    headerSection.classList.add('header-container--long'); //Para removerlo de esa sección
    //headerSection.style.background = ''; //imagen para tener efecto de la pelicula
    arrowBtn.classList.remove('inactive'); //Para que no aparezca en esa sección
    arrowBtn.classList.add('header-arrow--white'); //Para que aparezca la flecha en morado y no blanco
    headerTitle.classList.add('inactive'); // En caso que lo llegue a tener, quitarle la clase inactive para que se muestre
    headerCategoryTitle.classList.add('inactive'); //Esconderlo porque no estamos en categoría
    searchForm.classList.add('inactive');
    
    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.add('inactive');
    movieDetailSection.classList.remove('inactive');
}

function categoriesPage(){
    console.log('Categories Page');

    headerSection.classList.remove('header-container--long'); //Para removerlo de esa sección
    headerSection.style.background = ''; //imagen para tener efecto de la pelicula
    arrowBtn.classList.remove('inactive'); //Para que no aparezca en esa sección
    arrowBtn.classList.remove('header-arrow--white'); //Para que aparezca la flecha en blanco y no morado
    headerTitle.classList.add('inactive'); // En caso que lo llegue a tener, quitarle la clase inactive para que se muestre
    headerCategoryTitle.classList.remove('inactive'); //Esconderlo porque no estamos en categoría
    searchForm.classList.add('inactive');

    trendingPreviewSection.classList.add('inactive');
    categoriesPreviewSection.classList.add('inactive');
    genericSection.classList.remove('inactive'); //Quitar clase inactive
    movieDetailSection.classList.add('inactive');

    const [_, categoryData] = location.hash.split('='); //crear un array donde cada nuevo elemento se volverá parte del array ['category', 'id-name']
    const [categoryId, categoryName] = categoryData.split('-'); //LOs elementos se dividirán por -

    headerCategoryTitle.innerHTML = decodeURIComponent(categoryName);

    getMoviesByCategory(categoryId);
}