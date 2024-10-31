import { useState } from 'react';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [average, setAverage] = useState(0);
  const [positive, setPositive] = useState(0);

  const incrementGood = () => {
    const updatedGood = good + 1;
    const updatedTotal = updatedGood + neutral + bad;
    setGood(updatedGood);
    setTotal(updatedTotal);
    setAverage((updatedGood - bad) / updatedTotal);
    setPositive((updatedGood / updatedTotal) * 100);
  }
  const incrementNeutral = () => {
    const updatedNeutral = neutral + 1;
    const updatedTotal = good + updatedNeutral + bad;
    setNeutral(updatedNeutral);
    setTotal(updatedTotal);
    setAverage((good - bad) / updatedTotal);
    setPositive((good / updatedTotal) * 100);
  }
  const incrementBad = () => {
    const updatedBad = bad + 1;
    const updatedTotal = good + neutral + updatedBad;
    setBad(updatedBad);
    setTotal(updatedTotal);
    setAverage((good - updatedBad) / updatedTotal);
    setPositive((good / updatedTotal) * 100);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={incrementGood} text="good" />
      <Button onClick={incrementNeutral} text="neutral" />
      <Button onClick={incrementBad} text="bad" />
      <h1>statistics</h1>
      <Statistics
        good={good} neutral={neutral} bad={bad}
        total={total} average={average} positive={positive} />
    </div>
  );
};

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  );
};

const Statistics = ({
  good, neutral, bad, total, average, positive
}) => {
  if (good === 0 && neutral === 0 && bad === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    );
  }

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={good} />
        <StatisticLine text="neutral" value={neutral} />
        <StatisticLine text="bad" value={bad} />
        <StatisticLine text="all" value={total} />
        <StatisticLine text="average" value={average} />
        <StatisticLine text="positive" value={positive + " %"} />
      </tbody>
      
    </table>
  );
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

export default App;