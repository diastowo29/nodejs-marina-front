'use server'

import { INT_LIST_CHANNEL } from "@/urls/internal";

// import { INT_LIST_CHANNEL } from "@/urls/internal";

export async function listChannel () {
    // const channelRaw = await fetch(INT_LIST_CHANNEL, { cache: 'no-store' });
    const channelRaw = await fetch(INT_LIST_CHANNEL, { cache: 'no-store' });
    // console.log(channelRaw);
    const channel = await channelRaw.json();
    return channel;
}