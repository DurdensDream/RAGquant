import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { query } = body;

        if (!query) {
            return NextResponse.json(
                { error: 'Query is required' },
                { status: 400 }
            );
        }

        // Call Python backend
        const backendUrl = process.env.RAG_SERVICE_URL || 'http://localhost:8001';

        const response = await fetch(`${backendUrl}/analyze`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query,
                risk_tolerance: body.risk_tolerance || 'moderate',
                capital: body.capital || 10000
            }),
        });

        if (!response.ok) {
            throw new Error(`Backend returned ${response.status}`);
        }

        const data = await response.json();
        return NextResponse.json(data);

    } catch (error: unknown) {
        console.error('API Error:', error);
        const message = error instanceof Error ? error.message : 'Failed to generate strategy';
        return NextResponse.json(
            {
                error: message,
                details: 'Make sure the Python backend is running on port 8001'
            },
            { status: 500 }
        );
    }
}

export async function GET() {
    return NextResponse.json({
        message: 'QuantOver API is running! 💖',
        endpoints: {
            analyze: 'POST /api/analyze'
        }
    });
}
