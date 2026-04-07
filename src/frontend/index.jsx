import ForgeUI, { render, ProjectPage, Fragment, Text, Heading, Link, Tag, SectionMessage } from '@forge/ui';

const App = () => {
  return (
    <Fragment>
      <Heading size="large">DevResolve ⚡</Heading>
      <SectionMessage title="Active — listening for new tickets" appearance="confirmation">
        <Text>DevResolve is installed and processing tickets automatically.</Text>
      </SectionMessage>
      <Heading size="medium">Getting started</Heading>
      <Text>**Step 1 — Connect Confluence**</Text>
      <Text>Email devresolve.ai@outlook.com with your Confluence URL. We will connect it within the hour.</Text>
      <Text>**Step 2 — Connect Slack**</Text>
      <Text>DevResolve posts approval cards to Slack before anything is sent to a customer.</Text>
      <Text>**Step 3 — Your first ticket**</Text>
      <Text>Create a Jira ticket — DevResolve will process it within 20 seconds and post a resolution for review.</Text>
      <Link href="https://devresolve.ai">Go to DevResolve →</Link>
    </Fragment>
  );
};

export const run = render(<ProjectPage><App /></ProjectPage>);
