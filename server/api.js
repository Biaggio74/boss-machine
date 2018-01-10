const express = require('express');
const apiRouter = express.Router();

const minions = require('./db.js');

//routes for api/minons
apiRouter.get('/minions', (req, res, next) => {
  res.send(minions.getAllFromDatabase('minions'));
});

apiRouter.get('/minions/:minionId', (req, res, next) => {
  const id = req.params.minionId;
  const index = minions.getFromDatabaseById('minions', id);
  if (index === -1 || isNaN(id) || id >= 450) {
    res.status(404).send();
  } else {
    res.status(200).send(index);
  }
});

apiRouter.put('/minions/:minionId', (req, res, next) => {
  const id = req.params.minionId;
  const instance = minions.getFromDatabaseById('minions', id);
  if (id >= 450 || instance === -1 || isNaN(id) ) {
    res.status(404).send();
  } else {
    const updatedMinion = minions.updateInstanceInDatabase('minions', req.query);
    res.send(updatedMinion);
  }
})

module.exports = apiRouter;
