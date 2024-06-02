const admin = require('firebase-admin');

async function verifyToken(req, res, next) {
  const idToken = req.headers.authorization;
  if (idToken) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(idToken);
      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(401).send('Unauthorized');
    }
  } else {
    res.status(401).send('Unauthorized');
  }
}

module.exports = verifyToken;
