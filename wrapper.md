# WRAPPER
Efishery wrapper libray to get data from API

## Functions

### getAllData
`GET /list`

*Response*
> HTTP 200 : Example Response

```json
[
  {
    "uuid": "877a3851-0942-4b6d-b933-7b3c22ac3ed7",
    "komoditas": "BANDENG",
    "area_provinsi": "JAWA TIMUR",
    "area_kota": "JEMBER",
    "size": "40",
    "price": "19000",
    "tgl_parsed": "2022-01-02T07:15:37Z",
    "timestamp": "1641107737533"
  },
]
```

### getById
`GET /list`

*Request*
> Query Params: JSON string
```json
{ 
  search: { 
    uuid: "877a3851-0942-4b6d-b933-7b3c22ac3ed7"
  }
}
```
*Response*
> HTTP 200 : Example Response

```json
[
  {
    "uuid": "877a3851-0942-4b6d-b933-7b3c22ac3ed7",
    "komoditas": "BANDENG",
    "area_provinsi": "JAWA TIMUR",
    "area_kota": "JEMBER",
    "size": "40",
    "price": "19000",
    "tgl_parsed": "2022-01-02T07:15:37Z",
    "timestamp": "1641107737533"
  },
]
```

### addData
`POST /list`

*Request*
> Body Params: JSON string
```json
{
  "uuid": "6783bba8-51e3-4d63-b03f-d386d9de2b57",
  "komoditas": "ARWANA",
  "area_provinsi": "JAWA TIMUR",
  "area_kota": "BANYUWANGI",
  "size": "50",
  "price": "300000",
  "tgl_parsed": "2023-04-15T18:49:42.032Z",
  "timestamp": "1681584582032"
}
```
*Response*
> HTTP 200 : Example Response

```json
{ updatedRange: 'list!A221:H221' }
```

### updateData
`PUT /list`

*Request*
> Body Params: JSON string
```json
{
  condition: {uuid: "6783bba8-51e3-4d63-b03f-d386d9de2b57"},
  set: {
    "komoditas": "ARWANA",
    "area_provinsi": "JAWA TIMUR",
    "area_kota": "BANYUWANGI",
    "size": "50",
    "price": "300000",
  }
}
```
*Response*
> HTTP 200 : Example Response

```json
{ totalUpdatedRows: 1 }
```

### deleteDataById
`PUT /list`

*Request*
> Body Params: JSON string
```json
{
  condition: {uuid: "6783bba8-51e3-4d63-b03f-d386d9de2b57"},
}
```
*Response*
> HTTP 200 : Example Response

```json
{ clearedRowsCount: 1 }
```

### getByArea
`GET /list`

*Request*
> Query Params: JSON string
```json
{ 
  search: { 
    area_provinsi: "JAWA TIMUR",
    area_kota: "JEMBER",
  }
}
```
*Response*
> HTTP 200 : Example Response

```json
[
  {
    "uuid": "877a3851-0942-4b6d-b933-7b3c22ac3ed7",
    "komoditas": "BANDENG",
    "area_provinsi": "JAWA TIMUR",
    "area_kota": "JEMBER",
    "size": "40",
    "price": "19000",
    "tgl_parsed": "2022-01-02T07:15:37Z",
    "timestamp": "1641107737533"
  },
  {
    "uuid": "4320653a-ac63-4485-b220-aa56ead32b6e",
    "komoditas": "MAS",
    "area_provinsi": "JAWA TIMUR",
    "area_kota": "JEMBER",
    "size": "130",
    "price": "61000",
    "tgl_parsed": "2022-02-05T17:27:02Z",
    "timestamp": "1644082022858"
  },
]
```

### getByComodity
`GET /list`

*Request*
> Query Params: JSON string
```json
{ 
  search: { 
    komoditas: "BANDENG",
  }
}
```
*Response*
> HTTP 200 : Example Response

```json
[
  {
    "uuid": "877a3851-0942-4b6d-b933-7b3c22ac3ed7",
    "komoditas": "BANDENG",
    "area_provinsi": "JAWA TIMUR",
    "area_kota": "JEMBER",
    "size": "40",
    "price": "19000",
    "tgl_parsed": "2022-01-02T07:15:37Z",
    "timestamp": "1641107737533"
  },
  {
    "uuid": "3f5114eb-e16b-426b-8406-c8176faa9761",
    "komoditas": "BAWAL",
    "area_provinsi": "JAWA TENGAH",
    "area_kota": "PEMALANG",
    "size": "130",
    "price": "92000",
    "tgl_parsed": "2022-01-05T05:07:23Z",
    "timestamp": "1641359243948"
  },
]
```

### getAllByRange
`GET /list`

Response data from this endpoint will be remaping and filtered by range of `size|price|date`

*Response*
> HTTP 200 : Example Response

```json
[
  {
    "uuid": "877a3851-0942-4b6d-b933-7b3c22ac3ed7",
    "komoditas": "BANDENG",
    "area_provinsi": "JAWA TIMUR",
    "area_kota": "JEMBER",
    "size": "40",
    "price": "19000",
    "tgl_parsed": "2022-01-02T07:15:37Z",
    "timestamp": "1641107737533"
  },
]
```

### getMostRecord
`GET /list`

Response data from this endpoint will be remaping and grouping to get most records by comodity

*Response*
> HTTP 200 : Example Response

```json
{
  BANDENG: { total_records: 48 },
  MAS: { total_records: 28 },
  GURAME: { total_records: 28 },
  PATIN: { total_records: 23 },
  'NILA MERAH': { total_records: 23 },
  'NILA HITAM': { total_records: 20 },
  LELE: { total_records: 19 },
  BAWAL: { total_records: 19 },
  null: { total_records: 11 }
}
```

### getMaxPrices
`GET /list`

Response data from this endpoint will be remaping and grouping to get max prices comodity by weekdate.

*Response*
> HTTP 200 : Example Response

```json
{
  "2022-05-22": {
    "start_date_week": "2022-05-21T17:00:00.000Z",
    "end_date_week": "2022-05-28T17:59:59.999Z",
    "komoditas": {
      "GURAME": '93000',
      "PATIN": '9000',
      "'NILA HITAM'": '5000',
      "MAS": '15000',
      "BAWAL": '2000',
      "LELE": '30000',
      "BANDENG": '93000',
      "'NILA MERAH'": '72000'
    }
  },
  "2022-05-29": {
    "start_date_week": "2022-05-28T17:00:00.000Z",
    "end_date_week": "2022-06-04T17:59:59.999Z",
    "komoditas": { BAWAL: '69000' }
  }
}
```

### get10Latest
`GET /list`

*Response*
> HTTP 200 : Example Response

```json
[
  {
    "uuid": "877a3851-0942-4b6d-b933-7b3c22ac3ed7",
    "komoditas": "BANDENG",
    "area_provinsi": "JAWA TIMUR",
    "area_kota": "JEMBER",
    "size": "40",
    "price": "19000",
    "tgl_parsed": "2022-01-02T07:15:37Z",
    "timestamp": "1641107737533"
  },
  ...
]
```
