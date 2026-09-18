import GetCommitTypes from '../config/commit-type';
import CommitTemplate from '../config/template-type';
import { Angular } from '../config/default-temp';
import { MaxSubjectCharacters } from '../config/commit-detail';
import { getLlmConfig } from '../config/llm-config';
import { combineMessage, GitMessage } from '../config/message-combine';
import { Repository } from '../types/git';
import { chatCompletion } from './openai-client';
import { getGitContext } from './git-context';
import { buildSystemPrompt, buildUserPrompt, CommitTypeInfo } from './prompt-builder';

interface CommitFields {
    type: string;
    scope: string;
    subject: string;
    body: string;
    footer: string;
}

function sanitizeResponse(text: string): string {
    let result = text;
    // strip complete and unclosed <think> blocks
    result = result.replace(/<think>[\s\S]*?<\/think>/gi, '');
    result = result.replace(/<think>[\s\S]*$/gi, '');
    // strip markdown code fences
    result = result.replace(/```(?:json)?\s*([\s\S]*?)```/gi, '$1');
    return result.trim();
}

function extractField(text: string, field: string): string {
    const match = text.match(
        new RegExp(`"${field}"\\s*:\\s*"((?:[^"\\\\]|\\\\.)*)"?`),
    );
    if (!match) {
        return '';
    }
    return match[1].replace(/\\"/g, '"').replace(/\\n/g, '\n').replace(/\\\\/g, '\\');
}

function parseCommitFields(text: string): CommitFields {
    const sanitized = sanitizeResponse(text);
    try {
        const parsed = JSON.parse(sanitized);
        return {
            type: typeof parsed.type === 'string' ? parsed.type : '',
            scope: typeof parsed.scope === 'string' ? parsed.scope : '',
            subject: typeof parsed.subject === 'string' ? parsed.subject : '',
            body: typeof parsed.body === 'string' ? parsed.body : '',
            footer: typeof parsed.footer === 'string' ? parsed.footer : '',
        };
    } catch (e) {
        // fall back to lenient per-field extraction
    }
    const fields: CommitFields = {
        type: extractField(sanitized, 'type'),
        scope: extractField(sanitized, 'scope'),
        subject: extractField(sanitized, 'subject'),
        body: extractField(sanitized, 'body'),
        footer: extractField(sanitized, 'footer'),
    };
    if (!fields.type && !fields.subject) {
        throw new Error('Failed to parse LLM response into commit fields');
    }
    return fields;
}

function normalizeFields(
    fields: CommitFields,
    allowedTypes: Array<CommitTypeInfo>,
): CommitFields {
    let type = fields.type.trim().toLowerCase();
    if (!allowedTypes.some(item => item.key === type)) {
        type = allowedTypes.some(item => item.key === 'chore')
            ? 'chore'
            : allowedTypes[0].key;
    }
    const scope = fields.scope.trim().toLowerCase().replace(/\s+/g, '-');
    let subject = fields.subject.trim().replace(/[.。!！?？;；,，]+$/, '');
    if (subject.length > MaxSubjectCharacters) {
        subject = subject.substring(0, MaxSubjectCharacters);
    }
    const body = normalizeBody(fields.body);
    return {
        type,
        scope,
        subject,
        body,
        footer: fields.footer.trim(),
    };
}

/**
 * @description body 每行转为 "- " 前缀的 bullet 行 Format each body line as a "- " bullet
 */
function normalizeBody(body: string): string {
    return body
        .split(/<br\s*\/?>|\r?\n/gi)
        .map(line => line.trim().replace(/^(?:[-*•·]\s*)+/, '').trim())
        .filter(line => line.length > 0)
        .map(line => `- ${line}`)
        .join('\n');
}

/**
 * @description LLM 生成提交信息 Generate a commit message from the repo changes via LLM
 */
export async function generateCommitMessage(repo: Repository): Promise<string> {
    const config = getLlmConfig();
    if (!config.apiKey) {
        throw new Error('NO_API_KEY');
    }

    const commitTypes = GetCommitTypes();
    const allowedTypes: Array<CommitTypeInfo> = commitTypes.map(item => ({
        key: item.key || item.label.split(' ').pop() || item.label,
        detail: item.detail,
    }));

    const defaultTemplate =
        CommitTemplate.find(item => item.default) || Angular;

    const context = await getGitContext(repo, config.maxDiffLength);
    const response = await chatCompletion(
        config,
        buildSystemPrompt(config.customPrompt),
        buildUserPrompt({
            types: allowedTypes,
            templateContent: defaultTemplate.templateContent,
            maxSubjectCharacters: MaxSubjectCharacters,
            responseLanguage: config.responseLanguage,
            diff: context.diff,
            recentCommits: context.recentCommits,
        }),
    );

    const fields = normalizeFields(parseCommitFields(response), allowedTypes);
    const matchedType = commitTypes.find(
        item => (item.key || item.label.split(' ').pop()) === fields.type,
    );

    const message: GitMessage = {
        templateName: defaultTemplate.templateName,
        templateContent: defaultTemplate.templateContent,
        icon: (matchedType && matchedType.icon) || '',
        type: fields.type,
        scope: fields.scope,
        subject: fields.subject,
        body: fields.body,
        footer: fields.footer,
    };
    return combineMessage(message);
}
