import { NextRequest, NextResponse } from 'next/server';

const backendUrl = process.env.RAG_SERVICE_URL || 'http://localhost:8001';

export async function GET() {
    try {
        const response = await fetch(`${backendUrl}/ingest`);

        if (!response.ok) {
            throw new Error(`Backend returned ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to fetch ingest status';
        return NextResponse.json(
            {
                error: message,
                details: 'Make sure the Python backend is running on port 8001'
            },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const response = await fetch(`${backendUrl}/ingest`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const detail = await response.text();
            throw new Error(`Backend returned ${response.status}: ${detail}`);
        }

        const data = await response.json();
        return NextResponse.json(data);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Failed to ingest documents';
        return NextResponse.json(
            {
                error: message,
                details: 'Make sure the Python backend is running on port 8001'
            },
            { status: 500 }
        );
    }
}
