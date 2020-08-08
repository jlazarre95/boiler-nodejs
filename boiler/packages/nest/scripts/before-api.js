await fs.remove(`src/${boiler.params["api-name"]}`);
child_process.execSync(`nest generate module ${boiler.params["api-name"]}`);
const moduleFilePath = `src/${boiler.params["api-name"]}/${boiler.params["api-name"]}.module.ts`;
if(fs.existsSync(moduleFilePath))
    fs.unlinkSync(moduleFilePath);
