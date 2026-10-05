import Link from "next/link";

export const metadata = {
  title: "Regulamento Drift Virtual — Drift Factory",
  description: "Regras de participação, formatos de competição e sistema de pontuação da liga Drift Virtual.",
};

export default function RegulamentoDriftVirtualPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <div className="breadcrumb">
            <Link href="/">Início</Link> / <Link href="/drift-virtual">Drift Virtual</Link> / Regulamento
          </div>
          <span className="eyebrow pink">Sim racing</span>
          <h1 className="display h1">Regulamento Drift Virtual</h1>
        </div>
      </section>

      <section className="section">
        <div className="container legal-page">
          <p className="legal-updated">Última atualização: 24 de agosto de 2026.</p>

          <h2>1. Âmbito e plataformas</h2>
          <p>
            A liga Drift Virtual da Drift Factory decorre nas plataformas <strong>Assetto
            Corsa</strong> e <strong>CarX Drift Racing</strong>. Cada sessão ou ronda indica no
            calendário a plataforma e o traçado utilizados. As classificações de cada plataforma
            são geridas de forma independente, salvo indicação em contrário.
          </p>

          <h2>2. Participação</h2>
          <p>
            A participação é gratuita e aberta a qualquer piloto com conta na plataforma
            correspondente e acesso ao servidor Discord da Drift Factory, onde são anunciadas as
            sessões e comunicada a voz durante as batalhas. Não há limite de idade, mas
            recomenda-se supervisão de um adulto para menores de 16 anos.
          </p>

          <h2>3. Formatos de competição</h2>

          <h3>3.1 Leaderboard Semanal</h3>
          <p>
            Sessões abertas no servidor online da Drift Factory, disponíveis durante toda a
            semana. Os pilotos submetem as suas melhores voltas/batalhas solo, pontuáveis para o
            leaderboard público. Os 16 melhores classificados da semana garantem lugar nas
            Sextas de Batalha.
          </p>

          <h3>3.2 Sextas de Batalha</h3>
          <p>
            Realizam-se às sexta-feiras, com hora marcada (ver <Link href="/drift-virtual">página
            Drift Virtual</Link> para a próxima sessão). Os 16 qualificados do Leaderboard
            Semanal competem entre si em formato eliminatório de batalhas a par (tandem),
            avaliadas por juízes da organização ou por votação da comunidade, consoante anunciado
            antes da sessão.
          </p>

          <h3>3.3 Campeonato Anual</h3>
          <p>
            Os 32 pilotos mais bem classificados na soma do Leaderboard Semanal e das Sextas de
            Batalha ao longo da época disputam o Campeonato Anual, num total de 5 rondas, em
            traçados anunciados com antecedência. O vencedor da ronda final é coroado campeão da
            época.
          </p>

          <h2>4. Sistema de pontuação</h2>
          <ul>
            <li><strong>Leaderboard Semanal:</strong> pontuação atribuída pela melhor volta/execução solo submetida na semana.</li>
            <li><strong>Sextas de Batalha:</strong> pontos atribuídos por progressão na eliminatória (ex.: presença, oitavos, quartos, meias-finais, final, vitória).</li>
            <li><strong>Campeonato Anual:</strong> soma de pontos das 5 rondas; em caso de empate, desempata o maior número de vitórias em batalhas diretas entre os pilotos empatados.</li>
          </ul>
          <p>
            Os critérios de pontuação detalhados por ronda são publicados junto de cada evento no
            calendário e podem ser ajustados pela organização entre épocas.
          </p>

          <h2>5. Conduta e fair-play</h2>
          <ul>
            <li>É proibido o uso de mods, cheats, ou qualquer software que altere artificialmente o desempenho do veículo ou a física do jogo.</li>
            <li>Espera-se respeito pelos outros pilotos e pela organização, dentro e fora de pista — incluindo no servidor de Discord.</li>
            <li>Contacto propositado entre viaturas para prejudicar outro piloto não é tolerado.</li>
            <li>Setups e ajustes ao veículo devem respeitar os limites definidos para cada ronda/formato, quando aplicável.</li>
          </ul>

          <h2>6. Penalizações</h2>
          <p>
            O incumprimento das regras de conduta pode resultar, consoante a gravidade e
            reincidência, em: aviso, perda de pontos na sessão, desqualificação da sessão, ou
            suspensão da liga por um número de sessões a determinar pela organização. Casos graves
            de batota (uso de cheats) resultam em banimento imediato da liga.
          </p>

          <h2>7. Alterações ao regulamento</h2>
          <p>
            A Drift Factory pode ajustar este regulamento entre épocas ou, em casos excecionais,
            durante a época em curso — sendo a alteração sempre comunicada com antecedência no
            Discord e refletida nesta página com a respetiva data de atualização.
          </p>

          <h2>8. Dúvidas</h2>
          <p>
            Para qualquer dúvida sobre o regulamento, contacta a organização através do Discord da
            Drift Factory.
          </p>
        </div>
      </section>
    </>
  );
}
