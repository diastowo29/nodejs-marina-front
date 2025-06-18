/* 'use server'

import { cookies } from "next/headers";

export async function setCookie(name: string, value: string, options?: { [key: string]: any }) {
    const cookiesStore = await cookies();
    cookiesStore.set(name, value, options);
} */