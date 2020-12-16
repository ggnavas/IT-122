const Joi = require('joi');
const express =  require('express');
const app = express();

app.use(express.json()); // adding middleware to parse JSON objects

const albums = [
    {id: 1, 
        albumTitle: 'A Drummer Boy Christmas', 
        artist: 'KING & COUNTRY',
        trackList: 'In The Bleak Midwinter (Prologue)'
            + 'Joy To The World' 
            + 'O Come, O Come Emmanuel'
            + 'Won\'t You Come'
            + 'Heavenly Hosts'
            + 'Silent Night', 
        genre: 'Christmas', 
        YOR: 'October 2, 2020'},
    {id: 2, 
        albumTitle: 'Starting Over', 
        artist: 'Chris Stapleton', 
        trackList: 'Starting Over' 
        + 'Devil Always Made Me Think Twice'
        + 'Cold'
        + 'When I\'m With You'
        + 'Arkansas',  
        genre: 'Country?', 
        YOR: 'August 27, 2020'},
    {id: 3, 
        albumTitle: 'POWER UP', 
        artist: 'AC/DC',
        trackList: 'Realize'
        + 'Rejection'
        + 'Shot In The Dark'
        + 'Through The Mists Of Time'
        + 'Kick You When You\'re Down', 
        genre: 'Metal', 
        YOR: 'October 7, 2020'}
];

app.get('/', (req,res) => {
    res.send('Add albums with POST\n Get albums with GET\nDelete albums with DELETE\nUpdate albums with PUT');
});

app.get('/api/albums', (req,res) => {
    res.send(/*[1,2,3]*/ albums)
});

// read the value of a parameter in a route
app.get('/api/albums/:id', (req,res) => {
    const album = albums.find(a => a.id === parseInt(req.params.id))
    if (!album) return res.status(404).send('The album with the given ID not found.') // use 404 if album not found
    res.send(album); // otherwise respond with the album
});

app.post('/api/albums', (req,res) => {
    const { error } = validateAlbum(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const album = {
        id: albums.length + 1, // no db
        albumTitle: req.body.albumTitle, // this assumes that there is an object in the body with a property called name
        artist: req.body.artist,
        trackList: req.body.trackList,
        genre: req.body.genre,
        YOR: req.body.YOR
    };
    albums.push(album); // add new album to the array
    res.send(album); // return the album item to the client
});

app.put('/api/albums/:id', (req,res) => {
    // Look up the album
    // if does not exist, return 404
    const album = albums.find(a => a.id === parseInt(req.params.id))
    if (!album) return res.status(404).send('The album with the given ID not found.')    

    // Validate
    // if invalid, return 400 - Bad request
    const { error } = validateAlbum(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }    

    // Update album
    album.albumTitle = req.body.albumTitle;
    album.artist = req.body.artist;
    album.trackList = req.body.trackList;
    album.genre = req.body.genre;
    album.YOR = req.body.YOR;
    // Return the updated album
    res.send(album);

});

app.delete('/api/albums/:id', (req, res) => {
    // Look up the album
    // Not exiting, return 404
    const album = albums.find(a => a.id === parseInt(req.params.id))
    if (!album) return res.status(404).send('The album with the given ID not found.')

    // Delete
    const index = albums.indexOf(album);
    albums.splice(index, 1);

    // Return the same album
    res.send(album);
});

function validateAlbum(album) {
    const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(album, schema);
}

/* 
// it is also possible to read multiple parameters in a route
app.get('/api/posts/:year/:month', (req,res) => {
    res.send(req.query);
});
 */

//PORT: we will use the global object process which has a property 
//called env and the we add the environment variable PORT 
// we assign the environment variable to a constant called port
// you can change the port environment variable on your machine
// in terminal using the export command 'export PORT=5000'
// and in command prompt using the set command
const port  = process.env.PORT || 3001
app.listen(port, () => console.log(`Listening on port ${port}...`))