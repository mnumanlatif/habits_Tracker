const staticMethod = {
  find: jest.fn(),
  findOne: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
};

const habitMock = jest.fn().mockImplementation(() => ({
  save: jest.fn(),
}));
Object.assign(habitMock, staticMethod);

jest.mock('../app/models/habitModel.js', () => ({
  __esModule: true,
  default: habitMock,
}));


const userMock = {
  exists: jest.fn(),
};
jest.mock('../app/models/userModel.js', () => ({
  __esModule: true,
  default: userMock,
}));

const categoryMock = {
  exists: jest.fn(),
};
jest.mock('../app/models/categoryModel.js', () => ({
  __esModule: true,
  default: categoryMock,
}));

import * as habitService from '../app/services/habitService.js';
import Habit from '../app/models/habitModel.js';
import User from '../app/models/userModel.js';
import Category from '../app/models/categoryModel.js';

describe('Habit Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /habit/create', () => {
    it('should create a new habit', async () => {
      const mockUserId = '507f1f77bcf86cd799439011';
      const mockCategoryId = '507f1f77bcf86cd799439012';

      const mockHabitInput = {
        userId: mockUserId,
        categoryId: mockCategoryId,
        name: 'Mock Habit',
        frequency: 'daily',
        description: 'This is a mock habit',
        priority: 'medium',
      };

      const mockCreatedHabit = { _id: 'mockHabitId', ...mockHabitInput };

      const mockSave = jest.fn().mockResolvedValue(mockCreatedHabit);
      (Habit as unknown as jest.Mock).mockImplementation(() => ({
        save: mockSave,
      }));

      (User.exists as jest.Mock).mockResolvedValue(true);
      (Category.exists as jest.Mock).mockResolvedValue(true);

      const result = await habitService.createHabit(mockHabitInput);

      expect(mockSave).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCreatedHabit);
    });

    // it('should throw error if user ID is invalid', async () => {
    //   const input = {
    //     userId: 'invalidUserId',
    //     categoryId: '507f1f77bcf86cd799439012',
    //   };

    //   await expect(habitService.createHabit(input as any)).rejects.toThrow('Invalid user ID format');
    // });

    // it('should throw error if category ID is invalid', async () => {
    //   const input = {
    //     userId: '507f1f77bcf86cd799439011',
    //     categoryId: 'invalidCatId',
    //   };

    //   await expect(habitService.createHabit(input as any)).rejects.toThrow('Invalid category ID format');
    // });

    it('should throw error if user does not exist', async () => {
      const input = {
        userId: '507f1f77bcf86cd799439011',
        categoryId: '507f1f77bcf86cd799439012',
      };

      (User.exists as jest.Mock).mockResolvedValue(false);
      (Category.exists as jest.Mock).mockResolvedValue(true);

      await expect(habitService.createHabit(input as any)).rejects.toThrow('User does not exist');
    });

    it('should throw error if category does not exist', async () => {
      const input = {
        userId: '507f1f77bcf86cd799439011',
        categoryId: '507f1f77bcf86cd799439012',
      };

      (User.exists as jest.Mock).mockResolvedValue(true);
      (Category.exists as jest.Mock).mockResolvedValue(false);

      await expect(habitService.createHabit(input as any)).rejects.toThrow('Category does not exist');
    });
  });

  describe('GET /habit', () => {
      it('should return all users', async () => {
        const mockUserId = '507f1f77bcf86cd799439011';
        const mockCategoryId = '507f1f77bcf86cd799439012';
        const mockHabits = [
          {  userId: mockUserId,categoryId: mockCategoryId,name: 'Mock Habit',frequency: 'daily',description: 'This is a mock habit',priority: 'medium', },
          {  userId: mockUserId,categoryId: mockCategoryId,name: 'Mock Habit',frequency: 'daily',description: 'This is a mock habit',priority: 'medium', },
        ];
  
        (Habit.find as jest.Mock).mockResolvedValue(mockHabits);
  
        const result = await habitService.findAllHabits();
  
        expect(Habit.find).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockHabits);
      });
      it('should return an empty array if no habit exist', async () => {
        (Habit.find as jest.Mock).mockResolvedValue([]);
  
        const result = await habitService.findAllHabits();
  
        expect(Habit.find).toHaveBeenCalledTimes(1);
        expect(result).toEqual([]);
      });
        
      describe('GET /habit/user/:userId', () => {
  it('should return habits by userId', async () => {
    const mockUserId = '507f1f77bcf86cd799439011';
    const mockHabits = [
      { _id: '1', userId: mockUserId, name: 'User Habit 1' },
      { _id: '2', userId: mockUserId, name: 'User Habit 2' },
    ];

    (Habit.find as jest.Mock).mockResolvedValue(mockHabits);

    const result = await habitService.findHabitsByUser({ userId: mockUserId });

    expect(Habit.find).toHaveBeenCalledWith({ userId: mockUserId });
    expect(result).toEqual(mockHabits);
  });

  it('should throw error if no habits found for user', async () => {
    const mockUserId = '507f1f77bcf86cd799439011';

    (Habit.find as jest.Mock).mockResolvedValue([]);

    await expect(habitService.findHabitsByUser({ userId: mockUserId }))
      .rejects
      .toThrow('No habits found for this user');
  });
});

describe('GET /habit/category/:categoryId', () => {
  it('should return habits by categoryId', async () => {
    const mockCategoryId = '507f1f77bcf86cd799439012';
    const mockHabits = [
      { _id: '1', categoryId: mockCategoryId, name: 'Category Habit 1' },
      { _id: '2', categoryId: mockCategoryId, name: 'Category Habit 2' },
    ];

    (Habit.find as jest.Mock).mockResolvedValue(mockHabits);

    const result = await habitService.findHabitsByCategory({ categoryId: mockCategoryId });

    expect(Habit.find).toHaveBeenCalledWith({ categoryId: mockCategoryId });
    expect(result).toEqual(mockHabits);
  });

  it('should throw error if no habits found for category', async () => {
    const mockCategoryId = '507f1f77bcf86cd799439012';

    (Habit.find as jest.Mock).mockResolvedValue([]);

    await expect(habitService.findHabitsByCategory({ categoryId: mockCategoryId }))
      .rejects
      .toThrow('No habits found for this category');
  });
});

});


});
