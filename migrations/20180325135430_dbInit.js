exports.up = function (knex, Promise) {
    return knex.schema.createTable('object', (table) => {
        table.increments('id').primary();
        table.string('description');
        table.string('category');
        table.string('image');
        table.string('address');
        table.integer('user_id').references('user.id');
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
        table.string('image');
        table.string('address');
    }).createTable('maintenance', (table) => {
        table.increments('id').primary();
        table.string('description');
        table.boolean('fixed');
        table.string('fixingCost');
        table.date('fixedDate');
        table.date('dateReported');
        table.integer('object_id').references('object.id');
        table.integer('user_id').references('user.id');
    }).createTable('image', (table) => {
        table.increments('id').primary();
        table.string('description');
        table.string('image');
        table.integer('maintenance_id').references('maintenance.id');
    }).createTable('tenancyAgreement', (table) => {
        table.increments('id').primary();
        table.date('validFrom');
        table.date('validTo');
        table.string('image');
        table.string('name');
        table.string('paymentInterval');
        table.double('paymentAmount');
        table.string('currency');
        table.date('dateSigned');
        table.integer('object_id').references('object.id');
        table.integer('user_id').references('user.id');
    }).createTable('utilityBill', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('description');
        table.date('dueDate');
        table.double('billAmount');
        table.boolean('paid');
        table.string('image');
        table.integer('object_id').references('object.id');
        table.integer('tenancyAgreement_id').references('tenancyAgreement.id');
    });
};

exports.down = function (knex, Promise) {
    return knex.schema
        .dropTable('object')
        .dropTable('maintenance')
        .dropTable('image')
        .dropTable('utilityBill')
        .dropTable('tenancyAgreement')
        .dropTable('user');
};
