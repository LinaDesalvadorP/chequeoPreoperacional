class Vehicle{
    constructor(licensePlate, cc, movil, model, brand, is_banned) {
        this.licensePlate = licensePlate
        this.cc = cc
        this.movil = movil
        this.model = model
        this.brand = brand
        this.is_banned = is_banned
    }
}

class VehicleList{
    constructor(licensePlate, cc, movil, is_banned) {
        this.licensePlate = licensePlate
        this.cc = cc
        this.movil = movil
        this.is_banned = is_banned
    }
}

module.exports= {
    vehicle:  Vehicle,
    vehicleList: VehicleList
};
