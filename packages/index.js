import http from './http.js';
import caching from './caching-controller.js';
import {v4 as uuidv4} from 'uuid';

const getAllData = async () => {
  const valuesCache  = caching.getCache('getAllData');
  if (valuesCache) {
    return valuesCache;
  }
  const { data } = await http.get('/list').catch(e => {
    return Promise.reject(e?.response?.data || e);
  });
  const cache = caching.setCache('getAllData', data);
  if (!cache) {
    Promise.reject('error');
  }
  return data;
}
const getOptionArea = async () => {
  const { data } = await http.get('/option_area').catch(e => {
    return Promise.reject(e?.response?.data || e);
  });
  return data;
}
const getOptionSize = async () => {
  const { data } = await http.get('/option_size').catch(e => {
    return Promise.reject(e?.response?.data || e);
  });
  return data;
}
const getAllByRange = async ({price, size, date}) => {
  const payload = {search: JSON.stringify({uuid: Id})}
  const { data } = await http.get('/list', {params: payload}).catch(e => {
    return Promise.reject(e?.response?.data || e);
  });
  return data;
}
const getById = async ({Id}) => {
  const payload = {search: JSON.stringify({uuid: Id})}
  const { data } = await http.get('/list', {params: payload}).catch(e => {
    return Promise.reject(e?.response?.data || e);
  });
  return data;
}
const getByArea = async ({province, city}) => {
  const payload = {search: JSON.stringify({area_provinsi: province, area_kota: city})}
  const { data } = await http.get('/list', {params: payload}).catch(e => {
    return Promise.reject(e?.response?.data || e);
  });
  return data;
}
const getByComodity = async ({comodity}) => {
  const payload = {search: JSON.stringify({komoditas: comodity})}
  const { data } = await http.get('/list', {params: payload}).catch(e => {
    return Promise.reject(e?.response?.data || e);
  });
  return data;
}
const addData = async (payload) => {
  const date = new Date();
  const formdata = [
    {
      ...payload,
      uuid: uuidv4(),
      tgl_parsed: date.toISOString(),
      timestamp: date.getTime()
    }
  ]
  const { data } = await http.post('/list', formdata).catch(e => {
    return Promise.reject(e?.response?.data || e);
  });
  return data;
}
const updateData = async (payload) => {
  const { data } = await http.put('/list', JSON.stringify(payload)).catch(e => {
    return Promise.reject(e?.response?.data || e);
  });
  return data;
}
const deleteDataById = async ({Id}) => {
  const payload = {condition: {uuid: Id}}
  console.log(payload);
  const { data } = await http.delete('/list', {data: payload}).catch(e => {
    return Promise.reject(e?.response?.data || e);
  });
  return data;
}
// Export all methods
export default {   
  getAllData,
  getOptionArea,
  getOptionSize,
  getById,
  getByArea,
  getByComodity,
  addData,
  updateData,
  deleteDataById,
};