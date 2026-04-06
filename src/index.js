/**
 * DevResolve Forge Remote Handler
 *
 * Routes Jira issue events (created, transitioned) to the DevResolve API server
 * at api.devresolve.ai via Forge Remote.
 *
 * This is a thin bridge — no business logic lives here.
 * All synthesis, RAG, billing, and Slack notifications happen on the DevResolve server.
 */

import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

/**
 * Main event handler — receives Jira webhook events from Forge
 * and forwards them to the DevResolve API server.
 */
resolver.define('handle-issue-event', async (req) => {
  const { payload, context } = req;

  const issueKey = payload?.issue?.key || payload?.issueKey || 'UNKNOWN';
  const cloudId  = context?.cloudId || '';
  const eventType = payload?.webhookEvent || 'jira:issue_event';

  console.log(`[DevResolve] Received ${eventType} for ${issueKey} (cloud: ${cloudId})`);

  try {
    // Forward the full Jira event payload to DevResolve
    const response = await api
      .asApp()
      .requestRemote('devresolve-api', {
        method: 'POST',
        path: '/webhooks/jira/forge',
        headers: {
          'Content-Type': 'application/json',
          'X-Forge-Cloud-Id': cloudId,
          'X-Forge-Event': eventType,
        },
        body: JSON.stringify({
          ...payload,
          _forge: {
            cloudId,
            eventType,
            appVersion: '1.0.0',
          },
        }),
      });

    const status = response.status;
    console.log(`[DevResolve] API response: ${status} for ${issueKey}`);

    if (status >= 200 && status < 300) {
      return { success: true, ticketId: issueKey };
    } else {
      console.error(`[DevResolve] API error ${status} for ${issueKey}`);
      return { success: false, error: `API returned ${status}` };
    }
  } catch (err) {
    console.error(`[DevResolve] Failed to forward ${issueKey}: ${err.message}`);
    return { success: false, error: err.message };
  }
});

export const handler = resolver.getDefinitions();
