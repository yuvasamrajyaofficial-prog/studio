import React from "react";
import { Shield, Calendar, Mail } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="space-y-8 text-muted-foreground">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-primary mb-2">Privacy Policy</h1>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Last Updated: January 7, 2026
          </span>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">1. Introduction</h2>
        <p>
          Welcome to MALOLA ("we," "our," or "us"). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">2. Information We Collect</h2>
        <p>We collect information in the following ways:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Account Information:</strong> Name, email address, profile picture when you register</li>
          <li><strong>Soul ID Data:</strong> Date of birth, time of birth, and place of birth (optional, for astrological features)</li>
          <li><strong>Usage Data:</strong> Reading history, scriptures accessed, AI conversation logs</li>
          <li><strong>Device Information:</strong> Browser type, IP address, device identifiers</li>
          <li><strong>Cookies:</strong> See our Cookie Policy for details</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">3. How We Use Your Information</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>To provide and maintain our services</li>
          <li>To personalize your spiritual journey experience</li>
          <li>To generate your Soul ID and provide astrological insights</li>
          <li>To power AI-driven recommendations and explanations</li>
          <li>To communicate with you about updates and features</li>
          <li>To analyze usage patterns and improve our platform</li>
          <li>To ensure security and prevent fraud</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">4. Data Sharing & Disclosure</h2>
        <p>We do NOT sell your personal information. We may share data with:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Service Providers:</strong> Firebase (authentication, database), AI providers (Gemini, OpenAI, Claude)</li>
          <li><strong>Legal Requirements:</strong> When required by law or to protect our rights</li>
          <li><strong>With Your Consent:</strong> For any other purpose with your explicit permission</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">5. Data Security</h2>
        <p>
          We implement industry-standard security measures including encryption, secure HTTPS connections, and regular security audits. API keys and sensitive data are encrypted at rest. However, no method of transmission over the Internet is 100% secure.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">6. Your Rights</h2>
        <p>You have the right to:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Access your personal data</li>
          <li>Correct inaccurate information</li>
          <li>Request deletion of your account and data</li>
          <li>Export your data in a portable format</li>
          <li>Opt out of marketing communications</li>
          <li>Withdraw consent at any time</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">7. Data Retention</h2>
        <p>
          We retain your personal information for as long as your account is active or as needed to provide services. You may request deletion of your data at any time by contacting us.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">8. Children's Privacy</h2>
        <p>
          Our services are not intended for children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">9. International Data Transfers</h2>
        <p>
          Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for such transfers.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">10. Changes to This Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. We will notify you of significant changes via email or through the platform. Your continued use after changes constitutes acceptance.
        </p>
      </section>

      <section className="space-y-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Contact Us
        </h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p className="font-medium text-foreground">privacy@malola.app</p>
      </section>
    </div>
  );
}
