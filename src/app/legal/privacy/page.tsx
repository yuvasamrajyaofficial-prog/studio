import React from "react";

export default function PrivacyPage() {
  return (
    <div className="space-y-6 text-muted-foreground">
      <h1 className="text-3xl font-bold text-primary mb-8">Privacy Policy</h1>
      
      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">1. Information We Collect</h2>
        <p>
          We collect information you provide directly to us, such as when you create an account, subscribe to our newsletter, or contact us. This may include your name, email address, and usage data.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">2. How We Use Your Information</h2>
        <p>
          We use your information to provide, maintain, and improve our services, to communicate with you, and to personalize your experience.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">3. Data Security</h2>
        <p>
          We implement reasonable security measures to protect your personal information. However, no method of transmission over the Internet is 100% secure.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-foreground mb-3">4. Cookies</h2>
        <p>
          We use cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, but this may limit some functionality.
        </p>
      </section>
    </div>
  );
}
