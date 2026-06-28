import { useForm } from "react-hook-form";
import { Loader2, SendHorizontal } from "lucide-react";
import { useCreateTransaction } from "@/hooks/useTransactions";
import { useToast } from "@/hooks/useToast";
import { getErrorMessage } from "@/utils/format";

interface FormValues {
  message: string;
}

export function AddTransactionForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({ defaultValues: { message: "" } });
  const { mutate: createTransaction, isPending } = useCreateTransaction();
  const { showToast } = useToast();

  function onSubmit({ message }: FormValues) {
    createTransaction(message, {
      onSuccess: () => {
        showToast("Transaction added");
        reset();
      },
      onError: (error) => {
        showToast(getErrorMessage(error, "Couldn't process that message."), "error");
      },
    });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:gap-2">
      <div className="flex-1">
        <input
          {...register("message", {
            required: "Paste a transaction message to add it.",
            maxLength: { value: 500, message: "Message is too long." },
          })}
          type="text"
          placeholder="Paste a message, e.g. Paid Rs.250 to Zomato via UPI"
          aria-label="Raw transaction message"
          aria-invalid={Boolean(errors.message)}
          className="w-full rounded-xl border border-ink-300/60 bg-white px-4 py-2.5 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 transition-colors"
        />
        {errors.message && <p className="mt-1 text-xs text-expense">{errors.message.message}</p>}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-2.5 text-sm font-medium text-white shadow-card hover:bg-brand-600 transition-colors disabled:opacity-60"
      >
        {isPending ? <Loader2 size={16} className="animate-spin" /> : <SendHorizontal size={16} />}
        Add Transaction
      </button>
    </form>
  );
}
