/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.table("pokedata", function (t) {
    t.dropColumn("type1");
  });
};
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.table("pokedata", function (t) {
    t.string("type1").notNullable().unique();
  });
};
