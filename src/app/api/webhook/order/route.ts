// import { PrismaClient } from '@prisma/client'
// const prisma = new PrismaClient();

export async function POST(request: Request) {
    // const req = await request.json();
    // const customerProps = {
    //     email: req.customer.email,
    //     name: req.customer.Name,
    //     phone: req.customer.phone,
    //     origin_id: req.customer.id.toString()
    // }
    // const orderedProduct:any[] = [];
    // req.products.forEach((product:any) => {
    //     orderedProduct.push({
    //         qty: product.quantity,
    //         total_price: product.total_price,
    //         invoice: req.invoice_num,
    //         notes: product.notes,
    //         main_product: {
    //             connect: {
    //                 origin_id: product.id.toString()
    //             }
    //         }
    //     })
    // });
    // const orderPayload = {
    //     origin_id: req.order_id.toString(),
    //     invoice: req.invoice_num,
    //     accept_partial: req.accept_partial,
    //     device: req.device,
    //     payment_id: req.payment_id.toString(),
    //     recp_name: req.recipient.Name,
    //     recp_phone: req.recipient.phone,
    //     recp_addr_full: req.recipient.address.address_full,
    //     recp_addr_city: req.recipient.address.city,
    //     recp_addr_district: req.recipient.address.district,
    //     recp_addr_geo: req.recipient.address.geo,
    //     recp_addr_country: req.recipient.address.country,
    //     recp_addr_postal_code: req.recipient.address.postal_code,
    //     shipping_price: req.amt.shipping_cost,
    //     total_product_price: req.amt.ttl_product_price,
    //     total_amount: req.amt.ttl_amount,
    //     store: {
    //         connect: {
    //             origin_id: req.shop_id.toString()
    //         }
    //     },
    //     logistic: {
    //         connect: {
    //             name: req.logistics.shipping_agency
    //         }
    //     },
    //     status: 'New',
    //     customers: {
    //         connectOrCreate: {
    //             create: customerProps,
    //             where: {
    //                 origin_id: req.customer.id.toString()
    //             }
    //         }
    //     },
    //     products: { create: orderedProduct }
    // }
    // const order = await prisma.orders.create({
    //     data: orderPayload
    // })
    // return Response.json({
    //     orders: order
    // })
    return Response.json({});

}