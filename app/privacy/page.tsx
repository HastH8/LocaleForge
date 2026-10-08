import type { Metadata } from "next"

import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Learn how LocaleForge processes source files, translation requests, browser preferences, and technical logs.",
  alternates: { canonical: "/privacy" },
}

export default function Page() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy policy"
      description="This policy explains what LocaleForge processes when you use the website and translator."
    >
      <section>
        <h2>Information we process</h2>
        <p>
          LocaleForge processes the source code, file name, selected languages,
          and settings you submit in order to create translations. We do not
          require an account and do not maintain user profiles or translation
          histories.
        </p>
      </section>
      <section>
        <h2>How translation works</h2>
        <p>
          Your submitted source is sent from our server to the configured Google
          Gemini API for the sole purpose of generating the requested
          translation. Google’s handling of API data is governed by its
          applicable service terms and privacy documentation.
        </p>
      </section>
      <section>
        <h2>Storage and retention</h2>
        <p>
          LocaleForge does not intentionally persist uploaded source files or
          generated translations in an application database. Temporary
          infrastructure logs may contain technical metadata such as timestamps,
          request status, and IP information for reliability and abuse
          prevention.
        </p>
      </section>
      <section>
        <h2>Cookies and local storage</h2>
        <p>
          We use browser storage for essential preferences such as theme and
          cookie consent. Optional analytics will only be enabled when you
          accept them.
        </p>
      </section>
      <section>
        <h2>Your choices</h2>
        <p>
          You can use essential-only mode, clear this site’s browser storage, or
          stop using the service at any time. Do not submit secrets,
          credentials, personal data, or confidential source code you are not
          authorized to process.
        </p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          For privacy questions or deletion requests relating to server logs,
          contact the site operator through the project’s published support
          channel.
        </p>
      </section>
    </LegalPage>
  )
}
