# efishery-test
Efishery testcase application

## Dependencies
  What things you need to install the software.
  1. Node >= 16.x
  2. Yarn >= 1.x (optional package installation)

## Wrapper Documentasion
>[Wrapper Docs](https://github.com/edhenprimasandy005/efishery-test/blob/main/wrapper.md)

## Running
### Installation
1. Install app
Using npm 
```bash
npm install
```
Using yarn 
```bash
yarn install
```

2. Create `.env` file from `.env.example`
```env
API_URL="https://stein.efishery.com/v1/storages/5e1edf521073e315924ceab4"
CURRENCY_CONVERTER_URL="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd/idr.json"
```
### Running command
Using node 
```bash
node ./src/index.js <command_wrapper>
```
Using yarn 
```bash
yarn command <command_wrapper>
```

## Command Instruction
### getAllData

*Command*
```bash
yarn command getAllData
```

*Response*

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

*Command*
```bash
yarn command getById <_id>
```
example
```bash
yarn command getById 877a3851-0942-4b6d-b933-7b3c22ac3ed7
```

*Response*

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
    "timestamp": "1641107737533",
    "price_usd": "1.29"
  },
]
```

### addData

*Command*
```bash
yarn command addData
```
example
```bash
yarn command addData

? Komoditas: BANDENG
? Provinsi: JAWA TIMUR
? Kota: JEMBER
? Size (number): 40
? Price (number): 19000
```

*Response*

```json
{ "updatedRange": 'list!A221:H221' }
```

### updateData

*Command*
```bash
yarn command updateData <_id>
```
example
```bash
yarn command updateData 877a3851-0942-4b6d-b933-7b3c22ac3ed7

? Komoditas: BANDENG
? Provinsi: JAWA TIMUR
? Kota: JEMBER
? Size (number): 40
? Price (number): 19000
```

*Response*

```json
{ "totalUpdatedRows": 1 }
```

### deleteDataById

*Command*
```bash
yarn command deleteDataById <_id>
```
example
```bash
yarn command deleteDataById 877a3851-0942-4b6d-b933-7b3c22ac3ed7
```

*Response*

```json
{ "clearedRowsCount": 1 }
```
### getById

*Command*
```bash
yarn command getByArea --province <_province > --city <_city >
```
example
```bash
yarn command getByArea --province='JAWA TIMUR' --city=JEMBER
```

*Response*

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
    "timestamp": "1641107737533",
    "price_usd": "1.29"
  },
  {
    "uuid": "4320653a-ac63-4485-b220-aa56ead32b6e",
    "komoditas": "MAS",
    "area_provinsi": "JAWA TIMUR",
    "area_kota": "JEMBER",
    "size": "130",
    "price": "61000",
    "tgl_parsed": "2022-02-05T17:27:02Z",
    "timestamp": "1644082022858",
    "price_usd": "4.13"
  },
]
```

### getByComodity

*Command*
```bash
yarn command getByComodity <_comodity>
```
example
```bash
yarn command getByComodity BANDENG
```

*Response*

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
    "timestamp": "1641107737533",
    "price_usd": "1.29"
  },
]
```

### getDataByRange

rangeof = `size|price|date`

*Command*
```bash
yarn command getDataByRange --raangeof <_rangeof>
```
example
```bash
yarn command getDataByRange --raangeof=size

? From:  20
? To:  30
```
*Response*

```json
[
  {
    "uuid": "b98b7297-6b44-43cf-a83c-adf9300b0fd0",
    "komoditas": "PATIN",
    "area_provinsi": "ACEH",
    "area_kota": "ACEH KOTA",
    "size": "20",
    "price": "44000",
    "tgl_parsed": "2022-01-20T12:38:27Z",
    "timestamp": "1642682307776",
    "price_usd": "2.98"
  },
]
```

```bash
yarn command getDataByRange --raangeof=price

? From:  1000
? To:  4000
```
*Response*

```json
[
  {
    "uuid": "17bea4d8-c171-4a38-bca9-10b26325fccc",
    "komoditas": "PATIN",
    "area_provinsi": "JAWA BARAT",
    "area_kota": "CILILIN",
    "size": "10",
    "price": "1000",
    "tgl_parsed": "2022-04-16T05:25:38Z",
    "timestamp": "1650086738639",
    "price_usd": "0.07"
  },
]
```

```bash
yarn command getDataByRange --raangeof=date

? Start date (YYYY-MM-DD):  2022-01-01
? End date (YYYY-MM-DD):  2022-01-02
```

*Response*

```json
[
  {
    "uuid": "e942502d-e74c-42ee-862e-2cabc6ad8a67",
    "komoditas": "NILA MERAH",
    "area_provinsi": "ACEH",
    "area_kota": "ACEH KOTA",
    "size": "110",
    "price": "33000",
    "tgl_parsed": "2022-01-01T14:08:23Z",
    "timestamp": "1641046103313",
    "price": "2.23",
  },
]
```
### getMostRecord

*Command*
```bash
yarn command getMostRecord
```
example
```bash
yarn command getMostRecord
```

*Response*

```json
{
  "BANDENG": { total_records: 48 },
  "MAS": { total_records: 28 },
  "GURAME": { total_records: 28 },
  "PATIN": { total_records: 23 },
  "'NILA MERAH'": { total_records: 23 },
  "'NILA HITAM'": { total_records: 20 },
  "LELE": { total_records: 19 },
  "BAWAL": { total_records: 19 },
}
```

### getMaxPrices

*Command*
```bash
yarn command getMaxPrices
```
example
```bash
yarn command getMaxPrices
```

*Response*

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
    "komoditas": { "BAWAL": '69000' }
  }
}
```
