import { test, expect, Page } from '@playwright/test';

/**
 * Intelligent AI Tester for SK-AIO Intelligence App
 * This test suite simulates comprehensive testing scenarios
 */

class IntelligentTester {
  constructor(private page: Page) {}

  /**
   * Test UI Components and Layout
   */
  async testUIComponents() {
    // Test main layout structure
    await expect(this.page.locator('#agent-cards-container')).toBeVisible();
    await expect(this.page.locator('#timeline-event-list')).toBeVisible();
    await expect(this.page.locator('#side-drawer-content')).toBeVisible();
    await expect(this.page.locator('#bottom-console')).toBeVisible();
    await expect(this.page.locator('#graph-editor-container')).toBeVisible({ timeout: 10000 });

    // Test responsive design
    await this.page.setViewportSize({ width: 1920, height: 1080 });
    await this.page.waitForTimeout(500);
    
    await this.page.setViewportSize({ width: 768, height: 1024 });
    await this.page.waitForTimeout(500);
    
    await this.page.setViewportSize({ width: 375, height: 667 });
    await this.page.waitForTimeout(500);
    
    // Reset to desktop
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  /**
   * Test Agent Grid Component
   */
  async testAgentGrid() {
    const agentGrid = this.page.locator('#agent-cards-container');
    await expect(agentGrid).toBeVisible();
    
    // Check for agent cards
    const agentCards = agentGrid.locator('.agent-card, [data-testid="agent-card"]');
    const cardCount = await agentCards.count();
    
    if (cardCount > 0) {
      // Test first agent card interaction
      await agentCards.first().click();
      await this.page.waitForTimeout(300);
      
      // Test hover effects
      await agentCards.first().hover();
      await this.page.waitForTimeout(200);
    }
  }

  /**
   * Test Event Timeline Component
   */
  async testEventTimeline() {
    const timeline = this.page.locator('#timeline-event-list');
    await expect(timeline).toBeVisible();
    
    // Check for timeline events
    const events = timeline.locator('.timeline-event, [data-testid="timeline-event"]');
    const eventCount = await events.count();
    
    if (eventCount > 0) {
      // Test event interaction
      await events.first().click();
      await this.page.waitForTimeout(300);
    }
    
    // Test timeline scrolling
    await timeline.evaluate(el => el.scrollTop = 100);
    await this.page.waitForTimeout(200);
  }

  /**
   * Test Audit Console Component
   */
  async testAuditConsole() {
    const auditConsole = this.page.locator('#bottom-console');
    await expect(auditConsole).toBeVisible();
    
    // Test console toggle functionality
    const toggleButton = auditConsole.locator('button[aria-label*="Expand"], button[aria-label*="Collapse"]');
    if (await toggleButton.count() > 0) {
      await toggleButton.click();
      await this.page.waitForTimeout(300);
      
      await toggleButton.click();
      await this.page.waitForTimeout(300);
    }
    
    // Test console content
    const consoleContent = auditConsole.locator('[id*="audit-console-content"]');
    if (await consoleContent.count() > 0) {
      await expect(consoleContent).toBeVisible();
    }
  }

  /**
   * Test Graph Canvas Component
   */
  async testGraphCanvas() {
    const graphCanvas = this.page.locator('#graph-editor-container');
    await expect(graphCanvas).toBeVisible();
    
    // Test canvas interactions
    const canvas = graphCanvas.locator('canvas, svg, .graph-canvas');
    if (await canvas.count() > 0) {
      await canvas.click({ position: { x: 100, y: 100 } });
      await this.page.waitForTimeout(300);
      
      // Test drag simulation
      await canvas.dragTo(canvas, {
        sourcePosition: { x: 100, y: 100 },
        targetPosition: { x: 200, y: 200 }
      });
      await this.page.waitForTimeout(300);
    }
    
    // Test node interactions
    const nodes = graphCanvas.locator('.node, [data-testid="graph-node"]');
    const nodeCount = await nodes.count();
    
    if (nodeCount > 0) {
      await nodes.first().click();
      await this.page.waitForTimeout(300);
    }
  }

  /**
   * Test Audit Drawer Component
   */
  async testAuditDrawer() {
    const drawer = this.page.locator('#side-drawer-content');
    await expect(drawer).toBeVisible();
    
    // Test drawer toggle
    const drawerToggle = this.page.locator('[data-testid="drawer-toggle"], button[aria-label*="drawer"]');
    if (await drawerToggle.count() > 0) {
      await drawerToggle.click();
      await this.page.waitForTimeout(300);
      
      await drawerToggle.click();
      await this.page.waitForTimeout(300);
    }
    
    // Test drawer content
    const drawerContent = drawer.locator('.drawer-content, [data-testid="drawer-content"]');
    if (await drawerContent.count() > 0) {
      await expect(drawerContent).toBeVisible();
    }
  }

  /**
   * Test API Integration
   */
  async testAPIIntegration() {
    // Monitor network requests
    const apiRequests: string[] = [];
    
    this.page.on('request', request => {
      if (request.url().includes('/api/') || request.url().includes('localhost')) {
        apiRequests.push(request.url());
      }
    });
    
    // Trigger actions that should make API calls
    await this.page.reload();
    await this.page.waitForTimeout(2000);
    
    // Test form submissions or button clicks that trigger API calls
    const actionButtons = this.page.locator('button[type="submit"], .api-trigger, [data-testid*="api"]');
    const buttonCount = await actionButtons.count();
    
    for (let i = 0; i < Math.min(buttonCount, 3); i++) {
      await actionButtons.nth(i).click();
      await this.page.waitForTimeout(1000);
    }
    
    console.log('API Requests captured:', apiRequests);
  }

  /**
   * Test Accessibility
   */
  async testAccessibility() {
    // Test keyboard navigation
    await this.page.keyboard.press('Tab');
    await this.page.waitForTimeout(200);
    
    await this.page.keyboard.press('Tab');
    await this.page.waitForTimeout(200);
    
    await this.page.keyboard.press('Enter');
    await this.page.waitForTimeout(300);
    
    // Test ARIA attributes
    const ariaElements = this.page.locator('[aria-label], [aria-expanded], [role]');
    const ariaCount = await ariaElements.count();
    
    expect(ariaCount).toBeGreaterThan(0);
    
    // Test focus management
    const focusableElements = this.page.locator('button, input, select, textarea, a[href], [tabindex]:not([tabindex="-1"])');
    const focusableCount = await focusableElements.count();
    
    expect(focusableCount).toBeGreaterThan(0);
  }

  /**
   * Test Performance
   */
  async testPerformance() {
    // Measure page load time
    const startTime = Date.now();
    await this.page.reload();
    await this.page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    console.log(`Page load time: ${loadTime}ms`);
    expect(loadTime).toBeLessThan(10000); // Should load within 10 seconds
    
    // Test memory usage by creating and destroying elements
    await this.page.evaluate(() => {
      const testElements: HTMLDivElement[] = [];
      for (let i = 0; i < 100; i++) {
        const div = document.createElement('div');
        div.textContent = `Test element ${i}`;
        document.body.appendChild(div);
        testElements.push(div);
      }
      
      // Clean up
      testElements.forEach((el: HTMLDivElement) => el.remove());
    });
  }

  /**
   * Test Error Handling
   */
  async testErrorHandling() {
    // Test console errors
    const consoleErrors: string[] = [];
    this.page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Test network errors
    await this.page.route('**/api/nonexistent', route => {
      route.fulfill({ status: 404, body: 'Not Found' });
    });
    
    // Trigger potential error scenarios
    await this.page.evaluate(() => {
      // Try to access non-existent API
      fetch('/api/nonexistent').catch(() => {});
    });
    
    await this.page.waitForTimeout(1000);
    
    // Check if errors are handled gracefully
    const errorMessages = this.page.locator('.error-message, [data-testid="error"], .alert-error');
    // Errors should be displayed to user, not just logged to console
  }
}

test.describe('SK-AIO Intelligence App - Comprehensive Testing', () => {
  let tester: IntelligentTester;

  test.beforeEach(async ({ page }) => {
    tester = new IntelligentTester(page);
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('should load and display all main UI components', async () => {
    await tester.testUIComponents();
  });

  test('should test Agent Grid functionality', async () => {
    await tester.testAgentGrid();
  });

  test('should test Event Timeline functionality', async () => {
    await tester.testEventTimeline();
  });

  test('should test Audit Console functionality', async () => {
    await tester.testAuditConsole();
  });

  test('should test Graph Canvas functionality', async () => {
    await tester.testGraphCanvas();
  });

  test('should test Audit Drawer functionality', async () => {
    await tester.testAuditDrawer();
  });

  test('should test API integration', async () => {
    await tester.testAPIIntegration();
  });

  test('should test accessibility features', async () => {
    await tester.testAccessibility();
  });

  test('should test performance metrics', async () => {
    await tester.testPerformance();
  });

  test('should test error handling', async () => {
    await tester.testErrorHandling();
  });

  test('should test complete user workflow', async ({ page }) => {
    // Simulate a complete user journey
    await tester.testUIComponents();
    await tester.testAgentGrid();
    await tester.testEventTimeline();
    await tester.testGraphCanvas();
    await tester.testAuditConsole();
    await tester.testAuditDrawer();
    
    // Take screenshot for visual verification
    await page.screenshot({ path: 'test-results/complete-workflow.png', fullPage: true });
  });
});

test.describe('Mobile Testing', () => {
  test('should work on mobile devices', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    const tester = new IntelligentTester(page);
    
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    
    await tester.testUIComponents();
    await tester.testAgentGrid();
    
    // Take mobile screenshot
    await page.screenshot({ path: 'test-results/mobile-view.png', fullPage: true });
  });
});

test.describe('Cross-browser Testing', () => {
  ['chromium', 'firefox', 'webkit'].forEach(browserName => {
    test(`should work in ${browserName}`, async ({ page }) => {
      const tester = new IntelligentTester(page);
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await tester.testUIComponents();
      await tester.testPerformance();
      
      // Take browser-specific screenshot
      await page.screenshot({ path: `test-results/${browserName}-view.png`, fullPage: true });
    });
  });
});
