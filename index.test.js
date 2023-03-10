const { Room, Booking } = require("./index");

// OCCUPIED OR NOT TESTS
test("Is NOT occupied in the given date", () => {
  const bookingTemplateOne = new Booking({
    name: "Test1",
    email: "test1@gmail.com",
    checkIn: new Date("2022-12-11"),
    checkOut: new Date("2022-12-12"),
    discount: 15,
  });
  const bookingTemplateTwo = new Booking({
    name: "Test2",
    email: "test2@gmail.com",
    checkIn: new Date("2022-12-24"),
    checkOut: new Date("2022-12-26"),
    discount: 15,
  });
  const room = new Room({
    name: "Suite",
    bookings: [bookingTemplateOne, bookingTemplateTwo],
    rate: 6500,
    discount: 15,
  });

  expect(room.isOccupied(new Date("2022-12-06"))).toBe(false);
});

test("IS occupied in the given date", () => {
  const bookingTemplateOne = new Booking({
    name: "Test1",
    email: "test1@gmail.com",
    checkIn: new Date("2022-12-11"),
    checkOut: new Date("2022-12-12"),
    discount: 15,
  });
  const bookingTemplateTwo = new Booking({
    name: "Test2",
    email: "test2@gmail.com",
    checkIn: new Date("2022-12-24"),
    checkOut: new Date("2022-12-26"),
    discount: 15,
  });
  const room = new Room({
    name: "Suite",
    bookings: [bookingTemplateOne, bookingTemplateTwo],
    rate: 6500,
    discount: 15,
  });

  expect(room.isOccupied(new Date("2022-12-26"))).toBe(true);
});

// OCCUPANCY PERCENTAGE TESTS
test("Percentage occupancy to be 50%", () => {
  const bookingTemplateOne = new Booking({
    name: "Test1",
    email: "test1@gmail.com",
    checkIn: new Date("2022-12-11"),
    checkOut: new Date("2022-12-11"),
    discount: 15,
  });
  const bookingTemplateTwo = new Booking({
    name: "Test2",
    email: "test2@gmail.com",
    checkIn: new Date("2022-12-13"),
    checkOut: new Date("2022-12-14"),
    discount: 15,
  });
  const room = new Room({
    name: "Suite",
    bookings: [bookingTemplateOne, bookingTemplateTwo],
    rate: 6500,
    discount: 15,
  });

  expect(
    room.occupancyPercentage(new Date("2022-12-11"), new Date("2022-12-16"))
  ).toBe(50);
});

test("Total occupancy percentage to be 75%", () => {
  const bookingTemplateOne = new Booking({
    name: "Test1",
    email: "test1@gmail.com",
    checkIn: new Date("2022-12-11"),
    checkOut: new Date("2022-12-11"),
    discount: 15,
  });
  const bookingTemplateTwo = new Booking({
    name: "Test2",
    email: "test2@gmail.com",
    checkIn: new Date("2022-12-07"),
    checkOut: new Date("2022-12-14"),
    discount: 15,
  });
  const room = new Room({
    name: "Suite",
    bookings: [bookingTemplateOne, bookingTemplateTwo],
    rate: 6500,
    discount: 15,
  });

  const bookingTemplateThree = new Booking({
    name: "Test1",
    email: "test1@gmail.com",
    checkIn: new Date("2022-12-11"),
    checkOut: new Date("2022-12-15"),
    discount: 15,
  });
  const bookingTemplateFour = new Booking({
    name: "Test2",
    email: "test2@gmail.com",
    checkIn: new Date("2022-12-11"),
    checkOut: new Date("2022-12-12"),
    discount: 15,
  });
  const roomTwo = new Room({
    name: "Suite",
    bookings: [bookingTemplateThree, bookingTemplateFour],
    rate: 6500,
    discount: 15,
  });
  const Rooms = [room, roomTwo];

  expect(
    Room.totalOccupancyPercentage(
      Rooms,
      new Date("2022-12-11"),
      new Date("2022-12-16")
    )
  ).toBe(75);
});

test("RoomTwo is 100% available between given dates", () => {
  const bookingTemplateOne = new Booking({
    name: "Test1",
    email: "test1@gmail.com",
    checkIn: new Date("2022-12-11"),
    checkOut: new Date("2022-12-11"),
    discount: 15,
  });
  const bookingTemplateTwo = new Booking({
    name: "Test2",
    email: "test2@gmail.com",
    checkIn: new Date("2022-12-07"),
    checkOut: new Date("2022-12-14"),
    discount: 15,
  });
  const room = new Room({
    name: "Suite",
    bookings: [bookingTemplateOne, bookingTemplateTwo],
    rate: 6500,
    discount: 15,
  });
  const bookingTemplateThree = new Booking({
    name: "Test3",
    email: "test3@gmail.com",
    checkIn: new Date("2022-12-05"),
    checkOut: new Date("2022-12-06"),
    discount: 15,
  });
  const bookingTemplateFour = new Booking({
    name: "Test4",
    email: "test4@gmail.com",
    checkIn: new Date("2022-12-02"),
    checkOut: new Date("2022-12-03"),
    discount: 15,
  });
  const roomTwo = new Room({
    name: "Suite",
    bookings: [bookingTemplateThree, bookingTemplateFour],
    rate: 6500,
    discount: 15,
  });
  const Rooms = [room, roomTwo];

  expect(
    Room.availableRooms(Rooms, new Date("2022-12-11"), new Date("2022-12-16"))
  ).toStrictEqual([roomTwo]);
});

test("No room is 100% available between given dates", () => {
  const bookingTemplateOne = new Booking({
    name: "Test1",
    email: "test1@gmail.com",
    checkIn: new Date("2022-12-11"),
    checkOut: new Date("2022-12-11"),
    discount: 15,
  });
  const bookingTemplateTwo = new Booking({
    name: "Test2",
    email: "test2@gmail.com",
    checkIn: new Date("2022-12-07"),
    checkOut: new Date("2022-12-14"),
    discount: 15,
  });
  const room = new Room({
    name: "Suite",
    bookings: [bookingTemplateOne, bookingTemplateTwo],
    rate: 6500,
    discount: 15,
  });
  const bookingTemplateThree = new Booking({
    name: "Test3",
    email: "test3@gmail.com",
    checkIn: new Date("2022-12-05"),
    checkOut: new Date("2022-12-06"),
    discount: 15,
  });
  const bookingTemplateFour = new Booking({
    name: "Test4",
    email: "test4@gmail.com",
    checkIn: new Date("2022-12-02"),
    checkOut: new Date("2022-12-12"),
    discount: 15,
  });
  const roomTwo = new Room({
    name: "Suite",
    bookings: [bookingTemplateThree, bookingTemplateFour],
    rate: 6500,
    discount: 15,
  });
  const Rooms = [room, roomTwo];

  expect(
    Room.availableRooms(Rooms, new Date("2022-12-11"), new Date("2022-12-16"))
  ).toStrictEqual([]);
});

// FEES TESTS
test("Get booking fee", () => {
  const bookingTemplateOne = new Booking({
    name: "Test1",
    email: "test1@gmail.com",
    checkIn: new Date("2022-12-11"),
    checkOut: new Date("2022-12-11"),
    discount: 15,
  });
  const room = new Room({
    name: "Suite",
    bookings: [bookingTemplateOne],
    rate: 6500,
    discount: 15,
  });
  expect(bookingTemplateOne.getFee(room)).toBe(4696.25);
});

test("Get booking fee", () => {
  const bookingTemplateOne = new Booking({
    name: "Test1",
    email: "test1@gmail.com",
    checkIn: new Date("2022-12-11"),
    checkOut: new Date("2022-12-11"),
    discount: 5,
  });
  const room = new Room({
    name: "Suite",
    bookings: [bookingTemplateOne],
    rate: 5000,
    discount: 20,
  });
  expect(bookingTemplateOne.getFee(room)).toBe(3800);
});
