export type Job = {
  id: number;
  client: string;
  description: string;
  budget: number;
  isOpen: boolean;
  developer: string;
  isPaid: boolean;
};

export type Applicant = {
  developer: string;
  github: string;
  pitch: string;
  hired: boolean;
};
