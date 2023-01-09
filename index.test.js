const { Room, Booking } = require("./index");

// General tests
// test("Returns 4 dates when date range is 12.12.2022 to 15.12.2022", () => {
//   const room = new Room("Suite", [], 6500, 15);

//   const startDate = "12/12/2022";
//   const endDate = "12/12/2022";
//   const expected = ["2022-12-12", "2022-12-13", "2022-12-14"];

//   expect(room.getDatesInRange(startDate, endDate)).toBe(expected);
// });

// Occupancy tests
test("Is not occupied when no bookings array provided or length 0", () => {
  const room = new Room("Suite", [], 6500, 15);
  expect(room.isOccupied("2023-01-05")).toBe(false);
});

test("Is NOT occupied in the given date", () => {
  const room = new Room("Suite", [], 6500, 15);

  const BookingOne = new Booking(
    "Test1",
    "test1@gmail.com",
    "2022-12-11",
    "2022-12-12",
    50,
    room
  );
  const BookingTwo = new Booking(
    "Test2",
    "test2@gmail.com",
    "2022-12-05",
    "2022-12-08",
    15,
    room
  );
  const BookingThree = new Booking(
    "Test3",
    "test3@gmail.com",
    "2022-12-24",
    "2022-12-129",
    70,
    room
  );

  room.setBookings([BookingOne, BookingTwo, BookingThree]);

  expect(room.isOccupied("2022-12-13")).toBe(false);
});

test("IS occupied in the given date", () => {
  const room = new Room("Suite", [], 6500, 15);

  const BookingOne = new Booking(
    "Test1",
    "test1@gmail.com",
    "2022-11-13",
    "2022-11-14",
    50,
    room
  );
  const BookingTwo = new Booking(
    "Test2",
    "test2@gmail.com",
    "2022-11-05",
    "2022-11-08",
    15,
    room
  );

  room.setBookings([BookingOne, BookingTwo]);

  expect(room.isOccupied("2022-11-13")).toBe(true);
});

// Occupancy percentage tests
test("Percentage occupancy", () => {
  const room = new Room("Suite", [], 6500, 15);

  const BookingOne = new Booking(
    "Test1",
    "test1@gmail.com",
    "2022-11-12",
    "2022-11-12",
    50,
    room
  );
  const BookingTwo = new Booking(
    "Test2",
    "test2@gmail.com",
    "2022-11-13",
    "2022-11-13",
    15,
    room
  );

  room.setBookings([BookingOne, BookingTwo]);

  expect(room.occupancyPercentage("2022-11-12", "2022-11-15")).toBe(50);
});
