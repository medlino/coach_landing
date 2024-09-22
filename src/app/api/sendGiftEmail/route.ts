import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

import clientPromise from '../../../lib/mongodb';
import { isValidEmail } from '@/utils/validation';
import { Gift } from '@/interfaces/gift';

async function fetchGift(id: string) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('gifts');
  const gift = await collection.findOne<Gift>({ id });
  return gift;
}

async function claimGift(id: string, email: string) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('gifts');
  const filter = { id: id };
  const updateDocument = {
    $set: { email, claimedAt: new Date().toISOString() },
  };
  return collection.updateOne(filter, updateDocument);
}

function genEmail(email: string, gift: Gift) {
  const msg = {
    to: email,
    from: 'hellomedlino@gmail.com',
    subject: 'Elme Ereje közösség - Zsákbamacska nyereményjáték',
    html: '<div>Kedves Elme Ereje Tag,<p>Gratulálunk a csatlakozáshoz, ezzel meghoztál egy fontos döntést.</p><p>Minden, amit a közösségünkben találsz neked és érted készült.</p><p>Mi azon dolgozunk, hogy a lehető legtöbb tudást átadjuk és a lehető leghasznosabb és izgalmasabb eseményeket biztosítsuk, melyek segítségével egy következő szintre tudod emelni az életed.</p><p><strong>FONTOS! Ugyan azzal az email címmel regisztrálj a discord-ra, amivel megvetted az Elme Ereje Közösség előfizetést.</strong></p><p><strong>Kérlek nézd meg a következő videót, amelyben elmagyarázzuk a csatlakozás lépéseit!</strong></p><p><a href="https://www.loom.com/share/eea827d30f3341e681218e2a5d9692c4?sid=90141be0-133c-48e9-98c4-259657bb73ed" target="_blank" rel="noopener noreferrer">Itt tudod megtekinteni a videót</a></p><p><a href="https://elmeereje.hu/aktivalas/" target="_blank" rel="noopener noreferrer">Itt tudod elindítani az aktiválási folyamatot</a></p><span>Köszönettel,</span><p style="margin-top:0px;">Dokik</p></div>',
  };

  return msg;
}

export async function POST(req: Request) {
  const sendGridApiKey = process.env.SENDGRID_API_KEY;

  if (!sendGridApiKey) {
    throw new Error('Invalid request');
  }

  const res = await req.json();
  if (!res.email || !res.id || !isValidEmail(res.email)) {
    throw new Error('Invalid request');
  }

  try {
    const gift = await fetchGift(res.id);
    if (!gift) {
      throw new Error('Invalid gift');
    }

    await claimGift(res.id, res.email);

    sgMail.setApiKey(sendGridApiKey!);
    const email = genEmail(res.email, gift);
    await sgMail.send(email);
  } catch (error) {
    console.error(error);
    throw new Error(`Something went wrong! - ${error}`);
  }

  return NextResponse.json({});
}
