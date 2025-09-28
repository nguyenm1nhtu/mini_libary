'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Borrow extends Model {
        static associate(models) {
            Borrow.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'SET NULL' });
            Borrow.belongsTo(models.Book, { foreignKey: 'book_id', onDelete: 'SET NULL' });
        }
    }

    Borrow.init(
        {
            borrow_id: {
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
            borrow_date: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            return_date: {
                type: DataTypes.DATE,
            },
            status: {
                type: DataTypes.ENUM('borrowed', 'returned'),
                allowNull: false,
                defaultValue: 'borrowed',
            },
        },
        {
            sequelize,
            modelName: 'Borrow',
            tableName: 'borrow',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    );

    return Borrow;
};
