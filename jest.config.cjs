// jest.config.js
module.exports = {
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
    transform: {
      '^.+\\.jsx?$': 'babel-jest', // Transpile JavaScript and JSX files
      '^.+\\.(css|less|scss|sass)$': 'jest-transform-stub', // Stub out CSS imports
      '^.+\\.(jpg|jpeg|png|gif|svg|webp|bmp|tiff)$': 'jest-transform-stub', // Stub out image imports
      '^.+\\.(woff|woff2|eot|ttf|otf)$': 'jest-transform-stub', // Stub out font imports
    },
    transformIgnorePatterns: [
      '/node_modules/(?!(axios)/)', // Ensure dependencies like axios are transpiled
    ],
    moduleNameMapper: {
      '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS modules
      '\\.(jpg|jpeg|png|gif|svg|webp|bmp|tiff)$': 'jest-transform-stub', // Mock image imports
      '\\.(woff|woff2|eot|ttf|otf)$': 'jest-transform-stub', // Mock font imports
      '\\.(mp4|webm|ogg|mp3|wav|m4a|aac|oga)$': 'jest-transform-stub', // Mock media file imports
    },
    testEnvironment: 'jsdom',
  };
  