import axios from "axios";
import  { Component } from "react";
import {  IQuestion } from "../Question";
import "./style.css";

interface Props {
  question: IQuestion;
}
interface State {
  questions: IQuestion[];
}


const Question = ({ question }: Props) => (
  <tr>
    <td>{question._id}</td>
    <td>{question.title}</td>
    <td>{question.body}</td>
    <td>{question.category}</td>
    <td>{question.createdAt.toLocaleString()}</td>
    <td>{question.updatedAt.toLocaleString()}</td>
  </tr>
);

class ViewQuestions extends Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = { questions: [] };
  }

  componentDidMount() {
    axios
      .get("https://be-a-developer-quiz.onrender.com/question")
      .then((res) => {
        this.setState({ questions: res.data.questions });
      })
      .catch(function (error) {
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
