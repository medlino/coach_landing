import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function GET(req: NextRequest) {
  const authKey = process.env.NEXTAUTH_SECRET;
  const discordToken = process.env.DISCORD_BOT_KEY;
  const guildId = process.env.DISCORD_GUILD_ID;

  if (!authKey || !guildId || !discordToken) {
    throw new Error('Invalid request!');
  }

  let session;
  try {
    session = await getToken({ req, secret: authKey });
  } catch (error) {
    console.error(error);
    throw new Error('Unauthorized');
  }

  const userId = session?.uid;
  const url = `https://discord.com/api/v9/guilds/${guildId}/members/${userId}`;
  const headers = {
    Authorization: `Bot ${discordToken}`,
  };

  try {
    const res = await fetch(url, { headers });
    const data = await res.json();

    return NextResponse.json(data.roles);
  } catch (error) {
    console.error('Failed to fetch getDiscordRoles:', error);
    throw error;
  }
}
