const fse = require('fs-extra');
const path = require('path');
const solc = require('solc');

const contractPath = path.resolve(__dirname, 'contracts');
const buildPath = path.resolve(__dirname, 'build');
fse.emptyDirSync(buildPath);

// Function - Reads contract files
var readContractFile = contractPath => {
    return {"content": fse.readFileSync(contractPath, 'utf-8')};
};

// Function - Returns all the contracts from contractPath after reading
function getAllContracts(contractPath){
    contractSources = {}
    for(let file of fse.readdirSync(contractPath)){
        contractSources[file] = readContractFile(path.resolve(contractPath, file));
    }
    return contractSources;
}

// Function - Returns the configuration object for Solidity compiler
function getConfigurations(contractPath){
    return {
        language: 'Solidity',
        sources: getAllContracts(contractPath),
        settings: {
            // returns Everything
            outputSelection: {
                '*': {
                    '*': ['*']
                }
            }
        }
    };
}

// Function - Prints any error occurred during compilation
function errorHandling(compiledContracts) {
    if (!compiledContracts) {
        console.error('>>>>>>>>>>>>>>>>>>>>>>>> ERRORS <<<<<<<<<<<<<<<<<<<<<<<<\n', 'NO OUTPUT');
    } else if (compiledContracts.errors) { // something went wrong.
        console.error('>>>>>>>>>>>>>>>>>>>>>>>> ERRORS <<<<<<<<<<<<<<<<<<<<<<<<\n');
        compiledContracts.errors.map(error => console.log(error.formattedMessage));
    }
}

// Function - Created Build folder and appends compiled data related to contracts
function writeBuild(compiledContracts, buildPath){
    for(let contractFileName in compiledContracts['contracts']){
        var contractFile = contractFileName.replace('.sol', '.json');
        console.log('Writing: ', contractFile);
        fse.outputJsonSync(
            path.resolve(buildPath, contractFile),
            compiledContracts['contracts'][contractFileName],
            {spaces: 4}
        );
    }
}

// Function - Main compilation function. Executes all other functionality
function compileContracts(contractPath, buildPath){
    try {
        console.log('Compiling Contracts .....\n');
        var compiledOutput = JSON.parse(solc.compile(JSON.stringify(getConfigurations(contractPath))));
    } catch (error) {
        console.log(error);
    }

    errorHandling(compiledOutput);
    writeBuild(compiledOutput, buildPath);
}

compileContracts(contractPath, buildPath);