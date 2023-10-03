import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { purchase } from '../../utils/apiPurchase';

const PayPalCheckoutButton = ({
    cart,
    userId,
    estimatedTotal,
    shippingCost,
    setCheckoutProcess,
    removeAllItemsFromCart,
    toast
}) => {
    return (
        <PayPalScriptProvider
            options={{
                "client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
            }}
        >
            <PayPalButtons
                style={{
                    shape: 'pill'
                }}
                createOrder={(data, actions) => {
                    const itemTotal = cart.reduce((total, product) => total + (product.price * product.quantity), 0);
                    return actions.order.create({
                        purchase_units: [{
                            amount: {
                                value: estimatedTotal,
                                breakdown: {
                                    item_total: {
                                        currency_code: 'USD',
                                        value: itemTotal
                                    },
                                    shipping: {
                                        currency_code: 'USD',
                                        value: shippingCost
                                    }
                                }
                            },
                            items: cart.map(product => ({
                                sku: product.id,
                                name: product.name,
                                quantity: product.quantity,
                                category: 'PHYSICAL_GOODS',
                                unit_amount: {
                                    currency_code: 'USD',
                                    value: product.price
                                }
                            }))
                        }]
                    });
                }}
                onApprove={async (data, actions) => {
                    const order = await actions.order.capture();
                    await purchase(userId, order);
                    removeAllItemsFromCart();
                    toast.success("Purchase successful!");
                }}
                onCancel={() => {
                    setCheckoutProcess(false);
                }}
            />
        </PayPalScriptProvider>
    );
};

export default PayPalCheckoutButton;
