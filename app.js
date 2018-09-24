var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// views
// --- personnel
var index = require('./routes/index');
var addEmployee = require('./routes/personnel/ajouter')
var employeesList = require('./routes/personnel/list')

// --- crud
var edit = require('./routes/crud/edit')
var remove = require('./routes/crud/delete')
var insert = require('./routes/crud/insert')
var update = require('./routes/crud/update')
var timeTravel = require('./routes/crud/timeTravel')
var findData = require('./routes/crud/findData')
var docx = require('./routes/crud/docxData')
// --- finance
var depense = require('./routes/finance/depense')
var addSpent = require('./routes/finance/addSpent')
var addIncome = require('./routes/finance/addIncome')
var equivalence = require('./routes/finance/equivalence')
var salary = require('./routes/finance/salair')
var revenue = require('./routes/finance/revenus')
var addSalair = require('./routes/finance/addSalair')

// stock
var outcome = require('./routes/stock/track')
var outcomeTrack = require('./routes/stock/outcomeTrack')
var incomeTrack = require('./routes/stock/incomeTrack')
var products = require('./routes/stock/products')
var incomeProducts = require('./routes/stock/valorisation')
var addProduct = require('./routes/stock/addProduct')
// salles
var equipement = require('./routes/sales/equipement')
var roomsList = require('./routes/sales/list')
var addSalle = require('./routes/sales/addSalle')
var save = require('./routes/sales/save')
// kids
var addChild = require('./routes/enfant/ajoute')
var beneficial = require('./routes/enfant/benificiaire')
var childrenList = require('./routes/enfant/list')
var listBenificiaire = require('./routes/enfant/listBenificiaire')
var jugement = require('./routes/enfant/jugement')
var vaccination = require('./routes/enfant/vaccination')
var addVaccination = require('./routes/enfant/addVaccination')


//users
var addUser = require('./routes/users/addUser')
var list = require('./routes/users/listUser')
var users = require('./routes/users/users')
var token = require('./routes/users/token')
var login = require('./routes/users/login')
var authenticate = require('./routes/users/authenticate')
var reset = require('./routes/users/reset')
var redirect = require('./routes/users/redirect')



// routes

app.use('/', index);
// --- personnel
app.use('/personnel/add', addEmployee)
app.use('/personnel/list', employeesList)

// --- finance
app.use('/finance/depense', depense)
app.use('/finance/addSpent', addSpent)
app.use('/finance/addIncome', addIncome)
app.use('/finance/equivalence', equivalence)
app.use('/finance/revenus', revenue)
app.use('/finance/salair', salary)
app.use('/finance/addSalair', addSalair)
// --- stock
app.use('/stock/track', outcome)
app.use('/stock/valorisation', incomeProducts)
app.use('/stock/products', products)
app.use('/stock/outcomeTrack', outcomeTrack)
app.use('/stock/incomeTrack', incomeTrack)
app.use('/stock/addProduct', addProduct)

// crud
app.use('/edit',edit)
app.use('/delete', remove)
app.use('/test2', insert)
app.use('/update', update)
app.use('/timeTravel', timeTravel)
app.use('/findData', findData)
app.use('/docx', docx)
// salles
app.use('/sales/equipements', equipement)
app.use('/sales/list', roomsList)
app.use('/sales/addSalle',addSalle)
app.use('/sales/save', save)

//  kids
app.use('/edit',edit)
app.use('/enfant/ajoute', addChild)
app.use('/enfant/list', childrenList)
app.use('/enfant/benificiaire', beneficial)
app.use('/enfant/listBenificiaire',listBenificiaire)
app.use('/enfant/jugement', jugement)
app.use('/enfant/vaccination', vaccination)
app.use('/enfant/addVaccination', addVaccination)


// users

app.use('/users/addUser',addUser)
app.use('/users/listUser',list)
app.use('/users', users)
app.use('/users/token', token )
app.use('/login', login)
app.use('/authenticate', authenticate)
app.use('/users/reset', reset)
app.use('/users/redirect', redirect)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
