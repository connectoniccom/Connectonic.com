
'use client';
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Heart } from 'lucide-react';

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
                   <p className="text-muted-foreground">
                    Thank you for considering a donation. We are currently not accepting payments but appreciate your support!
                   </p>
                </CardContent>
            </Card>
        </div>
    );
};

export default DonatePage;
