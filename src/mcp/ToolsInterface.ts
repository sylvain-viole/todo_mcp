export interface MpcTools {
    list: {
        name: string,
        description: string,
        inputSchema: {
            type: string,
            properties: object
        },
        required: string[],
    }
    call: (params: any | undefined) => Promise<{ content: { type: string; text: string; }[]; }>
}