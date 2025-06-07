# Contributing to Pokémon Lorem Ipsum

Thank you for your interest in contributing to Pokémon Lorem Ipsum! This document provides guidelines and instructions for contributing to this project.

## Data Sources

The Pokémon data used in this extension comes from [Bulbapedia](https://bulbapedia.bulbagarden.net/wiki/Main_Page) and primarily focuses on information from the core series games. For simplicity and consistency, we intend to maintain this approach.

## Adding New Data or Features

Before spending time implementing new data sets or features, please open an issue first to discuss your ideas. This ensures you don't invest effort into changes that might not align with the project's direction.

Some considerations when proposing new data or features:
- Will it maintain the extension's focus on lorem ipsum text generation?
- Is the data from official Pokémon core series games?
- Will it significantly increase the extension's size?
- Does it maintain the extension's simplicity of use?

## Pull Request Process

1. Fork the repository to your own GitHub account
2. Clone your fork and create a new branch from `main` for your changes
3. Make your changes in your branch, following the existing code style
4. Update the README.md with details of changes if appropriate
5. Update the CHANGELOG.md in the Unreleased section, following the Keep a Changelog format
6. Push your changes to your fork
7. Submit a pull request to the `main` branch of the original repository
8. The PR will be reviewed and merged once it receives approval from maintainers

## Code of Conduct

Please be respectful and considerate when contributing to this project. We aim to foster an inclusive and welcoming community.

## Development

### Prerequisites

- Node.js
- npm

### Setup

1. Clone the repository
2. Run `npm install` to install dependencies
3. Make changes to the code in the `src` directory
4. Press F5 to start debugging

## Building and Testing

- `npm run compile` - Compile the extension
- `npm run watch` - Compile the extension and watch for changes
- `npm run lint` - Lint the code
