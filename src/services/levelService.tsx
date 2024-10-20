const apiUrl = process.env.REACT_APP_API_URL;
const getToken = () => localStorage.getItem('token');

export interface Level {
  id: number;
  name: string;
  description: string;
  difficulty: string;
}

// Fetch all levels
export const fetchLevels = async (): Promise<Level[]> => {
  const response = await fetch(`${apiUrl}/levels`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch levels');
  }

  const data = await response.json();
  return data.content;
};

// Fetch level by ID
export const fetchLevelById = async (id: number): Promise<Level> => {
  const response = await fetch(`${apiUrl}/levels/${id}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch level with ID ${id}`);
  }

  const data = await response.json();
  return data.content;
};

// Create a new level
export const createLevel = async (newLevel: Partial<Level>): Promise<Level> => {
  const response = await fetch(`${apiUrl}/levels`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(newLevel),
  });

  if (!response.ok) {
    throw new Error('Failed to create level');
  }

  const data = await response.json();
  return data.content;
};

// Update an existing level by ID
export const updateLevel = async (id: number, updatedLevel: Partial<Level>): Promise<Level> => {
  const response = await fetch(`${apiUrl}/levels/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${getToken()}`,
    },
    body: JSON.stringify(updatedLevel),
  });

  if (!response.ok) {
    throw new Error(`Failed to update level with ID ${id}`);
  }

  const data = await response.json();
  return data.content;
};

// Delete a level by ID
export const deleteLevel = async (id: number): Promise<void> => {
  const response = await fetch(`${apiUrl}/levels/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to delete level with ID ${id}`);
  }
};

// Fetch level suggestions
export const fetchLevelSuggestions = async (): Promise<Level[]> => {
  const response = await fetch(`${apiUrl}/levels/suggestions`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch level suggestions');
  }

  const data = await response.json();
  return data.content;
};
