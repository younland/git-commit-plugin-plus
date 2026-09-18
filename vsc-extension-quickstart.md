# Welcome to your VS Code Extension

## What's in the folder

* This folder contains all of the files necessary for your extension `git-commit-plugin-plus`.
* `package.json` - this is the manifest file in which you declare your extension and commands.
  * The plugin registers two commands: `extension.showGitCommit` (open the commit message wizard) and `extension.generateCommitByLLM` (generate a commit message with an LLM), both shown on the Source Control title bar.
* `src/extension.ts` - this is the main file where the commands are registered and implemented.
* `src/config/` - configuration modules: commit types, templates, input options, LLM settings (`llm-config.ts`) and the shared template renderer (`message-combine.ts`).
* `src/llm/` - LLM generation pipeline:
  * `openai-client.ts` - minimal OpenAI-compatible chat completion client (Node `http`/`https`, no extra dependencies)
  * `git-context.ts` - collects the staged (fallback: unstaged) diff and recent commits, with diff trimming for the prompt
  * `prompt-builder.ts` - builds the system/user prompts, injecting the project's commit convention (allowed types, template, subject limit)
  * `commit-generator.ts` - orchestration: calls the LLM, parses the JSON fields leniently, normalizes them and renders the final message with the local template

## Get up and running straight away

* Press `F5` to open a new window with your extension loaded.
* Run the commands from the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P` on Mac): `show git commit template` or `Generate Commit Message by LLM`.
* For the LLM command, configure `GitCommitPluginPlus.LLM.BaseUrl` / `GitCommitPluginPlus.LLM.ApiKey` / `GitCommitPluginPlus.LLM.Model` in settings first (the default targets a local Ollama service).
* Set breakpoints in your code inside `src/extension.ts` to debug your extension.
* Find output from your extension in the debug console.

## Make changes

* You can relaunch the extension from the debug toolbar after changing code in `src/extension.ts`.
* You can also reload (`Ctrl+R` or `Cmd+R` on Mac) the VS Code window with your extension to load your changes.

## Explore the API

* You can open the full set of our API when you open the file `node_modules/@types/vscode/index.d.ts`.

## Run tests

* Open the debug viewlet (`Ctrl+Shift+D` or `Cmd+Shift+D` on Mac) and from the launch configuration dropdown pick `Extension Tests`.
* Press `F5` to run the tests in a new window with your extension loaded.
* See the output of the test result in the debug console.
* Make changes to `src/test/suite/extension.test.ts` or create new test files inside the `test/suite` folder.
  * The provided test runner will only consider files matching the name pattern `**.test.ts`.
  * You can create folders inside the `test` folder to structure your tests any way you want.

## Go further

 * Reduce the extension size and improve the startup time by [bundling your extension](https://code.visualstudio.com/api/working-with-extensions/bundling-extension).
 * [Publish your extension](https://code.visualstudio.com/api/working-with-extensions/publishing-extension) on the VSCode extension marketplace.
 * Automate builds by setting up [Continuous Integration](https://code.visualstudio.com/api/working-with-extensions/continuous-integration).
