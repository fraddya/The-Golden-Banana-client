const apiUrl = process.env.REACT_APP_API_URL;
const getToken = () => sessionStorage.getItem('token');

// Helper function to handle 403 errors and redirect to login
const handleUnauthorizedAccess = (status: number) => {
  if (status === 403) {
    sessionStorage.clear();
    window.location.href = '/';
  }
};

export interface RequestQuestion {
  question: string;
  solution: number;
}

// Fetch request question
export const fetchRequestQuestion = async (): Promise<RequestQuestion> => {
  const response = await fetch(`${apiUrl}/requestQuestions`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    handleUnauthorizedAccess(response.status);
    throw new Error('Failed to fetch request question');
  }

  const data = await response.json();
  return data.content;
};
