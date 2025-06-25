'use server'

import { INT_LIST_CHANNEL } from "@/urls/internal";
import { generateJwt } from "../sign/actions";
import { userAgent } from "next/server";

// import { INT_LIST_CHANNEL } from "@/urls/internal";

export async function listChannel () {
    try {
        const channelRaw = await fetch(INT_LIST_CHANNEL, 
            {
                cache: 'no-store', 
                headers: { 'Authorization': 'Bearer ' + await generateJwt() }
            }
        );
        // console.log('channelRaw:', channelRaw);
        const channel = await channelRaw.json();
        return channel;
    } catch (err) {
        console.error('Error fetching channel list:', err);
        return {
            error: true,
            message: 'Error fetching channel list'
        };
    }
}