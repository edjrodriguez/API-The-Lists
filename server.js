const express = require('express');
const app = express();
const cors = require('cors')
const lists = require('./lists');
 const {v4 : uuidV4} = require('uuid')

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
    const { groceryItem, quantity, description} = request.body;

    if (!groceryItem || !quantity || !description) {
      return response.status(422).json({
        error: 'Expected format { groceryItem: <String>, quantity: <String>, description: <String> }. You are missing a required parameter.'
      })
    }
    let postID = uuidV4()
  
    const newItem = {id: postID, groceryItem, quantity, description};
  
    app.locals.lists.groceries = [...app.locals.lists.groceries, newItem];
  
    return response.status(201).json(newItem)
   
  } else if(request.body.whitneyItem) {
    const {whitneyItem, link, description} = request.body;

    if (!whitneyItem || !link || !description) {
      return response.status(422).json({
        error: 'Expected format { whitneyItem: <String>, link: <String>, description: <String> }. You are missing a required parameter.'
      })
    }

    let postID = uuidV4()

    const newItem = {id: postID, whitneyItem, link, description};
   

    app.locals.lists.whitWishList = [...app.locals.lists.whitWishList, newItem];

    return response.status(201).json(newItem)
    
  } else if(request.body.eddieItem) {
    const {eddieItem, link, description} = request.body;

    if (!eddieItem || !link || !description) {
      return response.status(422).json({
        error: 'Expected format { eddieItem: <String>, link: <String>, description: <String> }. You are missing a required parameter.'
      })
    }
    let postID = uuidV4()

    const newItem = {id: postID, eddieItem, link, description};
 
    app.locals.lists.eddieWishList = [...app.locals.lists.eddieWishList, newItem];

    return response.status(201).json(newItem)
    
  }
})