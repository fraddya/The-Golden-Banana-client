const apiUrl = process.env.REACT_APP_API_URL;
const getToken = () => localStorage.getItem('token');

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
    throw new Error('Failed to create user level progress');
  }

  const data = await response.json();
  return data.content;
};

export const searchUserLevelProgress = async (): Promise<UserLevelProgressSearchResponse> => {
  const response = await fetch(`${apiUrl}/userLevelProgress`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to search user level progress');
  }

  const data = await response.json();
  return data;
};

export const fetchUserLevelProgressById = async (id: number): Promise<UserLevelProgressResponse> => {
  const response = await fetch(`${apiUrl}/userLevelProgress/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user level progress with ID ${id}`);
  }

  const data = await response.json();
  return data.content;
};

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
    throw new Error(`Failed to update user level progress with ID ${id}`);
  }

  const data = await response.json();
  return data.content;
};

export const deleteUserLevelProgress = async (id: number): Promise<void> => {
  const response = await fetch(`${apiUrl}/userLevelProgress/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete user level progress with ID ${id}`);
  }
};

export const getLeaderBoards = async (): Promise<UserLevelProgressSearchResponse> => {
  const response = await fetch(`${apiUrl}/userLevelProgress/leaderBoards`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get leader bord details');
  }

  const data = await response.json();
  return data;
};
