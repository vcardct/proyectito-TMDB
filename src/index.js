const redis = require('redis');
const axios = require('axios');
const express = require('express');
const API_KEY = require('./secrets').API_KEY;
const baseURL = 'https://api.themoviedb.org/3/';
const responseTime = require('response-time');
const cacheRedisKey = 'cache-movies:trends:LoQueQuiera';

// Crea el cliente Redis
const redisClient = redis.createClient({
    host: '127.0.0.1',
    port: 6379,
  });

  //Conexion a Redis
(async () => {
    await redisClient.connect();
})();
console.log("Conectando a Redis");

redisClient.on('connect', () => {
    console.log('Conexión a Redis establecida.');
  });

redisClient.on('error', (error) => {
    console.error('Error en la conexión a Redis:', error);
  });

const app = express()
app.use(responseTime());

app.get("/trends", async (req,res) => {
    try{
        // Inicio del temporizador para la búsqueda y caché de Redis
        console.time('Tiempo de búsqueda y caché de Redis');
        const response = await axios.get(baseURL + 'trending/movie/day?api_key=' + API_KEY);

        // Guardamos la respuesta en Redis con una expiración en segundos
        redisClient.setEx(cacheRedisKey, 120, JSON.stringify(response.data));
        console.timeEnd('Tiempo de búsqueda y caché de Redis');

        // Acceder al arreglo de películas en la respuesta
        const movies = response.data.results;
        
        // Crear un arreglo para almacenar los datos relevantes de las películas
        const movieData = movies.map(movie => ({
            title: movie.title,
            overview: movie.overview,
            release_date: movie.release_date,
          }));
  
        // Enviar la respuesta JSON al cliente con el arreglo de datos de las películas
        res.json(movieData);
        
        // Imprimir en consola solo los datos que quiero mostrar
        movies.forEach(movie => {
        console.log("--------------------------------------------");
        console.log("Título: ", movie.title);
        console.log("Descripción: ", movie.overview);
        console.log("Fecha de lanzamiento: ", movie.release_date);
        console.log("--------------------------------------------");
        });
        }
        catch (error) {
            console.error('Error al obtener tendencias:', error);
            res.status(500).json({ error: 'Error al obtener tendencias' });
        }
});

app.listen(3000);
console.log("Server on port 3000");