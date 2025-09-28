'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Favourite extends Model {
        static associate(models) {
            Favourite.belongsTo(models.User, { foreignKey: 'user_id' });
            Favourite.belongsTo(models.Book, { foreignKey: 'book_id' });
        }
    }

    Favourite.init(
        {
            favourite_id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            book_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Favourite',
            tableName: 'favourite',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    );

    return Favourite;
};
