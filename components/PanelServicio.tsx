type Props = {
  etiqueta: string;
  titulo: string;
  descripcion?: string;
  children: React.ReactNode;
};

export default function PanelServicio({ etiqueta, titulo, descripcion, children }: Props) {
  return (
    <section className="surface-card relative w-full overflow-hidden rounded-[1.35rem] p-7 sm:p-9">
      <div className="surface-dots pointer-events-none absolute inset-0" aria-hidden />
      <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#c6a15b]/35 to-transparent" />
      <p className="relative text-[10px] font-medium uppercase tracking-[0.34em] text-[#c6a15b]/80">
        {etiqueta}
      </p>
      <h2 className="font-display relative mt-3 text-[1.85rem] font-medium tracking-tight text-white sm:text-[2rem]">
        {titulo}
      </h2>
      {descripcion ? (
        <p className="relative mt-3 max-w-md text-sm leading-relaxed text-slate-400">
          {descripcion}
        </p>
      ) : null}
      <div className="relative mt-8">{children}</div>
    </section>
  );
}
