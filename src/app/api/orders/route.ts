import { getOrders } from "@/app/actions/order/actions";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const idQuery = searchParams.get('id') || ''; 
    const orders = await getOrders(idQuery);
    return new Response(JSON.stringify(orders), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });
}