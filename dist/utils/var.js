"use strict";

var wichtig = require('./functions');
var axios = require('axios');
require('dotenv').config;
var VAR = {
  link: {
    collection: 'https://sandbox.momodeveloper.mtn.com/collection/',
    userProvosioning: 'https://sandbox.momodeveloper.mtn.com/v1_0/apiuser/'
  }
};
module.exports = VAR;