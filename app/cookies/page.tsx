import type { Metadata } from "next"

import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Learn how LocaleForge uses essential browser storage and manages optional analytics consent.",
  alternates: { canonical: "/cookies" },
}

export default function Page() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie policy"
      description="A clear explanation of the small amount of browser storage LocaleForge uses."
    >
      <section>
        <h2>Essential storage</h2>
        <p>
          LocaleForge stores your color-theme preference and cookie-consent
          choice in local storage. These values make the interface work as
          expected and do not identify you by name.
        </p>
      </section>
      <section>
        <h2>Optional analytics</h2>
        <p>
          If analytics are introduced, they will be treated as optional and
          enabled only after consent. Essential-only mode remains available and
          does not affect the translator.
        </p>
      </section>
      <section>
        <h2>Managing your choice</h2>
        <p>
          You can remove LocaleForge data through your browser’s site-data or
          privacy settings. Clearing storage will reset your theme and show the
          consent notice again.
        </p>
      </section>
      <section>
        <h2>Changes</h2>
        <p>
          We may update this policy when the website’s storage practices change.
          The date at the top identifies the latest revision.
        </p>
      </section>
    </LegalPage>
  )
}
