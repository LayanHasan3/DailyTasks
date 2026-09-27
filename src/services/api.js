export const fetchQuote = async () => {
  try {
    const response = await fetch('https://dummyjson.com/quotes/random');
    if (!response.ok) throw new Error('Network error');
    const data = await response.json();
    return { quote: data.quote, author: data.author };
  } catch (error) {
    return { quote: 'Small steps every day add up to big results.', author: 'DailyTasks' };
  }
};