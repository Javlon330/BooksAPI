const express = require('express');
const Joi = require('joi');
const router = express.Router();

const books = [ 
    { id: 1, name: 'rich dad poor dad'},
    { id: 2, name: 'good to great'},
    { id: 3, name: 'the war of art'},
    { id: 4, name: 'The Programmitic Programmers'},
    { id: 5, name: "Clean Code"},
    { id: 6, name: 'Code Complete'} 
];
router.get('/',(req, res) => {
    res.send(books);
});

router.get("/:id", (req,res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book) {
        res.status(404).send("Berilgan id dagi kitob topilmadi...")
        return;
    }
    res.send(book); 
});


router.post('/', (req, res) => {

    const {error} = validateBook(req.body);
    if(error){
        res.status(400).send(error.details[0].message)
    }

    const book = {
        id: books.length + 1,
        name: req.body.name 
    }
    books.push(book);
    res.status(201).send(book);
});

router.put('/:id',(req, res) => {
    const book = books.find(b => b.id === parseInt(req.params.id));
    if(!book) {
        res.status(404).send("Berilgan id dagi kitob topilmadi...")
    }

    //Object destructuring//
    const {error} = validateBook(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    book.name = req.body.name;
    res.status(201).send(book)
});

router.delete('/:id', (req, res) => {
    const book = books.find( b => b.id === parseInt(req.params.id));
    if (!book) {
        return res.status(404).send("Berilgan iddagi malumot topilmadi...")
    };

    const indexBook = books.indexOf(book);
    const result = books.splice(indexBook, 1);
    res.send(result);

})


function validateBook(book){
    const bookSchema = {
        name: Joi.string().required().min(3)
    }
    return Joi.object(bookSchema).validate(book, bookSchema);   
}

module.exports = router;
