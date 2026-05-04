import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_public/_layout/(site)/privacy')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <section className="z-10 mt-20 px-8 py-16">
      <div className="container mx-auto max-w-4xl">
        <article>
          <h1 className="mb-10 text-4xl font-medium tracking-tighter md:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>

          <div className="mb-8 text-sm text-muted-foreground">
            <strong>Atlas Recon</strong>
            <br />
            <em>Last updated: April 20, 2026</em>
          </div>

          <hr className="my-10 border-t border-(--color-border-subtle)" />

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Introduction
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Atlas Recon (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) is a free
              attack surface discovery tool that helps users identify and catalog
              their publicly accessible digital assets. This Privacy Policy
              explains how we collect, use, store, and protect your information
              when you use our service.
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              By creating an account or using Atlas Recon, you agree to the
              practices described in this policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Information We Collect
            </h2>

            <h3 className="mb-3 mt-6 text-lg font-medium tracking-tight">
              Account Information
            </h3>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              When you register for an Atlas Recon account, we collect:
            </p>
            <ul className="mb-8 ml-6 list-disc space-y-2 text-sm text-muted-foreground">
              <li>Email address</li>
              <li>Username</li>
              <li>
                Password (stored in hashed form; we never store plaintext
                passwords)
              </li>
            </ul>

            <h3 className="mb-3 mt-6 text-lg font-medium tracking-tight">
              Scan Data
            </h3>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              When you initiate a discovery scan, Atlas Recon collects and stores
              publicly available information about the domains you submit. This
              includes:
            </p>
            <ul className="mb-8 ml-6 list-disc space-y-2 text-sm text-muted-foreground">
              <li>Subdomains</li>
              <li>DNS records</li>
              <li>IP addresses</li>
              <li>Open ports and services</li>
              <li>Other publicly discoverable asset metadata</li>
            </ul>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              This data is derived entirely from passive and non-intrusive
              reconnaissance techniques. Atlas Recon does not perform any active
              exploitation, vulnerability testing, or actions that alter,
              disrupt, or harm the target environment in any way.
            </p>

            <h3 className="mb-3 mt-6 text-lg font-medium tracking-tight">
              Usage Data
            </h3>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              We may collect basic usage data to maintain and improve the
              service, such as:
            </p>
            <ul className="mb-8 ml-6 list-disc space-y-2 text-sm text-muted-foreground">
              <li>Login timestamps</li>
              <li>Scan history (domains scanned and scan dates)</li>
              <li>Browser type and device information</li>
              <li>IP address used to access the platform</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              How We Use Your Information
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              We use the information we collect to:
            </p>
            <ul className="mb-8 ml-6 list-disc space-y-2 text-sm text-muted-foreground">
              <li>Authenticate your identity and provide access to your dashboard</li>
              <li>Perform discovery scans on domains you submit</li>
              <li>Display scan results in your personal dashboard</li>
              <li>Maintain, troubleshoot, and improve the service</li>
              <li>
                Communicate with you about your account or service-related
                updates
              </li>
            </ul>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              We do <strong className="font-semibold text-(--brand-secondary)">not</strong> sell,
              rent, or share your personal information or scan data with third
              parties for marketing or advertising purposes.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Third-Party Tools
            </h2>
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
              to perform discovery scans. These tools conduct passive,
              non-intrusive reconnaissance only. No data is transmitted to
              ProjectDiscovery or any other third party as part of the scanning
              process beyond what is required to resolve publicly available DNS
              and network information.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Data Storage and Security
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              Your account information and scan results are stored in our
              database and are associated with your account. We implement
              reasonable security measures to protect your data, including:
            </p>
            <ul className="mb-8 ml-6 list-disc space-y-2 text-sm text-muted-foreground">
              <li>Password hashing</li>
              <li>Encrypted connections (HTTPS/TLS)</li>
              <li>Authentication-gated access to all dashboard data</li>
            </ul>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              While we take security seriously, no system is completely immune to
              risk. We encourage you to use a strong, unique password for your
              account.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Data Retention
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              We retain your account information and scan data for as long as
              your account is active. If you delete your account, all associated
              data including scan results, account details, and usage history
              will be permanently removed from our systems within 30 days.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Your Rights
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              You have the right to:
            </p>
            <ul className="mb-8 ml-6 list-disc space-y-2 text-sm text-muted-foreground">
              <li>
                <strong className="font-semibold text-(--brand-secondary)">Access</strong> the personal data we hold
                about you
              </li>
              <li>
                <strong className="font-semibold text-(--brand-secondary)">Update</strong> your account information at
                any time through your dashboard
              </li>
              <li>
                <strong className="font-semibold text-(--brand-secondary)">Delete</strong> your account and all
                associated data
              </li>
              <li>
                <strong className="font-semibold text-(--brand-secondary)">Export</strong> your scan data from the
                dashboard
              </li>
            </ul>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              To exercise any of these rights, contact us at the email address
              listed below.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Authorized Use
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              By using Atlas Recon, you agree that you will only scan domains and
              assets that you own or have explicit authorization to scan.
              Unauthorized scanning of third-party assets is strictly prohibited
              and may result in account termination.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Children&apos;s Privacy
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              Atlas Recon is not intended for use by individuals under the age of
              18. We do not knowingly collect personal information from children.
              If we become aware that a user is under 18, we will promptly
              delete their account and associated data.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Changes to This Policy
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              We may update this Privacy Policy from time to time. If we make
              material changes, we will notify you by updating the &quot;Last
              updated&quot; date at the top of this page. Your continued use of
              Atlas Recon after any changes constitutes your acceptance of the
              updated policy.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="mb-4 text-xl tracking-tighter md:text-3xl">
              Contact
            </h2>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              If you have any questions or concerns about this Privacy Policy,
              please contact us at:
            </p>
            <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
              <strong className="font-semibold text-(--brand-secondary)">Email:</strong>{' '}
              <a
                href="mailto:support@atlasrecon.io"
                className="text-primary hover:underline"
              >
                support@atlasrecon.io
              </a>
            </p>
          </section>

          <hr className="my-10 border-t border-(--color-border-subtle)" />

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