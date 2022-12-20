export const INFURA_PROJECT_ID = process.env['INFURA_PROJECT_ID'];

if (!INFURA_PROJECT_ID) {
    throw new Error("Infura configuration required in env");
}

