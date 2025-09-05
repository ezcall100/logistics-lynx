// N8N Webhook Integration Service
// 250 MCP Agents - Webhook Automation System

export interface WebhookPayload {
  event: string;
  data: any;
  timestamp: string;
  source: string;
  userId?: string;
  sessionId?: string;
  metadata?: Record<string, any>;
}

export interface WebhookResponse {
  success: boolean;
  message: string;
  workflowId?: string;
  timestamp: string;
}

class WebhookService {
  private readonly webhookUrl = 'https://pixx100.app.n8n.cloud/webhook-test/cursor-webhook';
  private readonly timeout = 10000; // 10 seconds

  /**
   * Send data to N8N webhook
   * @param payload - Data to send to webhook
   * @returns Promise with webhook response
   */
  async sendToWebhook(payload: WebhookPayload): Promise<WebhookResponse> {
    try {
      const response = await fetch(this.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(this.timeout),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      return {
        success: true,
        message: result.message || 'Webhook triggered successfully',
        workflowId: result.workflowId,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error('Webhook error:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      };
    }
  }

  /**
   * Track user interaction
   * @param event - Event type
   * @param data - Event data
   * @param userId - User ID (optional)
   */
  async trackUserInteraction(
    event: string, 
    data: any, 
    userId?: string
  ): Promise<WebhookResponse> {
    return this.sendToWebhook({
      event: `user_interaction_${event}`,
      data,
      timestamp: new Date().toISOString(),
      source: 'transbot-ai',
      userId,
      sessionId: this.getSessionId(),
      metadata: {
        userAgent: navigator.userAgent,
        url: window.location.href,
        referrer: document.referrer,
      },
    });
  }

  /**
   * Track form submission
   * @param formName - Name of the form
   * @param formData - Form data
   * @param userId - User ID (optional)
   */
  async trackFormSubmission(
    formName: string,
    formData: any,
    userId?: string
  ): Promise<WebhookResponse> {
    return this.sendToWebhook({
      event: 'form_submission',
      data: {
        formName,
        formData,
        validation: 'passed',
      },
      timestamp: new Date().toISOString(),
      source: 'transbot-ai',
      userId,
      sessionId: this.getSessionId(),
      metadata: {
        formFields: Object.keys(formData),
        submissionTime: Date.now(),
      },
    });
  }

  /**
   * Track page navigation
   * @param pageName - Name of the page
   * @param previousPage - Previous page (optional)
   * @param userId - User ID (optional)
   */
  async trackPageNavigation(
    pageName: string,
    previousPage?: string,
    userId?: string
  ): Promise<WebhookResponse> {
    return this.sendToWebhook({
      event: 'page_navigation',
      data: {
        pageName,
        previousPage,
        navigationTime: Date.now(),
      },
      timestamp: new Date().toISOString(),
      source: 'transbot-ai',
      userId,
      sessionId: this.getSessionId(),
      metadata: {
        url: window.location.href,
        pathname: window.location.pathname,
      },
    });
  }

  /**
   * Track AI agent activity
   * @param agentName - Name of the AI agent
   * @param action - Action performed
   * @param data - Action data
   */
  async trackAIAgentActivity(
    agentName: string,
    action: string,
    data: any
  ): Promise<WebhookResponse> {
    return this.sendToWebhook({
      event: 'ai_agent_activity',
      data: {
        agentName,
        action,
        data,
        efficiency: Math.random() * 100, // Mock efficiency
      },
      timestamp: new Date().toISOString(),
      source: 'transbot-ai',
      metadata: {
        agentVersion: '1.0.0',
        systemLoad: this.getSystemLoad(),
      },
    });
  }

  /**
   * Track error events
   * @param error - Error object
   * @param context - Error context
   * @param userId - User ID (optional)
   */
  async trackError(
    error: Error,
    context: string,
    userId?: string
  ): Promise<WebhookResponse> {
    return this.sendToWebhook({
      event: 'error_occurred',
      data: {
        error: {
          message: error.message,
          stack: error.stack,
          name: error.name,
        },
        context,
        severity: 'high',
      },
      timestamp: new Date().toISOString(),
      source: 'transbot-ai',
      userId,
      sessionId: this.getSessionId(),
      metadata: {
        url: window.location.href,
        userAgent: navigator.userAgent,
      },
    });
  }

  /**
   * Get session ID
   */
  private getSessionId(): string {
    let sessionId = sessionStorage.getItem('transbot-session-id');
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem('transbot-session-id', sessionId);
    }
    return sessionId;
  }

  /**
   * Get mock system load
   */
  private getSystemLoad(): number {
    return Math.random() * 100;
  }
}

// Export singleton instance
export const webhookService = new WebhookService();

// Export convenience functions
export const trackUserInteraction = webhookService.trackUserInteraction.bind(webhookService);
export const trackFormSubmission = webhookService.trackFormSubmission.bind(webhookService);
export const trackPageNavigation = webhookService.trackPageNavigation.bind(webhookService);
export const trackAIAgentActivity = webhookService.trackAIAgentActivity.bind(webhookService);
export const trackError = webhookService.trackError.bind(webhookService);
