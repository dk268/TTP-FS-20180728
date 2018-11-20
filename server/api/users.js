const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      //avoid sending password or salt...
      attributes: ['id', 'email', `name`],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
