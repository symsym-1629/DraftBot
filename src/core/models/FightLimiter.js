/**
 * @typedef {import('sequelize').Sequelize} Sequelize
 * @typedef {import('sequelize/types')} DataTypes
 *
 * @param {Sequelize} Sequelize
 * @param {DataTypes} DataTypes
 * @returns
 */
module.exports = (Sequelize, DataTypes) => {
	const FightLimiter = Sequelize.define(
		'FightLimiter',
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			smallid: {
				type: DataTypes.INTEGER,
			},
			bigid: {
				type: DataTypes.INTEGER,
			},
			amount: {
				type: DataTypes.INTEGER,
				defaultValue: 0,
			},
			updatedAt: {
				type: DataTypes.DATE,
				defaultValue: require("moment")().format("YYYY-MM-DD HH:mm:ss"),
			},
			createdAt: {
				type: DataTypes.DATE,
				defaultValue: require("moment")().format("YYYY-MM-DD HH:mm:ss"),
			},
		}, {
			tableName: 'fightlimiter',
			freezeTableName: true,
		});


	FightLimiter.beforeSave((instance) => {
		instance.setDataValue('updatedAt',
			require('moment')().format('YYYY-MM-DD HH:mm:ss'));
	});

	/**
	 * @param {String} idplayerone
	 * @param {String} idplayertwo
	 */
	FightLimiter.getOrRegister = (idplayerone, idplayertwo) => {
		if (idplayerone > idplayertwo) {
			let temp = idplayerone;
			idplayerone = idplayertwo;
			idplayertwo = temp;
		}

		return FightLimiter.findOrCreate({
			where: {
				smallid: idplayerone,
				bigid: idplayertwo
			},
		});
	};

	/**
	 * @param {String} id
	 */
	FightLimiter.getforUser = (id) => {
		const {Op} = require("sequelize");

		return FightLimiter.findAll({
			where: {
				[Op.or]: [
					{
						smallid: id
					},
					{
						bigid: id
					}
				]
			},
		});
	};

	/**
	 * @param {String} id
	 */
	FightLimiter.findAllLimiters = () => {

		return FightLimiter.findAll({

		});
	};


	return FightLimiter;
};
