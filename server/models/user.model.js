'use strict';

const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class User extends Model {
        static associate(models) {
            User.hasMany(models.Borrow, { foreignKey: 'user_id', onDelete: 'SET NULL' });
            User.hasMany(models.Log, { foreignKey: 'user_id', onDelete: 'SET NULL' });
            User.hasMany(models.Favourite, { foreignKey: 'user_id', onDelete: 'SET NULL' });
        }
    }

    User.init(
        {
            user_id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            username: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            role: {
                type: DataTypes.ENUM('admin', 'user'),
                allowNull: false,
                defaultValue: 'user',
            },
        },
        {
            sequelize,
            modelName: 'User',
            tableName: 'users',
            timestamps: false,
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    );

    return User;
};
