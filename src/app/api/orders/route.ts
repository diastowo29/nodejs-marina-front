import { PrismaClient } from '@prisma/client'
import { NextApiRequest } from 'next';
import { NextRequest } from 'next/server';
const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
    const channel = request.nextUrl.searchParams.get('c');
    const allOrders = await prisma.orders.findMany({
        include: {
            products: {
                include: {
                    main_product : true
                }
            },
            store: {
                include: {
                    channel: true
                }
            },
            customers: true,
            logistic: true
        },
        ...(channel && {
            where: {
                store: {
                    channel: {
                        name: channel
                    }
                }
            }
        })
    });
    return Response.json(allOrders);
}


export async function POST(request: Request) {
    const req = await request.json();
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
        productsArray.push({
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
        })
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
            recp_phone: req.recipient.phone,
            recp_addr_full: req.recipient.address.address_full,
            recp_addr_city: req.recipient.address.city,
            recp_addr_district: req.recipient.address.district,
            recp_addr_geo: req.recipient.address.geo,
            recp_addr_country: req.recipient.address.country,
            recp_addr_postal_code: req.recipient.address.postal_code,
            shipping_price: req.amt.shipping_cost,
            total_product_price: req.amt.ttl_product_price,
            total_amount: req.amt.ttl_amount,
            store: {
                connectOrCreate: {
                    create: {
                        name: 'Kelontong Shop',
                        origin_id: req.shop_id.toString(),
                        status: 'active',
                        user: {
                            connectOrCreate: {
                                create: {
                                    email: 'diastowo@gmail.com',
                                    name: 'Diastowo Faryduana'
                                },
                                where: {
                                    email: 'diastowo@gmail.com'
                                }
                            }
                        },
                        channel: {
                            connectOrCreate: {
                                create: {
                                    name: 'Tokopedia'
                                }, 
                                where: {
                                    name: 'Tokopedia'
                                }
                            }
                        }
                    },
                    where: {
                        origin_id: req.shop_id.toString()
                    }
                }
            },
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
    })
}