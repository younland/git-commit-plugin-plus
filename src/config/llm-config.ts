import { workspace } from 'vscode';

/**
 * @description LLM 配置 LLM settings, read on demand so changes take effect immediately
 */
export interface LlmConfig {
    baseUrl: string;
    apiKey: string;
    model: string;
    temperature: number;
    responseLanguage: string;
    maxDiffLength: number;
    customPrompt: string;
    timeout: number;
}

export function getLlmConfig(): LlmConfig {
    const config = workspace.getConfiguration('GitCommitPluginPlus');
    return {
        baseUrl: config.get<string>('LLM.BaseUrl') || 'http://localhost:11434/v1',
        apiKey: config.get<string>('LLM.ApiKey') || '',
        model: config.get<string>('LLM.Model') || 'deepseek-v4-pro',
        temperature: config.get<number>('LLM.Temperature') ?? 0.5,
        responseLanguage: config.get<string>('LLM.ResponseLanguage') || '简体中文',
        maxDiffLength: config.get<number>('LLM.MaxDiffLength') || 12000,
        customPrompt: config.get<string>('LLM.CustomPrompt') || '',
        timeout: config.get<number>('LLM.Timeout') || 0,
    };
}
