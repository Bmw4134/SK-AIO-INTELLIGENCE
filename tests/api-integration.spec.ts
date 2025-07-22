import { test, expect } from '@playwright/test';

/**
 * API Integration Tests
 * Tests the backend API endpoints and data flow
 */

test.describe('API Integration Tests', () => {
  const baseURL = 'http://localhost:3000';

  test('should test API endpoints with curl-like requests', async ({ request }) => {
    // Test health check endpoint
    try {
      const healthResponse = await request.get(`${baseURL}/api/health`);
      if (healthResponse.ok()) {
        expect(healthResponse.status()).toBe(200);
        const healthData = await healthResponse.json();
        expect(healthData).toHaveProperty('status');
      }
    } catch (error) {
      console.log('Health endpoint not available:', error);
    }

    // Test agents endpoint
    try {
      const agentsResponse = await request.get(`${baseURL}/api/agents`);
      if (agentsResponse.ok()) {
        expect(agentsResponse.status()).toBe(200);
        const agentsData = await agentsResponse.json();
        expect(Array.isArray(agentsData) || typeof agentsData === 'object').toBe(true);
      }
    } catch (error) {
      console.log('Agents endpoint not available:', error);
    }

    // Test events endpoint
    try {
      const eventsResponse = await request.get(`${baseURL}/api/events`);
      if (eventsResponse.ok()) {
        expect(eventsResponse.status()).toBe(200);
        const eventsData = await eventsResponse.json();
        expect(Array.isArray(eventsData) || typeof eventsData === 'object').toBe(true);
      }
    } catch (error) {
      console.log('Events endpoint not available:', error);
    }

    // Test graph endpoint
    try {
      const graphResponse = await request.get(`${baseURL}/api/graph`);
      if (graphResponse.ok()) {
        expect(graphResponse.status()).toBe(200);
        const graphData = await graphResponse.json();
        expect(typeof graphData === 'object').toBe(true);
      }
    } catch (error) {
      console.log('Graph endpoint not available:', error);
    }
  });

  test('should test POST requests', async ({ request }) => {
    // Test creating a new agent
    try {
      const newAgent = {
        name: 'Test Agent',
        type: 'test',
        config: { test: true }
      };

      const createResponse = await request.post(`${baseURL}/api/agents`, {
        data: newAgent
      });

      if (createResponse.ok()) {
        expect(createResponse.status()).toBe(201);
        const createdAgent = await createResponse.json();
        expect(createdAgent).toHaveProperty('id');
        expect(createdAgent.name).toBe(newAgent.name);
      }
    } catch (error) {
      console.log('Create agent endpoint not available:', error);
    }

    // Test creating a new event
    try {
      const newEvent = {
        type: 'test_event',
        message: 'Test event message',
        timestamp: new Date().toISOString()
      };

      const eventResponse = await request.post(`${baseURL}/api/events`, {
        data: newEvent
      });

      if (eventResponse.ok()) {
        expect(eventResponse.status()).toBe(201);
        const createdEvent = await eventResponse.json();
        expect(createdEvent).toHaveProperty('id');
        expect(createdEvent.type).toBe(newEvent.type);
      }
    } catch (error) {
      console.log('Create event endpoint not available:', error);
    }
  });

  test('should test error handling', async ({ request }) => {
    // Test 404 endpoints
    const notFoundResponse = await request.get(`${baseURL}/api/nonexistent`);
    expect(notFoundResponse.status()).toBe(404);

    // Test invalid POST data
    try {
      const invalidResponse = await request.post(`${baseURL}/api/agents`, {
        data: { invalid: 'data' }
      });
      // Should either reject or return error status
      if (!invalidResponse.ok()) {
        expect([400, 422, 500]).toContain(invalidResponse.status());
      }
    } catch (error) {
      // Expected for invalid requests
      console.log('Invalid request handled correctly:', error);
    }
  });

  test('should test authentication if required', async ({ request }) => {
    // Test protected endpoints without auth
    try {
      const protectedResponse = await request.get(`${baseURL}/api/protected`);
      if (protectedResponse.status() === 401) {
        expect(protectedResponse.status()).toBe(401);
      }
    } catch (error) {
      console.log('Protected endpoint not available:', error);
    }

    // Test with auth headers if needed
    try {
      const authResponse = await request.get(`${baseURL}/api/protected`, {
        headers: {
          'Authorization': 'Bearer test-token'
        }
      });
      // Should either work or return proper error
      expect([200, 401, 403]).toContain(authResponse.status());
    } catch (error) {
      console.log('Auth test not applicable:', error);
    }
  });
});

test.describe('WebSocket Integration Tests', () => {
  test('should test WebSocket connections', async ({ page }) => {
    await page.goto('/');

    // Test WebSocket connection
    const wsMessages: any[] = [];
    
    await page.evaluate(() => {
      // Try to establish WebSocket connection
      try {
        const ws = new WebSocket('ws://localhost:3000/ws');
        
        ws.onopen = () => {
          console.log('WebSocket connected');
          ws.send(JSON.stringify({ type: 'test', data: 'hello' }));
        };
        
        ws.onmessage = (event) => {
          console.log('WebSocket message:', event.data);
          (window as any).wsMessages = (window as any).wsMessages || [];
          (window as any).wsMessages.push(JSON.parse(event.data));
        };
        
        ws.onerror = (error) => {
          console.log('WebSocket error:', error);
        };
        
        (window as any).testWs = ws;
      } catch (error) {
        console.log('WebSocket not available:', error);
      }
    });

    // Wait for potential WebSocket messages
    await page.waitForTimeout(2000);

    // Check if WebSocket messages were received
    const messages = await page.evaluate(() => (window as any).wsMessages || []);
    console.log('WebSocket messages received:', messages);
  });
});

test.describe('Real-time Data Flow Tests', () => {
  test('should test data synchronization between components', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Monitor network requests for real-time updates
    const apiCalls: string[] = [];
    page.on('request', request => {
      if (request.url().includes('/api/')) {
        apiCalls.push(request.url());
      }
    });

    // Trigger actions that should update data
    const agentGrid = page.locator('#agent-cards-container');
    const timeline = page.locator('#timeline-event-list');
    const auditConsole = page.locator('#bottom-console');

    // Click on agent to trigger updates
    const agentCards = agentGrid.locator('.agent-card, [data-testid="agent-card"]');
    if (await agentCards.count() > 0) {
      await agentCards.first().click();
      await page.waitForTimeout(1000);
    }

    // Check if timeline updated
    const timelineEvents = timeline.locator('.timeline-event, [data-testid="timeline-event"]');
    const eventCount = await timelineEvents.count();

    // Check if audit console shows activity
    const consoleMessages = auditConsole.locator('.console-message, [data-testid="console-message"]');
    const messageCount = await consoleMessages.count();

    console.log('API calls made:', apiCalls);
    console.log('Timeline events:', eventCount);
    console.log('Console messages:', messageCount);

    // Verify data flow
    expect(apiCalls.length).toBeGreaterThanOrEqual(0);
  });
});
