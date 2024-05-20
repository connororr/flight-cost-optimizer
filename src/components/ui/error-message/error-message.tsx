import { ExclamationTriangleIcon } from '@radix-ui/react-icons';

import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/shadcn/alert';

interface ErrorProps {
    message: string;
}

export default function ErrorMessage(props: ErrorProps) {
    return (
        <Alert variant="destructive">
            <ExclamationTriangleIcon className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{props.message}</AlertDescription>
        </Alert>
    );
}
