module.exports = {
    transform: {
      "^.+\\.[t|j]sx?$": "babel-jest",
      ".+\\.(css|scss|png|jpg|svg)$": "jest-transform-stub",
    },
    transformIgnorePatterns: [
      "node_modules/(?!(axios)/)"
    ]
  };
