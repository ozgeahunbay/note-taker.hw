const router= require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs= require('fs');

router.get('/api/notes', async (req, res) => {
    const dbJson= await JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    res.json(dbJson);
}
);
router.post('/api/notes', (req, res)=> {
    const dbJson= JSON.parse(fs.readFileSync('db/db.json','utf8'));
    const newNotes= {
        title: req.body.title,
        text: req.body.text,
        id:uuidv4(),
    };
    dbJson.push(newNotes);
    fs.writeFileSync('db/db.json',JSON.stringify(dbJson));
    res.json(dbJson);
});

router.delete('/api/notes/:id', (req, res)=> {
    let data= fs.readFileSync('../db/db.json', 'utf8');
    const dataJson= JSON.parse(data);
    const newNote= dataJson.filter((note) => {
        return note.id !== req.params.id;
    });
    fs.writeFileSync('../db/db.json', JSON.stringify(newNote));
    res.json('deleted');
});

module.exports = router;