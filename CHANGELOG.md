# CHANGELOG

## [1.6.0]
-   ✨ Feat: generate commit message by LLM (OpenAI-compatible API, e.g. Ollama / OpenAI / DeepSeek / Kimi), rendered locally with the configured commit template and commit types
-   ✨ Feat: new settings `GitCommitPluginPlus.LLM.*` (BaseUrl / ApiKey / Model / Temperature / ResponseLanguage / MaxDiffLength / CustomPrompt)
-   ✨ Feat: new settings `GitCommitPluginPlus.ShowTemplateButton` and `GitCommitPluginPlus.ShowLLMButton` to toggle the Source Control title bar buttons
-   📃Docs: rename extension to `git-commit-plugin-plus`
-   🐳Chore: `GitCommitPluginPlus.MaxSubjectCharacters` default changed from `20` to `50`

## [1.5.0]
-   ✨ Feat: [adding \<br\> allows line breaks to be displayed](https://github.com/RedJue/git-commit-plugin/commit/afd6e136f145f0366c15a2cc5faa9befd6a379e7)
## [1.4.0]
-   ✨ Feat: [added option to copy commit message](https://github.com/RedJue/git-commit-plugin/issues/116)
## [1.3.0]
-   ✨ Feat: [允许将当前 commit message 作为 subject 默认内容](https://github.com/RedJue/git-commit-plugin/pull/100)
THX @[moeyua](https://github.com/moeyua)
## [1.2.1]
-   🐞Fix: [after restarting the extension host, the plugin cannot be activated normally](https://github.com/RedJue/git-commit-plugin/issues/93)
THX @[MaLuns](https://github.com/MaLuns)
## [1.2.0]
-   ✨ Feat: [zh-tw&zh-hk support](https://github.com/RedJue/git-commit-plugin/pull/90)
THX @[Tiddler-7](https://github.com/Tiddler-7)
## [1.1.2]
-   🐞Fix: [can't open with vscode v1.74.0](https://github.com/RedJue/git-commit-plugin/issues/79)
-   🐞Fix: [更新 vscode 1.74.0（最新版）后无法使用](https://github.com/RedJue/git-commit-plugin/issues/81)
THX @[simida0852](https://github.com/simida0852)
THX @[Torlinone](https://github.com/Torlinone)
-   🐞Fix: [<Subject> : no more than 20 words](https://github.com/RedJue/git-commit-plugin/issues/72)
THX @[ArthurMynl](https://github.com/ArthurMynl)
## [1.1.0]
-   ✨ Feat: [Added localization support for ja-jp](https://github.com/RedJue/git-commit-plugin/commit/d85c54eeb233c68afeeddd1493455884a6f4800b)
THX @[haryoiro](https://github.com/haryoiro)
## [1.0.9]
-   ✨ Feat: [Added localization](https://github.com/RedJue/git-commit-plugin/pull/60)
THX @[spotnick](https://github.com/spotnick)
## [1.0.8]
-   🐞Fix: [【Bug】无法添加多个自定义提交类型（commit type](https://github.com/RedJue/git-commit-plugin/issues/54)
## [1.0.7]
-   ✨Feat: [default type editable](https://github.com/RedJue/git-commit-plugin/commit/a7c43bc080b4ebfe12114e8b34923b03ed7cf8b6)
-   📃Docs: [improve readability](https://github.com/RedJue/git-commit-plugin/commit/285afbf0e30c77c2d5068f37cdd2f42b86209b7b)
 THX @[MichaelCurrin](https://github.com/MichaelCurrin)
 -  🐞Fix: [修复未填写 scope 时输出空括号对问题](https://github.com/RedJue/git-commit-plugin/pull/52/commits/60ee9446aeef8253db95c807bec22197b7fe6b58)
 THX @[whwnow](https://github.com/whwnow)
## [1.0.6]
-   🐞Fix: [fix commit type crash](https://github.com/RedJue/git-commit-plugin/commit/1ddb2bc248233a689ff64a4416955b57a70538f8)
## [1.0.5]
-   ✨Feat: [add custom templates](https://github.com/RedJue/git-commit-plugin/commit/5225dfbbe33859e16246b29f81c3e926d559043d)
 THX @[odinsam](https://github.com/odinsam)
## [1.0.4]
-   🌈Style: [change icons](https://github.com/RedJue/git-commit-plugin/commit/611ecfb6c2cbf14436141056cc87da4530117c66)
-   🐞Fix: issue [#36](https://github.com/RedJue/git-commit-plugin/issues/36)
## [1.0.3]
-   🐞Fix: [fix icon color fade](https://github.com/RedJue/git-commit-plugin/commit/977713698c21bdb11b1c2154d154b16343a2b570)

## [1.0.2]
-   🐞Fix: [fix type formatting](https://github.com/RedJue/git-commit-plugin/commit/418279d0c6372068c0923b8aeb7c44b546318d89)
## [1.0.1]
-   🐞Fix: issue [#33](https://github.com/RedJue/git-commit-plugin/issues/33)
-   🐞Fix: issue [#29](https://github.com/RedJue/git-commit-plugin/issues/29)
## [1.0.0]

-   🐞Fix: issue [#17](https://github.com/RedJue/git-commit-plugin/issues/17)
-   🐞Fix: issue [#21](https://github.com/RedJue/git-commit-plugin/issues/21)
-   🐞Fix: issue [#23](https://github.com/RedJue/git-commit-plugin/issues/23)
-   🐞Fix: issue [#19](https://github.com/RedJue/git-commit-plugin/issues/19)

## [0.0.5]

-   🐞Fix: issue [#13](https://github.com/RedJue/git-commit-plugin/issues/13)
-   🐞Fix: issue [#14](https://github.com/RedJue/git-commit-plugin/issues/14)
-   🐞Fix: issue [#15](https://github.com/RedJue/git-commit-plugin/issues/15)

## [0.0.4]

-   ✨Feat: [Show Emoji](https://github.com/RedJue/git-commit-plugin/commit/426e3afad2c4568f946efda922412913d73e2836#diff-1750a4dcc9a0a9b1773d275e96c46a1e)
-   ✨Feat: [Custom Commit Type](https://github.com/RedJue/git-commit-plugin/commit/7344a1f5f65a7cf0f03a32701d53d1510777fb0a#diff-1750a4dcc9a0a9b1773d275e96c46a1e)
-   ✨Feat: [Max Subject Words](https://github.com/RedJue/git-commit-plugin/commit/7344a1f5f65a7cf0f03a32701d53d1510777fb0a#diff-1750a4dcc9a0a9b1773d275e96c46a1e)
-   🐞Fix: issue [#2](https://github.com/RedJue/git-commit-plugin/issues/2)
-   🐞Fix: issue [#8](https://github.com/RedJue/git-commit-plugin/issues/8)

## [0.0.3]

-   Add README.md
-   Fix bug

## [0.0.2]

-   Fix bug

## [0.0.1]

-   Initial release
