const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
app.use(bodyParser.json())
app.use(cors())

const posts = {}

let examplepost = {
	'12ab34cd': {
		id: '12ab34cd',
		title: 'post title',
		comments: [
			{ id: '20202020', content: 'some comment' },
			{ id: '20202021', content: 'some more comment' },
		],
	},
}

app.get('/posts', (req, res) => {
	res.send(posts)
})

app.post('/events', async (req, res) => {
	const { type, data } = req.body

	if (type === 'PostCreated') {
		const { id, title } = data
		posts[id] = { id, title, comments: [] }
	}

	if (type === 'CommentCreated') {
		const { id, content, postId } = data
		const post = posts[postId]
		post.comments.push({ id, content })
	}

	await res.send({})
})

app.listen(4002, () => {
	console.log('Up. Listening on 4002')
})
