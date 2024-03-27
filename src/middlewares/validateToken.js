const jwt = require('jsonwebtoken');

const authRequired = (req, res, next) => {
	const token = req.header('x-token');
	console.log('cookies token', token);

	if (!token)
		return res
			.status(401)
			.json(['No hay token, autorizacion de acceso denegada']);
	try {
		jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
			if (error) {
				return res.status(401).json(['El token no es valido.']);
			}
			req.user = user;
			next();
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
	authRequired,
};
