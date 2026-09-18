import { Repository } from '../types/git';

export interface GitContext {
    diff: string;
    recentCommits: string;
}

const MAX_CHANGED_LINES_PER_HUNK = 24;
const MAX_CONTEXT_LINES_PER_HUNK = 4;

function isHeaderLine(line: string): boolean {
    return (
        line.startsWith('diff --git') ||
        line.startsWith('index ') ||
        line.startsWith('--- ') ||
        line.startsWith('+++ ') ||
        line.startsWith('new file mode') ||
        line.startsWith('deleted file mode') ||
        line.startsWith('rename from ') ||
        line.startsWith('rename to ') ||
        line.startsWith('similarity index') ||
        line.startsWith('Binary files')
    );
}

/**
 * @description 截断 diff 供 prompt 使用 Trim diff for prompt: keep headers and hunk markers,
 * limit changed/context lines per hunk, cap total length
 */
export function trimDiffForPrompt(diff: string, maxLength: number): string {
    const result: Array<string> = [];
    let currentLength = 0;
    let omittedLines = 0;
    let changedLines = 0;
    let contextLines = 0;

    for (const line of diff.split('\n')) {
        if (currentLength >= maxLength) {
            omittedLines++;
            continue;
        }
        if (line.startsWith('@@') || line.startsWith('diff --git')) {
            changedLines = 0;
            contextLines = 0;
        }
        if (isHeaderLine(line) || line.startsWith('@@')) {
            result.push(line);
            currentLength += line.length + 1;
            continue;
        }
        const firstChar = line.charAt(0);
        if (firstChar === '+' || firstChar === '-') {
            if (changedLines < MAX_CHANGED_LINES_PER_HUNK) {
                changedLines++;
                result.push(line);
                currentLength += line.length + 1;
            } else {
                omittedLines++;
            }
            continue;
        }
        if (firstChar === ' ' || line === '') {
            if (contextLines < MAX_CONTEXT_LINES_PER_HUNK) {
                contextLines++;
                result.push(line);
                currentLength += line.length + 1;
            } else {
                omittedLines++;
            }
            continue;
        }
        result.push(line);
        currentLength += line.length + 1;
    }
    if (omittedLines > 0) {
        result.push(`...[diff summarized: omitted ${omittedLines} lines]`);
    }
    return result.join('\n');
}

/**
 * @description 获取 git 变更上下文 Collect staged (fallback: unstaged) diff and recent commits
 */
export async function getGitContext(
    repo: Repository,
    maxDiffLength: number,
): Promise<GitContext> {
    let diff = await repo.diff(true);
    if (!diff || diff.trim().length === 0) {
        diff = await repo.diff(false);
    }
    if (!diff || diff.trim().length === 0) {
        throw new Error('NO_CHANGES');
    }

    let recentCommits = '';
    try {
        const commits = await repo.log({ maxEntries: 5 });
        recentCommits = commits
            .map(commit => `${commit.hash.substring(0, 7)} ${commit.message}`)
            .join('\n');
    } catch (e) {
        // empty repository without commits, ignore
    }

    return {
        diff: trimDiffForPrompt(diff, maxDiffLength),
        recentCommits,
    };
}
