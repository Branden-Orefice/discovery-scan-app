import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/_layout/(site)/terms')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="z-10 mt-20 px-8 py-16">
      <div className="container mx-auto max-w-4xl">
        <article>
          <h1 className="mb-10 text-4xl font-medium tracking-tighter md:text-5xl lg:text-6xl">
            Terms of Service
          </h1>

          <div className="mb-8 text-sm text-muted-foreground">
            <strong>Atlas Recon</strong>
            <br />
            <em>Last updated: April 20, 2026</em>
          </div>

          <hr className="my-10 border-t border-border" />

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Acceptance of Terms
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              By accessing or using Atlas Recon (&quot;the Service&quot;), you
              agree to be bound by these Terms of Service (&quot;Terms&quot;).
              If you do not agree to these Terms, do not use the Service.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Description of Service
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              Atlas Recon is a free attack surface discovery platform that
              allows authenticated users to perform passive, non-intrusive
              reconnaissance scans on domains they own or are authorized to
              scan. The Service collects and displays publicly available
              information, including subdomains, DNS records, IP addresses, and
              other network metadata, in a personal dashboard.
            </p>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              Atlas Recon uses open-source tools from{' '}
              <a
                href="https://projectdiscovery.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                ProjectDiscovery
              </a>{' '}
              to perform these scans. The Service does not conduct active
              exploitation, vulnerability testing, or any action that alters,
              disrupts, or harms target environments.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Account Registration
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              To use Atlas Recon, you must create an account. You agree to:
            </p>
            <ul className="mb-8 ml-6 list-disc space-y-2 text-sm text-muted-foreground">
              <li>Provide accurate and complete registration information</li>
              <li>Maintain the security of your account credentials</li>
              <li>
                Notify us immediately of any unauthorized access to your account
              </li>
              <li>
                Accept responsibility for all activity that occurs under your
                account
              </li>
            </ul>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              We reserve the right to suspend or terminate accounts that violate
              these Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Acceptable Use
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              You agree to use Atlas Recon{' '}
              <strong className="font-semibold text-(--brand-secondary)">
                only
              </strong>{' '}
              for lawful purposes and in compliance with all applicable local,
              state, national, and international laws. Specifically, you agree
              that you will:
            </p>
            <ul className="mb-8 ml-6 list-disc space-y-2 text-sm text-muted-foreground">
              <li>
                <strong className="font-semibold text-(--brand-secondary)">
                  Only scan domains and assets you own or have explicit written
                  authorization to scan
                </strong>
              </li>
              <li>
                Not use the Service to facilitate unauthorized access to any
                system or network
              </li>
              <li>
                Not use the Service to harass, threaten, or harm any individual
                or organization
              </li>
              <li>
                Not attempt to reverse-engineer, exploit, or compromise the
                Service itself
              </li>
              <li>
                Not use automated tools, including bots or scrapers, to interact
                with the Service outside of its intended functionality
              </li>
              <li>
                Not resell, redistribute, or sublicense access to the Service or
                its data
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Prohibited Conduct
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              The following actions are strictly prohibited and may result in
              immediate account termination:
            </p>
            <ul className="mb-8 ml-6 list-disc space-y-2 text-sm text-muted-foreground">
              <li>
                Scanning domains or infrastructure you do not own or lack
                authorization to scan
              </li>
              <li>
                Using Atlas Recon to plan, prepare, or carry out any form of
                cyberattack
              </li>
              <li>
                Submitting fraudulent, misleading, or malicious input to the
                Service
              </li>
              <li>
                Attempting to gain unauthorized access to other users&apos;
                accounts or data
              </li>
              <li>
                Interfering with the operation, availability, or performance of
                the Service
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Intellectual Property
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              All content, branding, design, and code that make up the Atlas
              Recon platform are the property of the project owner. You are
              granted a limited, non-exclusive, non-transferable license to use
              the Service for its intended purpose.
            </p>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              Scan results generated through your use of the Service belong to
              you. However, you acknowledge that this data is derived from
              publicly available sources and is not proprietary information
              created by Atlas Recon.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Data and Privacy
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              Your use of Atlas Recon is also governed by our{' '}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              . By using the Service, you consent to the collection and use of
              your information as described in that policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Disclaimer of Warranties
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              Atlas Recon is provided{' '}
              <strong className="font-semibold text-(--brand-secondary)">
                &quot;as is&quot;
              </strong>{' '}
              and{' '}
              <strong className="font-semibold text-(--brand-secondary)">
                &quot;as available&quot;
              </strong>{' '}
              without warranties of any kind, either express or implied,
              including but not limited to:
            </p>
            <ul className="mb-8 ml-6 list-disc space-y-2 text-sm text-muted-foreground">
              <li>Merchantability or fitness for a particular purpose</li>
              <li>Accuracy, completeness, or reliability of scan results</li>
              <li>Uninterrupted or error-free operation of the Service</li>
            </ul>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              Scan results reflect publicly available information at the time of
              the scan and may not represent a complete picture of your attack
              surface. Atlas Recon is not a substitute for a professional
              security audit or penetration test.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Limitation of Liability
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              To the fullest extent permitted by law, Atlas Recon and its owner
              shall not be liable for any indirect, incidental, special,
              consequential, or punitive damages arising out of or related to
              your use of the Service, including but not limited to:
            </p>
            <ul className="mb-8 ml-6 list-disc space-y-2 text-sm text-muted-foreground">
              <li>
                Loss of data or unauthorized access resulting from your use of
                scan results
              </li>
              <li>
                Decisions made based on information provided by the Service
              </li>
              <li>Service downtime, interruptions, or data loss</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Indemnification
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              You agree to indemnify and hold harmless Atlas Recon and its owner
              from any claims, damages, losses, or expenses, including reasonable
              legal fees, arising from:
            </p>
            <ul className="mb-8 ml-6 list-disc space-y-2 text-sm text-muted-foreground">
              <li>Your use of the Service</li>
              <li>Your violation of these Terms</li>
              <li>
                Your scanning of domains or assets without proper authorization
              </li>
              <li>
                Any third-party claims related to your use of the Service
              </li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Service Availability
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              Atlas Recon is a free portfolio project. We make no guarantees
              regarding uptime, availability, or continued operation of the
              Service. We reserve the right to modify, suspend, or discontinue
              the Service at any time without prior notice.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Modifications to Terms
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              We may update these Terms from time to time. Changes will be
              reflected by updating the &quot;Last updated&quot; date at the top
              of this page. Your continued use of the Service after any
              modifications constitutes your acceptance of the revised Terms.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Termination
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              We reserve the right to suspend or terminate your account at our
              sole discretion, with or without notice, for any conduct that we
              determine violates these Terms or is harmful to the Service or
              other users.
            </p>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              Upon termination, your right to use the Service ceases
              immediately. Any data associated with your account may be deleted
              in accordance with our Privacy Policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Governing Law
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              These Terms shall be governed by and construed in accordance with
              the laws of the United States. Any disputes arising from these
              Terms or your use of the Service shall be resolved in the
              appropriate courts of that jurisdiction.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Contact
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              <strong className="font-semibold text-(--brand-secondary)">
                Email:
              </strong>{' '}
              <a
                href="mailto:support@atlasrecon.io"
                className="text-primary hover:underline"
              >
                support@atlasrecon.io
              </a>
            </p>
          </section>

          <hr className="my-10 border-t border-border" />

          <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
            <em>
              Atlas Recon is a portfolio project and is provided as a free
              service with no warranties, express or implied.
            </em>
          </p>
        </article>
      </div>
    </section>
  )
}