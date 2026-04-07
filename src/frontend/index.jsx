import React from 'react';
import ForgeReconciler, {
  Box,
  Heading,
  Text,
  Link,
  xcss,
} from '@forge/react';

const containerStyle = xcss({
  padding: 'space.400',
  maxWidth: '640px',
});

const sectionStyle = xcss({
  marginTop: 'space.300',
});

const App = () => {
  return (
    <Box xcss={containerStyle}>
      <Heading as="h1">DevResolve ⚡</Heading>

      <Box xcss={sectionStyle}>
        <Text>
          DevResolve is active and listening for new tickets. Whenever a Jira
          issue is created or updated, it will automatically generate a
          resolution and send it for approval before anything reaches your
          customers.
        </Text>
      </Box>

      <Box xcss={sectionStyle}>
        <Heading as="h2">Getting started</Heading>

        <Box xcss={xcss({ marginTop: 'space.200' })}>
          <Text weight="bold">Step 1 — Connect Confluence</Text>
          <Text>
            Email devresolve.ai@outlook.com with your Confluence URL and we'll
            connect it within the hour.
          </Text>
        </Box>

        <Box xcss={xcss({ marginTop: 'space.200' })}>
          <Text weight="bold">Step 2 — Connect Slack</Text>
          <Text>
            DevResolve posts an approval card to Slack before sending anything
            to a customer. No surprises.
          </Text>
        </Box>

        <Box xcss={xcss({ marginTop: 'space.200' })}>
          <Text weight="bold">Step 3 — Your first ticket</Text>
          <Text>
            Create any Jira ticket. DevResolve will process it within 20
            seconds and post a resolution draft for your review.
          </Text>
        </Box>
      </Box>

      <Box xcss={xcss({ marginTop: 'space.300' })}>
        <Link href="https://devresolve.ai">Visit devresolve.ai →</Link>
      </Box>
    </Box>
  );
};

ForgeReconciler.render(<App />);
