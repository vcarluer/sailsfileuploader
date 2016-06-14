var fs = require('fs')
var randString = require('randstring')

/**
 * DeployController
 *
 * @description :: Server-side logic for managing deploys
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  /**
   * `DeployController.send()`
   */
  send: function (req, res) {
    sails.log('send')
    // save original file name
    var origifile = req.file('package')._files[0].stream.filename;
    var filename = origifile

    // check if file is existing and change filename if necessary
    while(fs.existsSync(".tmp/uploads/" +filename)){
    // Add 4 random chars at he beginning of the filename
    filename = randString(3)+"_"+origifile;
    };    

    req.file('package').upload(filename,function (err, files) {
        if (err)
          return res.serverError(err)
          sails.log('renaming...')
          fs.rename("./.tmp/uploads/"+files[0].filename, "./assets/packages/" + origifile, function(err){
            if (err) {
              sails.log.error(err)
            } else {
              sails.log('renamed')
            }
          });
        return res.json({
          message: files.length + ' file(s) uploaded successfully!'
        });
    });
  },

  test: function (req, res) {
    sails.log('test')
    res.json({test: 'OK'})
  }
};

