import React from "react";
import { Cookie, Calendar, Settings, Mail } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <div className="space-y-8 text-muted-foreground">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-primary mb-2">Cookie Policy</h1>
        <div className="flex items-center gap-4 text-sm">
          <span className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Last Updated: January 7, 2026
          </span>
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">1. What Are Cookies?</h2>
        <p>
          Cookies are small text files stored on your device when you visit a website. They help websites remember your preferences and improve your browsing experience.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">2. How We Use Cookies</h2>
        <p>MALOLA uses cookies for the following purposes:</p>
        
        <div className="space-y-4 mt-4">
          <div className="p-4 bg-card/50 rounded-lg border border-border/50">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-green-500"></span>
              Essential Cookies
            </h3>
            <p className="text-sm">Required for authentication, security, and basic functionality. Cannot be disabled.</p>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>Session management</li>
              <li>User authentication (Firebase)</li>
              <li>Security tokens</li>
            </ul>
          </div>
          
          <div className="p-4 bg-card/50 rounded-lg border border-border/50">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
              Preference Cookies
            </h3>
            <p className="text-sm">Remember your settings and preferences.</p>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>Theme preference (light/dark mode)</li>
              <li>Language settings</li>
              <li>Reading preferences</li>
            </ul>
          </div>
          
          <div className="p-4 bg-card/50 rounded-lg border border-border/50">
            <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-purple-500"></span>
              Analytics Cookies
            </h3>
            <p className="text-sm">Help us understand how users interact with our platform.</p>
            <ul className="list-disc list-inside mt-2 text-sm">
              <li>Page views and navigation patterns</li>
              <li>Feature usage statistics</li>
              <li>Performance metrics</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">3. Third-Party Cookies</h2>
        <p>We may use cookies from the following third-party services:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Firebase:</strong> Authentication and analytics</li>
          <li><strong>Google Analytics:</strong> Usage statistics (if enabled)</li>
          <li><strong>Vercel:</strong> Performance monitoring</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Settings className="w-5 h-5" />
          4. Managing Cookies
        </h2>
        <p>You can control cookies through your browser settings:</p>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Chrome:</strong> Settings → Privacy and Security → Cookies</li>
          <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies</li>
          <li><strong>Safari:</strong> Preferences → Privacy → Cookies</li>
          <li><strong>Edge:</strong> Settings → Cookies and Site Permissions</li>
        </ul>
        <p className="mt-3">
          Note: Disabling essential cookies may affect the functionality of the platform.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">5. Cookie Duration</h2>
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li><strong>Session Cookies:</strong> Deleted when you close your browser</li>
          <li><strong>Persistent Cookies:</strong> Remain for up to 1 year unless manually deleted</li>
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold text-foreground">6. Updates to This Policy</h2>
        <p>
          We may update this Cookie Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date.
        </p>
      </section>

      <section className="space-y-3 p-4 bg-primary/10 rounded-lg border border-primary/20">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Mail className="w-5 h-5" />
          Contact Us
        </h2>
        <p>
          For questions about our cookie practices:
        </p>
        <p className="font-medium text-foreground">privacy@malola.app</p>
      </section>
    </div>
  );
}
