import React from "react";
import { Users, Calendar, Shield, Mail, AlertTriangle, MessageCircle } from "lucide-react";

export default function CommunityGuidelinesPage() {
  return (
    <div className="space-y-8 text-muted-foreground">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-primary mb-2">Community Guidelines</h1>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Last Updated: January 7, 2026
          </span>
        </div>
        <p className="text-lg">
          MALOLA is a sacred space for spiritual seekers. These guidelines help maintain a respectful, inclusive, and enriching community for all.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          1. Core Values
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
            <h3 className="font-semibold text-foreground mb-2">🙏 Respect</h3>
            <p className="text-sm">Honor all traditions, texts, and fellow seekers, even when views differ.</p>
          </div>
          <div className="p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
            <h3 className="font-semibold text-foreground mb-2">📚 Learning</h3>
            <p className="text-sm">Approach discussions with humility and a genuine desire to learn.</p>
          </div>
          <div className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
            <h3 className="font-semibold text-foreground mb-2">🤝 Compassion</h3>
            <p className="text-sm">Treat others as you would like to be treated. Be kind and supportive.</p>
          </div>
          <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
            <h3 className="font-semibold text-foreground mb-2">✨ Authenticity</h3>
            <p className="text-sm">Share genuine experiences and insights. Be honest in your interactions.</p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <MessageCircle className="w-5 h-5 text-primary" />
          2. Acceptable Behavior
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Engage in respectful, constructive discussions</li>
          <li>Share knowledge and insights generously</li>
          <li>Ask questions with genuine curiosity</li>
          <li>Credit sources and acknowledge other viewpoints</li>
          <li>Support fellow seekers on their spiritual journey</li>
          <li>Report violations to moderators</li>
          <li>Use appropriate language in all interactions</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-red-500" />
          3. Prohibited Behavior
        </h2>
        <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
          <p className="text-foreground mb-3"><strong>The following will result in immediate action:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Hate speech, discrimination, or bigotry of any kind</li>
            <li>Harassment, bullying, or personal attacks</li>
            <li>Spam, self-promotion, or commercial solicitation</li>
            <li>Sharing misinformation or false teachings</li>
            <li>Impersonating scholars, gurus, or other users</li>
            <li>Posting sexually explicit or violent content</li>
            <li>Disrespecting sacred texts or traditions</li>
            <li>Attempting to convert or proselytize aggressively</li>
            <li>Sharing private conversations without consent</li>
            <li>Using the platform for political propaganda</li>
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">4. Discussion Etiquette</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Stay on topic in discussions</li>
          <li>Avoid derailing conversations with unrelated debates</li>
          <li>Use evidence and citations when making claims</li>
          <li>Accept that multiple interpretations can coexist</li>
          <li>Avoid "my tradition is better" arguments</li>
          <li>Be patient with beginners and newcomers</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">5. Moderation & Enforcement</h2>
        <p>We use a tiered approach to enforcement:</p>
        <ol className="list-decimal list-inside space-y-2 ml-4">
          <li><strong>Warning:</strong> First-time minor violations receive a warning</li>
          <li><strong>Temporary Suspension:</strong> Repeated violations result in temporary account suspension</li>
          <li><strong>Permanent Ban:</strong> Severe or repeated violations result in permanent removal</li>
        </ol>
        <p className="mt-3">
          Moderators make decisions based on context and severity. Appeals can be submitted within 7 days of action.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">6. Reporting Violations</h2>
        <p>
          If you see content that violates these guidelines, please report it using the Report button on the content or contact our moderation team directly. All reports are reviewed within 24 hours.
        </p>
      </section>

      <section className="space-y-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Contact Moderation Team
        </h2>
        <p>
          For questions about community guidelines or to report violations:
        </p>
        <p className="font-medium text-foreground">community@malola.app</p>
      </section>
    </div>
  );
}
