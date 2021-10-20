const diagnostics = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../helpers/fsUtils');
const dbDiag = require('../db/diagnostics.json');
const fs = require('fs')

diagnostics.route('/')
  .get((req, res)=>{
    res.status(200).json(dbDiag);
  })
  .post((req, res)=>{
    res.send('received!')
    const objToPush = {
      "time": Date.now(),
      "error_id": uuidv4(),
      "errors": req.body.errors
    }
    dbDiag.push(objToPush);
    fs.writeFile('./db/diagnostics.json', JSON.stringify(dbDiag, null, '\t'), err => err ? console.error(err): null)
  })

module.exports = diagnostics;
