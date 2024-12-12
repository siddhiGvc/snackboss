module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
      'User',
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
        },
        isAdmin: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        verifyToken: {
          type: DataTypes.STRING,
          defaultValue: null,
        },
        isVerified: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
        },
        city: {
          type: DataTypes.STRING,
          defaultValue: false,
        },
        zone: {
          type: DataTypes.STRING,
          defaultValue: false,
        },
        ward: {
          type: DataTypes.STRING,
          defaultValue: false,
        },
        beat: {
          type: DataTypes.STRING,
          defaultValue: false,
        },
      },
      {
        defaultScope: {
          attributes: { exclude: ['password', 'verifyToken'] },
        },
        scopes: {
          withSecretColumns: {
            attributes: { include: ['password', 'verifyToken'] },
          },
        },
      },
    );
    User.associate = function (models) {
      // associations can be defined here
    };
    return User;
  };
  