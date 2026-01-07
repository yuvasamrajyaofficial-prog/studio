import React from "react";
import { FileText, Calendar, Mail } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="space-y-8 text-muted-foreground">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-primary mb-2">Terms of Service</h1>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Last Updated: January 7, 2026
          </span>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">1. Acceptance of Terms</h2>
        <p>
          By accessing or using MALOLA ("the Platform"), you agree to be bound by these Terms of Service. If you do not agree to all of these terms, please do not use our services. We reserve the right to update these terms at any time.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">2. Description of Service</h2>
        <p>
          MALOLA is a spiritual education platform that provides access to ancient scriptures, AI-powered explanations, personalized spiritual guidance, and community features. Our services include but are not limited to:
        </p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Scripture library with original texts and translations</li>
          <li>AI-powered spiritual guide (Lola) for questions and explanations</li>
          <li>Soul ID generation based on Vedic astrology</li>
          <li>Community forums and discussion groups</li>
          <li>Personalized recommendations and daily wisdom</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">3. User Accounts</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>You must be at least 13 years old to create an account</li>
          <li>You are responsible for maintaining the security of your account</li>
          <li>You must provide accurate and complete information</li>
          <li>One person may not maintain more than one account</li>
          <li>You are responsible for all activities under your account</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">4. Acceptable Use</h2>
        <p>You agree NOT to:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Use the platform for any unlawful purpose</li>
          <li>Post hateful, harassing, or discriminatory content</li>
          <li>Impersonate any person or entity</li>
          <li>Attempt to gain unauthorized access to our systems</li>
          <li>Use bots or automated systems without permission</li>
          <li>Commercialize content without explicit permission</li>
          <li>Disrespect sacred texts, traditions, or other users</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">5. Intellectual Property</h2>
        <p>
          All content on MALOLA, including text, graphics, logos, and software, is the property of MALOLA or its content providers. Ancient scriptures are presented for educational purposes. Modern translations, AI-generated content, and platform design are protected by copyright.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">6. AI-Generated Content Disclaimer</h2>
        <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
          <p className="text-foreground">
            <strong>Important:</strong> AI-generated interpretations and explanations are provided for educational and guidance purposes only. They are NOT authoritative religious rulings. For matters of spiritual importance, we recommend consulting with qualified scholars and gurus. The AI does not claim any divine authority.
          </p>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">7. User Content</h2>
        <p>
          By posting content (comments, questions, etc.) on MALOLA, you grant us a non-exclusive, worldwide license to use, display, and distribute that content. You retain ownership of your content but are responsible for ensuring it does not violate any laws or third-party rights.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">8. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your account at any time for violation of these terms or for any other reason at our discretion. Upon termination, your right to use the platform ceases immediately.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">9. Limitation of Liability</h2>
        <p>
          MALOLA is provided "as is" without warranties of any kind. We are not liable for any indirect, incidental, or consequential damages arising from your use of the platform. Our total liability is limited to the amount you paid us in the past 12 months.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">10. Governing Law</h2>
        <p>
          These terms are governed by the laws of India. Any disputes shall be resolved in the courts of Bangalore, Karnataka.
        </p>
      </section>

      <section className="space-y-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Contact Us
        </h2>
        <p>
          For questions about these Terms of Service, contact us at:
        </p>
        <p className="font-medium text-foreground">legal@malola.app</p>
      </section>
    </div>
  );
}
