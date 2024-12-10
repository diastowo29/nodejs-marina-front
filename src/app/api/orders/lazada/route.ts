export async function GET() {
    return Response.json({});
}

export async function POST(request: Request) {
    const req = await request.json();
    console.log(req)
    return Response.json({})
}