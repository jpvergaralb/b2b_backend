const app = require('./app')

const port = process.env.PORT || 8000
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Running server on ${port}...`)
})
