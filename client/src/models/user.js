import { DataTypes } from 'sequelize';
import { sequelize } from '../database.js';
import { v4 as uuidv4 } from 'uuid';

const User = sequelize.define('users', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: () => uuidv4()
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    areaCode: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    postalCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    identificationNumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    recipientName: {
        type: DataTypes.STRING,
        allowNull: true
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: false,
    },
    email_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
});

export default User;
