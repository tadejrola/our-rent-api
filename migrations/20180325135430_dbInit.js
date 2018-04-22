exports.up = function (knex, Promise) {
    return knex.schema.createTable('notice', (table) => {
        table.increments('id').primary();
        table.string('notice');
    }).createTable('objectNotice', (table) => {
        table.increments('id').primary();
        table.timestamp('maintenanceDate');
        table.integer('object_id').references('object.id');
        table.integer('notice_id').references('notice.id');
    }).createTable('object', (table) => {
        table.increments('id').primary();
        table.string('description');
        table.string('category');
        table.string('image');
        table.integer('address_id').references('address.id');
        table.integer('user_id').references('user.id');
    }).createTable('country', (table) => {
        table.increments('id').primary();
        table.string('country');
    }).createTable('city', (table) => {
        table.increments('id').primary();
        table.string('city');
        table.string('zip');
        table.integer('country_id').references('country.id');
    }).createTable('address', (table) => {
        table.increments('id').primary();
        table.string('address');
        table.string('houseNumber');
        table.integer('city_id').references('city.id');
    }).createTable('user', (table) => {
        table.increments('id').primary();
        table.string('firstName');
        table.string('lastName');
        table.string('username');
        table.string('password');
        table.string('phoneNumber');
        table.string('job');
        table.string('education');
        table.boolean('smoker');
        table.string('email');
        table.integer('address_id').references('address.id');
    }).createTable('maintenance', (table) => {
        table.increments('id').primary();
        table.string('description');
        table.boolean('fixed');
        table.string('fixingCost');
        table.timestamp('fixedDate');
        table.timestamp('dateReported');
        table.integer('object_id').references('object.id');
        table.integer('user_id').references('user.id');
    }).createTable('image', (table) => {
        table.increments('id').primary();
        table.string('description');
        table.string('image');
        table.integer('maintenance_id').references('maintenance.id');
    }).createTable('tenancyAgreement', (table) => {
        table.increments('id').primary();
        table.timestamp('validFrom');
        table.timestamp('validTo');
        table.string('scan');
        table.string('paymentInterval');
        table.double('paymentAmount');
        table.string('currency');
        table.timestamp('dateSigned');
        table.integer('object_id').references('object.id');
        table.integer('user_id').references('user.id');
    }).createTable('payment', (table) => {
        table.increments('id').primary();
        table.string('description');
        table.boolean('paid');
        table.timestamp('paymentDate');
        table.double('amount');
        table.integer('tenancyAgreement_id').references('tenancyAgreement.id');
    }).createTable('utilityBill', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('description');
        table.timestamp('dueDate');
        table.double('billAmount');
        table.integer('object_id').references('object.id');
        table.integer('payment_id').references('payment.id');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTable('notice')
        .dropTable('objectNotice')
        .dropTable('object')
        .dropTable('maintenance')
        .dropTable('image')
        .dropTable('country')
        .dropTable('city')
        .dropTable('address')
        .dropTable('utilityBill')
        .dropTable('payment')
        .dropTable('tenancyAgreement')
        .dropTable('user');
};
