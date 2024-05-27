const chai = require("chai");
const chaiHttp = require("chai-http");
const knex = require("../server/knex");
const request = require("supertest");
const express = require("express");
const expect = chai.expect;
const app = require("../server/app");
const { describe, it } = require("mocha");

describe("テストやってみよう", () => {
  const pokemon = [
    {
      id: 1,
      num: "1",
      name: "フシギダネ",
      type1: "くさ",
      type2: "どく",
      text: "生まれたときから　背中に\n不思議な　タネが　植えてあって\n体と　ともに　育つという。",
      img: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-ii/crystal/1.png",
      icon: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-viii/icons/1.png",
    },
  ];

  it("No1のポケモンいるかって話", async () => {
    const res = await request(app).get("/api/pokemon/1");
    expect(res.body).to.eql(pokemon);
  });

  it("フシギダネってポケモンいるかって話", async () => {
    const res = await request(app).get("/api/pokemon/search/フシギダネ");
    expect(res.body).to.eql(pokemon);
  });

  // it("フシギダネ捕まえれるかって話", async () => {
  //   const res = await request(app)
  //     .post("/api/pokemon/get")
  //     .send({ name: "フシギダネ" });
  //   expect(res.body.message).to.eql("フシギダネ ゲットだぜ！");
  // });
});
