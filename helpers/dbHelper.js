//const knex = require('knex')(require('../knexfile').development);
const knex = require('knex')(require('../knexfile').production);
const bookshelf = require('bookshelf')(knex);

const object = bookshelf.Model.extend({
    tableName: 'object',
    idAttribute: 'id',
    objectNotice: function () {
        return this.hasMany(objectNotice);
    },
    user: function () {
        return this.belongsTo(user).belongsTo();
    },
    maintenance: function () {
        return this.hasMany(maintenance).belongsTo();
    },
    tenancyAgreement: function () {
        return this.hasMany(tenancyAgreement).belongsTo();
    },
    utilityBill: function () {
        return this.hasMany(utilityBill).belongsTo();
    }
});

const image = bookshelf.Model.extend({
    tableName: 'image',
    idAttribute: 'id',
    maintenance: function () {
        return this.belongsTo(maintenance);
    }
});

const maintenance = bookshelf.Model.extend({
    tableName: 'maintenance',
    idAttribute: 'id',
    object: function () {
        return this.belongsTo(object);
    },
    image: function () {
        return this.hasMany(image);
    },
    user: function () {
        return this.belongsTo(user);
    }
});

const user = bookshelf.Model.extend({
    tableName: 'user',
    idAttribute: 'id',
    maintenance: function () {
        return this.hasMany(maintenance);
    },
    tenancyAgreement: function () {
        return this.hasMany(tenancyAgreement);
    },
    object: function () {
        return this.hasMany(object);
    }
});

const tenancyAgreement = bookshelf.Model.extend({
    tableName: 'tenancyAgreement',
    idAttribute: 'id',
    user: function () {
        return this.belongsTo(user);
    },
    object: function () {
        return this.belongsTo(object);
    },
    utilityBill: function () {
        return this.hasMany(utilityBill);
    }

});


const utilityBill = bookshelf.Model.extend({
    tableName: 'utilityBill',
    idAttribute: 'id',
    object: function () {
        return this.belongsTo(object);
    },
    tenancyAgreement: function () {
        return this.belongsTo(tenancyAgreement);
    }
});

module.exports.object = object;
module.exports.image = image;
module.exports.maintenance = maintenance;
module.exports.user = user;
module.exports.tenancyAgreement = tenancyAgreement;
module.exports.utilityBill = utilityBill;
module.exports.knex = knex;