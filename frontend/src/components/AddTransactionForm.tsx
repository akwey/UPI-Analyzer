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
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3 sm:flex-row sm:items-start sm:gap-3">
      <div className="flex-1 relative">
        <input
          {...register("message", {
            required: "Paste a transaction message to add it.",
            maxLength: { value: 500, message: "Message is too long." },
          })}
          type="text"
          placeholder="Paste a message, e.g. Paid Rs.250 to Zomato via UPI"
          aria-label="Raw transaction message"
          aria-invalid={Boolean(errors.message)}
          className="w-full rounded-xl border border-ink-300/60 bg-white px-4 py-3 text-sm text-ink-900 placeholder:text-ink-500 focus:outline-none focus:ring-2 focus:ring-brand-200 focus:border-brand-400 transition-all duration-200 shadow-sm hover:shadow-md"
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-expense flex items-center gap-1 animate-fade-in">
            <span className="inline-block w-1 h-1 rounded-full bg-expense"></span>
            {errors.message.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isPending}
        className="group flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-brand-500 to-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-card hover:shadow-cardHover hover:from-brand-600 hover:to-brand-700 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isPending ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <>
            <SendHorizontal size={16} className="group-hover:translate-x-0.5 transition-transform" />
            <span>Add Transaction</span>
          </>
        )}
      </button>
    </form>
  );
}
