#!/usr/bin/env node

import { initFsWrapper } from "./FsWrapper";
import { cwd } from 'node:process';
import { initTOMLWrapper } from "./TOMLWrapper";
import { initMainConfigSchema } from "./MainConfigSchema";
import chokidar from 'chokidar';
import { rectsTsxCode } from "./temp";

const log = console.log.bind(console);

console.log('in bin.js');
(async () => {
  const fs = initFsWrapper();
  const tomlParser = initTOMLWrapper();
  const mainConfigSchema = initMainConfigSchema();

  let callerPath = cwd();
  const content = await fs.readFile(`${callerPath}/inkscapeSVGToMotionCanvasConfig.toml`);
  const tomlContent = tomlParser.parse(content);
  const config = mainConfigSchema.parse(tomlContent);

  //const content = require(`${callerPath}/inkscapeSVGToMotionCanvas.config.ts`);
  //const content = loadTsConfig<CodegenConfig>(`${callerPath}/inkscapeSVGToMotionCanvas.config.ts`);
  //

  const inputFilePath = config.inkscapeSVGs[0].input.filePath;
  const outputDirectoryPath = config.inkscapeSVGs[0].output.directoryPath;
  const outputFilePath = `${outputDirectoryPath}/${config.inkscapeSVGs[0].output.viewAdderFunctionName}.tsx`;

  const watcher = chokidar.watch(inputFilePath, {
    persistent: true
  });

  watcher
    .on('change', async path => {
      log(`File ${path} has been changed`);
      //const inputFileContent = await fs.readFile(path);
      await fs.makeDirectory(outputDirectoryPath);
      await fs.writeFile(outputFilePath, rectsTsxCode);
    });


})();
