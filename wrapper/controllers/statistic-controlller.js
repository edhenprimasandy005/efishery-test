import date from 'date-and-time';

const fetchToMostRecords = (data) => {
  let grouped = {};
  data.forEach((item) => {
    if(!grouped[item.komoditas]) {
      grouped[item.komoditas] = {
        total_records: 0,
      }
    }
    grouped[item.komoditas].total_records += 1
  });
  const sortable = Object.fromEntries(
    Object.entries(grouped).sort(([,a],[,b]) => a.total_records - b.total_records).reverse()
  );
  return sortable;
}
const fetchToMaxPrices = (data) => {
  let grouped = {};
  data.forEach((item) => {
    if (item.komoditas !== null) {
      const curr = new Date(item.tgl_parsed);
  
      const lastday = new Date(curr.setDate(curr.getDate() - curr.getDay() + 6));
      lastday.setHours(24,59,59,999);
      const firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
      firstday.setHours(0,0,0,0);
      const groupName = date.format(firstday, 'YYYY-MM-DD');
      if(!grouped[groupName]) {
        grouped[groupName] = {
          start_date_week: firstday,//date.format(firstday, 'YYYY-MM-DD'),
          end_date_week: lastday, //date.format(lastday, 'YYYY-MM-DD'),
          komoditas: {}
        }
      }
      if (!grouped[groupName].komoditas[item.komoditas]) {
        const filteredByCommodity = data.filter((o) => {
          return o.komoditas !== null && o.komoditas === item.komoditas && firstday.getTime() <= o.timestamp && lastday.getTime() >= o.timestamp
        })
        filteredByCommodity.sort((a, b) => {
            return a.price - b.price;
        });
        grouped[groupName].komoditas[item.komoditas] = filteredByCommodity[filteredByCommodity.length -1].price
      }
    }
  });
  return grouped;
}

export default {
  fetchToMostRecords,
  fetchToMaxPrices,
}