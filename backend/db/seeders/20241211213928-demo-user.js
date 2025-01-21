'use strict';

const { User } = require('../models'); // Import models
const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; // Attach schema in production
}

module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = 'Users';
    await User.bulkCreate([
      {
        
        firstName: 'Brian',
        lastName: 'Rodriguez',
        email: 'demo@user.io',
        username: 'Demo-lition',
        hashedPassword: bcrypt.hashSync('password'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        
        firstName: 'Tyson',
        lastName: 'Mcdowell',
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        
        firstName: 'Will',
        lastName: 'Duffy',
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        
        firstName: 'Emily',
        lastName: 'Stone',
        email: 'emily@user.io',
        username: 'EmilyS',
        hashedPassword: bcrypt.hashSync('password4'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        
        firstName: 'Jake',
        lastName: 'Johnson',
        email: 'jake@user.io',
        username: 'JakeJ',
        hashedPassword: bcrypt.hashSync('password5'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        firstName: 'Sophia',
        lastName: 'Martinez',
        email: 'sophia@user.io',
        username: 'SophiaM',
        hashedPassword: bcrypt.hashSync('password6'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
       
        firstName: 'Liam',
        lastName: 'Taylor',
        email: 'liam@user.io',
        username: 'LiamT',
        hashedPassword: bcrypt.hashSync('password7'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        
        firstName: 'Olivia',
        lastName: 'Brown',
        email: 'olivia@user.io',
        username: 'OliviaB',
        hashedPassword: bcrypt.hashSync('password8'),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    await queryInterface.bulkDelete(
      options,
      {
        username: {
          [Op.in]: [
            'Demo-lition',
            'FakeUser1',
            'FakeUser2',
            'EmilyS',
            'JakeJ',
            'SophiaM',
            'LiamT',
            'OliviaB',
          ],
        },
      },
      {}
    );
  },
};
