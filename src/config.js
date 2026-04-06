/**
 * DevResolve Jira Admin Configuration Page
 *
 * Shown in Jira Settings > Apps > DevResolve Configuration.
 * Displays setup instructions and connection status.
 */

import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

resolver.define('get-config', async (req) => {
  const { context } = req;
  const cloudId = context?.cloudId || '';

  // Check connection status with DevResolve API
  let connected = false;
  let orgId = null;

  try {
    const resp = await api
      .asApp()
      .requestRemote('devresolve-api', {
        method: 'GET',
        path: `/forge/status?cloudId=${cloudId}`,
        headers: { 'Content-Type': 'application/json' },
      });

    if (resp.status === 200) {
      const data = await resp.json();
      connected = data.connected || false;
      orgId = data.orgId || null;
    }
  } catch (err) {
    console.log(`[DevResolve] Status check failed: ${err.message}`);
  }

  return {
    connected,
    orgId,
    cloudId,
    setupUrl: `https://api.devresolve.ai/onboard/plan`,
    docsUrl: 'https://devresolve.ai',
    supportEmail: 'devresolve.ai@outlook.com',
  };
});

export const handler = resolver.getDefinitions();
