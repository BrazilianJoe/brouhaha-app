// For Vercel serverless functions, we'll use a simple mock database
// In production, this would connect to your actual database

interface User {
  id: string;
  email: string;
  password: string;
  username: string;
  role: 'READER' | 'CREATOR' | 'ADMIN' | 'SUPER_ADMIN';
  createdAt: Date;
  updatedAt: Date;
}

interface Content {
  id: string;
  title: string;
  description?: string;
  type: 'WEBTOON' | 'BOOK' | 'VIDEO';
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  authorId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Mock database for MVP
const mockUsers: User[] = [
  {
    id: '1',
    email: 'tiago.freire@gmail.com',
    password: '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password: admin123
    username: 'tiago',
    role: 'SUPER_ADMIN',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockContent: Content[] = [
  {
    id: '1',
    title: 'Sample Webtoon',
    description: 'A sample webtoon for testing',
    type: 'WEBTOON',
    status: 'PUBLISHED',
    authorId: '1',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export const prisma = {
  user: {
    findUnique: async ({ where }: { where: { email?: string; id?: string } }) => {
      if (where.email) {
        return mockUsers.find(user => user.email === where.email) || null;
      }
      if (where.id) {
        return mockUsers.find(user => user.id === where.id) || null;
      }
      return null;
    },
    findFirst: async ({ where }: { where: { role?: string } }) => {
      if (where.role) {
        return mockUsers.find(user => user.role === where.role) || null;
      }
      return mockUsers[0] || null;
    },
    create: async ({ data }: { data: any }) => {
      const newUser: User = {
        id: (mockUsers.length + 1).toString(),
        email: data.email,
        password: data.password,
        username: data.username,
        role: data.role || 'READER',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockUsers.push(newUser);
      return newUser;
    },
    update: async ({ where, data }: { where: { id: string }; data: any }) => {
      const userIndex = mockUsers.findIndex(user => user.id === where.id);
      if (userIndex !== -1) {
        mockUsers[userIndex] = { ...mockUsers[userIndex], ...data, updatedAt: new Date() };
        return mockUsers[userIndex];
      }
      return null;
    }
  },
  content: {
    findMany: async () => {
      return mockContent.map(content => ({
        ...content,
        author: mockUsers.find(user => user.id === content.authorId),
        chapters: []
      }));
    },
    create: async ({ data }: { data: any }) => {
      const newContent: Content = {
        id: (mockContent.length + 1).toString(),
        title: data.title,
        description: data.description,
        type: data.type,
        status: data.status || 'DRAFT',
        authorId: data.authorId,
        createdAt: new Date(),
        updatedAt: new Date()
      };
      mockContent.push(newContent);
      return {
        ...newContent,
        author: mockUsers.find(user => user.id === newContent.authorId)
      };
    }
  }
};
