
module.exports = function(app) {

	// ROUTES FOR OUR API
	// =============================================================================

	// middleware to use for all requests

	app.use(function(req, res, next) {
		// do logging
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
		res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
		next();
	});

	app.use('/api/client', require('./app/client'));
	app.use('/api/distributor', require('./app/distributor'));
	app.use('/api/product', require('./app/product'));
	app.use('/api/store', require('./app/store'));
	app.use('/api/order', require('./app/order'));
	app.use('/api/orderitem', require('./app/orderitem'));
};
