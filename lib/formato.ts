export function formatARS(valor: number) {
  const entero = Math.round(Math.abs(valor));
  const agrupado = String(entero).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${valor < 0 ? "-" : ""}$ ${agrupado}`;
}
