import React from "react";

export default function TermsPage() {
  return (
    <div className="space-y-6 text-muted-foreground">
      <h1 className="text-3xl font-bold text-primary mb-8">Terms & Conditions</h1>
      
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">1. Acceptance of Terms</h2>
        <p>
          By accessing and using the Malola platform, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">2. Use of Content</h2>
        <p>
          All content provided on this platform, including text, images, and audio, is for educational and spiritual purposes. You may not use it for commercial gain without explicit permission.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">3. User Conduct</h2>
        <p>
          Users are expected to behave respectfully. Any form of hate speech, harassment, or disrespect towards the scriptures or other users will result in immediate termination of access.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">4. Disclaimer</h2>
        <p>
          While we strive for accuracy, the interpretations provided by our AI tools are for guidance only. We recommend consulting with qualified scholars for authoritative scriptural advice.
        </p>
      </section>
    </div>
  );
}
