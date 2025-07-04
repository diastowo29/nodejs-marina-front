'use server'

import { INT_LIST_CHANNEL } from "@/urls/internal";
import { generateJwt } from "../sign/actions";

export async function listChannel () {
    try {
        const channelRaw = await fetch(INT_LIST_CHANNEL, 
            {
                cache: 'no-store', 
                headers: { 'Authorization': 'Bearer ' + await generateJwt() }
            }
        );
        const channel = await channelRaw.json();
        return channel;
    } catch (err) {
        return {
            error: true,
            message: 'Error fetching channel list'
        };
    }
}