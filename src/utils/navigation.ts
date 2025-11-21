export const scrollToSection = (sectionId: string) => {
  if (typeof window === 'undefined') {
    return;
  }

  const target = document.getElementById(sectionId);
  if (target) {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
