export interface IAnswer {
  answer_id: number;
  answerText: string;
  is_correct: boolean;
}

export enum Difficulty {
  EASY = "Easy",
  INTERMEDIATE = "Intermediate",
  HARD = "Hard",
}

export interface IQuestion extends IAnswer {
  _id: string;
  question_id: number;
  user_id?: string;
  title: string;
  body: string;
  category: string[];
  difficulty: Difficulty;
  answers: IAnswer[];
  createdAt: Date;
  updatedAt: Date;
}

export type Props = {
  _id: string;
  question: IQuestion;
  onClickFn: (id: string) => void;
  btnTxt: string;
  Icon?: React.ElementType;
};


const categoryOptions = [
  { name: "JavaScript", _id: "63f81bf1a4dc0282423ce727" },
  { name: "Html", _id: "63f824bf313a5b593a06f030" },
  { name: "Sql", _id: "63f824c9313a5b593a06f033" },
  { name: "Css", _id: "63f824b8313a5b593a06f02d" },
];
const Question = ({ Icon, _id, onClickFn, btnTxt, question }: Props) => {

  const categoryName =
  categoryOptions.find((category) => category._id === question.category[0])
      ?.name || "Unknown";

  const clickQuestion = () => {
    onClickFn(_id);
  };

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
    <div className="grid-item" key={question._id}>
      <h5 className="title">{question.title}</h5>
      <h5 className="subtitle">{`_id: ${question._id}`}</h5>
      <h5 className="subtitle">{`body: ${question.body}`}</h5>
      <h5 className="subtitle">{`category: ${categoryName}`}</h5>
      <h5 className="subtitle">
        {question.answers
          .filter((answer) => answer.is_correct)
          .map((answer) => {
            console.log(answer);
            return (
              <h5 className="subtitle">{`Answer: ${answer.answerText}`}</h5>
            );
          })}
      </h5>

      <h5 className="subtitle">{`Difficulty: ${question.difficulty}`}</h5>
      <h5 className="subtitle">{`Created At: ${formatDate(
        question.createdAt
      )}`}</h5>
      <h5 className="subtitle">{`Updated At: ${formatDate(
        question.updatedAt
      )}`}</h5>
      <button key={question._id} onClick={clickQuestion} className="btn">
        {btnTxt}
        {Icon ? <Icon /> : ""}
      </button>
    </div>
  );
};

export default Question;
