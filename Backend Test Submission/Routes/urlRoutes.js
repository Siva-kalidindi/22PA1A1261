const Router = require('express').Router();
const urlController = require('../Controllers/urlController.js');

Router.post('/shorten', urlController.shortenUrl);
Router.get('/:shortId', urlController.getOriginalUrl);
Router.get('/shorturls/:id', urlController.getDetailsById);

module.exports = Router;