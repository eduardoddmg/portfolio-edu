'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

// Taxa SELIC anual convertida para mensal
const SELIC_MENSAL = (1 + 0.1275) ** (1 / 12) - 1;

const FormSchema = z.object({
  initialDeposit: z
    .string()
    .nonempty({ message: 'Depósito inicial deve ser maior que 0.' }),
  monthlyDeposit: z
    .string()
    .nonempty({ message: 'Depósito mensal é obrigatório.' }),
  months: z
    .number()
    .min(1, { message: 'A quantidade de meses deve ser pelo menos 1.' }),
});

export default function SavingsForm() {
  const [result, setResult] = useState<string | null>(null); // Mudança para string formatada
  const [totalInvestido, setTotalInvestido] = useState<string>('0,00');
  const [months, setMonths] = useState<number>(0);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      initialDeposit: 'R$ 500,00',
      monthlyDeposit: 'R$ 500,00',
      months: 12,
    },
  });

  // Função para formatar valores para BRL (R$)
  const formatBRL = (value: string | number) => {
    const numericValue =
      typeof value === 'string'
        ? parseFloat(value.replace(/\D/g, '')) / 100
        : value;

    return isNaN(numericValue)
      ? ''
      : new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(numericValue);
  };

  // Função para remover formatação e converter para número
  const parseCurrencyToNumber = (value: string) => {
    return parseFloat(value.replace(/[^\d,]/g, '').replace(',', '.')) || 0;
  };

  // Função para adicionar ou subtrair R$ 50
  const adjustValue = (currentValue: string, amount: number) => {
    const numericValue = parseCurrencyToNumber(currentValue);
    const adjustedValue = Math.max(0, numericValue + amount); // Garante que o valor não seja negativo
    return formatBRL(adjustedValue.toFixed(2).toString());
  };

  function calculateSavings(data: z.infer<typeof FormSchema>) {
    const initialDeposit = parseCurrencyToNumber(data.initialDeposit);
    const monthlyDeposit = parseCurrencyToNumber(data.monthlyDeposit);
    const { months } = data;

    let total = initialDeposit;
    let totalInvested = initialDeposit;

    for (let i = 1; i <= months; i++) {
      total += monthlyDeposit;
      total *= 1 + SELIC_MENSAL;
      totalInvested += monthlyDeposit;
    }

    setResult(formatBRL(total)); // Resultado formatado como BRL
    setTotalInvestido(formatBRL(totalInvested)); // Total investido formatado
    setMonths(months);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(calculateSavings)}
        className="lg:w-2/3 space-y-6"
      >
        <FormField
          control={form.control}
          name="initialDeposit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Depósito Inicial (R$)</FormLabel>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={() => field.onChange(adjustValue(field.value, -50))}
                >
                  -
                </Button>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Ex: R$ 1.000,00"
                    value={field.value}
                    onChange={(e) => field.onChange(formatBRL(e.target.value))}
                  />
                </FormControl>
                <Button
                  type="button"
                  onClick={() => field.onChange(adjustValue(field.value, 50))}
                >
                  +
                </Button>
              </div>
              <FormDescription>
                Valor que será depositado inicialmente.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="monthlyDeposit"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Depósito Mensal (R$)</FormLabel>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  onClick={() => field.onChange(adjustValue(field.value, -50))}
                >
                  -
                </Button>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Ex: R$ 200,00"
                    value={field.value}
                    onChange={(e) => field.onChange(formatBRL(e.target.value))}
                  />
                </FormControl>
                <Button
                  type="button"
                  onClick={() => field.onChange(adjustValue(field.value, 50))}
                >
                  +
                </Button>
              </div>
              <FormDescription>
                Valor que será depositado mensalmente.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="months"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade de Meses</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Ex: 24"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value || 0))}
                />
              </FormControl>
              <FormDescription>
                Duração em meses do investimento.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Calcular</Button>
      </form>

      {result !== null && (
        <div className="p-6 border rounded-lg shadow-md bg-white lg:w-2/3">
          <p className="text-lg font-medium">
            Total investido: <span className="font-bold">{totalInvestido}</span>
          </p>
          <p className="mt-2 text-lg">
            Em <span className="font-bold">{months}</span> meses seu retorno
            pode ser de até:
          </p>
          <p className="mt-2 text-2xl font-bold">{result}</p>
          <p className="mt-1 text-sm text-gray-600">
            Se selecionado o investimento com maior rentabilidade descontando
            IR.
          </p>
        </div>
      )}
    </Form>
  );
}
