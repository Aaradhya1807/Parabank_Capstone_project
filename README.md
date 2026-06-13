# ParaBank Automation — Playwright (UI + API + Hybrid)

End-to-end test automation framework for the **ParaBank** demo banking application, built with **Playwright + TypeScript**. It covers UI flows, API validations, and hybrid (UI → API) integration checks, with **Allure** + **Playwright HTML** reporting and a **Jenkins** CI pipeline.

> ParaBank is a demo site by Parasoft that simulates an online banking experience. It is **not** a real bank.

- **UI:** https://parabank.parasoft.com
- **API Swagger:** https://parabank.parasoft.com/parabank/api-docs/index.html

---

## Tech Stack

| Area | Tooling |
|------|---------|
| Language | TypeScript |
| Test runner | Playwright Test |
| Design pattern | Page Object Model (POM) + API fixtures |
| Execution | Parallel, multi-browser, with retries |
| Reporting | Allure + Playwright HTML (traces, videos, screenshots) |
| CI/CD | Jenkins (`Jenkinsfile`) |
| Test data | JSON (`test-data/User.json`) |

---

## Project Structure

```
.
├── POM/                          # Page objects
│   ├── LoginPage.ts
│   ├── Registerpage.ts
│   ├── OpenAccountPage.ts
│   ├── FundTransferPage.ts
│   └── AccountOverviewPage.ts
├── tests/
│   ├── UI/
│   │   ├── 01-register.spec.ts
│   │   ├── 02-registerNegative.spec.ts
│   │   ├── 03-openAccount.spec.ts
│   │   ├── 04-fundTransfer.spec.ts
│   │   └── 05-negativeScenarios.spec.ts
│   ├── API/
│   │   ├── 06-accounts.spec.ts
│   │   ├── 07-balanceValidation.spec.ts
│   │   └── 08-accountsNegative.spec.ts
│   └── E2E/
│       ├── 09-createAccount.spec.ts
│       ├── 10-fundTransfer.spec.ts
│       └── 11-multiTransfer.spec.ts
├── utils/                        # Helpers, logger, data generators
├── test-data/
│   └── User.json
├── screenshots/                  # Captured evidence
├── test-results/                 # Playwright run artifacts
├── playwright-report/            # Playwright HTML report (generated)
├── globalSetup.ts                # Global setup (auth/session, base data)
├── playwright.config.js          # Playwright configuration
├── Jenkinsfile                   # CI pipeline
├── package.json
└── package-lock.json
```

---

## Prerequisites

- **Node.js** 18+ and npm
- **Java JDK** 8+ (required by the Allure command line)
- Git

---

## Setup

```bash
# 1. Clone the repo
git clone <your-repo-url>
cd <repo-folder>

# 2. Install dependencies
npm ci          # or: npm install

# 3. Install Playwright browsers (Chromium, Firefox)
npx playwright install --with-deps
```

### Test Data

User and account data live in `test-data/User.json`. Update credentials/values there instead of hard-coding them in specs.

---

## Running Tests

### Run everything

```bash
npx playwright test
```

### Run by layer (folder)

```bash
npx playwright test tests/UI       # UI tests only
npx playwright test tests/API      # API tests only
npx playwright test tests/E2E      # Hybrid / end-to-end tests
```

### Run a single spec or single test

```bash
npx playwright test tests/UI/01-register.spec.ts
npx playwright test -g "Transfer Money – Valid Amount"
```

### Run by tag

```bash
npx playwright test --grep @smoke
npx playwright test --grep @regression
npx playwright test --grep @api
npx playwright test --grep @e2e
```

### Run on a specific browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
```

### Headed / debug / UI mode

```bash
npx playwright test --headed      # watch it run in a real browser
npx playwright test --debug       # step through with the inspector
npx playwright test --ui          # interactive UI mode
```

### Parallel execution

Parallelism is configured in `playwright.config.js` (`workers`, `fullyParallel`, retries, and browser projects). To override at runtime:

```bash
npx playwright test --workers=4
npx playwright test --retries=2
```

---

## Reporting

### Playwright HTML Report

Generated automatically into `playwright-report/` after a run.

```bash
npx playwright show-report
```

View a trace for a failed test:

```bash
npx playwright show-trace test-results/<path-to-trace>/trace.zip
```

### Allure Report

Install the Allure dependencies once (if not already in `package.json`):

```bash
npm install -D allure-playwright allure-commandline
```

Make sure `allure-playwright` is registered as a reporter in `playwright.config.js`:

```js
reporter: [
  ['list'],
  ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ['allure-playwright', { outputFolder: 'allure-results' }],
],
```

Run the tests, then generate and open the report:

```bash
# 1. Run tests (produces ./allure-results)
npx playwright test

# 2. Generate the static report into ./allure-report
npx allure generate allure-results --clean -o allure-report

# 3. Open the generated report
npx allure open allure-report
```

**One-step alternative** (generate + serve on a temporary local server):

```bash
npx allure serve allure-results
```

Clean old results before a fresh run:

```bash
# macOS / Linux
rm -rf allure-results allure-report
# Windows (PowerShell)
Remove-Item -Recurse -Force allure-results, allure-report
```

---

## Suggested npm Scripts

Add these to `package.json` so the commands are shorter:

```json
{
  "scripts": {
    "test": "playwright test",
    "test:ui": "playwright test tests/UI",
    "test:api": "playwright test tests/API",
    "test:e2e": "playwright test tests/E2E",
    "test:smoke": "playwright test --grep @smoke",
    "report:html": "playwright show-report",
    "allure:generate": "allure generate allure-results --clean -o allure-report",
    "allure:open": "allure open allure-report",
    "allure:serve": "allure serve allure-results"
  }
}
```

Then run, for example: `npm run test:api` or `npm run allure:serve`.

---

## CI/CD — Jenkins

The pipeline is defined in the `Jenkinsfile` at the repo root.

### One-time Jenkins setup

1. Install the **NodeJS** and **Allure** plugins (Manage Jenkins → Plugins).
2. Configure tools (Manage Jenkins → Tools): a **NodeJS** install and an **Allure Commandline** install.
3. Create a new **Pipeline** job → *Pipeline script from SCM* → point it to this repository and the `Jenkinsfile`.
4. Click **Build Now** to trigger a run.

### What the pipeline does

```bash
npm ci
npx playwright install --with-deps
npx playwright test
npx allure generate allure-results --clean -o allure-report
```

It then archives artifacts (screenshots, videos, traces) and publishes the Allure + Playwright HTML reports.

### Sample Jenkinsfile

```groovy
pipeline {
    agent any
    tools { nodejs 'NodeJS' }   // name from Manage Jenkins → Tools

    stages {
        stage('Checkout') {
            steps { checkout scm }
        }
        stage('Install') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install --with-deps'
            }
        }
        stage('Run Tests') {
            steps {
                sh 'npx playwright test'
            }
        }
    }

    post {
        always {
            // Publish Allure report (requires the Allure Jenkins plugin)
            allure includeProperties: false,
                   jdk: '',
                   results: [[path: 'allure-results']]

            // Archive evidence + Playwright HTML report
            archiveArtifacts artifacts: 'playwright-report/**, screenshots/**, test-results/**',
                             allowEmptyArchive: true
        }
    }
}
```

> On Windows agents, replace `sh '...'` with `bat '...'`.

---

## Test Coverage

The suite maps to the project's functional requirements (FR-01 → FR-09) and is fully traceable in the RTM:

- **UI:** registration, account creation, fund transfer, negative scenarios
- **API:** account retrieval, type/balance validation, balance before/after transfer, auth & invalid-input checks
- **Hybrid:** create account via UI then validate via API, multi-transfer consistency

Manual deliverables (Test Plan, Scenarios, Cases, RTM, Execution Report, Defect Report) are maintained in the accompanying QA workbook.

---

## Author

**Aaradhya Maharishi**
