import Wrapper from '../wrapper/index.js';

describe("Wrapper test", () => {
  test("get all data", async () => {
    const data = await Wrapper.getAllData();
    expect(Array.isArray(data)).toBe(true);
  });
  test("get data by id", async () => {
    const data = await Wrapper.getById({Id: '368daea2-5af7-49d4-bf2b-9e98a6881534'});
    expect(Array.isArray(data)).toBe(true);
  });
  test("get data by area", async () => {
    const data = await Wrapper.getByArea({province: 'ACEH', city: 'ACEH KOTA'});
    expect(Array.isArray(data)).toBe(true);
  });
  test("get data by comodity", async () => {
    const data = await Wrapper.getByComodity({comodity: 'BANDENG'});
    expect(Array.isArray(data)).toBe(true);
  });
  test("get data by range date", async () => {
    const data = await Wrapper.getAllByRange({rangeof: 'date'});
    expect(Array.isArray(data)).toBe(true);
  });
  test("get data by range size", async () => {
    const data = await Wrapper.getAllByRange({rangeof: 'size'});
    expect(Array.isArray(data)).toBe(true);
  });
  test("get data most record", async () => {
    const data = await Wrapper.getMostRecordByComodity();
    expect(typeof data === 'object').toBe(true);
  });
  test("get data max price", async () => {
    const data = await Wrapper.getMaxPrice();
    expect(typeof data === 'object').toBe(true);
  });
  test("get 10 latest data", async () => {
    const data = await Wrapper.get10Latest();
    expect(Array.isArray(data)).toBe(true);
  });
});