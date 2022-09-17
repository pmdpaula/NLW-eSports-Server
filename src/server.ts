import express from "express";
import cors from "cors";

import { PrismaClient } from "@prisma/client";

import convertHoursStringToMinutes from "./utils/convert-hour-string-to-minutes";
import convertMinutesToHoursString from "./utils/convert-minutes-to-hour-string";

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
  // log: ['query']
});

// HTTP methods / API RESTful / HTTP Codes

/******** GAMES methods ********/

app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        },
      },
    },
  });

  return response.status(200).json(games);
});

app.post("/games", (request, response) => {
  return response.status(200).json([]);
});

/******** ADS methods ********/

app.get("/ads", async (request, response) => {
  try {
    const ads = await prisma.ad.findMany({});
    return response.status(200).json(ads);
  } catch (error) {
    return console.log(error);
  }
});

app.delete("/ads/:id", async (request, response) => {
  const adId = request.params.id;

  try {
    await prisma.ad.delete({
      where: {
        id: adId,
      },
    });

    // console.log(ad);
    return response.status(200).json("Aúncio removido");
  } catch (error) {
    console.log("Erro na remoção de aúncio:", error);
    return response.status(500);
  }
});

app.get("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hoursStart: true,
      hoursEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const adsWithWekkDaysFormated = ads.map((ad) => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(","),
      hoursStart: convertMinutesToHoursString(ad.hoursStart),
      hoursEnd: convertMinutesToHoursString(ad.hoursEnd),
    };
  });

  return response.json(adsWithWekkDaysFormated);
});

app.get("/ads/:id/discord", async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    },
  });

  return response.status(200).json({
    discord: ad.discord,
  });
});

app.post("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;
  const body = request.body;

  try {
    const ad = await prisma.ad.create({
      data: {
        gameId,
        name: body.name,
        yearsPlaying: body.yearsPlaying,
        discord: body.discord,
        weekDays: body.weekDays.join(","),
        hoursStart: convertHoursStringToMinutes(body.hoursStart),
        hoursEnd: convertHoursStringToMinutes(body.hoursEnd),
        useVoiceChannel: body.useVoiceChannel,
      },
    });

    return response.status(201).json(ad);
  } catch (error) {
    return response.status(500);
  }
});

console.log(
  `Server is listening on: http://localhost:${process.env.DATABASE_PORT}`
);

app.listen(process.env.DATABASE_PORT);
