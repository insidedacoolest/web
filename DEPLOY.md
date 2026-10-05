# Publicar o site no teu hosting (cPanel — Setup Node.js App)

Este é um site Next.js com base de dados (SQLite) e painel de administração —
precisa mesmo de correr num servidor Node.js, não é só carregar ficheiros.
Como o teu cPanel tem "Setup Node.js App", segue estes passos.

## 1. Criar a app no cPanel

1. Entra no cPanel → **Setup Node.js App** → **Create Application**.
2. **Node.js version**: escolhe a mais recente disponível (mínimo 20.9 — idealmente 22 ou superior).
3. **Application mode**: Production.
4. **Application root**: uma pasta à tua escolha, ex. `driftfactory` (fica em `/home/utilizador/driftfactory`).
5. **Application URL**: o domínio/subdomínio onde queres o site.
6. **Application startup file**: `server.js`
7. Clica **Create**.

## 2. Enviar os ficheiros

Carrega **todo o conteúdo desta pasta** (menos o que já vem excluído no zip) para
a *Application root* que definiste acima, via FTP ou o File Manager do cPanel.

Não precisas de enviar `node_modules` nem `.next` — vão ser criados no servidor.

## 3. Instalar dependências

No cPanel, dentro da tua app Node.js, usa o botão **"Run NPM Install"**
(ou, se tiveres acesso a Terminal/SSH, entra na pasta da app e corre):

```bash
npm install
```

## 4. Configurar variáveis de ambiente

O ficheiro `.env` incluído já tem valores de exemplo — **muda pelo menos a
password de admin e o SESSION_SECRET** antes de ires ao ar:

```
DATABASE_URL="file:./dev.db"
SESSION_SECRET="troca-isto-por-um-valor-aleatorio-longo"
ADMIN_EMAIL="o-teu-email@dominio.pt"
ADMIN_PASSWORD="uma-password-forte"
```

Se preferires, define estas variáveis na secção **Environment Variables** do
cPanel em vez de num ficheiro `.env` — funciona da mesma forma.

> Se mudares o email/password depois de já teres corrido o `seed` uma vez,
> só tens efeito se voltares a correr o comando de seed (passo 6) — caso
> contrário edita a password diretamente na base de dados ou apaga o
> `dev.db` e semeia de novo.

## 5. Preparar a base de dados

No Terminal do cPanel (ou SSH), dentro da pasta da app:

```bash
npx prisma generate
npx prisma migrate deploy
```

Isto cria as tabelas na base de dados `dev.db`. O ficheiro `dev.db` já vem
incluído no envio com o conteúdo atual do site (notícias, pilotos,
resultados, etc.) — **não precisas de correr o seed** a menos que queiras
recomeçar do zero. Se quiseres recomeçar do zero:

```bash
node prisma/seed.mjs
```

## 6. Build de produção

Ainda no Terminal:

```bash
npm run build
```

## 7. Arrancar a aplicação

No painel do **Setup Node.js App** do cPanel, clica em **Restart**. A app vai
correr `server.js`, que é o que liga o Next.js à porta que o cPanel atribui.

## 8. Confirmar

- Site público: abre o domínio configurado.
- Painel de administração: `/admin/login` com o email/password que definiste
  no passo 4.

## Notas importantes

- **Imagens carregadas** (pilotos, notícias, produtos, banners) ficam
  guardadas em `public/uploads/` no servidor — garante que essa pasta tem
  permissão de escrita (normalmente já tem, por defeito).
- Sempre que editares conteúdo pelo `.js`/`.jsx` do projeto (não pelo
  painel), precisas de correr `npm run build` outra vez e reiniciar a app.
  Editar conteúdo pelo **painel de administração não precisa disto** —
  aparece logo no site.
- Se o teu cPanel não tiver Terminal/SSH disponível, pede ao suporte do teu
  hosting para correrem os comandos `npm install`, `npx prisma generate`,
  `npx prisma migrate deploy` e `npm run build` por ti — são só estes quatro.
