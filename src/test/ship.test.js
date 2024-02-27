import Ship from "../Ship";

test("create ship object", () => {
  const ship = new Ship();
  expect(ship).toBeTruthy();
});
