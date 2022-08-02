import {Hero, River, FAQ, Heading, Text, InlineLink, Link} from './'
import '@primer/react-brand/lib/css/main.css'

export default function KitchenSink() {
  return (
    <>
      <Hero
        heading="This is my super sweet hero heading"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed turpis felis nam pulvinar risus elementum."
        primaryAction={{
          text: 'Primary action',
          href: '#'
        }}
        secondaryAction={{
          text: 'Secondary action',
          href: '#'
        }}
        align="center"
      />
      <River>
        <River.Visual>
          <img
            src="https://via.placeholder.com/600x400/f5f5f5/f5f5f5.png"
            alt="placeholder, blank area with an off-white background color"
          />
        </River.Visual>
        <River.Content>
          <Heading>Heading</Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
            turpis felis nam pulvinar risus elementum.
          </Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
      <River align="end">
        <River.Visual>
          <img
            src="https://via.placeholder.com/600x400/f5f5f5/f5f5f5.png"
            alt="placeholder, blank area with an off-white background color"
          />
        </River.Visual>
        <River.Content>
          <Heading>Heading</Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
            turpis felis nam pulvinar risus elementum.
          </Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
      <River align="center">
        <River.Visual>
          <img
            src="https://via.placeholder.com/600x400/f5f5f5/f5f5f5.png"
            alt="placeholder, blank area with an off-white background color"
          />
        </River.Visual>
        <River.Content>
          <Heading>Heading</Heading>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In sapien sit ullamcorper id. Aliquam luctus sed
            turpis felis nam pulvinar risus elementum.
          </Text>
          <Link href="#">Call to action</Link>
        </River.Content>
      </River>
      <FAQ>
        <FAQ.Heading>Frequently asked questions</FAQ.Heading>
        <FAQ.Item>
          <FAQ.Question>What&apos;s included in the GitHub for Startups offer?</FAQ.Question>
          <FAQ.Answer>
            <p>
              All GitHub for Startups companies receive up to 20 seats of GitHub Enterprise for free for year one and
              50% off year two. Learn more about the features and capabilities of GitHub Enterprise{' '}
              <InlineLink href="https://www.github.com" target="_blank" rel="noreferrer">
                here
              </InlineLink>
              .
            </p>
          </FAQ.Answer>
        </FAQ.Item>
        <FAQ.Item>
          <FAQ.Question>Who is eligible to apply?</FAQ.Question>
          <FAQ.Answer>
            <p>Startups who meet the following criteria are eligible to apply for the program:</p>
            <ol>
              <li>
                <Text size="300" variant="muted">
                  Must be associated with a current GitHub for Startups partner.
                </Text>
              </li>
              <li>
                <Text size="300" variant="muted">
                  Self-funded or funded (Seed-Series A)
                </Text>
              </li>
              <li>
                <Text size="300" variant="muted">
                  Not a current GitHub Enterprise customer
                </Text>
              </li>
              <li>
                <Text size="300" variant="muted">
                  Must not have previously received credits for GitHub Enterprise
                </Text>
              </li>
            </ol>
          </FAQ.Answer>
        </FAQ.Item>
        <FAQ.Item>
          <FAQ.Question>What if my startup is not eligible? Are there other resources for me?</FAQ.Question>
          <FAQ.Answer>
            <p>
              If you’re not currently eligible for the GitHub for Startups but would like to try GitHub Enterprise,
              please feel to sign up for a trial
              <InlineLink href="https://www.github.com" target="_blank" rel="noreferrer">
                here
              </InlineLink>
              .
            </p>
          </FAQ.Answer>
        </FAQ.Item>
        <FAQ.Item>
          <FAQ.Question>How can my organization become a GitHub for Startups partner?</FAQ.Question>
          <FAQ.Answer>
            <p>
              Any investor, accelerator, or startup support organization is eligible to apply for the GitHub for
              Startups program.
            </p>
            <p>
              <InlineLink href="https://www.github.com" target="_blank" rel="noreferrer">
                Apply here
              </InlineLink>
              .
            </p>
          </FAQ.Answer>
        </FAQ.Item>
      </FAQ>
    </>
  )
}
