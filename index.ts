interface IntRoom {
  name: string;
  bookings: Booking[];
  rate: number;
  discount: number;
}

class Room {
  name: string;
  bookings: Booking[];
  rate: number;
  discount: number;

  constructor(room: IntRoom) {
    this.name = room.name;
    this.bookings = room.bookings;
    this.rate = room.rate;
    this.discount = room.discount;
  }

  setBookings(bookings) {
    this.bookings = bookings;
  }

  // Returns an array of dates between start date and end date
  getDatesInRange(start: Date, end: Date): string[] {
    let range: string[] = [];
    let startDate = start;

    while (startDate <= end) {
      range = [...range, startDate.toISOString().slice(0, 10)];
      startDate.setDate(startDate.getDate() + 1);
    }
    return range;
  }

  // Is occupied if given date is between the booking check in and check out
  isOccupied(date: Date): boolean | string {
    for (let i = 0; i < this.bookings.length; i++) {
      if (
        date >= this.bookings[i].checkIn &&
        date <= this.bookings[i].checkOut
      ) {
        return true;
      }
    }
    return false;
  }

  // Checks for each date between the dates range if the current room is occupied. Then calculates the percentage
  occupancyPercentage(start: Date, end: Date): number {
    const range = this.getDatesInRange(start, end);
    let occupiedDates = 0;
    range.forEach((date) => {
      if (this.isOccupied(new Date(date)) !== false) {
        return (occupiedDates += 1);
      }
    });
    const totalPercentage = (occupiedDates * 100) / range.length;
    return totalPercentage;
  }

  // Check which room is completely occupied in the dates range. Then calculates the percentage based on the total amount of bookings
  static totalOccupancyPercentage = (
    rooms: Room[],
    startDate: Date,
    endDate: Date
  ) => {
    let bookingsBetweenRange: number = 0;
    let bookingsCount: number = 0;

    rooms.forEach((room) => {
      room.bookings.forEach((booking) => {
        bookingsCount++;
        if (
          booking.checkIn.getTime() >= startDate.getTime() &&
          booking.checkOut.getTime() < endDate.getTime()
        ) {
          bookingsBetweenRange++;
        }
      });
    });

    return (bookingsBetweenRange * 100) / bookingsCount;
  };

  // Checks which room from the array is completely available for the given dates
  static availableRooms = (rooms: Room[], startDate: Date, endDate: Date) => {
    let availableRoomsArray: Room[] = [];

    rooms.forEach((room) => {
      let roomIsOccupied = false;
      room.bookings.forEach((booking) => {
        if (
          booking.checkIn.getTime() < startDate.getTime() &&
          booking.checkOut.getTime() < startDate.getTime()
        ) {
          roomIsOccupied = false;
        } else if (
          booking.checkIn.getTime() > endDate.getTime() &&
          booking.checkOut.getTime() < endDate.getTime()
        ) {
          roomIsOccupied = false;
        } else {
          roomIsOccupied = true;
        }
      });
      roomIsOccupied === false && !availableRoomsArray.includes(room)
        ? availableRoomsArray.push(room)
        : null;
    });

    return availableRoomsArray;
  };
}

interface IntBooking {
  name: string;
  email: string;
  checkIn: Date;
  checkOut: Date;
  discount: number;
}

class Booking {
  name: string;
  email: string;
  checkIn: Date;
  checkOut: Date;
  discount: number;

  constructor(booking: IntBooking) {
    this.name = booking.name;
    this.email = booking.email;
    this.checkIn = booking.checkIn;
    this.checkOut = booking.checkOut;
    this.discount = booking.discount;
  }

  // Calculates room rate - room discount - booking discount
  getFee(room): number {
    let rateRoom: number = room.rate - (room.rate * room.discount) / 100;
    return rateRoom - (rateRoom * this.discount) / 100;
  }
}

// module.exports = { Room, Booking };
export { Room, Booking };
