const apiUrl = process.env.REACT_APP_API_URL; 

export interface RequestQuestion {
  question: string; 
  solution: number; 
}

export const fetchRequestQuestion = async (): Promise<RequestQuestion> => {
  const response = await fetch(`${apiUrl}/requestQuestions`, {
    method: 'GET',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch request question');
  }

  const data = await response.json();

  return data.content;
};

const getRequestQuestion = async () => {
  try {
    const requestQuestion = await fetchRequestQuestion();
    console.log('Question:', requestQuestion.question);
    console.log('Solution:', requestQuestion.solution);
  } catch (error) {
    console.error(error);
  }
};
