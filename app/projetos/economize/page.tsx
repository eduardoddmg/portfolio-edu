'use client';

import { useState } from 'react';
import { Slider } from '@/components/ui/slider';

// Taxa SELIC anual convertida para mensal
const SELIC_MENSAL = (1 + 0.1275) ** (1 / 12) - 1;

export default function DynamicSavingsCalculator() {
  const [initialDeposit, setInitialDeposit] = useState(1000); // Depósito inicial padrão
  const [monthlyDeposit, setMonthlyDeposit] = useState(200); // Depósito mensal padrão
  const [months, setMonths] = useState(24); // Quantidade de meses padrão

  const calculateSavings = () => {
    let total = initialDeposit;
    let totalInvested = initialDeposit;

    for (let i = 1; i <= months; i++) {
      total += monthlyDeposit;
      total *= 1 + SELIC_MENSAL;
      totalInvested += monthlyDeposit;
    }

    return { total, totalInvested };
  };

  const { total, totalInvested } = calculateSavings();

  return (
    <div className="p-6 border rounded-lg shadow-md bg-white space-y-6">
      <h2 className="text-2xl font-bold">Calculadora de Investimentos</h2>

      {/* Slider para Depósito Inicial */}
      <div>
        <label className="text-lg font-medium">Depósito Inicial (R$):</label>
        <Slider
          defaultValue={[1000]}
          min={0}
          max={50000}
          step={100}
          onValueChange={(value) => setInitialDeposit(value[0])}
        />
        <p className="mt-2 text-sm">
          Valor atual: R$ {initialDeposit.toFixed(2)}
        </p>
      </div>

      {/* Slider para Depósito Mensal */}
      <div>
        <label className="text-lg font-medium">Depósito Mensal (R$):</label>
        <Slider
          defaultValue={[200]}
          min={0}
          max={5000}
          step={50}
          onValueChange={(value) => setMonthlyDeposit(value[0])}
        />
        <p className="mt-2 text-sm">
          Valor atual: R$ {monthlyDeposit.toFixed(2)}
        </p>
      </div>

      {/* Slider para Quantidade de Meses */}
      <div>
        <label className="text-lg font-medium">Quantidade de Meses:</label>
        <Slider
          defaultValue={[24]}
          min={1}
          max={120}
          step={1}
          onValueChange={(value) => setMonths(value[0])}
        />
        <p className="mt-2 text-sm">Duração: {months} meses</p>
      </div>

      {/* Resultado */}
      <div className="p-6 border rounded-lg shadow-md bg-gray-100">
        <p className="text-lg font-medium">
          Total investido:{' '}
          <span className="font-bold">R$ {totalInvested.toFixed(2)}</span>
        </p>
        <p className="mt-2 text-lg">
          Em <span className="font-bold">{months}</span> meses seu retorno pode
          ser de até:
        </p>
        <p className="mt-2 text-2xl font-bold text-purple-700">
          R$ {total.toFixed(2)}
        </p>
        <p className="mt-1 text-sm text-gray-600">
          Se selecionado o investimento com maior rentabilidade descontando IR.
        </p>
      </div>
    </div>
  );
}
