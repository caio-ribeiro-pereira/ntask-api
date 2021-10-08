const supertest = require('supertest');
const chai = require('chai');
const app = require('../index.js');
const config = require('../config.js');

global.app = app;
global.request = supertest(app);
global.expect = chai.expect;
global.config = config;