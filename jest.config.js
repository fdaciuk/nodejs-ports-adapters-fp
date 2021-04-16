'use strict'

module.exports = {
  preset: 'ts-jest',
  modulePathIgnorePatterns: ['<rootDir>/dist/'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
}
