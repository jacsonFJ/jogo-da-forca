module.exports = (router, jsonParser, urlParser, mongoose) => {
    const palavraController = require('../controller/palavra-controller')(mongoose);

    router.get('/', jsonParser, (req, res) => palavraController.listar(req, res));
    router.post('/', jsonParser, (req, res) => palavraController.novo(req, res));
    router.get('/:id', jsonParser, (req, res) => palavraController.abrir(req, res));

    return router;
};