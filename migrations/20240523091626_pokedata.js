/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("pokedata", (t) => {
    t.increments("id").primary();
    t.string("num").notNullable().unique();
    t.string("name", 64).notNullable().unique();
    t.string("type1", 64).notNullable();
    t.string("type2", 64);
    t.text("text");
    t.text("img");
    t.text("icon");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("pokedata");
};
