import { Suspense } from "react";
import PagamentoClient from "./PagamentoClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <PagamentoClient />
    </Suspense>
  );
}
