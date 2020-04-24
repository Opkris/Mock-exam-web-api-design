const {app} = require('./app');
const repository = require("./repository_monday");

const port = process.env.PORT || 8080;

app.listen(port, () => {
    repository.initWithSomeMeals();
    console.log('Started server on port ' + port);
});

