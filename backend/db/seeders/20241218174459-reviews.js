'use strict';

const { Review } = require('../models'); // Adjust the path as needed

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // Attach schema in production
}

module.exports = {
  async up(queryInterface, Sequelize) {
    const reviews = [
      // Reviews for Spot 1
      {
        spotId: 1,
        userId: 1,
        review: 'Amazing spot! Would visit again.',
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 1,
        userId: 2,
        review: 'Great location, but the amenities were lacking.',
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 1,
        userId: 3,
        review: 'Decent stay, but there were some maintenance issues.',
        stars: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Reviews for Spot 2
      {
        spotId: 2,
        userId: 1,
        review: 'The place was decent, but could be cleaner.',
        stars: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 2,
        userId: 3,
        review: 'Good value for money, but the neighborhood was noisy.',
        stars: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 2,
        userId: 4,
        review: 'Fantastic host and a very comfortable stay.',
        stars: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },

      // Reviews for Spot 3
      {
        spotId: 3,
        userId: 2,
        review: 'Terrible experience. Avoid at all costs!',
        stars: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 3,
        userId: 4,
        review: 'Not worth the price. Very disappointing.',
        stars: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        spotId: 3,
        userId: 5,
        review: 'Basic amenities were missing, and the staff was unhelpful.',
        stars: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];

    // Use Review model's bulkCreate method for inserting data
    await Review.bulkCreate(reviews, { validate: true }); // Ensures input data meets model validations
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Reviews';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        review: {
          [Op.in]: [
            'Amazing spot! Would visit again.',
            'Great location, but the amenities were lacking.',
            'Decent stay, but there were some maintenance issues.',
            'The place was decent, but could be cleaner.',
            'Good value for money, but the neighborhood was noisy.',
            'Fantastic host and a very comfortable stay.',
            'Terrible experience. Avoid at all costs!',
            'Not worth the price. Very disappointing.',
            'Basic amenities were missing, and the staff was unhelpful.',
          ],
        },
      },
      {}
    );
  },
};
