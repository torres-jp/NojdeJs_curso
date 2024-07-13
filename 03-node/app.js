// const express = require('express')
// const movies = require('./movies.json')
// const crypto = require('node:crypto')
// const { validateMovie, validatePartialMovie } = require('./schemas/movies')

// const app = express()
// app.use(express.json())

// app.disable('x-powered-by')

// app.get('/movies', (req, res) => {
//   res.header('Access-Control-Allow-Origin', '*')

//   const { genre } = req.query

//   if (genre) {
//     const filteredMovies = movies.filter((movie) =>
//       movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
//     )
//     return res.json(filteredMovies)
//   }
// })

// app.get('/movies/:id', (req, res) => {
//   const { id } = req.params
//   const movie = movies.find((movie) => movie.id === id)

//   if (movie) return res.json(movie)
//   res.status(404).json({ message: 'Movie not found' })
// })

// app.post('/movies', (req, res) => {
//   const result = validateMovie(req.body)
//   if (result.error) {
//     return res.status(400).json({ message: JSON.parse(result.error.message) })
//   }

//   const newMovie = {
//     id: crypto.randomUUID(),
//     ...result.data
//   }

//   movies.push(newMovie)
//   res.status(201).json(newMovie)
// })

// app.patch('/movies/:id', (req, res) => {
//   const { id } = req.params
//   const result = validatePartialMovie(req.body)
//   if (result.error) {
//     return res.status(400).json({ message: JSON.parse(result.error.message) })
//   }

//   const movieIndex = movies.findIndex((movie) => movie.id === id)
//   if (movieIndex === -1) return res.status(404).json({ message: 'Movie not found' })

//   const updateMovie = {
//     ...movies[movieIndex],
//     ...result.data
//   }

//   movies[movieIndex] = updateMovie
//   return res.json(updateMovie)
// })

// const PORT = process.env.PORT ?? 1234

// app.listen(PORT, () => {
//   console.log(`Server is running on port http://localhost:${PORT}`)
// })

// // 01:02:00 movies.json

const express = require('express')
const movies = require('./movies.json')
const crypto = require('node:crypto')
const { validateMovie, validatePartialMovie } = require('./schemas/movies')

const app = express()
app.use(express.json())

app.disable('x-powered-by')

// Middleware para habilitar CORS en todas las rutas
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

app.get('/movies', (req, res) => {
  const { genre } = req.query

  if (genre) {
    const filteredMovies = movies.filter((movie) =>
      movie.genre.some((g) => g.toLowerCase() === genre.toLowerCase())
    )
    return res.json(filteredMovies)
  }

  return res.json(movies) // Devolver todas las películas si no hay filtro de género
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find((movie) => movie.id === id)

  if (movie) return res.json(movie)
  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const result = validateMovie(req.body)
  if (result.error) {
    return res.status(400).json({ message: JSON.parse(result.error.message) })
  }

  const newMovie = {
    id: crypto.randomUUID(),
    ...result.data
  }

  movies.push(newMovie)
  res.status(201).json(newMovie)
})

app.patch('/movies/:id', (req, res) => {
  const { id } = req.params
  const result = validatePartialMovie(req.body)
  if (result.error) {
    return res.status(400).json({ message: JSON.parse(result.error.message) })
  }

  const movieIndex = movies.findIndex((movie) => movie.id === id)
  if (movieIndex === -1) return res.status(404).json({ message: 'Movie not found' })

  const updatedMovie = {
    ...movies[movieIndex],
    ...result.data
  }

  movies[movieIndex] = updatedMovie
  return res.json(updatedMovie)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})
