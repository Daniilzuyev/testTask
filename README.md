## Getting Started

### Prerequisites
- Node.js 18+
- npm 9+

### Installation
git clone https://github.com/Daniilzuyev/testTask.git
cd your-repo
npm install
npx playwright install

### Project structure
root/
├── api/ # API clients
├── pages/ # Page object models
├── tests/ # Test specifications
├── playwright.config.ts
└── package.json

## Running Tests
npx playwright test


## Key Commands
| Command | Description |
|---------|-------------|
| `npm test` | Run all tests |
| `npm run test:debug` | Debug with inspector |
| `npm run lint` | Run TypeScript linter |
| `npm run build` | Compile TypeScript |

## Best Practices
1. **Page Object Model** - Encapsulate UI interactions
2. **Test Isolation** - Fresh browser context per test
3. **Visual Regression** - `expect(page).toHaveScreenshot()`
4. **Network Mocking** - `page.route()` for API stubbing


