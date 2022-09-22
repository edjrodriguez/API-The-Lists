const express = require('express');
const app = express();
const cors = require('cors')
const lists = require('./lists');
let postID = 100
// const { response } = require('express');

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
  });
  
app.get('/lists', (request, response) => {
  console.log(app.locals.lists)
   return response.send(app.locals.lists)
})
  
app.post('/lists', (request, response) => {
  if(request.body.groceryItem) {
    const {id, groceryItem, quantity, description} = request.body;

    if (!id || !groceryItem || !quantity || !description) {
      return response.status(422).json({
        error: 'Expected format { id: <Number>, groceryItem: <String>, quantity: <String>, description: <String> }. You are missing a required parameter.'
      })
    }
  
    const newItem = {id: postID, groceryItem, quantity, description};
    postID += 1
  
    app.locals.lists.groceries = [...app.locals.lists.groceries, newItem];
  
    return response.status(201).json(newItem)
   
  } else if(request.body.whitneyItem) {
    const {id, whitneyItem, link, description} = request.body;

    if (!id || !whitneyItem || !link || !description) {
      return response.status(422).json({
        error: 'Expected format { id: <Number>, whitneyItem: <String>, link: <String>, description: <String> }. You are missing a required parameter.'
      })
    }

    const newItem = {id: postID, whitneyItem, link, description};
    postID += 1

    app.locals.lists.whitWishList = [...app.locals.lists.whitWishList, newItem];

    return response.status(201).json(newItem)
    
  } else if(request.body.eddieItem) {
    const {id, eddieItem, link, description} = request.body;

    if (!id || !eddieItem || !link || !description) {
      return response.status(422).json({
        error: 'Expected format { id: <Number>, eddieItem: <String>, link: <String>, description: <String> }. You are missing a required parameter.'
      })
    }

    const newItem = {id: postID, eddieItem, link, description};
    postID += 1

    app.locals.lists.eddieWishList = [...app.locals.lists.eddieWishList, newItem];

    return response.status(201).json(newItem)
    
  }
})