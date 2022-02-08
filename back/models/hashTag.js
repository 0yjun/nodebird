module.exports = (sequelize, DataTypes) => {
  const HashTag = sequelize.define(
    'HashTag',
    {
      name: { type: DataTypes.STRING(20), allowNull: false },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장
    },
  );
  HashTag.associate = db => {};
  return HashTag;
};
