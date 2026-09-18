import * as http from 'http';
import * as https from 'https';
import { LlmConfig } from '../config/llm-config';

function extractContent(content: unknown): string {
    if (typeof content === 'string') {
        return content;
    }
    if (Array.isArray(content)) {
        return content
            .map(part => (part && typeof part.text === 'string' ? part.text : ''))
            .join('');
    }
    return '';
}

function extractErrorMessage(body: string): string {
    try {
        const parsed = JSON.parse(body);
        if (parsed && parsed.error && typeof parsed.error.message === 'string') {
            return parsed.error.message;
        }
        if (parsed && typeof parsed.message === 'string') {
            return parsed.message;
        }
    } catch (e) {
        // not a JSON body, fall through to raw text
    }
    return body;
}

/**
 * @description OpenAI 兼容的 chat completions 调用 Minimal OpenAI-compatible chat completion client
 */
export function chatCompletion(
    config: LlmConfig,
    systemPrompt: string,
    userPrompt: string,
): Promise<string> {
    const baseUrl = config.baseUrl.replace(/\/+$/, '');
    const url = baseUrl.endsWith('/chat/completions')
        ? baseUrl
        : `${baseUrl}/chat/completions`;
    const payload = JSON.stringify({
        model: config.model,
        temperature: config.temperature,
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt },
        ],
    });

    return new Promise<string>((resolve, reject) => {
        const transport = url.startsWith('http://') ? http : https;
        const request = transport.request(
            url,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${config.apiKey}`,
                    'Content-Length': Buffer.byteLength(payload),
                },
            },
            response => {
                const chunks: Array<Buffer> = [];
                response.on('data', (chunk: Buffer) => chunks.push(chunk));
                response.on('end', () => {
                    const body = Buffer.concat(chunks).toString('utf8');
                    const status = response.statusCode || 0;
                    if (status < 200 || status >= 300) {
                        reject(
                            new Error(
                                `LLM request failed (HTTP ${status}): ${extractErrorMessage(body)}`,
                            ),
                        );
                        return;
                    }
                    try {
                        const parsed = JSON.parse(body);
                        const content =
                            parsed.choices &&
                            parsed.choices[0] &&
                            parsed.choices[0].message
                                ? extractContent(parsed.choices[0].message.content)
                                : '';
                        if (!content) {
                            reject(new Error('LLM returned an empty response'));
                            return;
                        }
                        resolve(content);
                    } catch (e) {
                        reject(new Error(`Failed to parse LLM response: ${e}`));
                    }
                });
            },
        );
        //超时时间为秒，0 表示不超时 Timeout in seconds, 0 means no timeout
        if (config.timeout > 0) {
            request.setTimeout(config.timeout * 1000, () => {
                request.abort();
                reject(new Error('LLM request timed out'));
            });
        }
        request.on('error', (error: Error) => {
            reject(new Error(`LLM request error: ${error.message}`));
        });
        request.write(payload);
        request.end();
    });
}
