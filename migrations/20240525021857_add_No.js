/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("pokedata", function (t) {
    t.string("num", 64).notNullable().unique();
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("pokedata", function (t) {
    t.dropColumn("num");
  });
};
