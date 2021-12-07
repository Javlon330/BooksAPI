
const express = require('express');
const logger = require('./middleware/logger');
const authen = require('./authentification');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('config');
// books obyektini route sifatida ishlatish uchun
const books = require('./routes/books')
const app = express();


app.use(express.json());

// custom middleware 
app.use(logger);
app.use(authen);
app.use(morgan('tiny'));
app.use(helmet())
// route
app.use('/api/books', books)

console.log(process.env.NODE_ENV);
console.log(app.get('env'));
console.log(config.get('name'));
console.log(config.get('mailserver.password'))
console.log(config.get('mailserver.host'))

app.get('/',(req, res) => {
    res.status(200).send('Ulanish muvaffaqiyatli amalga oshirildi...');
});


const port = process.env.PORT || 5000;

app.listen(port,() => {
    console.log(`${port}- portni eshityapman...`)
}); 