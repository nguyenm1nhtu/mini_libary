'use strict';
const { Model, DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    class Log extends Model {
        static associate(models) {
            Log.belongsTo(models.User, { foreignKey: 'user_id' });
        }
    }

    Log.init(
        {
            log_id: {
                type: DataTypes.BIGINT,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id: {
                type: DataTypes.BIGINT,
                allowNull: false,
            },
            action: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            timestamp: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        },
        {
            sequelize,
            modelName: 'Log',
            tableName: 'log',
            timestamps: true,
            createdAt: 'created_at',
            updatedAt: 'updated_at',
        },
    );

    return Log;
};
