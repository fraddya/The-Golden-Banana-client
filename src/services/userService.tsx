const apiUrl = process.env.REACT_APP_API_URL;
const getToken = () => sessionStorage.getItem('token');

// Helper function to handle 403 errors and redirect to login
const handleUnauthorizedAccess = (status: number) => {
  if (status === 403) {
    sessionStorage.clear();
    window.location.href = '/'; // Adjust this to the path of your login page
  }
};

// Session check
export const isAuthenticated = (): boolean => {
  return !!sessionStorage.getItem('token');
};

export interface Vehicle {
  vehicleNo: string;
  model: string;
  year: string;
  color: string;
  type: string;
  description: string;
  brand: {
    id: number;
  };
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  contactNo: string;
  dateJoin: string;
  age: number;
  genderType: string;
  nic: string;
  nationality: string;
  religion: string;
  userLogging: string | null;
  role: string;
  email: string;
  passWord: string;
  firstTimeLogin: boolean;
  vehicle: Vehicle[];
}

// Fetch all users with role EMPLOYEE
export const fetchEmployees = async (): Promise<User[]> => {
  const response = await fetch(`${apiUrl}/users?role=EMPLOYEE`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    handleUnauthorizedAccess(response.status);
    throw new Error('Failed to fetch employees');
  }

  const data = await response.json();
  return data.content;
};

export const fetchUsers = async (): Promise<User[]> => {
  const response = await fetch(`${apiUrl}/users?role=USER`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    handleUnauthorizedAccess(response.status);
    throw new Error('Failed to fetch users');
  }

  const data = await response.json();
  return data.content;
};

// Fetch a user by ID
export const fetchUserById = async (id: number): Promise<User> => {
  const response = await fetch(`${apiUrl}/users/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    handleUnauthorizedAccess(response.status);
    throw new Error(`Failed to fetch user with ID ${id}`);
  }

  const data = await response.json();
  return data.content;
};

// Create a new user
export const createUser = async (newUser: Partial<User>): Promise<User> => {
  const response = await fetch(`${apiUrl}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      //'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(newUser),
  });

  if (!response.ok) {
    handleUnauthorizedAccess(response.status);
    throw new Error('Failed to create user');
  }

  const data = await response.json();
  return data.content;
};

// Update an existing user by ID
export const updateUser = async (id: number, updatedUser: Partial<User>): Promise<User> => {
  const response = await fetch(`${apiUrl}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(updatedUser),
  });

  if (!response.ok) {
    handleUnauthorizedAccess(response.status);
    throw new Error(`Failed to update user with ID ${id}`);
  }

  const data = await response.json();
  return data.content;
};

// Log in a user
export const loginUser = async (email: string, passWord: string): Promise<User> => {
  const response = await fetch(`${apiUrl}/users/login`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, passWord }),
  });

  if (response.status === 400) {
    const errorResponse = await response.json();
    throw new Error(errorResponse.validationFailures[0].message);
  } else if (response.status === 500) {
    throw new Error('Server Error');
  } else if (response.status === 403) {
    handleUnauthorizedAccess(response.status);
  }

  const data = await response.json();

  // Store token in session storage
  sessionStorage.setItem('token', data.content.token);
  sessionStorage.setItem('userId', data.content.id);

  return data.content;
};
