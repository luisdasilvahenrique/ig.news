module.exports = {
    testPathIgnorePatterns: ["/node_modules/", "/.next/"],
    setupFilesAfterEnv: [
        "<rootDir>/tests/setupTests.ts"
    ],
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$":"<rootDir>/node_modules/babel-jest"
    },
    testEnvironment: 'jsdom',
    moduleNameMapper: {
        "\\.(scss|css|sass)$": "identity-obj-proxy"
    },
    
    collectionCoverage: true,
    collectionCoverageFrom: [
        "src/**/*.tsx",
        "!src/**/*.spec.tsx"
    ],
    coverageReportes: ["lcov", "json"]
    // para testar basta executar "yarn test --coverage"
};