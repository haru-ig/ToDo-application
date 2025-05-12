// index.js

const todos = []; //store in memory on server

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

//middle ware
//app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

/*
//GET ROUTE
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
*/

//changed GET route (dynamically generate HTML strings)
app.get('/', (req, res) => {
  let todoListHTML = todos.map(task => `<li>${task}</li>`).join('');

  const html = `
    <!DOCTYPE html>
    <html lang="ja">
    <head>
      <meta charset="UTF-8" />
      <title>ToDo App</title>
    </head>
    <body>
      <h1>ToDoアプリ</h1>
      <form action="/add" method="POST">
        <input type="text" name="task" placeholder="やることを書く" required />
        <button type="submit">追加</button>
      </form>
      <h2>やることリスト</h2>
      <ul>
        ${todoListHTML}
      </ul>
    </body>
    </html>
  `;
  res.send(html);
});


//POST ROUTE
app.post('/add', (req, res) => {
  const task = req.body.task;
  console.log('受け取ったToDo:', task);
  if (task) {
    todos.push(task);
  }
  res.redirect('/');
});

//Run server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

