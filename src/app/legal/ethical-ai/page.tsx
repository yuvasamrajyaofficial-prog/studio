import React from "react";
import { Bot, Calendar, Shield, Eye, Users, BookOpen, Mail } from "lucide-react";

export default function EthicalAIPage() {
  return (
    <div className="space-y-8 text-muted-foreground">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-primary mb-2">Ethical AI Policy</h1>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Last Updated: January 7, 2026
          </span>
        </div>
        <p className="text-lg">
          Our commitment to responsible, transparent, and respectful use of artificial intelligence in spiritual education.
        </p>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Shield className="w-5 h-5 text-primary" />
          1. Core Principles
        </h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-4 bg-card/50 rounded-lg border border-border/50">
            <h3 className="font-semibold text-foreground mb-2">No Divine Claims</h3>
            <p className="text-sm">Our AI never claims to be divine, a guru, or an authoritative spiritual leader. It is a tool to assist learning, not replace traditional teachers.</p>
          </div>
          <div className="p-4 bg-card/50 rounded-lg border border-border/50">
            <h3 className="font-semibold text-foreground mb-2">Human Agency First</h3>
            <p className="text-sm">Users retain full control over their spiritual journey. AI provides suggestions and information, never commands or manipulates.</p>
          </div>
          <div className="p-4 bg-card/50 rounded-lg border border-border/50">
            <h3 className="font-semibold text-foreground mb-2">Cultural Sensitivity</h3>
            <p className="text-sm">We respect all traditions and adapt content based on user context while maintaining the integrity of original teachings.</p>
          </div>
          <div className="p-4 bg-card/50 rounded-lg border border-border/50">
            <h3 className="font-semibold text-foreground mb-2">Continuous Improvement</h3>
            <p className="text-sm">We actively seek feedback, conduct audits, and update our AI systems to reduce bias and improve accuracy.</p>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-primary" />
          2. Respect for Sacred Texts
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Original Sanskrit/Pali texts are preserved without modification</li>
          <li>Translations are clearly marked with source attribution</li>
          <li>AI-generated interpretations are labeled as "AI Insight" or "AI Explanation"</li>
          <li>Multiple interpretations from different scholarly traditions are presented when available</li>
          <li>We do not claim any single interpretation as the "correct" one</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Eye className="w-5 h-5 text-primary" />
          3. Transparency
        </h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>All AI-generated content is clearly marked</li>
          <li>Users know when they are interacting with Lola (our AI guide)</li>
          <li>We disclose which AI models power our features (Gemini, OpenAI, Claude)</li>
          <li>Confidence levels are shown for AI responses when applicable</li>
          <li>Users can view the sources used for any AI explanation</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          4. Bias Mitigation
        </h2>
        <p>We actively work to identify and mitigate biases:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>Training data is reviewed for sectarian or political biases</li>
          <li>Multiple scholarly perspectives are included in our knowledge base</li>
          <li>User feedback is incorporated to correct biased outputs</li>
          <li>Regular audits by subject matter experts from diverse traditions</li>
          <li>We do not promote any single religious or political viewpoint</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Bot className="w-5 h-5 text-primary" />
          5. AI Behavior Guidelines
        </h2>
        <div className="p-4 bg-amber-500/10 rounded-lg border border-amber-500/20">
          <p className="text-foreground mb-3"><strong>Lola (our AI guide) is programmed to:</strong></p>
          <ul className="list-disc list-inside space-y-2 ml-4">
            <li>Always identify itself as an AI assistant</li>
            <li>Encourage users to verify information with traditional sources</li>
            <li>Refuse to provide harmful or misleading spiritual advice</li>
            <li>Respect user privacy and not share personal conversations</li>
            <li>Acknowledge limitations and uncertainty when appropriate</li>
            <li>Never claim to perform miracles, give blessings, or offer divine intervention</li>
          </ul>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">6. Data & Privacy</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>AI conversations may be stored to improve our services</li>
          <li>Personal data is never sold to third parties</li>
          <li>Users can request deletion of their conversation history</li>
          <li>Sensitive astrological data is encrypted and protected</li>
          <li>We comply with GDPR, CCPA, and Indian data protection laws</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">7. Human Oversight</h2>
        <p>
          Our AI systems are subject to continuous human oversight. A dedicated Ethics Committee reviews AI outputs, investigates user reports, and ensures compliance with this policy. Significant updates to AI behavior are reviewed before deployment.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">8. Reporting Concerns</h2>
        <p>
          If you encounter AI behavior that violates this policy or causes concerns, please report it immediately. We take all reports seriously and investigate promptly.
        </p>
      </section>

      <section className="space-y-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Contact Ethics Team
        </h2>
        <p>
          For questions, feedback, or concerns about our AI practices:
        </p>
        <p className="font-medium text-foreground">ethics@malola.app</p>
      </section>
    </div>
  );
}
