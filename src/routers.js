const {
  addHandlerBooks, getAllHandler, getHandlerById, updateHandler, deleteHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addHandlerBooks,
  }, {
    method: 'GET',
    path: '/books',
    handler: getAllHandler,
  }, {
    method: 'GET',
    path: '/books/{id}',
    handler: getHandlerById,
  }, {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateHandler,
  }, {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteHandler,
  },
];

module.exports = routes;
