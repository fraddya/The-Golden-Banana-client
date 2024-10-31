const apiUrl = process.env.REACT_APP_API_URL; 
const getToken = () => sessionStorage.getItem('token');

export interface RequestQuestion {
  question: string; 
  solution: number; 
}

export const fetchRequestQuestion = async (): Promise<RequestQuestion> => {
  const response = await fetch(`${apiUrl}/requestQuestions`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${getToken()}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch request question');
  }

  const data = await response.json();

  return data.content;
};
