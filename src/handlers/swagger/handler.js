const YAML = require('yamljs');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('./swagger/swagger.yaml');

const docHandler = [(req, res, next) => {
    swaggerDocument.host = req.get('host');
    req.swaggerDoc = swaggerDocument;
    next();
}, swaggerUi.serve, swaggerUi.setup(
    swaggerDocument,
    {
        explorer: true
    }
)]

module.exports = {
    docHandler
};

