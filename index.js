class Room {
  constructor(name, bookings, rate, discount) {
    this.name = name;
    this.bookings = bookings;
    this.rate = rate;
    this.discount = discount;
  }

  setBookings(bookings) {
    this.bookings = bookings;
  }

  getDatesInRange(start, end) {
    let range = [];
    let startDate = new Date(start);
    let endDate = new Date(end);

    while (startDate <= endDate) {
      range = [...range, startDate.toISOString().slice(0, 10)];
      startDate.setDate(startDate.getDate() + 1);
    }
    return range;
  }

  isOccupied(date) {
    const targetDate = new Date(date);
    let occupied = false;

    this.bookings.forEach((b) => {
      const checkIn = new Date(b.checkIn);
      const checkOut = new Date(b.checkOut);
      if (checkIn <= targetDate && checkOut >= targetDate) {
        occupied = true;
      }
    });

    return occupied;
  }

  occupancyPercentage(start, end) {
    const range = this.getDatesInRange(start, end);
    let numOccupied = 0;

    range.forEach((date) => {
      if (this.isOccupied(date) !== false) {
        return (numOccupied += 1);
      }
    });
    const totalPercentage = (numOccupied * 100) / range.length;
    return totalPercentage;
  }
}

class Booking {
  constructor(name, email, checkIn, checkOut, discount, room) {
    this.name = name;
    this.email = email;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
    this.discount = discount;
    this.room = room;
  }

  getFee = () => {
    const roomprice = this.room.rate;
    const roomdiscount = this.room.discount;
    const bookingdiscount = this.discount;

    return (
      (((roomprice * (100 - roomdiscount)) / 100) * (100 - bookingdiscount)) /
      100
    );
  };
}

module.exports = { Room, Booking };
