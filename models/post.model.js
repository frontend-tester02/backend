const { type } = require('express/lib/response')
const { Schema, model } = require('mongoose')

const postSchema = new Schema({
	title: { type: String, required: true },
	body: { type: String, required: true },
})

module.exports = model('Post', postSchema)
