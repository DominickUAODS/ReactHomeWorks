const url = "http://localhost:3000/users"

//// get
// fetch(url)
// 	.then(data => console.log(data.json))
// 	.then(res => console.log(res))
// 	.catch(err => console.log(err))

//// post
fetch(url, {
	method: "post",
	body: JSON.stringify({ name: "Ollaf" })
})
	.then(data => console.log(data))
	.catch(err => console.log(err))