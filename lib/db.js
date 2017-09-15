const Promise   = require('bluebird'); 
const Datastore = require('nedb'); 
const config    = require('../config'); 

const db = new Datastore({ 
  filename: config.db.fileLocation, 
  autoload: true 
}); 

module.exports.addSource = (groupId, topicId) => {
  return new Promise((resolve, reject) => {
    db.insert({ 
      groupId     : groupId,
      topicId     : topicId,
      newestPostId: 0
    }, (err, newDoc) => {
      if( err ) return reject('Failed to save to db: ' + err); 
      resolve(newDoc); 
    });
  });
} 

module.exports.getSources = () => {
  return new Promise((resolve, reject) => {
    db.find({}, (err, docs) => {
      if( err ) return reject('Failed to read db: ' + err); 
      resolve(docs); 
    });
  });	
}

module.exports.updateSource = (sourceId, newestPostId) => {
  return new Promise((resolve, reject) => {
  	db.update({ _id: sourceId }, { $set: {newestPostId: newestPostId}}, (err, numReplaced) => {
  	  if( err ) return reject('Failed to update db: ' + err); 
  	  resolve(true); 
    }); 
  }); 
}; 