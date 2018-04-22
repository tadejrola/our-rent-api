//const knex = require('knex')(require('../knexfile').development);
const knex = require('knex')(require('../knexfile').production);
const bookshelf = require('bookshelf')(knex);

const notice = bookshelf.Model.extend({
    tableName: 'notice',
    idAttribute: 'id',
    objectNotice: function () {
        return this.hasMany(objectNotice);
    }
});

const objectNotice = bookshelf.Model.extend({
    tableName: 'objectNotice',
    idAttribute: 'id',
    notice: function () {
        return this.belongsTo(notice).belongsTo();
    },
    object: function () {
        return this.belongsTo(object).belongsTo();
    }
});

const object = bookshelf.Model.extend({
    tableName: 'object',
    idAttribute: 'id',
    objectNotice: function () {
        return this.hasMany(objectNotice);
    },
    address: function () {
        return this.belongsTo(address).belongsTo();
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

const country = bookshelf.Model.extend({
    tableName: 'country',
    idAttribute: 'id',
    city: function () {
        return this.hasMany(city);
    }
});

const city = bookshelf.Model.extend({
    tableName: 'city',
    idAttribute: 'id',
    address: function () {
        return this.hasMany(address);
    },
    country: function () {
        return this.belongsTo(country);
    }
});

const address = bookshelf.Model.extend({
    tableName: 'address',
    idAttribute: 'id',
    city: function () {
        return this.belongsTo(city);
    },
    user: function () {
        return this.hasMany(user);
    },
    object: function () {
        return this.hasMany(object);
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
    },
    address: function () {
        return this.belongsTo(address);
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
    payment: function () {
        return this.hasMany(payment);
    }
});

const payment = bookshelf.Model.extend({
    tableName: 'payment',
    idAttribute: 'id',
    tenancyAgreement: function () {
        return this.belongsTo(tenancyAgreement);
    },
    utilityBill: function () {
        return this.hasMany(utilityBill);
    }
});

const utilityBill = bookshelf.Model.extend({
    tableName: 'utilityBill',
    idAttribute: 'id',
    payment: function () {
        return this.belongsTo(payment);
    },
    object: function () {
        return this.belongsTo(object);
    }
});

module.exports.notice = notice;
module.exports.objectNotice = objectNotice;
module.exports.object = object;
module.exports.image = image;
module.exports.maintenance = maintenance;
module.exports.country = country;
module.exports.city = city;
module.exports.address = address;
module.exports.user = user;
module.exports.tenancyAgreement = tenancyAgreement;
module.exports.payment = payment;
module.exports.utilityBill = utilityBill;