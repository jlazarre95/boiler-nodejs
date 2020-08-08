function pluralize(name) {
    const lastLetter = name[name.length - 1];
    if(["s", "x"].indexOf(lastLetter)) {
        return name + "es";
    } else if(lastLetter === "y") {
        return name.slice(0, name.length - 1) + "ies";
    } else {
        return name + "s";
    }
}

boiler.params.cname = boiler.toCamelCase(boiler.params.name);
boiler.params.pname = boiler.toPascalCase(boiler.params.name);
boiler.params.pluralName = boiler.toPlural(boiler.params.name);
boiler.params.pluralPascalCaseName = boiler.toPlural(boiler.params.pname);
