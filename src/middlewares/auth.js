const { verifyJwt } = require('../utils/jwt');

async function userAuthViaToken(res, req, next) {
  const auth = req.header('Authorization');
  if (!auth) {
    return res.status(403).send({
      errors: {
        body: [
          'Only for logged in users',
        ],
      },
    });
  }

  if (!auth.startsWith('Token')) {
    return res.status(400).send({
      errors: {
        body: [
          'Authorization format not supported',
        ],
      },
    });
  }
  const token = auth.substr(6);
  try {
    const user = verifyJwt(token);
    req.user = user;
    return next();
  } catch (err) {
    return res.status(403).send({
      errors: {
        body: [
          'JWT Verificattion Failed',
        ],
      },
    });
  }
}