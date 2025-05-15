interface Book {

  id: number;
  title: string;
  author: string;
  genre: string;
  rating: string;
  totalCopies: number;
  availableCopies: number;
  description: string;
  coverColor: string;
  coverUrl: string;
  video: string;
  summary: string;
  isLoanedBook: boolean;
}

interface AuthCredentials {
  fullName: string;
  email: string;
  password: string;
  universityId: number;
  universityCard: string;
}