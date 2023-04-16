import { config } from 'dotenv';
import axios from "axios";
config();
const CURRURL = process.env.CURRENCY_CONVERTER_URL;

const getRateUSD = async () => {
  const response = await axios.get(CURRURL);
  return response.data;
}
const convertIDRtoUSD = (rate, value) => {
  if (rate === null || value === null) {
    return 0;
  }
  const result = (parseFloat(value)/parseFloat(rate)).toFixed(2)
  return result;
}
const validateInquirer = (val, type) => {
  if (!val) {
    return false
  }
  if (type === 'date' && isNaN(Date.parse(new Date(val)))) {
    return false
  }
  if (['string', 'number'].includes(type) && !val) {
    return false
  }
  return true
}

export default {
  validateInquirer,
  getRateUSD,
  convertIDRtoUSD,
}