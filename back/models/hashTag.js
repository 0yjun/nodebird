module.exports = (sequelize, DataTypes) => {
  const HashTag = sequelize.define(
    'HashTag',
    {
      name: { type: DataTypes.STRING(20), allowNull: false },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8_general_ci',
    },
  );
  HashTag.associate = db => {};
  return HashTag;
};
