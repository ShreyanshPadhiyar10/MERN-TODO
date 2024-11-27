type ClassValue = string | undefined | null | boolean;

export function classNames(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
