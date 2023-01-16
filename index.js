"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.Booking = exports.Room = void 0;
var Room = /** @class */ (function () {
    function Room(room) {
        this.name = room.name;
        this.bookings = room.bookings;
        this.rate = room.rate;
        this.discount = room.discount;
    }
    Room.prototype.setBookings = function (bookings) {
        this.bookings = bookings;
    };
    // Returns an array of dates between start date and end date
    Room.prototype.getDatesInRange = function (start, end) {
        var range = [];
        var startDate = start;
        while (startDate <= end) {
            range = __spreadArray(__spreadArray([], range, true), [startDate.toISOString().slice(0, 10)], false);
            startDate.setDate(startDate.getDate() + 1);
        }
        return range;
    };
    // Is occupied if given date is between the booking check in and check out
    Room.prototype.isOccupied = function (date) {
        for (var i = 0; i < this.bookings.length; i++) {
            if (date >= this.bookings[i].checkIn &&
                date <= this.bookings[i].checkOut) {
                return true;
            }
        }
        return false;
    };
    // Checks for each date between the dates range if the current room is occupied. Then calculates the percentage
    Room.prototype.occupancyPercentage = function (start, end) {
        var _this = this;
        var range = this.getDatesInRange(start, end);
        var occupiedDates = 0;
        range.forEach(function (date) {
            if (_this.isOccupied(new Date(date)) !== false) {
                return (occupiedDates += 1);
            }
        });
        var totalPercentage = (occupiedDates * 100) / range.length;
        return totalPercentage;
    };
    // Check which room is completely occupied in the dates range. Then calculates the percentage based on the total amount of bookings
    Room.totalOccupancyPercentage = function (rooms, startDate, endDate) {
        var bookingsBetweenRange = 0;
        var bookingsCount = 0;
        rooms.forEach(function (room) {
            room.bookings.forEach(function (booking) {
                bookingsCount++;
                if (booking.checkIn.getTime() >= startDate.getTime() &&
                    booking.checkOut.getTime() < endDate.getTime()) {
                    bookingsBetweenRange++;
                }
            });
        });
        return (bookingsBetweenRange * 100) / bookingsCount;
    };
    // Checks which room from the array is completely available for the given dates
    Room.availableRooms = function (rooms, startDate, endDate) {
        var availableRoomsArray = [];
        rooms.forEach(function (room) {
            var roomIsOccupied = false;
            room.bookings.forEach(function (booking) {
                if (booking.checkIn.getTime() < startDate.getTime() &&
                    booking.checkOut.getTime() < startDate.getTime()) {
                    roomIsOccupied = false;
                }
                else if (booking.checkIn.getTime() > endDate.getTime() &&
                    booking.checkOut.getTime() < endDate.getTime()) {
                    roomIsOccupied = false;
                }
                else {
                    roomIsOccupied = true;
                }
            });
            roomIsOccupied === false && !availableRoomsArray.includes(room)
                ? availableRoomsArray.push(room)
                : null;
        });
        return availableRoomsArray;
    };
    return Room;
}());
exports.Room = Room;
var Booking = /** @class */ (function () {
    function Booking(booking) {
        this.name = booking.name;
        this.email = booking.email;
        this.checkIn = booking.checkIn;
        this.checkOut = booking.checkOut;
        this.discount = booking.discount;
    }
    // Calculates room rate - room discount - booking discount
    Booking.prototype.getFee = function (room) {
        var rateRoom = room.rate - (room.rate * room.discount) / 100;
        return rateRoom - (rateRoom * this.discount) / 100;
    };
    return Booking;
}());
exports.Booking = Booking;
