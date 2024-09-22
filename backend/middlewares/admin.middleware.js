import jwt from 'jsonwebtoken';

export default function authenticateAdmin(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Unauthorized');

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(401).send('Invalid token');
    if (decoded.role !== 'admin') return res.status(403).send('Admins only');
    req.user = decoded;
    next();
  });
}
