import type { Metadata } from "next"

import { LegalPage } from "@/components/legal-page"

export const metadata: Metadata = {
  title: "Terms of Use",
  description:
    "The terms that govern access to and use of the LocaleForge localization tool.",
  alternates: { canonical: "/terms" },
}

export default function Page() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of use"
      description="These terms govern your access to and use of LocaleForge."
    >
      <section>
        <h2>Using the service</h2>
        <p>
          You may use LocaleForge to translate files you own or are authorized
          to process. You are responsible for reviewing all output before using
          it in production.
        </p>
      </section>
      <section>
        <h2>Acceptable use</h2>
        <p>
          You must not use the service to violate law, third-party rights,
          service limits, or security controls. Automated abuse, credential
          submission, malware, and attempts to disrupt the service are
          prohibited.
        </p>
      </section>
      <section>
        <h2>AI-generated output</h2>
        <p>
          Translations are generated with artificial intelligence and may
          contain errors, omissions, or culturally inappropriate wording.
          Validation checks help protect code structure but do not replace human
          review or testing.
        </p>
      </section>
      <section>
        <h2>Intellectual property</h2>
        <p>
          You retain rights in the source material you submit and are
          responsible for having the rights required to use it. LocaleForge
          branding, interface design, and original software remain protected by
          applicable intellectual-property law.
        </p>
      </section>
      <section>
        <h2>Availability and warranties</h2>
        <p>
          The service is provided “as is” and may change, pause, or become
          unavailable. To the maximum extent permitted by law, no guarantee is
          made that every translation will be accurate, complete, or fit for a
          specific purpose.
        </p>
      </section>
      <section>
        <h2>Limitation of liability</h2>
        <p>
          To the maximum extent permitted by law, the service operator is not
          liable for indirect, incidental, special, or consequential loss
          arising from use of generated output or service interruption.
        </p>
      </section>
    </LegalPage>
  )
}
