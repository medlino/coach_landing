import { NextResponse } from 'next/server';
import sgMail from '@sendgrid/mail';

import clientPromise from '../../../lib/mongodb';
import { isValidEmail } from '@/utils/validation';
import { Gift } from '@/interfaces/gift';

const giftSpecificMessageMap: Record<string, string> = {
  libriUtalvany:
    'A tudás a tapasztalás előszobája. Nyereményed egy 15.000 Ft-os ajándékkártya, amelyet a Libri könyvesboltokban tudsz felhasználni!',
  bowenMasszazs:
    'Egy alkalmas utalvány Pető Csilla terapeutánál egy Bowen terápia kezelésre, amely a kötőszövetekben, izmokban kialakult blokkok oldását szolgálja',
  fenymuzeum:
    'Páros belépő a budapesti fénymúzeumba. Kérlek írj egy válasz e mailt nekünk, hogy a nyereményedet emailben küldeni tudjuk',
  hangtal:
    ' Páros(2db) belépő a világ legnagyobb tibeti hangtáljához Garábon, ahol részt vehettek egy hangfürdő terápián, Gercsényi Nikolett hanterapeuta óráján. Amennyiben Garábra nem tudsz elmenni, Nikolett Budapesten is tart órákat, tehát a fővárosban is beválthatod a nyereményed. Kérlek küldd el válasz emailben a neved és a kísérőd nevét, hogy ki tudjuk állítani az utalványt nektek.',
  kakao:
    'Kakaó szertartás a test - lélek - szellem harmóniájának megteremtéséért Sophia Shakti vezetésével!',
  dokisNap:
    'Egy teljes nap a Dokikkal a Balaton környékén, túra, meditáció, hidegfürdő, étkezés Neked és egy barátodnak!',
  spiriCsomag:
    'Spirituális csomag 50.000 Ft értékben, füstölő, jóga matrac, meditációs párna, hogy meglegyen az eszköztárad a mindennapi gyakorláshoz. Kérlek írj egy válasz e mailt, hogy a nyereményed átvételi részleteit meg tudjuk beszélni!',
  mandalaDaySpa:
    'Mandala Day Spa belépő és 50.000 Ft utalvány szabad felhasználásra a test - lélek- szellem harmóniájának ápolása érdekében.',
};

const emailMap = {
  discount: (promCode: string) => `
<section style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <h2>Kedves Nyertes,</h2>
  <p>Először is köszönjük, hogy kimozdultál és részt vettél ebben a játékban. Manapság kezd kiveszni a játékosság, a kaland az életünkből, de reméljük ezzel a játékkal kicsit emlékeztettünk arra, hogy mennyire fontos a játék és a célhoz vezető út az életben.</p>
  <p>Szeretnénk felajánlani ezt a <strong>20%-os kedvezményt</strong>, amivel csatlakozhatsz az <strong>Elme Ereje Online</strong> képzéshez.</p>
  <p>Ez a képzés egy életmódváltó program része, amiben több mint 4 órányi kurzus anyag vár, ahol a tudomány és a spiritualitás találkozik.</p>
  <ul>
    <li>Olyan témákban adunk gyakorlatias tudást mint a teremtés - manifesztáció</li>
    <li>Légzéstechnikák</li>
    <li>Meditáció</li>
    <li>Vizualizáció</li>
    <li>Gondolkodásmód</li>
  </ul>
  <p>Ezekkel a technikákkal a kezedbe veheted életed területeinek irányítását, mert minden az elmédből ered.</p>
  <p>Ez egy zárt csoport is egyben, számos online és élő közösségi programmal, ahol az élőben való találkozókra nagy hangsúlyt fektetünk. Közös meditációk, hideg merülések és túrák keretein belül.</p>
  <p><strong>Itt találod az októberi programokat:</strong></p>
  <ul>
    <li>Élő túra az apci tengerszemhez, hideg merülés a tóban, tábortűz, meditáció a Szurdokpüspöki táltos forrásnál.</li>
    <li>Paksi András online előadása a hidegterápiáról és oxygen advantage-ről.</li>
    <li>Dokik online előadása - Spiritualitás a hétköznapokban.</li>
    <li>Dokik élő kötetlen beszélgetés.</li>
  </ul>
  <p>A promóciós kódod: <strong>${promCode}</strong></p>
  <p>Kérlek látogass el oldalunkra: <a href="https://elmeereje.hu/#csomagok" style="color: #1a73e8;">https://elmeereje.hu/#csomagok</a>, ahol a havi csomag <strong>csatlakozom</strong> kiválasztása után, a promóciós kód megadása opció alatt aktiválhatod nyereményed.</p>
  <p>Üdvözlettel,<br><strong>Dokik</strong></p>
</section>
  `,
  membership: (promCode: string) => `
  <section style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <h2>Kedves Nyertes,</h2>
  <p>Szeretnénk megajándékozni egy havi tagsággal az <strong>Elme Ereje</strong> online programunkba.</p>
  <p>Ez a képzés egy életmódváltó program része, amiben több mint 4 órányi kurzus anyag vár, ahol a tudomány és a spiritualitás találkozik.</p>
  <ul>
    <li>Olyan témákban adunk gyakorlatias tudást mint a teremtés - manifesztáció</li>
    <li>Légzéstechnikák</li>
    <li>Meditáció</li>
    <li>Vizualizáció</li>
    <li>Gondolkodásmód</li>
  </ul>
  <p>Ezekkel a technikákkal a kezedbe veheted életed területeinek irányítását, mert minden az elmédből ered.</p>
  <p>Ez egy zárt csoport is egyben, számos online és élő közösségi programmal, ahol az élőben való találkozókra nagy hangsúlyt fektetünk. Közös meditációk, hideg merülések és túrák keretein belül.</p>
  <p><strong>Itt találod az októberi programokat:</strong></p>
  <ul>
    <li>Élő túra az apci tengerszemhez, hideg merülés a tóban, tábortűz, meditáció a Szurdokpüspöki táltos forrásnál.</li>
    <li>Paksi András online előadása a hidegterápiáról és oxygen advantage-ről.</li>
    <li>Dokik online előadása - Spiritualitás a hétköznapokban.</li>
    <li>Dokik élő kötetlen beszélgetés.</li>
  </ul>
  <p>A 100%-os promóciós kódod: <strong>${promCode}</strong></p>
  <p>Kérlek látogass el oldalunkra: <a href="https://elmeereje.hu/#csomagok" style="color: #1a73e8;">https://elmeereje.hu/#csomagok</a>, ahol a havi csomag <strong>csatlakozom</strong> kiválasztása után, a promóciós kód megadása opció alatt aktiválhatod nyereményed.</p>
  <p>Köszönettel,<br><strong>Dokik</strong></p>
</section>`,
  tier2and3: (promCode: string, giftId: string) => `
<section style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <h2>Kedves Nyertes,</h2>
  <p>Először is köszönjük, hogy kimozdultál és részt vettél ebben a játékban. Manapság kezd kiveszni a játékosság, a kaland az életünkből, de reméljük, ezzel a játékkal kicsit emlékeztettünk arra, hogy mennyire fontos a játék és a célhoz vezető út az életben.</p>
  <p><strong>Nyereményed:</strong> ${giftSpecificMessageMap[giftId]}</p>
  <p>Kérlek, küldd el válasz emailben a neved és a kísérőd nevét (amennyiben páros az ajándék), hogy ki tudjuk állítani az ajándékhoz tartozó utalványokat.</p>
  <p>Valamint szeretnénk felajánlani egy <strong>20%-os kedvezményt</strong>, amivel csatlakozhatsz az <strong>Elme Ereje Online</strong> képzéshez.</p>
  <p>Ez a képzés egy életmódváltó program része, amiben több mint 4 órányi kurzus anyag vár, ahol a tudomány és a spiritualitás találkozik.</p>
  <ul>
    <li>Olyan témákban adunk gyakorlatias tudást mint a teremtés - manifesztáció</li>
    <li>Légzéstechnikák</li>
    <li>Meditáció</li>
    <li>Vizualizáció</li>
    <li>Gondolkodásmód</li>
  </ul>
  <p>Ez egy zárt csoport is egyben, számos online és élő közösségi programmal, ahol az élőben való találkozókra nagy hangsúlyt fektetünk. Közös meditációk, hideg merülések és túrák keretein belül.</p>
  <p><strong>Itt találod az októberi programokat:</strong></p>
  <ul>
    <li>Élő túra az apci tengerszemhez, hideg merülés a tóban, tábortűz, meditáció a Szurdokpüspöki táltos forrásnál.</li>
    <li>Paksi András online előadása a hidegterápiáról és oxygen advantage-ről.</li>
    <li>Dokik online előadása - Spiritualitás a hétköznapokban.</li>
    <li>Dokik élő kötetlen beszélgetés.</li>
  </ul>
  <p>A promóciós kódod: <strong>${promCode}</strong></p>
  <p>Kérlek látogass el oldalunkra: <a href="https://elmeereje.hu/#csomagok" style="color: #1a73e8;">https://elmeereje.hu/#csomagok</a>, ahol a havi csomag <strong>csatlakozom</strong> gomb megnyomása után, a promóciós kód megadása opció alatt aktiválhatod nyereményed.</p>
  <p>Üdvözlettel,<br><strong>Dokik</strong></p>
</section>
`,
  tier4: (promCode: string) => `
<section style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
  <h2>Kedves Nyertes,</h2>
  <p>Gratulálunk! Megnyerted a főnyereményt <strong>300.000 Ft értékben</strong>, amely az <strong>Elme Ereje Elvonulás</strong>.</p>
  <p>3 nap, teljes befelé figyelés, test-lélek-szellem harmóniájának megteremtése a mentorálásunkkal, szállással és étkeztetéssel.</p>
  <p>Kérlek, küldd el válasz emailben a neved, és felvesszük veled a kapcsolatot.</p>
  <p>Valamint szeretnénk felajánlani egy <strong>20%-os kedvezményt</strong>, amivel csatlakozhatsz az <strong>Elme Ereje Online</strong> képzéshez.</p>
  <p>Ez a képzés egy életmódváltó program része, amiben több mint 4 órányi kurzus anyag vár, ahol a tudomány és a spiritualitás találkozik.</p>
  <ul>
    <li>Olyan témákban adunk gyakorlatias tudást mint a teremtés - manifesztáció</li>
    <li>Légzéstechnikák</li>
    <li>Meditáció</li>
    <li>Vizualizáció</li>
    <li>Gondolkodásmód</li>
  </ul>
  <p>Ez egy zárt csoport is egyben, számos online és élő közösségi programmal, ahol az élőben való találkozókra nagy hangsúlyt fektetünk. Közös meditációk, hideg merülések és túrák keretein belül.</p>
  <p><strong>Itt találod az októberi programokat:</strong></p>
  <ul>
    <li>Élő túra az apci tengerszemhez, hideg merülés a tóban, tábortűz, meditáció a Szurdokpüspöki táltos forrásnál.</li>
    <li>Paksi András online előadása a hidegterápiáról és oxygen advantage-ről.</li>
    <li>Dokik online előadása - Spiritualitás a hétköznapokban.</li>
    <li>Dokik élő kötetlen beszélgetés.</li>
  </ul>
  <p>A promóciós kódod: <strong>${promCode}</strong></p>
  <p>Kérlek látogass el oldalunkra: <a href="https://elmeereje.hu/#csomagok" style="color: #1a73e8;">https://elmeereje.hu/#csomagok</a>, ahol a havi csomag <strong>csatlakozom</strong> gomb megnyomása után, a promóciós kód megadása opció alatt aktiválhatod nyereményed.</p>
  <p>Üdvözlettel,<br><strong>Dokik</strong></p>
</section>
`,
};

async function getGifts(): Promise<Gift[]> {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection<Gift>('gifts');
  return collection.find().toArray();
}

async function claimGift(gift: Gift, winnerEmail: string, winnerId: string) {
  const newWinnerEmail = Array.isArray(gift.winnerEmail)
    ? [...gift.winnerEmail, winnerEmail]
    : winnerEmail;
  const newWinnerId = Array.isArray(gift.winnerId)
    ? [...gift.winnerId, winnerId]
    : winnerId;
  const claimedAt = Array.isArray(gift.claimedAt)
    ? [...gift.claimedAt, new Date().toISOString()]
    : new Date().toISOString();

  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('gifts');
  const filter = { qr_id: gift.qr_id };
  const updateDocument = {
    $set: {
      winnerEmail: newWinnerEmail,
      winnerId: newWinnerId,
      claimedAt,
    },
  };
  return collection.updateOne(filter, updateDocument);
}

function genEmail(email: string, gift: Gift) {
  const discount20 = 'ELMEEREJE20';
  let promoCode;
  let template;

  if (gift.tier === 1) {
    const count = gift.winnerEmail?.length || 0;

    if ((count === 0 || count % 2 === 0) && count < 100) {
      const obfuscatedCount = count * 100 + count * 3 + 7;
      promoCode = `ELMEEREJE${obfuscatedCount}`;
      template = emailMap.membership(promoCode);
    } else {
      promoCode = discount20;
      template = emailMap.discount(promoCode);
    }
  }

  if (gift.tier === 2 || gift.tier === 3) {
    template = emailMap.tier2and3(discount20, gift.giftId);
  }

  if (gift.tier === 4) {
    template = emailMap.tier4(discount20);
  }

  const msg = {
    to: email,
    from: 'hellomedlino@gmail.com',
    subject: 'Elme Ereje közösség - Zsákbamacska nyereményjáték',
    html: template as string,
  };

  return msg;
}

function getEligibilityStatus(params: {
  gifts: Gift[];
  qrId: string;
  email: string;
  visitorId: string;
}) {
  const { qrId, email, visitorId, gifts } = params;

  const gift = gifts.find((g) => g.qr_id === qrId);
  if (!gift) {
    return { status: 0, message: 'Gift does not exist', gift: null };
  }

  const tierOneGift = gifts.find((g) => g.tier === 1)!;
  const isTierOneAlredyClaimedByYou =
    tierOneGift.winnerEmail?.includes(email) ||
    tierOneGift.winnerId?.includes(visitorId);

  if (gift.tier === 1) {
    if (isTierOneAlredyClaimedByYou) {
      return { status: 1, message: 'Gift already claimed by you', gift: null };
    }
    return { status: 200, message: 'success', gift };
  }

  const highTierGiftClaimedByYou = gifts.find(
    (g) => (g.winnerId === visitorId || g.winnerEmail === email) && g.tier !== 4
  );
  if (highTierGiftClaimedByYou) {
    return {
      status: 2,
      message: 'A high tier gift already claimed by you',
      gift: null,
    };
  }

  if (gift.winnerId !== null || gift.winnerEmail !== null) {
    return { status: 3, message: 'Gift already claimed', gift: null };
  }

  return { status: 200, message: 'success', gift };
}

export async function POST(req: Request) {
  const sendGridApiKey = process.env.SENDGRID_API_KEY;

  if (!sendGridApiKey) {
    throw new Error('Invalid request');
  }

  const res = await req.json();
  if (!res.email || !res.id || !res.visitorId || !isValidEmail(res.email)) {
    throw new Error('Invalid request');
  }

  try {
    const formattedEmail = res.email.trim().toLowerCase();
    const gifts = await getGifts();

    const { status, message, gift } = getEligibilityStatus({
      gifts,
      qrId: res.id,
      email: formattedEmail,
      visitorId: res.visitorId,
    });

    if (status !== 200) {
      return NextResponse.json({ message: `${status}-${message}` });
    }

    if (gift) {
      await claimGift(gift, formattedEmail, res.visitorId);
      const email = genEmail(formattedEmail, gift);
      sgMail.setApiKey(sendGridApiKey!);
      await sgMail.send(email);
    }
  } catch (error: any) {
    throw new Error(`Something went wrong! - ${error.message}`);
  }

  return NextResponse.json({});
}
