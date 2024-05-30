import { FaCheckCircle } from "react-icons/fa";

interface Props {
  message?: string;
}

export const FormSuccess: React.FC<Props> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-emerald-500/80 flex items-center justify-center gap-x-2 text-sm text-white rounded-sm p-3 my-4 bg-em">
      <FaCheckCircle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
