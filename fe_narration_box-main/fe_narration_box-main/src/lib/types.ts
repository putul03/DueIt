export type NavItems = {
  label: string;
  icon: React.ReactNode;
  path: string;
}

export type userChoices = 'alpha' | 'beta' | 'sigma'

export function isUserChoice(value: string): value is userChoices {
  return ['alpha', 'beta', 'sigma', ''].includes(value);
}

export type CreateTaskData = {
  title: string;
  description: string;
  time_estimate: string;
}

export type GenerateTaskData = {
  prompt: string;
  level: 1 | 2 | 3;
}
export type Todotype = { created_at: Date | string, completed: boolean, id: string, title: string, description: string, time_estimate: string }[]

export type availableFilters = 'complete' | 'incomplete' | 'due now'
export type availableSortTypes = 'big-first' | 'small-first'
