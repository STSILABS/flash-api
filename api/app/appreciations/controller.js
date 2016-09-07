var appreciationsRepository = require('./repository');
var meta = require('../meta/controller');
var bodyParser = require('body-parser');
bodyParser.json();

function Controller() {}

function get(req, res, next) {

  appreciationsRepository.get(req.params.apprecid, true, function(apprec) {
    if(apprec === undefined) {
      res.status(404).json({ error: "Appreciation Not Found" });
    } else {
      var response = {
          meta: meta.get(req),
          data: apprec
      }
      res.status(200).json(apprec);
    }
  });

};

function post(req,res,next) {
  console.log(req.body);

    var apprecObj = {};
    apprecObj.from_user = req.body.from_user;
    apprecObj.to_user = req.body.to_user;
    apprecObj.to_user = req.body.to_user;
    apprecObj.date_given = req.body.date_given;
    apprecObj.title = req.body.title;
    apprecObj.description_of_conduct = req.body.description_of_conduct;
    apprecObj.positive_effect_on_others = req.body.positive_effect_on_others;
    apprecObj.status = req.body.status;

    appreciationsRepository.post(apprecObj, true, function(err, response) {
      if (err) {
        res.status(500).json(err);
      } else {
        res.status(200).json(response);
      }
    });

  };

  function put(req,res,next) {
    res.status(200).json({put:'put'});
  };

Controller.prototype = {
  get: get,
  post: post,
  put: put
};

var controller = new Controller();

module.exports = controller;
