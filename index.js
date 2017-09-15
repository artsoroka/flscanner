const vk    = require('./lib/vk'); 
const db    = require('./lib/db'); 
const sleep = require('./lib/sleep'); 

(async () => {
  const sources = await db.getSources(); 
  var result = []; 
  
  for(source of sources){
    
    try{
	  const posts = await vk.getComments(source.groupId, source.topicId);
	  const newPosts = posts.filter(post => post.id > source.newestPostId); 

	  console.log('sleeping...');
	  await sleep(1000); 

	  if( ! newPosts.length ) continue; 

	  newestPostId = newPosts.reduce((acc, post) => {
	  	if(post.id > acc) acc = post.id; 
	  	return acc; 
	  }, source.newestPostId); 

	  result = result.concat(newPosts);   
	  
	  await db.updateSource(source._id, newestPostId); 
	  
	} catch(e){
	  console.log('fetching data failed: ', e); 
	}
	  
  } 
  
  console.log(result); 

})(); 
