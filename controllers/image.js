const Clarifai = require('clarifai');


const app = new Clarifai.App({
  apiKey: '4411c11b3f5c424b9a0518a4a4eedfdf'
})

const handleImage = (req, res, db) => {
  const { id } = req.body;
  db('users').where('id', '=', id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
}

const handleApiCall = (req, res) => {
  app.models.predict( Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then (data => {
    res.json(data);
  })
  .catch(err => res.status(400).json('unable to work with API'))
}

module.exports = {
  handleImage,
  handleApiCall
}