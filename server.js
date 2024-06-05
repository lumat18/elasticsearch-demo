const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const { phraseSearch } = require("./search-engine");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("hello");
});

app.post("/", (req, res) => {
    res.json(req.body);
});

app.get("/search/:index/:type", async (req, res) => {
   const data = await phraseSearch(req.params.index, req.params.type, req.query.q);
   res.json(data);
});

app.listen(3333, () => console.log('Server running at 3333'));
