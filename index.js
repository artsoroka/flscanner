const vk = require('./lib/vk'); 

const groupId = process.env.FLSCANNER_GROUP_ID; 
const topicId = process.env.FLSCANNER_TOPIC_ID; 

vk
  .getComments(groupId, topicId)
  .then(comments => console.log(comments))
  .catch(e => console.log('getComments failed with error: %s', e)); 