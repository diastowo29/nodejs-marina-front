// import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
// const prisma = new PrismaClient()

export async function GET(request:Request, { params } : any) {
    // const allOrders = await prisma.orders.findUnique({
    //     where: {
    //         id: Number.parseInt(params.order)
    //     },
    //     include: {
    //         products: {
    //             include: {
    //                 main_product : true
    //             }
    //         },
    //         store: {
    //             include: {
    //                 channel: true
    //             }
    //         },
    //         customers: true,
    //         logistic: true
    //     }
    // });
    // return Response.json(allOrders ? allOrders:[]);
    return Response.json({});

}

export async function PUT(request:Request, { params } : any) {
    // try {
    //     let reqBody = await request.json();
    //     const orderId = params.order;
    //     const getOrder = await prisma.orders.update({
    //         data: reqBody,
    //         where: { id: Number.parseInt(orderId) }
    //     });
    //     return NextResponse.json(getOrder);
    // } catch (err) {
    //     console.log(err);
    //     return NextResponse.json(err, {status: 422});
    // }
    return Response.json({});

}


export async function POST(request: Request) {
    /* const req = await request.json();
    const productsArray: any[] = [];
    const customerProps = {
        email: req.customer.email,
        name: req.customer.Name,
        phone: req.customer.phone,
        origin_id: req.customer.id.toString()
    }
    req.products.forEach((product:any) => {
        const productProp = {
            origin_id: product.id.toString(),
            name: product.Name,
            sku: product.sku,
            price: product.price
        }
        productsArray.push(
            {
                qty: product.quantity,
                total_price: product.total_price,
                invoice: req.invoice_num,
                notes: product.notes,
                main_product: {
                    connectOrCreate: {
                        create: productProp,
                        where: {
                            origin_id: product.id.toString()
                        }
                    }
                }
            }
        )
    });
    const createOrders = await prisma.orders.create({
        include: {
            products: {
                include: {
                    main_product: true
                }
            }
        },
        data: {
            invoice: req.invoice_num,
            accept_partial: req.accept_partial,
            device: req.device,
            payment_id: req.payment_id.toString(),
            recp_name: req.recipient.Name,
            recp_addr_full: req.recipient.address.address_full,
            recp_addr_city: req.recipient.address.city,
            recp_addr_district: req.recipient.address.district,
            recp_addr_geo: req.recipient.address.geo,
            recp_addr_country: req.recipient.address.country,
            recp_addr_postal_code: req.recipient.address.postal_code,
            shipping_price: req.amt.shipping_cost,
            total_product_price: req.amt.ttl_product_price,
            total_amount: req.amt.ttl_amount,
            logistic: {
                connectOrCreate: {
                    create: {
                        name: req.logistics.shipping_agency
                    },
                    where: {
                        name: req.logistics.shipping_agency
                    }
                }
            },
            status: 'New',
            customers: {
                connectOrCreate: {
                    create: customerProps,
                    where: {
                        origin_id: req.customer.id.toString()
                    }
                }
            },
            products: {
                create: productsArray
            }
        }
    })
    return Response.json({
        orders: createOrders
    }) */
}