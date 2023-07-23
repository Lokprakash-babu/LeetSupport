export interface IDateRenderer {
  date: string;
}
const DateRenderer = ({ date }: IDateRenderer) => {
  const [numericDate, month, year] = [
    new Date(date).getDate(),
    new Date(date).getMonth()?.toString().padStart(2, "0"),
    new Date(date).getFullYear(),
  ];

  const dateToRender = `${numericDate}/${month}/${year}`;
  return <p>{dateToRender}</p>;
};

export default DateRenderer;
