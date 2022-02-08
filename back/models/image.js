module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    'Image',
    {
      src: { type: DataTypes.STRING(200), allowNull: false },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8_general_ci',
    },
  );
  Image.associate = db => {};
  return Image;
};
