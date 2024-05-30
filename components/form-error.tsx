import { FaExclamationTriangle } from "react-icons/fa";

interface Props {
  message?: string;
}

export const FormError: React.FC<Props> = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-destructive flex items-center justify-center gap-x-2 text-sm text-white rounded-sm p-3 my-4">
      <FaExclamationTriangle className="h-4 w-4" />
      <p>{message}</p>
    </div>
  );
};
