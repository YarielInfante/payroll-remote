const bodyParser = require('body-parser');
const ContractRoute = require("./ContractRoute");
const {Router} = require("express");
const {getProfile} = require("../../middleware/getProfile");
const JobRoute = require("./JobRoute");
const BalanceRoute = require('./BalanceRoute')
const AdminRoute = require('./AdminRoute')

const router = new Router();

const apiRouter = Router();

apiRouter
    .use(bodyParser.json())
    .use(getProfile)


apiRouter.use('/contracts', new ContractRoute().router);
apiRouter.use('/jobs', new JobRoute().router);
apiRouter.use('/balances', new BalanceRoute().router);
apiRouter.use('/admin', new AdminRoute().router);

router.use('/api/v1', apiRouter);

module.exports = router;
