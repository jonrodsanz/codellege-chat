const socketio = require('socket.io'),
 express = require('express'),
 http = require('http'),
 path = require('path'),
 bodyParser = require('body-parser'),
 morgan = require('morgan'),
 mongoose = require('mongoose');

 // Express instance
var app = express();

//mongoose configuration
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/chat', { useNewUrlParser: false}, (err, db) => {
  if (err) throw err;
  console.log(`DB connected (${db.name})`);
});

// Routes importing
var indexRoutes = require('./routes/indexRoutes');
var apiRoutes = require('./routes/apiRoutes');

// settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'pug');

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')))

// Routes
app.use('/', indexRoutes);
app.use('/api', apiRoutes);

// socket io
const server = http.createServer(app);
const io = socketio.listen(server);
require('./sockets')(io)

// starting the server
server.listen(app.get('port'), () => {
  console.log(`Server listening up on port ${app.get('port')}`);
})

module.exports = app;