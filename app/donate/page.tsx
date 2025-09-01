
'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { Elements, useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { stripePublicKey } from '@/lib/stripe';
import { Input } from '@/components/ui/input'; 
import { Label } from '@/components/ui/label'; 

const stripePromise = loadStripe(stripePublicKey);

const DonatePage = () => {
    return (
        <div className="flex justify-center items-center h-full p-4">
            <Card className="w-full max-w-lg text-center shadow-lg">
                <CardHeader>
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit">
                        <Heart className="h-12 w-12 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-bold mt-4">Support Connectonic</CardTitle>
                    <CardDescription>
                        Your contribution helps us keep the music playing and support artists everywhere.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Elements stripe={stripePromise}>
                        <PaymentForm />
                    </Elements>
                </CardContent>
            </Card>
        </div>
    );
};

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [amount, setAmount] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<'card' | 'mobileMoney'>('card');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [mobileNetwork, setMobileNetwork] = useState<'MTN' | 'Airtel' | ''>('');


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setLoading(true);
        setError(null);
        setSuccess(false);

        const parsedAmount = parseFloat(amount);

        if (isNaN(parsedAmount) || parsedAmount < 0.30) {
            setError('Please enter a valid amount, at least $0.30.');
            setLoading(false);
            return;
        }

        if (selectedPaymentMethod === 'mobileMoney') {
            if (!phoneNumber) {
                setError('Phone number is required for mobile money payments.');
                setLoading(false);
                return;
            }

            if (!mobileNetwork) {
                setError('Please select a mobile network.');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch('/api/mobile-money/initiate', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        amount: parsedAmount,
                        phoneNumber,
                        network: mobileNetwork,
                        userId: 'user123',
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    setSuccess(true);
                } else {
                    setError(data.error || 'Failed to initiate mobile money payment.');
                }
            } catch (err: any) {
                setError(err.message || "An unknown error occurred.");
            } finally {
                setLoading(false);
            }
            return;
        }

        if (!stripe || !elements) {
            return;
        }

        const amountInCents = Math.round(parsedAmount * 100);

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            setLoading(false);
            return;
        }

        try {
                const { paymentMethod, error: createPaymentMethodError } = await stripe.createPaymentMethod({
                        type: 'card',
                        card: cardElement,
                });

                if (createPaymentMethodError) {
                        throw new Error(createPaymentMethodError.message);
                }

                const response = await fetch('/api/create-payment-intent', {
                        method: 'POST',
                        headers: {
                        'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                                paymentMethodId: paymentMethod.id,
                                amount: amountInCents,
                        }),
                });

                const paymentIntentData = await response.json();

                if (paymentIntentData.error) {
                        throw new Error(paymentIntentData.error);
                }

                const confirmResult = await stripe.confirmCardPayment(paymentIntentData.clientSecret);

                if (confirmResult.error) {
                        throw new Error(confirmResult.error.message);
                }

                if (confirmResult.paymentIntent.status === 'succeeded') {
                        setSuccess(true);
                }
        } catch (err: any) {
                setError(err.message || "An unknown error occurred.");
        } finally {
                setLoading(false);
        }
    };

    return (
        <div>
            {success ? (
                <div className="text-green-500 font-semibold text-center py-4">
                    Thank you for your donation!
                </div>
            ) : (
                <form id="payment-form" onSubmit={handleSubmit} className="space-y-6">
                    <div className="mb-4">
                        <Label className="block text-left text-sm font-medium mb-2">
                            Choose Payment Method
                        </Label>
                        <div className="flex gap-4">
                            <Button
                                type="button"
                                variant={selectedPaymentMethod === 'card' ? 'default' : 'outline'}
                                onClick={() => setSelectedPaymentMethod('card')}
                            >
                                Credit Card
                            </Button>
                            <Button
                                type="button"
                                variant={selectedPaymentMethod === 'mobileMoney' ? 'default' : 'outline'}
                                onClick={() => setSelectedPaymentMethod('mobileMoney')}
                            >
                                Mobile Money (Uganda)
                            </Button>
                        </div>
                    </div>
                    <div>
                        <Label htmlFor="donation-amount" className="block text-left text-sm font-medium mb-1">
                            Donation Amount
                        </Label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-muted-foreground">$</span>
                            <Input
                                id="donation-amount"
                                type="number"
                                placeholder="0.00"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="pl-7"
                                required
                            />
                        </div>
                    </div>

                    {selectedPaymentMethod === 'mobileMoney' && (
                        <div className="space-y-4">
                            <div>
                                <Label htmlFor="phone-number" className="block text-left text-sm font-medium mb-1">
                                    Phone Number
                                </Label>
                                <Input
                                    id="phone-number"
                                    type="tel"
                                    placeholder="2567XXXXXXXX"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                />
                            </div>

                            <div>
                                <Label className="block text-left text-sm font-medium mb-1">
                                    Mobile Network
                                </Label>
                                <div className="flex gap-4">
                                    <Button
                                        type="button"
                                        variant={mobileNetwork === 'MTN' ? 'default' : 'outline'}
                                        onClick={() => setMobileNetwork('MTN')}
                                        className="flex-1"
                                    >
                                        MTN
                                    </Button>
                                    <Button
                                        type="button"
                                        variant={mobileNetwork === 'Airtel' ? 'default' : 'outline'}
                                        onClick={() => setMobileNetwork('Airtel')}
                                        className="flex-1"
                                    >
                                        Airtel
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {selectedPaymentMethod === 'card' && (
                        <div>
                            <Label className="block text-left text-sm font-medium mb-1">
                                Credit or debit card
                            </Label>
                            <div className="p-3 border rounded-md bg-transparent">
                                <CardElement
                                    options={{
                                        style: {
                                            base: {
                                                fontSize: '16px',
                                                color: '#424770', // Change based on theme
                                                '::placeholder': {
                                                    color: '#aab7c4', // Change based on theme
                                                },
                                            },
                                            invalid: {
                                                color: '#fa755a',
                                            },
                                        },
                                    }}
                                />
                            </div>
                        </div>
                    )}

                    {error && <div className="text-destructive text-sm text-center">{error}</div>}

                    <Button
                        type="submit"
                        size="lg"
                        className="w-full"
                        disabled={
                            loading ||
                            (selectedPaymentMethod === 'card' && (!stripe || !elements))
                        }
                    >
                        {loading ? 'Processing...' : selectedPaymentMethod === 'mobileMoney' ? "Request Payment" : "Donate Now"}
                    </Button>
                </form>
            )}
        </div>
    );
};

export default DonatePage;
