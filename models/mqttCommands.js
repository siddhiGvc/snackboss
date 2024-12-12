'use strict';
module.exports = (sequelize, DataTypes) => {
  const MqttCommands = sequelize.define('MqttCommands', {
    topic: DataTypes.STRING,
    serial:DataTypes.STRING,
    message: DataTypes.STRING,
  }, {
    tableName: 'MqttCommands',
    timestamps: true,
  });

 

  return MqttCommands;
};
