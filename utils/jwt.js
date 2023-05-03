const jwt = require('jsonwebtoken');

const generateJwt = (id) => {
  return new Promise((resolved, reject) => {
    const payload = { id };

    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      { expiresIn: process.env.JWT_EXPIRE_IN },
      (err, token) => {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolved(token);
      }
    );
  });
};

module.exports = generateJwt;
