'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Book extends Model {
        static associate(models) {
            Book.belongsTo(models.Category, { foreignKey: 'category_id', onDelete: 'SET NULL' });
            Book.hasMany(models.Borrow, { foreignKey: 'book_id', onDelete: 'SET NULL' });
            Book.hasMany(models.Favourite, { foreignKey: 'book_id', onDelete: 'SET NULL' });
        }
    }
    Book.init(
        {
            book_id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            title: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            author: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            category_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            quantity: {
                type: DataTypes.INTEGER,
                allowNull: false,
                defaultValue: 0,
            },
            image: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Book',
            tableName: 'book',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    );

    return Book;
};
