const apiUrl = process.env.REACT_APP_API_URL;
const getToken = () => sessionStorage.getItem('token');

// Helper function to handle 403 errors and redirect to login
const handleUnauthorizedAccess = (status: number) => {
  if (status === 403) {
    sessionStorage.clear();
    window.location.href = '/'; // Adjust this to the path of your login page
  }
};

export interface UserLevelProgressCreateRequest {
  marks: number;
  timeInSeconds: number;
  user: { id: number };
  level: { id: number };
}

export interface UserLevelProgressResponse {
  id: number;
  marks: number;
  timeInSeconds: number;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    contactNo: string;
    dateJoin: string;
    genderType: string;
    email: string;
  };
  level: {
    id: number;
    name: string;
    description: string;
  };
}

export interface Pagination {
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
}

export interface UserLevelProgressSearchResponse {
  status: string;
  statusCode: number;
  message: string | null;
  content: UserLevelProgressResponse[];
  pagination: Pagination;
}

// Create user level progress
export const createUserLevelProgress = async (progress: UserLevelProgressCreateRequest): Promise<UserLevelProgressResponse> => {
  const response = await fetch(`${apiUrl}/userLevelProgress`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(progress),
  });

  if (!response.ok) {
    handleUnauthorizedAccess(response.status);
    throw new Error('Failed to create user level progress');
  }

  const data = await response.json();
  return data.content;
};

// Search user level progress
export const searchUserLevelProgress = async (): Promise<UserLevelProgressSearchResponse> => {
  const response = await fetch(`${apiUrl}/userLevelProgress`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    handleUnauthorizedAccess(response.status);
    throw new Error('Failed to search user level progress');
  }

  const data = await response.json();
  return data;
};

// Fetch user level progress by ID
export const fetchUserLevelProgressById = async (id: number): Promise<UserLevelProgressResponse> => {
  const response = await fetch(`${apiUrl}/userLevelProgress/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    handleUnauthorizedAccess(response.status);
    throw new Error(`Failed to fetch user level progress with ID ${id}`);
  }

  const data = await response.json();
  return data.content;
};

// Update user level progress by ID
export const updateUserLevelProgress = async (id: number, updatedProgress: Partial<UserLevelProgressCreateRequest>): Promise<UserLevelProgressResponse> => {
  const response = await fetch(`${apiUrl}/userLevelProgress/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(updatedProgress),
  });

  if (!response.ok) {
    handleUnauthorizedAccess(response.status);
    throw new Error(`Failed to update user level progress with ID ${id}`);
  }

  const data = await response.json();
  return data.content;
};

// Delete user level progress by ID
export const deleteUserLevelProgress = async (id: number): Promise<void> => {
  const response = await fetch(`${apiUrl}/userLevelProgress/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    handleUnauthorizedAccess(response.status);
    throw new Error(`Failed to delete user level progress with ID ${id}`);
  }
};

// Get leaderboards
export const getLeaderBoards = async (): Promise<UserLevelProgressSearchResponse> => {
  const response = await fetch(`${apiUrl}/userLevelProgress/leaderBoards`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    handleUnauthorizedAccess(response.status);
    throw new Error('Failed to get leaderboard details');
  }

  const data = await response.json();
  return data;
};
