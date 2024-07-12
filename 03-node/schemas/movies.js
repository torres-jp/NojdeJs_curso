const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    invalid_type_error: 'Title must be a string',
    required_error: 'Title is required'
  }),
  year: z.number().positive(),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(0),
  poster: z.string().url({
    invalid_type_error: 'Poster must be a valid URL',
    required_error: 'Poster is required'
  }),
  genre: z.array(
    z.enum([
      'Action',
      'Comedy',
      'Drama',
      'Horror',
      'Thriller',
      'Sci-Fi',
      'Adventure',
      'Animation',
      'Family',
      'Musical',
      'Sport'
    ])
  )
})

function validateMovie (object) {
  return movieSchema.safeParse(object)
}

function validatePartialMovie (object) {
  return movieSchema.partial().safeParse(object)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
