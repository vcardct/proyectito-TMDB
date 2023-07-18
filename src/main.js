const api = axios.create({ //Crear la configuración por defecto para trabajar en el resto de consultas
    baseURL: 'https://api.themoviedb.org/3/',
    headers:{
        'Content-Type': 'application/json;charset=utf-8',
    },
    params: {
        'api_key': API_KEY,
    },
});

// -------------- MOSTRAR TRENDING MOVIES EN EL INICIO ------------------

async function getTrendingMoviesPreview(){
    const { data } = await api('trending/movie/day');
//    const data = await res.json(); //Ya no se usa para convertir los objetos a JavaScript porque axios da una respuesta distinta
    const movies = data.results;
    
    movies.forEach(movie => {
        const getTrendingMoviesPreviewContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')

        const movieContainer = document.createElement('div');
        movieContainer.classList.add('movie-container');

        const movieImg = document.createElement('img');
        movieImg.classList.add('movie-img');
        movieImg.setAttribute('alt', movie.title);
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path,);

        movieContainer.appendChild(movieImg);
        getTrendingMoviesPreviewContainer.appendChild(movieContainer);
    });
}

// ------------------------ LISTA DE CATEGORÍAS  -----------------------------

async function getCategoriesPreview(){
    const { data } = await api('genre/movie/list');
    const categories = data.genres;

    categories.forEach(category => {
        const getCategoriesPreviewContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')

        const categoryContainer = document.createElement('div');
        categoryContainer.classList.add('category-container');

        const categoryTitle = document.createElement('h3'); // Esto se encuentra en el index.html
        categoryTitle.classList.add('category-title');
        categoryTitle.setAttribute('id', 'id' + category.id); //    concatenar para que le salgan los colorcitos a las categorías
        const categoryTitleText = document.createTextNode(category.name);

        categoryTitle.appendChild(categoryTitleText);
        categoryContainer.appendChild(categoryTitle);
        getCategoriesPreviewContainer.appendChild(categoryContainer);
    });
}

getTrendingMoviesPreview();
getCategoriesPreview();