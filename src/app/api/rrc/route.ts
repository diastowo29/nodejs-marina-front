import { getRrc } from "@/app/actions/rrc/actions";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const idQuery = searchParams.get('id') || ''; 
    const rrc = await getRrc(idQuery);
    return new Response(JSON.stringify(rrc), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}