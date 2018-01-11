const express = require('express');
const apiRouter = express.Router();

const minions = require('./db.js');
const checkMillion = require('./checkMillionDollarIdea.js');

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
    const updatedMinion = minions.updateInstanceInDatabase('minions', req.body);
    res.send(updatedMinion);
  };
});

apiRouter.post('/minions', (req, res, next) => {
  const newMinion = req.body;
  if (newMinion) {
    const createdMinion = minions.addToDatabase('minions', newMinion)
    res.status(201).send(createdMinion);
  };
});

apiRouter.delete('/minions/:minionId', (req, res, next) => {
  const id = req.params.minionId;
  if (id) {
    const bolean = minions.deleteFromDatabasebyId('minions', id);
    if (!bolean) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  };
});

//routes for /ideas
apiRouter.get('/ideas', (req, res, next) => {
  res.send(minions.getAllFromDatabase('ideas'))
});

apiRouter.get('/ideas/:ideaId', (req, res, next) => {
  const id = req.params.ideaId;
  const index = minions.getFromDatabaseById('ideas', id);
  if (index === -1 || id >= 450 || isNaN(id)) {
    res.status(404).send();
  } else {
    res.status(200).send(index);
  };
});

apiRouter.put('/ideas/:ideaId', (req, res, next) => {
  const id = req.params.ideaId;
  const instance = minions.getFromDatabaseById('ideas', id);
  if (id >= 450 || instance === -1 || isNaN(id) ) {
    res.status(404).send();
  } else {
    const updatedIdea = minions.updateInstanceInDatabase('ideas', req.body);
    res.send(updatedIdea);
  };
});

apiRouter.post('/ideas', checkMillion.checkMillionDollarIdea, (req, res, next) => {
  const newIdea = req.body;
  if (newIdea) {
    const createdIdea = minions.addToDatabase('ideas', newIdea);
    res.status(201).send(createdIdea);
  };
});

apiRouter.delete('/ideas/:ideaId', (req, res, next) => {
  const id = req.params.ideaId;
  if (id) {
    const bolean = minions.deleteFromDatabasebyId('ideas', id);
    if (!bolean) {
      res.status(404).send();
    } else {
      res.status(204).send();
    }
  };
});

apiRouter.get('/meetings', (req, res, next) => {
  res.send(minions.getAllFromDatabase('meetings'));
});

apiRouter.post('/meetings', (req, res, next) => {
  if (req) {
    const createdMeeting = minions.createMeeting();
    res.status(201).send(createdMeeting);
  } else {
    res.status(404).send();
  };
});


apiRouter.delete('/meetings', (req, res, next) => {
  minions.deleteAllFromDatabase('meetings');
});



module.exports = apiRouter;






//asd
