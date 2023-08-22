const { User } = require('../models/index')
const { verifyToken } = require('../helpers/jwt')


async function authentication(req, res, next) {
    try {
        console.log('disinis')
        const { access_token } = req.headers;

        if (!access_token) {
            throw { name: 'Unauthentication' };
        }

        const token = verifyToken(access_token);
        // console.log(token, "ini token");

        if (!token) {
            throw { name: 'JsonWebTokenError' };
        }

        const user = await User.findOne({
            where: {
                id: token.id
            }
        });

        // console.log(user, "ini user");

        if (!user) {
            throw { name: 'Data Not Found' };
        }

        req.additionalData = {
            userId: user.id,
            username: user.userName,
            email: user.email,
            role: user.role
        };


        next()
    } catch (err) {
        next(err)

    }
}




module.exports = { authentication }