const { join } = require("path");
const dts = require("dts-bundle");

const entryPoints = ["", "ajax", "operators", "testing", "webSocket"];
const baseDir = ["node_modules", "@reactivex", "rxjs", "dist", "typings"];

entryPoints.forEach(entryPoint => {
  dts.bundle({
    name: join("rxjs", entryPoint),
    main: join(...baseDir, entryPoint, "index.d.ts"),
    baseDir: join(...baseDir),
    out: join(__dirname, "dist", entryPoint, "index.d.ts"),
    indent: "	"
  });
});
