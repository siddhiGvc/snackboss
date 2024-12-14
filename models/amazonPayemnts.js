'use strict';
module.exports = (sequelize, DataTypes) => {
  const AmazonPayments = sequelize.define('AmazonPayments', {
     mid:DataTypes.STRING,
     amt:DataTypes.STRING,
     orderID:DataTypes.STRING,
     txnId:DataTypes.STRING,
     txnDate:DataTypes.STRING,
     merchantStoreId:DataTypes.STRING

  }, {
    tableName: 'AmazonPayments',
    timeStamps:true
  });
  AmazonPayments.associate = function(models) {
    // associations can be defined here
  };
  return AmazonPayments;
};