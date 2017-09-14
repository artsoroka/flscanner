const qs      = require('querystring'); 
const request = require('request'); 
const Promise = require('bluebird'); 

const VK_API_URL = 'https://api.vk.com/method'; 
const VK_API_VERSION = '5.68'; 

const buildUrl = (params) => {
  return [[VK_API_URL, params.method].join('/'), qs.stringify(params.query)].join('?'); 
}; 

const getComments = (groupId, topicId) => {
  return new Promise((resolve, reject) => {
    const url = buildUrl({
      method: 'board.getComments', 
      query : {
        group_id: groupId, 
        topic_id: topicId, 
        sort    : 'desc', 
        v       : VK_API_VERSION
      }
    });

    request({
      method: 'GET', 
      url   : url
    }, function(err, response, body){
      if( err ) return reject('request error: ' + err); 
        
      var data = null; 
        
      try{
        data = JSON.parse(body); 
      } catch(e){
        return reject('could not parse JSON response: ' + body); 
      }
        
      const payload = data.response || null;  
        
      if( ! payload || data.error) return reject('vk responded with error: ' + JSON.stringify(data)); 
        
      const items = payload.items || []; 
    
      const result = items.reduce((acc, item) => {
        return acc.concat({
          id    : item.id, 
          fromId: item.from_id, 
          date  : item.date, 
          text  : item.text
        }); 
      }, []); 
     
      resolve(result); 
      
    });
  }); 
}; 

module.exports.getComments = getComments; 
