import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(3),
  startDate: z.string().min(1),
  city: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export function AdminTournamentCreatePage() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(values: FormData) {
    // próximo passo: POST /tournaments
    console.log(values);
  }

  return (
    <div className="space-y-4">
      <h1 className="text-xl font-semibold">Criar torneio</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="rounded border bg-white p-4 space-y-3">
        <div>
          <label className="block text-sm">Nome</label>
          <input className="w-full rounded border px-3 py-2" {...register("name")} />
          {errors.name && <div className="text-sm text-red-600">{errors.name.message}</div>}
        </div>

        <div>
          <label className="block text-sm">Data de início</label>
          <input type="date" className="w-full rounded border px-3 py-2" {...register("startDate")} />
          {errors.startDate && <div className="text-sm text-red-600">{errors.startDate.message}</div>}
        </div>

        <div>
          <label className="block text-sm">Cidade</label>
          <input className="w-full rounded border px-3 py-2" {...register("city")} />
        </div>

        <button
          disabled={isSubmitting}
          className="rounded bg-black text-white px-4 py-2 disabled:opacity-60"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
