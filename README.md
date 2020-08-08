# Node.js Boiler

Boiler package for generating Node.js boilerplate code.

## Generate a Project

Generate a Node project with the following command:

```
boiler generate node project <name>
```

### Prerequisites

* JDK 8+
* Gradle

### Parameters

Required:

* `<name>`: Name of the project (e.g. my-project)

Non-required:

* `--force`: Removes project directory if it already exists
* `--spring-boot-version <version>`: Version of the Node API (default: 1.5.9.RELEASE)
* `--use-actuator`: Adds Spring Actuator as a Gradle dependency 
* `--use-mongo`: Adds Spring Data MongoDB as a Gradle dependency 
* `--use-sql`: Adds Spring Data as a Gradle dependency
* `--version <version>`: Version of the project (default: 0.0.1)

Virtual (cannot be set explicitly):

* `--package`: Same as `group` (e.g. `com.mycompany`)
* `--package-path`: File-system path of `package` (e.g. `com/mycompany`)
* `--pascalcase-name`: Pascalcase version of `name` (e.g. MyProject)

### Output files

* `<name>/build.gradle`
* `<name>/README.md`
* `<name>/src/main/java/<pascalcase-name>Application.java`
* `<name>/src/main/resources/application.yml`
* `<name>/src/test/java/<pascalcase-name>ApplicationTests.java`
* `<name>/src/test/resources/application.yml`
* `<name>/TODO.md`
