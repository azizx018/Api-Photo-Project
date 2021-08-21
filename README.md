# Api-Photo-Project
```
scripts": {
    "lint": "eslint 'src/*.ts'",
    "prettier": "prettier --config .prettierrc 'src/**/*.ts' --write",
    "build": "npx tsc",
    "jasmine": "jasmine",
    "test": "npm run build && npm run jasmine",
    "start": "nodemon src/index.ts"
}
```
Endpoints:
/api?fileName={name of file to copy}&width={desired width}&height={desired height} 
--all query string values are required