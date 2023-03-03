import axios from "axios";
import { Component } from "react";
import { IQuestion } from "../Question";
import "./style.css";

 interface Props {
  question: IQuestion;
}
interface State {
  questions: IQuestion[];
}

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

const categoryOptions = [
  { name: "JavaScript", _id: "63f81bf1a4dc0282423ce727" },
  { name: "Html", _id: "63f824bf313a5b593a06f030" },
  { name: "Sql", _id: "63f824c9313a5b593a06f033" },
  { name: "Css", _id: "63f824b8313a5b593a06f02d" },
];

const Question = ({ question }: Props) => {
  const categoryName =
  categoryOptions.find((category) => category._id === question.category[0])
      ?.name || "Unknown";

  return (
    <tr>
      <td>{question._id}</td>
      <td>{question.title}</td>
      <td>{question.body}</td>
      <td>{categoryName}</td>
      <td>{question.difficulty}</td>
      <td>{formatDate(question.createdAt)}</td>
      <td>{formatDate(question.updatedAt)}</td>
    </tr>
  );
};

class ViewQuestions extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = { questions: [] };
  }

  componentDidMount() {
    Promise.all([
      axios.get("https://be-a-developer-quiz.onrender.com/question"),
      axios.get("https://be-a-developer-quiz.onrender.com/category"),
    ])
      .then(([questionsRes, categoriesRes]) => {
        const questions = questionsRes.data.questions;
        const categories = categoriesRes.data.categories.reduce(
          (
            acc: { [x: string]: any },
            category: { _id: string | number; name: any }
          ) => {
            acc[category._id] = category.name;
            return acc;
          },
          {}
        );

        const questionsWithCategoryNames = questions.map(
          (question: { category: string | number }) => {
            return {
              ...question,
              categoryName: categories[question.category],
            };
          }
        );

        this.setState({ questions: questionsWithCategoryNames });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  tareasListClass() {
    return this.state.questions.map(function (currQuestion, i) {
      return <Question key={i} question={currQuestion}></Question>;
    });
  }

  render() {
    return (
      <div className="container-list">
        <h2>Question Table List</h2>
        <div className="main-table">
          <table className="table-striped">
            <thead>
              <tr className="hola">
                <th>Id</th>
                <th>Title</th>
                <th>Body</th>
                <th>Category</th>
                <th>Difficulty</th>
                <th>CreatedAt</th>
                <th>UpdatedAt</th>
              </tr>
            </thead>
            <tbody>{this.tareasListClass()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ViewQuestions;
