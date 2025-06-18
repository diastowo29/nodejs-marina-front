'use server'

import { INT_LIST_CHANNEL } from "@/urls/internal";
import { cookies } from "next/headers";
// const jwt = require('jsonwebtoken');
import * as jwt from 'jsonwebtoken';
import * as fs from 'fs';

// import { INT_LIST_CHANNEL } from "@/urls/internal";

export async function listChannel () {
    const cookiesStore = await cookies();
    console.log(cookiesStore.getAll());
    const privateKey = fs.readFileSync('./private.key');
    const token = jwt.sign({
        time: Date(),
        userId: 12,
    }, privateKey, {algorithm: 'RS256'});
    console.log(token);
    // const channelRaw = await fetch(INT_LIST_CHANNEL, { cache: 'no-store' });
    const channelRaw = await fetch(INT_LIST_CHANNEL, { cache: 'no-store', headers: {
        'Authorization': 'Bearer ' + token
    } });
    // console.log(channelRaw);
    const channel = await channelRaw.json();
    return channel;
}