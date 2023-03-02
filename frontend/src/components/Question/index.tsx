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

const Question = ({ Icon, _id, onClickFn, btnTxt, question }: Props) => {
  const clickQuestion = () => {
    onClickFn(_id);
  };

  return (
    <div className="grid-item" key={question._id}>
      <h5 className="title">{question.title}</h5>
      <h5 className="subtitle">{`_id: ${question._id}`}</h5>
      <h5 className="subtitle">{`body: ${question.body}`}</h5>
      <h5 className="subtitle">{`category: ${question.category}`}</h5>
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
      <h5 className="subtitle">{`Created At: ${question.createdAt}`}</h5>
      <h5 className="subtitle">{`Updated At: ${question.updatedAt}`}</h5>
      <button key={question._id} onClick={clickQuestion} className="btn">
        {btnTxt}
        {Icon ? <Icon /> : ""}
      </button>
    </div>
  );
};

export default Question;
