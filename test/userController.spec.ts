const staticMethod= {
find : jest.fn(),
findOne : jest.fn(),
findByIdAndUpdate : jest.fn(),
findByIdAndDelete : jest.fn(),
findOneAndDelete: jest.fn(), 

}
const UserMock =jest.fn().mockImplementation(() =>({
  save: jest.fn()
}));
Object.assign(UserMock, staticMethod);

jest.mock('../app/models/userModel.js', () => ({
  __esModule: true,
  default: UserMock,
}));

import * as userService from '../app/services/userService.js';
import User, { IUser } from '../app/models/userModel.js';

describe('User Controller', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /user/create', () => {
    it('should create a new user', async () => {
      const mockUserInput: Partial<IUser> = {
        name: "Numan",
        userName: "nomimian02",
        password: "nomimian01",
        email: "nomimian02@gmail.com",
        age: 25,
        department: "IT"
      };

      const mockCreatedUser = { _id: 'mockId', ...mockUserInput } as Required<IUser>;

      const mockSave = jest.fn().mockResolvedValue(mockCreatedUser);
      (User as unknown as jest.Mock).mockImplementation(() => ({
        save: mockSave
      }));

      const result = await userService.createUser(mockUserInput as IUser);
      expect(mockSave).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockCreatedUser);
    }); 
    it('should throw an error if user already exists', async () => {
      const mockUserInput = {
        userName: "nomimian02",
        email: "nomimian02@gmail.com",
      };
      (User.findOne as jest.Mock).mockResolvedValueOnce(mockUserInput);
      await expect(userService.checkUserExists({ userName: mockUserInput.userName, email: mockUserInput.email })).rejects.toThrow('Username or email already exists');
      expect(User.findOne).toHaveBeenCalledWith({
        $or: [{ userName: mockUserInput.userName }, { email: mockUserInput.email }]
      });
    });
  });

  describe('GET /user', () => {
    it('should return all users', async () => {
      const mockUsers = [
        { _id: 'id1', name: 'Numan', userName: 'nomimian02', email: 'nomimian02@gmail.com', age: 25, department: 'IT' },
        { _id: 'id2', name: 'Usman', userName: 'usman123', email: 'usman@gmail.com', age: 30, department: 'HR' },
      ];

      (User.find as jest.Mock).mockResolvedValue(mockUsers);

      const result = await userService.getAllUsers();

      expect(User.find).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockUsers);
    });
  });



describe('PUT /user/:id', () => {
  it('should update an existing user', async () => {
    const mockUserId = '507f191e810c19729de860ea'; 
    const mockUpdateData: Partial<IUser> = { name: 'Usman Updated', age: 26 };

    const mockUpdatedUser = { _id: mockUserId, ...mockUpdateData } as Required<IUser>;

    (User.findByIdAndUpdate as jest.Mock).mockResolvedValue(mockUpdatedUser);

    const result = await userService.updateUserById(mockUserId, mockUpdateData);

    expect(User.findByIdAndUpdate).toHaveBeenCalledWith(
      mockUserId,
      { ...mockUpdateData, updatedAt: expect.any(Date) },
      { new: true }
    );
    expect(result).toEqual(mockUpdatedUser);
  });
});

describe('DELETE /user/:id', () => {
  it('should delete an existing user', async () => {
    const mockUserId = '517f191e810c19729de860ea'; 
 
    const mockDeletedUser: Partial<IUser> ={
      _id: mockUserId,
      name: 'Numan',
      userName: 'nomimian01',
      password: "nomimian01",
      email: 'nomimian10@gmail.com',
      age:25,
      department: 'IT'
    };

    (User.findOneAndDelete as jest.Mock).mockResolvedValue(mockDeletedUser);

    const result = await userService.deleteUserById(mockUserId);

    expect(User.findOneAndDelete).toHaveBeenCalledWith({_id: mockUserId});
    expect(result).toEqual(mockDeletedUser);
  });
});
});