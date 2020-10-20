const users = require('./users/users.service.js');
const tasks = require('./tasks/tasks.service.js');
const columns = require('./columns/columns.service.js');
const boards = require('./boards/boards.service.js');
const con_users = require('./con_users/con_users.service');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(tasks);
  app.configure(columns);
  app.configure(boards);
  app.configure(con_users);
};
