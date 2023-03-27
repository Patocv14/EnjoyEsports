import Usuario from '../models/Usuario.js';

const isAdmin = (req, res, next) => {
  if (req.usuario.admin) {
    return next();
  } else {
    return res.status(401).json({ msg: 'Accion no valida' });
  }
};

export default isAdmin;
