import express from 'express';
import cors from "cors";

import { PrismaClient } from "@prisma/client";

import convertHoursStringToMinutes from './utils/convert-hour-string-to-minutes';
import convertMinutesToHoursString from './utils/convert-minutes-to-hour-string';

const app = express();
app.use(express.json());
app.use(cors());

const prisma = new PrismaClient({
  // log: ['query']
});

// HTTP methods / API RESTful / HTTP Codes

/******** GAMES methods ********/

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  });
  
  return response.status(200).json(games);
  // .then(() => {
  // })
  // .catch((error) => {
  //   throw new Error("Error: ", error);
    
  // });

});

app.post('/games', (request, response) => {
  return response.status(200).json([])
});

/******** ADS methods ********/

app.get('/ads', (request, response) => {
  return response.status(200).json('Lista de anúncios');
});

app.get('/games/:id/ads', async (request, response) => {
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
      createdAt: 'desc',
    }
  });

  const adsWithWekkDaysFormated = ads.map((ad) => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hoursStart: convertMinutesToHoursString(ad.hoursStart),
      hoursEnd: convertMinutesToHoursString(ad.hoursEnd),
    }
  });

  return response.json(adsWithWekkDaysFormated)
});

app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adId,
    }
  });

  return response.status(200).json({
    discord: ad.discord
  });
});

app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id;
  const body = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hoursStart: convertHoursStringToMinutes(body.hoursStart),
      hoursEnd: convertHoursStringToMinutes(body.hoursEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  });

  return response.status(201).json(ad)
});

app.listen(3333);

