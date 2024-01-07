import { Request, Response, NextFunction } from "express";
import admin from 'firebase-admin';
import { getAuth } from 'firebase-admin/auth';
import { env } from "process";

var serviceAccount = require("../../keys/serviceAccountKey");

interface UserRequest extends Request {
    user?: admin.auth.DecodedIdToken;
}

const app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "../../prisma/dev.db"
})

const authUser = async (req: UserRequest, res: Response, next: NextFunction) => {
  const idToken = req.headers.authorization;
  const [bearer, token] = (idToken || '').split(' ');

  if (bearer !== 'Bearer' || !idToken) {
    return res.status(401).json({ error: 'Authorization header missing' });
  }

  try {
    const decodedToken = await admin.auth().verifyIdToken(token, false);
    // await getAuth(app).verifyIdToken(token, true).then((decodedToken) => {
    //   req.user = decodedToken;
    // })
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error('Error validating Firebase token:', error);
    return res.status(401).json({ error: ('Invalid Firebase token' + error) });
  }
};

export default authUser;
