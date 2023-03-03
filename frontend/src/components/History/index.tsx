import { useState, useEffect } from "react";
import { useDataContext } from "../../context/context";
import "./style.css";

interface IAnswer {
  answer_id: number;
  answerText: string;
  createdAt: Date;
  is_correct: boolean;
}

interface IMatchHistory {
  user_id: string;
  date: Date;
  category: string;
  answers: IAnswer[];
}

const ViewMatch = () => {
  const [matchHistory, setMatchHistory] = useState<IMatchHistory[]>([]);
  const context = useDataContext();

  console.log("context", context.userId);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (context.userId) {
          const res = await fetch(
            `https://be-a-developer-quiz.onrender.com/user/match-history/${context.userId}`
          );
          const data = await res.json();
          setMatchHistory(data.matchHistory);
        } else {
          console.log("User ID is null");
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [context.userId]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(new Date(date));
  };

  return (
    <div className="match-history">
      <h2>Match History</h2>
      <div className="main-table">
        <table className="table-striped">
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {matchHistory.map((match) => (
              <tr key={match.date.toString()}>
                <td>{formatDate(match.date)}</td>
                <td>{match.category}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewMatch;
