var express = require('express');
var router = express.Router();
var {schema} = require('../graphql/schema');

const graphqlHTTP = require('express-graphql');


router.use('/', graphqlHTTP({
    schema,
    graphiql: true
}))

module.exports = router;
