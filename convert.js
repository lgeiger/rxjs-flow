const { writeFileSync } = require("fs");
const { dirname, join } = require("path");
const { compiler, beautify } = require("flowgen").default;
const mkdirp = require("mkdirp");

const entryPoints = ["", "ajax", "operators", "testing", "webSocket"];
const baseDir = ["node_modules", "@reactivex", "rxjs", "dist", "typings"];

entryPoints.forEach(entryPoint => {
  const filename = join(__dirname, "dist", entryPoint, "index.d.ts");
  try {
    const flowdef = beautify(compiler.compileDefinitionFile(filename));

    const outputPath = join(__dirname, "dist-flow", entryPoint, "index.js");
    mkdirp.sync(dirname(outputPath));
    writeFileSync(outputPath, flowdef);
  } catch (e) {
    console.error(`Coul not convert ${filename}`);
    console.error(e);
  }
});
