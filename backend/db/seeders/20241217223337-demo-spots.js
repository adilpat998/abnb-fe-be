'use strict';

const { Spot } = require('../models'); // Import Spot model

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // Attach schema in production
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const spots = [
      {
        ownerId: 1,
        address: '123 Main Street',
        city: 'Los Angeles',
        state: 'CA',
        country: 'USA',
        lat: 34.0522,
        lng: -118.2437,
        name: 'Modern Loft',
        description: "Experience the vibrant energy of Los Angeles in this chic modern loft, located in the heart of downtown. Featuring an open-concept design, floor-to-ceiling windows with stunning city views, and a fully equipped kitchen, this space is perfect for both relaxation and exploration. Enjoy the convenience of nearby restaurants, entertainment venues, and iconic attractions like the Hollywood Walk of Fame and Griffith Observatory. Whether you're here for business or leisure, this stylish retreat will make your stay unforgettable.",
        price: 200.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ownerId: 2,
        address: '456 Elm Street',
        city: 'San Francisco',
        state: 'CA',
        country: 'USA',
        lat: 37.7749,
        lng: -122.4194,
        name: 'Cozy Cottage',
        description: "Step into timeless elegance with this beautifully restored Victorian home located in the heart of San Francisco. This charming property boasts high ceilings, intricate period details, and modern amenities for a comfortable stay. Relax in the cozy living room, whip up meals in the fully equipped kitchen, or enjoy your morning coffee on the private patio. Conveniently situated near iconic attractions like Alamo Square, Golden Gate Park, and Fisherman’s Wharf, this home is perfect for travelers seeking both style and convenience in the City by the Bay.",
        price: 150.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        ownerId: 3,
        address: '789 Pine Avenue',
        city: 'New York',
        state: 'NY',
        country: 'USA',
        lat: 40.7128,
        lng: -74.0060,
        name: 'Luxury Condo',
        description: "Stay in the heart of the Big Apple in this cozy Manhattan apartment, just steps away from Times Square. This charming space features a comfortable queen-size bed, a compact yet functional kitchenette, and a warm, inviting ambiance. Perfect for travelers who want to experience the city's buzz, you'll be within walking distance of Broadway shows, world-class dining, and Central Park. After a day of exploring, unwind in your quiet oasis amidst the bustling city.",
        price: 300.0,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      

    ];
    await Spot.bulkCreate(spots, { validate: true });
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Spots';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      options,
      {
        name: { [Op.in]: ['Modern Loft', 'Cozy Cottage', 'Luxury Condo'] },
      },
      {}
    );
  },
};
