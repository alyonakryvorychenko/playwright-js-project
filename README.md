# run entire suite
npm test

# run a single file
npx playwright test tests/login.spec.js

# run headed for debugging
npm run test:headed

npx playwright test --headed --debug

# After tests finish, view HTML report (if generated):
npx playwright show-report
