/**
 * @typedef {import('sequelize').Sequelize} Sequelize
 * @typedef {import('sequelize/types')} DataTypes
 *
 * @param {Sequelize} Sequelize
 * @param {DataTypes} DataTypes
 * @returns
 */
module.exports = (Sequelize, DataTypes) => {
	const FightLimiter = Sequelize.define('fightlimiter', {
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
	FightLimiter.getAmount =async (idplayerone, idplayertwo) => {
		const { Op } = require("sequelize");
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

	return FightLimiter;
};
