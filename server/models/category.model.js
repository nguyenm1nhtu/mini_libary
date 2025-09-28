'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Category extends Model {
        static associate(models) {
            Category.hasMany(models.Book, { foreignKey: 'category_id', onDelete: 'SET NULL' });
        }
    }

    Category.init(
        {
            category_id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            name: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
        },
        {
            sequelize,
            modelName: 'Category',
            tableName: 'category',
            timestamps: false,
        },
    );

    return Category;
};
