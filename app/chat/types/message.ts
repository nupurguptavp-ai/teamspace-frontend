export type Message = {
  id: string;
  content: string;
  sender: {
    email: string;
    name?: string;
  };
};
