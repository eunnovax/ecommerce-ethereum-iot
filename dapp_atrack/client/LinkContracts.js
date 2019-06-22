"use strict";
const symlinkDir = require("symlink-dir");
const path = require("path");

symlinkDir("../build/contracts", "src/contracts")
  .then(result => {
    console.log(result);
    //> { reused: false }

    return symlinkDir("../build/contracts", "src/contracts");
  })
  .then(result => {
    console.log(result);
    //> { reused: true }
  })
  .catch(err => console.error(err));
