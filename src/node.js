//Aquí irán todos los document.querySelector

const $ = (id) =>
document.querySelector(id); //Para evitar que el archivo se llene de document.querySElector()

//Secciones
const headerSection = $('#header');
const trendingPreviewSection = $('#trendingPreview');
const categoriesPreviewSection = $('#categoriesPreview');
const genericSection = $('#genericList');
const movieDetailSection = $('#movieDetail');

//List & containers
const searchForm = $('#searchForm');
const trendingMoviesPreviewList = $('.trendingPreview-movieList');
const categoriesPreviewList = $('.categoriesPreview-list');
const movieDetailCategoriesList = $('#movieDetail .categories-list');
const relatedMoviesContainer = $('.relatedMovies-scrollContainer');

// Elements
const headerTitle = $('.header-title');
const arrowBtn = $('.header-arrow');
const headerCategoryTitle = $('.header-title--categoryView');

const searchFormInput = $('#searchForm input');
const searchFormBtn = $('#searchBtn');
const trendingBtn = $('.trendingPreview-btn');
const movieDetailTitle = $('.movieDetail-title');
const movieDetailDescription = $('.movieDetail-description');
const movieDetailScore = $('.movieDetail-score');