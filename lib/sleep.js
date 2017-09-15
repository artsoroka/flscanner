module.exports = (ms) => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), ms)
  }); 
}; 