import NodeCache from 'node-cache';

const myCache = new NodeCache();

const setCache = (key, data) => {
  const success = myCache.set(key, data);
  return success
}
const getCache = (key) => {
  const values = myCache.get(key);
  return values
}
export default {
  setCache,
  getCache
}