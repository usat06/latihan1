import React from 'react';
import { ArrowRight, ArrowLeft, ChevronRight, ChevronLeft, Sparkles, Layers, RotateCcw } from 'lucide-react';

interface PageStep {
  id: string;
  label: string;
  subLabel?: string;
}

interface PagePaginationControlProps {
  currentStep: number;
  totalSteps: number;
  steps: PageStep[];
  onNext: () => void;
  onPrev: () => void;
  onGoToStep: (stepIndex: number) => void;
}

export const PagePaginationHeader: React.FC<{
  currentStep: number;
  totalSteps: number;
  steps: PageStep[];
  onGoToStep: (stepIndex: number) => void;
}> = ({ currentStep, totalSteps, steps, onGoToStep }) => {
  const current = steps[currentStep] || steps[0];

  return (
    <div className="pt-20 pb-2 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white border-2 border-black p-3.5 sm:p-4 geo-shadow flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 bg-black text-white text-[10px] font-mono font-bold uppercase tracking-widest">
            <Layers className="w-3 h-3 text-white" />
            <span>HALAMAN {currentStep + 1} DARI {totalSteps}</span>
          </div>
          <h2 className="text-base sm:text-lg font-black uppercase text-black flex items-center gap-2">
            <span>{current.label}</span>
            {current.subLabel && <span className="text-xs font-mono font-normal text-neutral-600 hidden md:inline">({current.subLabel})</span>}
          </h2>
        </div>

        {/* Step Progress Bar Dots */}
        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto no-scrollbar py-1">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              onClick={() => onGoToStep(idx)}
              className={`px-2.5 py-1 text-xs font-mono font-bold transition-all cursor-pointer border shrink-0 ${
                idx === currentStep
                  ? 'bg-black text-white border-black geo-shadow-sm'
                  : idx < currentStep
                  ? 'bg-neutral-200 text-black border-black hover:bg-neutral-300'
                  : 'bg-white text-neutral-500 border-neutral-300 hover:border-black hover:text-black'
              }`}
              title={`Buka Halaman ${idx + 1}: ${step.label}`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export const PagePaginationControl: React.FC<PagePaginationControlProps> = ({
  currentStep,
  totalSteps,
  steps,
  onNext,
  onPrev,
  onGoToStep
}) => {
  const prevStep = currentStep > 0 ? steps[currentStep - 1] : null;
  const nextStep = currentStep < totalSteps - 1 ? steps[currentStep + 1] : steps[0];
  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div className="my-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="p-6 bg-white border-2 border-black geo-shadow space-y-6">
        
        {/* Progress Indicator */}
        <div className="flex items-center justify-between border-b-2 border-black pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-black inline-block"></span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-black">
              ALUR NAVIGASI HALAMAN ({currentStep + 1} / {totalSteps})
            </span>
          </div>
          <div className="flex items-center gap-1 text-xs font-mono font-bold">
            <span className="text-neutral-600">Langkah berikutnya:</span>
            <span className="bg-black text-white px-2 py-0.5 uppercase">{nextStep.label}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Prev Button */}
          {prevStep ? (
            <button
              onClick={onPrev}
              className="w-full sm:w-auto px-5 py-3 bg-[#f4f4f2] hover:bg-black hover:text-white text-black border-2 border-black font-mono font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all geo-shadow-hover cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Kembali ({prevStep.label})</span>
            </button>
          ) : (
            <div className="w-full sm:w-auto opacity-40 cursor-not-allowed px-5 py-3 bg-neutral-100 border-2 border-neutral-300 font-mono text-xs font-bold uppercase flex items-center justify-center gap-2 text-neutral-400">
              <ChevronLeft className="w-4 h-4" />
              <span>Halaman Awal (Beranda)</span>
            </div>
          )}

          {/* Quick Page Select Pills */}
          <div className="hidden md:flex items-center gap-1">
            {steps.map((s, i) => (
              <button
                key={s.id}
                onClick={() => onGoToStep(i)}
                className={`w-7 h-7 text-xs font-mono font-bold flex items-center justify-center border ${
                  i === currentStep
                    ? 'bg-black text-white border-black'
                    : 'bg-white text-black border-black hover:bg-neutral-200'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          {/* Next Button / Main "Lanjut" CTA */}
          <button
            onClick={onNext}
            className="w-full sm:w-auto px-6 py-3.5 bg-black hover:bg-neutral-800 text-white border-2 border-black font-mono font-bold text-sm uppercase flex items-center justify-center gap-3 transition-all geo-shadow-hover cursor-pointer group"
          >
            {isLastStep ? (
              <>
                <RotateCcw className="w-4 h-4 text-white group-hover:-rotate-45 transition-transform" />
                <span>LANJUT KE BERANDA UTAMA ↺</span>
              </>
            ) : (
              <>
                <span>LANJUT KE {nextStep.label.toUpperCase()}</span>
                <ArrowRight className="w-5 h-5 text-white group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
