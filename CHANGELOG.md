# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Add pokemon data (pokedex numbers 90 - 120)
- Add script command to help with packaging
- Add linting and test CI jobs in GitHub
- Add badges to README:
  - CI status
  - License
  - VS Code Marketplace
  - Open VSX Registry

## [0.0.3] - 2025-06-12

### Added

- Add pokemon data (pokedex numbers 46 - 89)

## [0.0.2] - 2025-06-09

### Added

- Add `category` property to `Pokemon`
- Create new sentence pattern using a Pokemon's category.
- Add pokemon data (pokedex numbers 35 - 45)

### Changed

- Support branched evolution by changing `Pokemon.evolvesInto` from an optional string to a required string array
- Updated pokemon data to include an `evolvesInto` array (empty array for those that don't evolve)

## [0.0.1] - 2025-06-06

### Added

- Add initial data for berries
- Add initial data for items
- Add initial data for locations
- Add initial data for pokemon (pokedex numbers 1 - 34)
- Add initial data for trainers
- Create command `Pokemon Lorem Ipsum: Generate Sentence` to generate a random sentence with Pokémon-themed words
- Create command `Pokemon Lorem Ipsum: Generate Paragraph` to generate a paragraph of random sentences with Pokémon words
- Create command `Pokemon Lorem Ipsum: Generate Multiple Paragraphs` to generate a specified number of paragraphs of random sentences with Pokémon words
