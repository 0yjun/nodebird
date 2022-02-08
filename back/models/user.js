module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      email: { type: DataTypes.STRING(20), allowNull: false, unique: true },
      nickname: { type: DataTypes.STRING(20), allowNull: false, unique: true },
      password: { type: DataTypes.STRING(100), allowNull: false, unique: true },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', // 한글 저장
    },
  );
  User.associate = db => {};
  return User;
};
