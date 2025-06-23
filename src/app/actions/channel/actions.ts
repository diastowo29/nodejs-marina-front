'use server'

import { INT_LIST_CHANNEL } from "@/urls/internal";
import { generateJwt } from "../sign/actions";

// import { INT_LIST_CHANNEL } from "@/urls/internal";

export async function listChannel () {
    try {
        let token = await generateJwt();
        const channelRaw = await fetch(INT_LIST_CHANNEL, 
            { 
                cache: 'no-store', 
                headers: { 'Authorization': 'Bearer ' + token }
            }
        );
        // console.log(channelRaw);
        const channel = await channelRaw.json();
        // console.log(channel);
        return channel;
    } catch (err) {
        console.log('Error fetching channel list:', err);
        return {
            error: true,
            message: 'Error fetching channel list'
        };
    }
}