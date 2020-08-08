await boiler.removeFolder(`src/${boiler.params.name}`);
child_process.execSync(`nest generate module ${boiler.params.name}`);
const moduleFilePath = `src/${boiler.params.name}/${boiler.params.name}.module.ts`;
if(fs.existsSync(moduleFilePath))
    fs.unlinkSync(moduleFilePath);
