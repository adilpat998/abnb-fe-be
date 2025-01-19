'use strict';

const { SpotImage } = require('../models'); // Adjust the path as needed

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // Define your schema in options object
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await SpotImage.bulkCreate(
      [
        // Spot 1 Images
        {
          spotId: 1,
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7sU8i_h_ErYyoRc65q9BJkmti0k7xVYmlCA&s',
          preview: true, // Marked as preview image
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 1,
          url: 'https://i.pinimg.com/736x/af/bd/02/afbd02e8adf355aa66fb98bd490c2801.jpg',
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 1,
          url: 'https://cdn.shopify.com/s/files/1/0576/2754/1656/files/Shop_The_Chair_17.png?v=1676598992',
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Spot 2 Images
        {
          spotId: 2,
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHCWL560DE2KQTl7ceg5zfsRDiwp_o_AfJBg&s',
          preview: true, // Marked as preview image
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 2,
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGzTPw6lwIWhsKO5GMFKDKshoez3RyFntwpQ&s',
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 2,
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiknQbwXJ0tJahkDMk_jiK1PHdE93U624jaw&s',
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },

        // Spot 3 Images
        {
          spotId: 3,
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_izhrKgqC5zLJNvDgq-FKJTDwYADIodDYg&s',
          preview: true, // Marked as preview image
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 3,
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT33NvCx0TrXoOfxQ0_vIdP7dXPUMt_0q-3eQ&s',
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          spotId: 3,
          url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScUIYRRk6YmMOG35Bv2Em2maKCwyqrDMY0MA&s',
          preview: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      { validate: true } // Ensures the input data meets model validations
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'SpotImages';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(
      options,
      {
        url: {
          [Op.in]: [
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7sU8i_h_ErYyoRc65q9BJkmti0k7xVYmlCA&s',
            'https://i.pinimg.com/736x/af/bd/02/afbd02e8adf355aa66fb98bd490c2801.jpg',
            'https://cdn.shopify.com/s/files/1/0576/2754/1656/files/Shop_The_Chair_17.png?v=1676598992',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHCWL560DE2KQTl7ceg5zfsRDiwp_o_AfJBg&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGzTPw6lwIWhsKO5GMFKDKshoez3RyFntwpQ&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiknQbwXJ0tJahkDMk_jiK1PHdE93U624jaw&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1_izhrKgqC5zLJNvDgq-FKJTDwYADIodDYg&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT33NvCx0TrXoOfxQ0_vIdP7dXPUMt_0q-3eQ&s',
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScUIYRRk6YmMOG35Bv2Em2maKCwyqrDMY0MA&s',
          ],
        },
      },
      {}
    );
  },
};
