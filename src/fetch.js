import helper from './utils/helper.js';

const fetchData = async (datas) => {
  const rate = await helper.getRateUSD();
  const newdatas = datas.map((item) => {
    return {
      ...item, 
      price_usd: helper.convertIDRtoUSD(rate.idr, item.price),
    }
  })
  return newdatas;
}

export default {
  fetchData,
}