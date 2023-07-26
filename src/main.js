const api = axios.create({ //Crear la configuración por defecto para trabajar en el resto de consultas
    baseURL: 'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});

// Utils

function createMovies(movies, container){
    container.innerHTML = ''; //Limpiar las seccion antes de hacer el append chiled y evitar la carga duplicada de datos

    movies.forEach(movie => {
        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        console.log(movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path);

        movieContainer.appendChild(movieImg);
        container.appendChild(movieContainer);
    });
}

function createCategories(categories, container){
    container.innerHTML = "";
    categories.forEach(category => {
    const categoryContainer = document.createElement('div');
    categoryContainer.classList.add('category-container');

    const categoryTitle = document.createElement('h3'); // Esto se encuentra en el index.html
    categoryTitle.classList.add('category-title');
    categoryTitle.setAttribute('id', 'id' + category.id); //    concatenar para que le salgan los colorcitos a las categorías
    categoryTitle.addEventListener('click', () => {
        location.hash = `#category=${category.id}-${category.name}`;
    });
    const categoryTitleText = document.createTextNode(category.name);
    console.log("Categorías: " + category.name);

    categoryTitle.appendChild(categoryTitleText);
    categoryContainer.appendChild(categoryTitle);
    categoriesPreviewList.appendChild(categoryContainer);
    container.appendChild(categoryContainer);
});
}

// LLAMADOS A LA API


// -------------- MOSTRAR TRENDING MOVIES EN EL INICIO ------------------

async function getTrendingMoviesPreview(){
    const { data } = await api('trending/movie/day');
//    const data = await res.json(); //Ya no se usa para convertir los objetos a JavaScript porque axios da una respuesta distinta
    const movies = data.results;
    console.log(movies);

    createMovies(movies, trendingMoviesPreviewList);
}

// ------------------------ LISTA DE CATEGORÍAS  -----------------------------

async function getCategoriesPreview(){
    const { data } = await api('genre/movie/list');
    const categories = data.genres;

    createCategories(categories, categoriesPreviewList);
}

// --------------------- BUSCAR PELICULAS POR CATEGORÍA  --------------------------

async function getMoviesByCategory(id){
    const { data } = await api('discover/movie', {
        params: {
        with_genres: id,
    },
    });
//    const data = await res.json(); //Ya no se usa para convertir los objetos a JavaScript porque axios da una respuesta distinta
    const movies = data.results;

  //  genericSection.innerHTML = ""; // Insercion de peliculas
    createMovies(movies, genericSection);
}

getTrendingMoviesPreview();