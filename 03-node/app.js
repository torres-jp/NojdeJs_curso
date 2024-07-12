const express = require('express')
const movies = require('./movies.json')

const app = express()
app.use(express.json())

app.disable('x-powered-by')

app.get('/movies', (req, res) => {
  const { genre } = req.query

  if (genre) {
    const filterdMovies = movies.filter(movie => movie.genre.some(g => g.toLocaleLowerCase() === genre.toLocaleLowerCase()))
    return res.json(filterdMovies)
  }
})

app.get('/movies/:id', (req, res) => {
  const { id } = req.params
  const movie = movies.find(movie => movie.id === id)

  if (movie) return res.json(movie)

  res.status(404).json({ message: 'Movie not found' })
})

app.post('/movies', (req, res) => {
  const { title, year, director, duration, poster, genre, rate } = req.body
})

const PORT = process.env.PORT ?? 3000

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`)
})

// 00:34:00 movies.json
