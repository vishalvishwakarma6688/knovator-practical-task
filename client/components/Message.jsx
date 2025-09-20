export default function Message({ type, text }) {
  const color = type === "error" ? "text-red-600" : "text-green-600";
  return <div className={`${color} mt-2`}>{text}</div>;
}