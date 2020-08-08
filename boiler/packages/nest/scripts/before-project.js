const exists = util.promisify(fs.exists);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

async function readJSON(path) {
    const file = (await readFile(path)).toString();
    return JSON.parse(file);
}

function getMochaConfig() {
    return {
        "require": [
          "source-map-support/register",
          "reflect-metadata"
        ],
        "full-trace": true,
        "spec": "dist/**/*.spec.js"
    };
}

function getNycConfig() {
    return {
        "extends": "@istanbuljs/nyc-config-typescript",
        "all": false,
        "require": [
          "ts-node/register/transpile-only"
        ],
        "exclude": [
          "**/*.d.ts",
          "**/*.spec.ts",
          "**/main.ts",
          "coverage",
          "bin",
          "**/*.interface.ts",
          "**/util/test"
        ],
        "reporter": [
          "text",
          "html"
        ]
    };
}

async function modifyPackage(path, projectName) {
    const pkg = await readJSON(path);
    pkg.scripts["test"] = "mocha";
    pkg.scripts["test:debug"] = "mocha --inspect-brk";
    pkg.scripts["test:cov"] = "mocha --inspect-brk";
    pkg.scripts["open:cov"] = "mocha --inspect-brk";
    pkg.scripts["docker:build"] = "mocha --inspect-brk";
    pkg.scripts["docker:run"] = `docker run --rm -p 8080:8080 --name ${projectName} ${projectName}`;
    pkg.scripts["docker:buildAndRun"] = "npm run docker:build && npm run docker:run";
    pkg.scripts["docker:run:watch"] = "tsc-watch --onSuccess \"npm run docker:buildAndRun\"";
    pkg.scripts["docker:stop"] = `docker rm -f ${projectName}`;
    pkg.scripts["docker:compose:up"] = "docker-compose up";
    pkg.scripts["docker:compose:down"] = "docker-compose down";
    pkg.scripts["docker:compose:up:all"] = "docker-compose -f docker.compose.all.yml up";
    pkg.scripts["docker:compose:down:all"] = "docker-compose -f docker.compose.all.yml down";
    pkg.mocha = getMochaConfig();
    pkg.nyc = getNycConfig();
    delete pkg.scripts["test:e2e"];
    delete pkg["jest"];
    await writeFile(path, JSON.stringify(pkg, null, 2));
}

async function modifyNodemon(path, startCommand) {
    const nodemon = await readJSON(path);
    nodemon.exec = startCommand;
    await writeFile(path, JSON.stringify(nodemon, null, 2));
}

async function main() {
    const projectName = boiler.params.name;

    await boiler.removeFolder(projectName);

    console.log(`Creating new Nest project. This may take a while...`);
    child_process.execSync(`nest new -p npm ${projectName}`);
    
    console.log("Modifying scripts");
    const packagePath = path.join(projectName, "package.json");
    await modifyPackage(packagePath, projectName);
    
    // const nodemonPath = path.join(projectName, "nodemon.json");
    // if(await exists(nodemonPath)) {
    //     await modifyNodemon(nodemonPath, startCommand); 
    // }

    process.chdir(projectName);

    console.log("Installing Node dependencies");
    child_process.execSync(`npm install --save mongoose class-validator class-transformer @nestjs/mongoose swagger-ui-express @nestjs/swagger dotenv`);
    child_process.execSync(`npm install --silent --save-dev ts-mockito chai @types/chai mocha mocha-typescript @types/mongoose`);
    
    console.log("Cleaning project");
    child_process.execSync(`npm uninstall --save-dev jest ts-jest @types/jest @types/supertest`);
    await boiler.removeFolder("test");
}

await main();