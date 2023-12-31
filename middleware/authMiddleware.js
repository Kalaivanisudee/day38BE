const jwt = require('jsonwebtoken');
const config = require('../utils/config');


const authMiddleware = {
    verifyToken: (request, response,next) =>{
        const token = request.headers.authorization;
       if(!token){
        return response.json({error: 'Token not found'});
        }
        
        const getTokenFrom = (request) => {
            const authorization = request.headers.authorization;
            if(authorization && authorization.toLowerCase().startsWith('bearer')){
                return authorization.substring(7);
            }
            return null;
        }

try{
        jwt.verify(getTokenFrom(request), config.JWT_SECRET,(error, decodedToken) => {
            if(error) {
                return response.json({error: 'Token is invalid'});
            }
            request.userId = decodedToken.id;
            console.log(request.userId);
            next();
        });
    } catch (error){
            return response.json({error:'Token invalid'});
        }
       },

    }





module.exports = authMiddleware;