// Analytics helper functions
export const trackEvent = (eventName: string, properties?: Record<string, any>) => {
  if (typeof window !== 'undefined' && (window as any).va) {
    (window as any).va('track', eventName, properties);
  }
};

// Common events
export const events = {
  clickCV: () => trackEvent('CV Downloaded'),
  clickProject: (projectName: string) => trackEvent('Project Clicked', { project: projectName }),
  clickCertificate: (certName: string) => trackEvent('Certificate Viewed', { certificate: certName }),
  clickSocial: (platform: string) => trackEvent('Social Link Clicked', { platform }),
  clickEmail: () => trackEvent('Email Clicked'),
  clickPhone: () => trackEvent('Phone Clicked'),
};
