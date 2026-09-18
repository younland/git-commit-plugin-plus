import { Angular } from './default-temp';

export interface GitMessage {
    [index: string]: string;
    templateName: string;
    templateContent: string;
    icon: string;
    type: string;
    scope: string;
    subject: string;
    body: string;
    footer: string;
}

/**
 * @description 组合提交信息 Combine template placeholders into final commit message
 */
export function combineMessage(config: GitMessage): string {
    let result = config.templateContent || Angular.templateContent;
    result = config.icon
        ? result.replace(/<icon>/g, config.icon)
        : result.replace(/<icon>/g, '');
    result =
        config.type !== ''
            ? result.replace(/<type>/g, config.type)
            : result.replace(/<type>/g, '');
    result =
        config.scope !== ''
            ? result.replace(/<scope>/g, config.scope)
            : result.replace(/\(?<scope>\)?/g, '');
    result =
        config.subject !== ''
            ? result.replace(/<subject>/g, config.subject)
            : result.replace(/<subject>/g, '');
    result =
        config.body !== ''
            ? result.replace(/<body>/g, config.body)
            : result.replace(/<body>/g, '');
    result =
        config.footer !== ''
            ? result.replace(/<footer>/g, config.footer)
            : result.replace(/<footer>/g, '');
    result = result.replace(/<enter>/g, '\n\n');
    result = result.replace(/<space>/g, ' ');
    result = result.replace(/<br>/g, '\n');

    return result.trim();
}
