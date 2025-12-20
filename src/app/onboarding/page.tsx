import { redirect } from 'next/navigation';

export default function OnboardingPage() {
  // Redirect old onboarding route to new register route
  redirect('/register');
}
