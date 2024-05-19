import { NextRequest, NextResponse } from 'next/server';

import { authMiddleware } from '@/middlewares/auth';

export async function GET(req: NextRequest) {
  const discordToken = process.env.DISCORD_BOT_KEY;
  const guildId = process.env.DISCORD_GUILD_ID;

  if (!guildId || !discordToken) {
    throw new Error('Invalid request!');
  }

  const session = await authMiddleware(req);
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
