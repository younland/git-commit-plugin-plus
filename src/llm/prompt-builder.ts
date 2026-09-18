export interface CommitTypeInfo {
    key: string;
    detail?: string;
}

export interface PromptInput {
    types: Array<CommitTypeInfo>;
    templateContent: string;
    maxSubjectCharacters: number;
    responseLanguage: string;
    diff: string;
    recentCommits: string;
}

export function buildSystemPrompt(customPrompt: string): string {
    let prompt =
        'You are a senior engineer and Git maintainer. Analyze the git changes carefully, ' +
        'identify the primary intent, and fill commit template fields. Keep your analysis ' +
        'internal and return only the requested JSON.';
    if (customPrompt && customPrompt.trim().length > 0) {
        prompt +=
            '\n\nPersistent User Preferences:\n' +
            customPrompt.trim() +
            '\n\nFollow these preferences when they do not conflict with the required JSON shape, ' +
            'commit template, allowed types, git diff, or other output constraints.';
    }
    return prompt;
}

export function buildUserPrompt(input: PromptInput): string {
    const typeLines = input.types
        .map(type => `- ${type.key}${type.detail ? `: ${type.detail}` : ''}`)
        .join('\n');

    return `Generate git commit template fields for this project.

Internal Analysis Instructions (do not output this analysis):
1. Inspect the diff hunks and recent commit style.
2. Identify the primary user-visible or technical intent, not just the changed filenames.
3. Separate the main change from incidental formatting, generated files, lockfiles, and mechanical churn.
4. Use recent commits only for style hints; never copy their content.

JSON Output Contract:
1. Return valid JSON only; no markdown fences, labels, explanation, or analysis.
2. Use this exact shape: {"type":"","scope":"","subject":"","body":"","footer":""}.
3. The plugin renders these fields locally with the commit template; do not include template placeholders like <type> or <subject> in the values.
4. Keep type and scope as lowercase English identifiers; write subject and body in ${input.responseLanguage}.
5. Subject must be concrete, imperative, under ${input.maxSubjectCharacters} characters, and must not end with punctuation.
6. Do not use vague subjects like "update files", "modify code", "change logic", or filenames alone.
7. Body is the detailed description field. Use empty string when the subject is sufficient. When body includes more than one detail, format each line as a bullet starting with "- ".
8. Footer is for remarks such as issue references (e.g. "Closes #123"). Use empty string when there is none.

Allowed Types (type MUST be one of these keys):
${typeLines}

Commit Template (rendered locally by the plugin, for your understanding of the final format):
${input.templateContent}

Git Context:
Recent Commits:
${input.recentCommits || '(none)'}

Changes Diff:
${input.diff}`;
}
