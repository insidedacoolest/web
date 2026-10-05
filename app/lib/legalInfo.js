// Central place for the entity-specific facts referenced across the legal
// pages (Termos, Privacidade, Trocas, Litígios). Update these once the
// business is formally registered (nome legal, NIF, morada, etc.) and every
// page picks up the change automatically.
export const LEGAL_INFO = {
  entityName: "[nome legal da empresa/empresário em nome individual — a preencher]",
  nif: "[NIF — a preencher]",
  address: "[morada — a preencher]",
  email: "[email de contacto — a preencher]",
  hasPhysicalStore: null, // true | false | null (por preencher)
  ralEntity: "[entidade RAL competente — a preencher, ver lista em consumidor.gov.pt/Paginas/RAL.aspx]",
};
