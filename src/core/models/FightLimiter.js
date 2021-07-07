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
			smallid: {
				type: DataTypes.INTEGER,
				primaryKey: true
			},
			bigid: {
				type: DataTypes.INTEGER,
				primaryKey: true
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
	 * @param {Number} idplayerone
	 * @param {Number} idplayertwo
	 */
	FightLimiter.getAmount = async (idplayerone, idplayertwo) => {
		const {Op} = require("sequelize");
		if (idplayerone > idplayertwo) {
			let temp = idplayerone;
			idplayerone = idplayertwo;
			idplayertwo = temp;
		}
		return await FightLimiter.findOne({
			where: {
				[Op.and]: [{smallid: idplayerone}, {bigid: idplayertwo}]
			},
		});
	};

	/**
	 * @param {Number} idplayerone
	 * @param {Number} idplayertwo
	 */
	FightLimiter.getOrRegister = (idplayerone, idplayertwo) => {
		const {Op} = require("sequelize");
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
	 * create a pet entity in the database
	 * @param {Number} smallid
	 * @param {Number} bigid
	 * @returns {Promise<FightLimiter>}
	 */
	FightLimiter.createFightLimiter = (smallid, bigid) => {
		if (smallid > bigid) {
			let temp = smallid;
			smallid = bigid;
			bigid = temp;
		}
		return FightLimiter.build({
			smallid: smallid,
			bigid: bigid,
			amount: 0,
		});
	};

	return FightLimiter;
};
