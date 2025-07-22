# SK-AIO Intelligence - Intelligent AI Testing Suite

## Overview

This project now includes a comprehensive AI-powered testing suite using Playwright that simulates intelligent testing scenarios to streamline your development and QA process.

## Features

### 🤖 Intelligent AI Tester
- **Comprehensive UI Testing**: Tests all main components (Agent Grid, Event Timeline, Audit Console, Graph Canvas, Audit Drawer)
- **Cross-browser Testing**: Automated testing across Chromium, Firefox, and WebKit
- **Mobile Testing**: Responsive design testing on mobile viewports
- **Performance Testing**: Page load time monitoring and memory usage testing
- **Accessibility Testing**: ARIA attributes, keyboard navigation, and focus management
- **API Integration Testing**: Network request monitoring and endpoint testing
- **Error Handling Testing**: Console error detection and graceful error handling verification

### 🔧 API Integration Tests
- **REST API Testing**: Comprehensive endpoint testing with curl-like requests
- **WebSocket Testing**: Real-time connection and message testing
- **Data Flow Testing**: Component synchronization and real-time updates
- **Authentication Testing**: Protected endpoint and auth header testing
- **Error Scenario Testing**: 404 handling, invalid data, and network errors

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Install Playwright Browsers
```bash
npm run install-browsers
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Run Tests

#### Run All Tests
```bash
npm test
```

#### Run Tests with UI (Interactive Mode)
```bash
npm run test:ui
```

#### Run Tests in Headed Mode (See Browser)
```bash
npm run test:headed
```

#### Run Specific Test Suites
```bash
# AI Tester Suite
npm run test:ai

# API Integration Tests
npm run test:api

# Mobile Testing
npm run test:mobile

# Cross-browser Testing
npm run test:cross-browser

# Critical Path Testing
npm run test:critical

# Performance Testing
npm run test:performance

# Accessibility Testing
npm run test:accessibility
```

#### Debug Tests
```bash
npm run test:debug
```

#### View Test Reports
```bash
npm run test:report
```

## Test Structure

### AI Tester (`tests/ai-tester.spec.ts`)
The main intelligent testing suite that includes:

- **UI Component Testing**: Verifies all main UI components are visible and functional
- **Interaction Testing**: Simulates user interactions (clicks, hovers, keyboard navigation)
- **Responsive Design Testing**: Tests across different viewport sizes
- **Performance Monitoring**: Measures page load times and memory usage
- **Accessibility Validation**: Checks ARIA attributes and keyboard navigation
- **Error Handling**: Tests graceful error handling and user feedback

### API Integration Tests (`tests/api-integration.spec.ts`)
Comprehensive API testing including:

- **GET Requests**: Health checks, data retrieval endpoints
- **POST Requests**: Data creation and submission
- **Error Handling**: 404s, invalid data, authentication errors
- **WebSocket Testing**: Real-time connection testing
- **Data Synchronization**: Component update verification

## Configuration

### Playwright Configuration (`playwright.config.ts`)
- **Base URL**: http://localhost:3000
- **Browsers**: Chromium, Firefox, WebKit
- **Reporters**: HTML reports with screenshots
- **Retries**: Automatic retry on CI environments
- **Traces**: Captured on test failures

### Test Scripts (`package.json`)
All test commands are configured in package.json scripts section for easy execution.

## Test Results

### Screenshots
Tests automatically capture screenshots for:
- Complete workflow verification
- Mobile view testing
- Browser-specific rendering
- Error states and edge cases

### Reports
HTML reports are generated with:
- Test execution details
- Screenshots and videos
- Performance metrics
- Error logs and stack traces

## Advanced Features

### Intelligent Test Selection
The AI tester intelligently adapts to your application structure:
- Automatically detects available components
- Skips tests for non-existent elements
- Provides detailed logging for debugging

### Performance Monitoring
- Page load time measurement
- Memory usage testing
- Network request monitoring
- Resource optimization suggestions

### Accessibility Compliance
- ARIA attribute validation
- Keyboard navigation testing
- Focus management verification
- Screen reader compatibility

## Network Access for Mobile Testing

The development server is configured to accept connections from your local network, allowing you to test on your iPhone:

1. Start the dev server: `npm run dev`
2. Find your local IP address (shown in terminal output)
3. Access from iPhone: `http://YOUR_LOCAL_IP:3000`

## Continuous Integration

The test suite is designed to work in CI environments:
- Automatic browser installation
- Headless execution by default
- Retry logic for flaky tests
- Comprehensive reporting

## Troubleshooting

### Common Issues

1. **Tests failing due to missing elements**
   - Check if your components have the expected IDs or data-testid attributes
   - Review the test selectors in the test files

2. **Network timeouts**
   - Ensure your development server is running
   - Check firewall settings for network access

3. **Browser installation issues**
   - Run `npm run install-browsers` manually
   - Check system requirements for Playwright

### Debug Mode
Use `npm run test:debug` to:
- Step through tests interactively
- Inspect element selectors
- View real-time browser actions

## Contributing

When adding new components or features:
1. Update test selectors if needed
2. Add new test cases for new functionality
3. Ensure accessibility attributes are included
4. Run the full test suite before committing

## Support

For issues or questions about the testing suite:
1. Check the Playwright documentation
2. Review test logs and screenshots
3. Use debug mode to investigate failures
4. Update test selectors as your UI evolves
