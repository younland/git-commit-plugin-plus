# Git Commit Plugin Plus For VS Code
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-15-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
> Automatically generate git commit messages, with LLM-powered commit message generation

![Visual Studio Marketplace Version](https://img.shields.io/visual-studio-marketplace/v/redjue.git-commit-plugin-plus)
![Visual Studio Marketplace Downloads](https://img.shields.io/visual-studio-marketplace/d/redjue.git-commit-plugin-plus)
![Visual Studio Marketplace Installs](https://img.shields.io/visual-studio-marketplace/i/redjue.git-commit-plugin-plus)
![Visual Studio Marketplace Rating (Stars)](https://img.shields.io/visual-studio-marketplace/stars/redjue.git-commit-plugin-plus)
![Visual Studio Marketplace Rating](https://img.shields.io/visual-studio-marketplace/r/redjue.git-commit-plugin-plus)
![GitHub contributors](https://img.shields.io/github/contributors/RedJue/git-commit-plugin)
![GitHub last commit](https://img.shields.io/github/last-commit/RedJue/git-commit-plugin)
![GitHub](https://img.shields.io/github/license/RedJue/git-commit-plugin?color=green)


## Requirements

- VS Code `1.42.0` or higher.
- VS Code's built-in Git plugin 

## Format

This extension follows the [Angular Team Commit Specification](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines), as follows:

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

See info on the fields below.

### Type

Must be one of the following:

Type | Description
---  | ---
**feat** | A new feature
**fix** | A bug fix
**docs** | Documentation only changes
**style**: | Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
**refactor** | A code change that neither fixes a bug nor adds a feature
**perf** | A code change that improves performance
**test** | Adding missing or correcting existing tests
**chore** | Changes to the build process or auxiliary tools and libraries such as documentation generation

### Scope

The scope could be anything specifying place of the commit change. For example `$location`, `$browser`, `$compile`, `$rootScope`, `ngHref`, `ngClick`, `ngView`, etc...

You can use `*` when the change affects more than a single scope.

### Subject

The subject contains succinct description of the change:

-   use the imperative, present tense: "change" not "changed" nor "changes"
-   don't capitalize first letter
-   no dot (`.`) at the end

### Body

Just as in the **subject**, use the imperative, present tense: "change" not "changed" nor "changes". The body should include the motivation for the change and contrast this with previous behavior.

### Footer

The footer should contain any information about **Breaking Changes** and is also the place to [reference GitHub issues that this commit closes](https://help.github.com/articles/closing-issues-via-commit-messages/).

**Breaking Changes** should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

A detailed explanation can be found in this [document](https://docs.google.com/document/d/1QrDFcIiPjSLDn3EL15IJygNPiHORgU1_OOAqWjiDU5Y/edit#).

## Quick Start

1. Install the plugin
1. Use the command shortcut `showGitCommit` to open the command window or Click the icon on the git plugin navigation bar
    ![open](/assets/open.gif)
1. Enter the commit information, which automatically generates a commit message that conforms to the specification
    ![edit](/assets/edit.gif)

## LLM Commit Message Generation

The extension can analyze your git changes (staged diff, falling back to unstaged changes) with an LLM and generate a commit message that follows this extension's commit convention: the commit type list (including `CustomCommitType`), the active commit template, the `MaxSubjectCharacters` limit and the emoji setting.

The LLM only returns structured fields (`type` / `scope` / `subject` / `body` / `footer`), and the final message is rendered locally with your commit template, so custom templates are fully supported. The body is always formatted as `- ` bullet lines.

1. Configure the LLM settings (see [Settings Options](#settings-options)), at minimum `GitCommitPluginPlus.LLM.ApiKey`
1. Stage your changes (or just modify files)
1. Click the ✨ icon on the git plugin navigation bar, or run the command `Generate Commit Message by LLM` from the command palette
1. The generated message is filled into the SCM input box directly

The default configuration targets a local [Ollama](https://ollama.com/) service (`http://localhost:11434/v1`). Any OpenAI-compatible service works too, e.g.:

- OpenAI: `https://api.openai.com/v1`
- DeepSeek: `https://api.deepseek.com/v1`
- Kimi: `https://api.moonshot.cn/v1`

> Note: Ollama does not validate the API key, but `GitCommitPluginPlus.LLM.ApiKey` must be non-empty (any value such as `ollama` works). Make sure `GitCommitPluginPlus.LLM.Model` matches a model available on your service.

## Locale Support
The plugin will automatically switch the language description based on the `vscode` language environment.

**Support Language**
- en-US as default
- zh-CN
- zh-HK
- zh-TW
- ja-JP

## Settings Options

-   `GitCommitPluginPlus.ShowEmoji`: whether to show emoji, default `true`.
    ```json
    {
      "GitCommitPluginPlus.ShowEmoji": true
    }
    ```
-   `GitCommitPluginPlus.CustomCommitType`: customize the commit type, default `null`.
    ```json5
    { 
      "GitCommitPluginPlus.CustomCommitType": [
        "customTypeName"
      ]
    }
    ```
    or
    ```json5
    [
       {
           // If there are duplicate keys, rewrite the config，otherwise add As a new configuration addition
           "key": "customTypeKey", 
           "label": "customTypeName",
           "detail": "customTypeDetail",
           "icon":"customIcon"
       }
    ]
    ```
-   `GitCommitPluginPlus.MaxSubjectCharacters`: customize the maximum number of words on the subject, default `50`.
    ```json
    {
      "GitCommitPluginPlus.MaxSubjectCharacters": 50
    }
    ```
-   `GitCommitPluginPlus.ShowTemplateButton`: whether to show the `show git commit template` button on the Source Control title bar, default `true`.
    ```json
    {
      "GitCommitPluginPlus.ShowTemplateButton": true
    }
    ```
-   `GitCommitPluginPlus.ShowLLMButton`: whether to show the `Generate Commit Message by LLM` button on the Source Control title bar, default `true`.
    ```json
    {
      "GitCommitPluginPlus.ShowLLMButton": true
    }
    ```
-  `GitCommitPluginPlus.FillSubjectWithCurrent`: whether to fill the subject with the current commit message, default `false`.
    ```json
    {
      "GitCommitPluginPlus.FillSubjectWithCurrent": false
    }
    ```
-   `GitCommitPluginPlus.Template`: customize the git commit template.
    ```json5
    {
      "GitCommitPluginPlus.Templates": [
        {
            "templateName": "Angular",
            "templateContent": "<icon><space><type>(<scope>):<space><subject><enter><body><enter><footer>"
        },
        {
            "templateName": "git-cz",
            "templateContent": "<type>(<scope>):<space><icon><space><subject><enter><body><enter><footer>",
             // Set as default commit template
            "default":true
        }
      ]
    }
    ```
-   `GitCommitPluginPlus.LLM.BaseUrl`: OpenAI-compatible API base URL, default is the local Ollama endpoint `http://localhost:11434/v1`.
    ```json
    {
      "GitCommitPluginPlus.LLM.BaseUrl": "http://localhost:11434/v1"
    }
    ```
-   `GitCommitPluginPlus.LLM.ApiKey`: API key of the LLM service, default `""` (must be configured before LLM generation; any non-empty value works for Ollama).
    ```json
    {
      "GitCommitPluginPlus.LLM.ApiKey": "sk-xxx"
    }
    ```
-   `GitCommitPluginPlus.LLM.Model`: model name used to generate the commit message, default `deepseek-v4-pro`.
    ```json
    {
      "GitCommitPluginPlus.LLM.Model": "deepseek-v4-pro"
    }
    ```
-   `GitCommitPluginPlus.LLM.Temperature`: sampling temperature of the LLM, between `0` and `2`, default `0.5`.
    ```json
    {
      "GitCommitPluginPlus.LLM.Temperature": 0.5
    }
    ```
-   `GitCommitPluginPlus.LLM.ResponseLanguage`: language of the generated commit subject and body. Select from the dropdown, or enter any language directly in `settings.json`, default `简体中文`.
    ```json
    {
      "GitCommitPluginPlus.LLM.ResponseLanguage": "简体中文"
    }
    ```
-   `GitCommitPluginPlus.LLM.MaxDiffLength`: maximum characters of the git diff sent to the LLM, default `12000`.
    ```json
    {
      "GitCommitPluginPlus.LLM.MaxDiffLength": 12000
    }
    ```
-   `GitCommitPluginPlus.LLM.CustomPrompt`: extra preferences appended to the LLM prompt, e.g. commit style requirements, default `""`.
    ```json
    {
      "GitCommitPluginPlus.LLM.CustomPrompt": "Use concise commit messages"
    }
    ```
-   `GitCommitPluginPlus.LLM.Timeout`: LLM request timeout in seconds. `0` means no timeout, default `0`.
    ```json
    {
      "GitCommitPluginPlus.LLM.Timeout": 60
    }
    ```

## License

Released under [MIT](/LICENSE) by [@RedJue](https://github.com/RedJue).

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://www.imalun.com"><img src="https://avatars.githubusercontent.com/u/31614024?v=4?s=100" width="100px;" alt="白云苍狗"/><br /><sub><b>白云苍狗</b></sub></a><br /><a href="https://github.com/RedJue/git-commit-plugin/commits?author=MaLuns" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Tiddler-7"><img src="https://avatars.githubusercontent.com/u/73354813?v=4?s=100" width="100px;" alt="冷空气"/><br /><sub><b>冷空气</b></sub></a><br /><a href="https://github.com/RedJue/git-commit-plugin/commits?author=Tiddler-7" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://my.hancel.org"><img src="https://avatars.githubusercontent.com/u/1502581?v=4?s=100" width="100px;" alt="Hancel Lin"/><br /><sub><b>Hancel Lin</b></sub></a><br /><a href="https://github.com/RedJue/git-commit-plugin/commits?author=imlinhanchao" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/Torlinone"><img src="https://avatars.githubusercontent.com/u/26668466?v=4?s=100" width="100px;" alt="Keriy"/><br /><sub><b>Keriy</b></sub></a><br /><a href="https://github.com/RedJue/git-commit-plugin/commits?author=Torlinone" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://www.linkedin.com/in/arthurmeyniel"><img src="https://avatars.githubusercontent.com/u/61516506?v=4?s=100" width="100px;" alt="Arthur Meyniel"/><br /><sub><b>Arthur Meyniel</b></sub></a><br /><a href="https://github.com/RedJue/git-commit-plugin/commits?author=ArthurMynl" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/haryoiro"><img src="https://avatars.githubusercontent.com/u/55312590?v=4?s=100" width="100px;" alt="haryoiro"/><br /><sub><b>haryoiro</b></sub></a><br /><a href="https://github.com/RedJue/git-commit-plugin/commits?author=haryoiro" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/DrBlackBird"><img src="https://avatars.githubusercontent.com/u/10115809?v=4?s=100" width="100px;" alt="Tom"/><br /><sub><b>Tom</b></sub></a><br /><a href="https://github.com/RedJue/git-commit-plugin/commits?author=DrBlackBird" title="Documentation">📖</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="http://www.webwuyou.com"><img src="https://avatars.githubusercontent.com/u/15182683?v=4?s=100" width="100px;" alt="风过无痕"/><br /><sub><b>风过无痕</b></sub></a><br /><a href="https://github.com/RedJue/git-commit-plugin/commits?author=webwuyou" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/whwnow"><img src="https://avatars.githubusercontent.com/u/1713701?v=4?s=100" width="100px;" alt="whwnow"/><br /><sub><b>whwnow</b></sub></a><br /><a href="https://github.com/RedJue/git-commit-plugin/commits?author=whwnow" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/MichaelCurrin"><img src="https://avatars.githubusercontent.com/u/18750745?v=4?s=100" width="100px;" alt="Michael Currin"/><br /><sub><b>Michael Currin</b></sub></a><br /><a href="https://github.com/RedJue/git-commit-plugin/commits?author=MichaelCurrin" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://www.odinsam.com/"><img src="https://avatars.githubusercontent.com/u/68220289?v=4?s=100" width="100px;" alt="odinsam"/><br /><sub><b>odinsam</b></sub></a><br /><a href="https://github.com/RedJue/git-commit-plugin/commits?author=odinsam" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/tys1128"><img src="https://avatars.githubusercontent.com/u/24326849?v=4?s=100" width="100px;" alt="tys1128"/><br /><sub><b>tys1128</b></sub></a><br /><a href="https://github.com/RedJue/git-commit-plugin/commits?author=tys1128" title="Documentation">📖</a></td>
      <td align="center" valign="top" width="14.28%"><a href="http://mlzzen.vercel.app"><img src="https://avatars.githubusercontent.com/u/11664505?v=4?s=100" width="100px;" alt="mlzzen"/><br /><sub><b>mlzzen</b></sub></a><br /><a href="https://github.com/RedJue/git-commit-plugin/commits?author=mlzzen" title="Code">💻</a></td>
      <td align="center" valign="top" width="14.28%"><a href="https://github.com/yeze322"><img src="https://avatars.githubusercontent.com/u/8528761?v=4?s=100" width="100px;" alt="zeye"/><br /><sub><b>zeye</b></sub></a><br /><a href="https://github.com/RedJue/git-commit-plugin/commits?author=yeze322" title="Code">💻</a></td>
    </tr>
    <tr>
      <td align="center" valign="top" width="14.28%"><a href="https://blog.moeyua.com"><img src="https://avatars.githubusercontent.com/u/45156493?v=4?s=100" width="100px;" alt="Moeyua"/><br /><sub><b>Moeyua</b></sub></a><br /><a href="https://github.com/RedJue/git-commit-plugin/commits?author=moeyua" title="Code">💻</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!