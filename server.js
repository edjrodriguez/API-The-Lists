const express = require('express');
const app = express();
const cors = require('cors')
const lists = require('./lists');
const { response } = require('express');

app.use(express.json());
app.use(cors());

app.locals.lists = lists

app.set('port', process.env.PORT || 3001);
app.locals.title = 'Wish List API';

app.get('/', (request, response) => {
    response.send('Wish List API');
  });
  
  app.listen(app.get('port'), () => {
    console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
    console.log(lists)
  });
  
app.get('/lists', (request, response) => {
   return response.send(app.locals.lists)
})
  