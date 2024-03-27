const jwt = require ('jsonwebtoken');

const authRequired = (req, res, next) => {
	try {
		
		const  token = req.header('x-token');
		console.log("cookies token", token)

		if (!token)
			return res.status(401).json(['No token, authorization denied']);

		jwt.verify(token, process.env.TOKEN_SECRET, (error, user) => {
			if (error) {
				return res.status(401).json(['Token is not valid']);
			}
			req.user = user;
			next();
		});
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
};

module.exports = {
authRequired
};