# Contribution Guidelines for AI AdBlocker

Thank you for considering contributing to our project! This document outlines the process for contributing code, documentation, and other improvements.

## Table of Contents
1. [Getting Started](#1-getting-started)
2. [Development Workflow](#2-development-workflow)
3. [Code Standards](#3-code-standards)
4. [Testing](#4-testing)
5. [Pull Request Process](#5-pull-request-process)
6. [Documentation](#6-documentation)
7. [Community Guidelines](#7-community-guidelines)

---

## 1. Getting Started

### Prerequisites
- Node.js v18+
- Chrome or Chromium browser
- Git 2.35+

### Setup Instructions
```bash
git clone https://github.com/4211421036/aiadblocker.git
cd aiadblocker
npm install
```

## 2. Development Workflow

### Branch Naming Convention
```
<type>/<short-description>
```
Types:
- `feat/`: New features
- `fix/`: Bug fixes
- `docs/`: Documentation
- `test/`: Testing related

### Key Directories
```
src/
├── background/    # Core extension logic
├── content/       # DOM analysis scripts
├── popup/         # UI components
└── rules/         # Filter rulesets
```

## 3. Code Standards

### JavaScript
```javascript
// Use JSDoc for complex functions
/**
 * Detects ad elements using heuristic analysis
 * @param {HTMLElement} root - DOM root element
 * @returns {Array<HTMLElement>} List of ad elements
 */
function detectAds(root) {
  // Implementation...
}
```

### CSS
```css
/* Use BEM naming convention */
.adblocker__header {
  /* styles */
}

.adblocker__button--primary {
  /* modifier */
}
```

## 4. Testing

### Test Cases Required For:
- New filter rules
- DOM analysis algorithms
- Chrome API interactions

### Running Tests
```bash
npm test
```

## 5. Pull Request Process

1. Fork the repository
2. Create your feature branch
3. Commit changes with semantic messages:
   ```
   feat: add YouTube ad detection
   fix: resolve false positives in DOM analysis
   ```
4. Push to your fork
5. Open a PR with:
   - Description of changes
   - Screenshots (for UI changes)
   - Test results

## 6. Documentation

### Updating Documentation
- Keep `README.md` updated
- Add comments for complex algorithms
- Update `SECURITY.md` for security-related changes

## 7. Community Guidelines

### Code of Conduct
We adhere to the [Contributor Covenant](https://www.contributor-covenant.org/). Please:
- Be respectful
- Keep discussions on-topic
- Accept constructive criticism

### Getting Help
Join our [Discussions](https://github.com/4211421036/aiadblocker/discussions) for:
- Implementation questions
- Feature proposals
- General support

---

Thank you for helping build better ad-blocking technology! ✨
