import http from './http.js';
import statistic from './controllers/statistic-controlller.js';
import {v4 as uuidv4} from 'uuid';

const getAllData = async () => {
  const { data } = await http.get('/list').catch(e => {
    return Promise.reject(e?.response?.data || e);
  });
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
const getAllByRange = async (payload) => {
  const { data } = await http.get('/list').catch(e => {
    return Promise.reject(e?.response?.data || e);
  });
  if (payload.rangeof === 'date') {
    const newdata = data.filter((o) => {
      const enddate = new Date(payload.to);
      enddate.setDate(new Date(payload.to).getDate() + 1);
      if (new Date(payload.from).getTime() <= parseInt(o.timestamp) && enddate.getTime() > parseInt(o.timestamp)) {
        return o;
      }
    })
    return newdata;
  } else if (payload.rangeof === 'size') {
    const newdata = data.filter((o) => {
      if (parseInt(payload.from) <= parseInt(o.size) && parseInt(payload.to) > parseInt(o.size)) {
        return o;
      }
    })
    return newdata;
  } else if (payload.rangeof === 'price') {
    const newdata = data.filter((o) => {
      if (parseInt(payload.from) <= parseInt(o.price) && parseInt(payload.to) > parseInt(o.price)) {
        return o;
      }
    })
    return newdata;
  }
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
const getMostRecordByComodity = async () => {
  const { data } = await http.get('/list').catch(e => {
    return Promise.reject(e?.response?.data || e);
  });
  return statistic.fetchToMostRecords(data);
}
const getMaxPrice = async () => {
  const { data } = await http.get('/list').catch(e => {
    return Promise.reject(e?.response?.data || e);
  });
  return statistic.fetchToMaxPrices(data);
}
const get10Latest = async () => {
  const { data } = await http.get('/list').catch(e => {
    return Promise.reject(e?.response?.data || e);
  });

  return data.slice(Math.max(data.length - 5, 1));
}
// Export all methods
export default {   
  getAllData,
  getOptionArea,
  getOptionSize,
  getById,
  getByArea,
  getByComodity,
  getAllByRange,
  addData,
  updateData,
  deleteDataById,
  getMostRecordByComodity,
  getMaxPrice,
  get10Latest
};