-- ─────────────────────────────────────────────────────────────
-- Post: "5 melhores sistemas para clínica de estética em 2026"
--
-- Projeto Supabase do BLOG (zjjlnwyssucyloagqpqc). A tabela posts já existe.
-- Idempotente: reexecutar atualiza o post em vez de duplicar.
-- Fonte do conteúdo (versionada no repo):
--   content/posts/5-melhores-sistemas-para-clinica-de-estetica.html
-- ─────────────────────────────────────────────────────────────

insert into public.posts (
  slug, title, excerpt, content, category,
  read_minutes, status, published_at, cover_url, author_name
) values (
  '5-melhores-sistemas-para-clinica-de-estetica',
  '5 melhores sistemas para clínica de estética em 2026',
  'Comparamos os cinco principais sistemas de gestão para clínicas de estética do mercado brasileiro: o que cada um faz bem, quanto custa, e como escolher o que encaixa na operação da sua clínica sem trocar duas vezes.',
  $html$<nav class="blog-summary" aria-label="Neste artigo">
  <h2>Neste artigo</h2>
  <ul>
    <li><a href="#por-que-sistema">Por que uma clínica de estética precisa de um sistema (e não de mais uma planilha)</a></li>
    <li><a href="#criterios-avaliacao">Como avaliamos os sistemas desta lista</a></li>
    <li><a href="#lumia">1. Lumia — o sistema mais completo para clínicas de estética</a></li>
    <li><a href="#belle">2. Belle Software</a></li>
    <li><a href="#trinks">3. Trinks</a></li>
    <li><a href="#clinicorp">4. Clinicorp</a></li>
    <li><a href="#simples-agenda">5. Simples Agenda</a></li>
    <li><a href="#comparativo">Comparativo lado a lado</a></li>
    <li><a href="#como-escolher">Como escolher o melhor sistema para a sua clínica</a></li>
    <li><a href="#faq">Perguntas frequentes</a></li>
  </ul>
</nav>

<section id="por-que-sistema">
  <h2>Por que uma clínica de estética precisa de um sistema (e não de mais uma planilha)</h2>

  <p>Quase toda clínica de estética começa igual: a agenda no caderno ou no Google Calendar, o financeiro numa planilha, os contratos numa pasta, o histórico do paciente na cabeça de quem atende e o resto no WhatsApp. Funciona — até o dia em que para de funcionar.</p>

  <p>O ponto de ruptura raramente é dramático. É a recepcionista que passa a manhã inteira confirmando horário um por um. É a paciente que sumiu no meio do protocolo e ninguém percebeu. É o pacote de dez sessões em que ninguém sabe ao certo quantas já foram feitas. É o fim do mês em que a clínica faturou bem, mas não sobrou dinheiro — e não dá para explicar por quê.</p>

  <p>Um sistema de gestão resolve isso porque tira a operação da memória das pessoas e coloca num lugar só. Mas atenção: <strong>sistema genérico não resolve clínica de estética</strong>. Uma clínica de estética tem particularidades que um software de agendamento comum não enxerga:</p>

  <ul>
    <li><strong>Pacotes e sessões</strong> — a venda não é uma consulta avulsa, é um protocolo de 4, 8 ou 12 sessões que precisa de saldo, validade e controle de quem já usou o quê.</li>
    <li><strong>Intervalo entre sessões</strong> — laser e alguns protocolos exigem um intervalo mínimo entre aplicações. O sistema tem que impedir o agendamento errado, não só registrar.</li>
    <li><strong>Consumo de produto por atendimento</strong> — cada procedimento gasta insumo. Se o estoque não baixa sozinho, ninguém vai lançar manualmente.</li>
    <li><strong>Contrato e termo de consentimento</strong> — procedimento estético exige assinatura. Em papel, isso vira uma gaveta de risco.</li>
    <li><strong>Evolução e histórico clínico</strong> — quem atende hoje precisa saber o que foi feito na sessão passada, com qual parâmetro e qual foi a reação.</li>
    <li><strong>Comissão por profissional</strong> — cálculo por serviço, produto e pacote, com desconto aplicado. Fazer isso na mão, todo mês, é convite a erro.</li>
  </ul>

  <p>A lista abaixo reúne cinco sistemas que atendem clínicas de estética no Brasil, com o que cada um faz bem e para que perfil de clínica cada um faz mais sentido.</p>
</section>

<section id="criterios-avaliacao">
  <h2>Como avaliamos os sistemas desta lista</h2>

  <p>Antes da lista, vale dizer o que foi levado em conta. Não existe "melhor sistema" absoluto — existe o que encaixa na sua operação. Os critérios usados aqui foram:</p>

  <ul>
    <li><strong>Cobertura da operação</strong> — o sistema cobre agenda, atendimento, vendas, financeiro e estoque, ou resolve só uma parte e deixa o resto na planilha?</li>
    <li><strong>Especialização em estética</strong> — foi feito para clínica de estética ou é uma solução genérica adaptada?</li>
    <li><strong>Curva de implantação</strong> — em quanto tempo a clínica está realmente operando?</li>
    <li><strong>Automação</strong> — o que o sistema faz sozinho, sem alguém lembrar de clicar.</li>
    <li><strong>Transparência comercial</strong> — preço público, teste grátis e ausência de fidelidade.</li>
    <li><strong>Suporte</strong> — canal, disponibilidade e tempo de resposta.</li>
  </ul>

  <div class="highlight-box">
    <strong>Sobre os preços citados</strong>
    <p>Os valores mencionados são os preços de entrada divulgados publicamente pelos fabricantes em agosto de 2026 e servem apenas como referência de faixa. Planos, número de profissionais incluídos e condições mudam com frequência — confirme sempre direto com cada fornecedor antes de decidir.</p>
  </div>
</section>

<section id="lumia">
  <h2>1. Lumia — o sistema mais completo para clínicas de estética</h2>

  <p>A <a href="https://lumiaclin.com.br/">Lumia</a> é um sistema de gestão all-in-one criado especificamente para clínicas de estética, depilação a laser e emagrecimento. A diferença de posicionamento é essa: não é um software de agendamento que ganhou módulos, nem um sistema médico adaptado para estética. A operação de uma clínica de estética é o ponto de partida do produto.</p>

  <p>Na prática, isso significa que a venda de um protocolo não termina no pagamento. Ela já gera as sessões na agenda, organiza o contrato para assinatura, atualiza o financeiro e deixa a clínica pronta para os próximos atendimentos — sem ninguém repetir o mesmo dado em quatro lugares.</p>

  <h3>Agenda com validação de verdade</h3>
  <p>Visualização diária, semanal e mensal, agendamento por arrastar e soltar, reagendamento movendo o card e bloqueio de períodos com motivo. O sistema impede agendamento fora do horário de trabalho do profissional, bloqueia sobreposição e permite definir <strong>intervalo mínimo entre sessões do mesmo procedimento</strong> — a regra que evita marcar laser antes da hora. Cada atendimento percorre um status rastreável: agendado, confirmado, realizado, faltou, cancelado ou reagendado.</p>

  <h3>Pacotes, sessões e saldo automático</h3>
  <p>Pacotes de sessões com saldo controlado pelo sistema. Ninguém precisa conferir na planilha quantas sessões restam: o saldo aparece no perfil da paciente e é baixado quando o atendimento é realizado.</p>

  <h3>Atendimento com assinatura digital</h3>
  <p>O atendimento é registrado com os procedimentos realizados (incluindo campos específicos de laser, como potência e frequência), os produtos usados, as observações clínicas e a <strong>assinatura digital coletada na hora</strong> — na tela, com o dedo, ou por foto. O contrato é enviado para assinatura com validade jurídica e fica arquivado em PDF. Ao finalizar, a sessão muda para "realizada", o estoque dos produtos usados baixa sozinho e o atendimento entra na timeline da paciente.</p>

  <h3>CRM que acompanha até a recompra</h3>
  <p>Funil de vendas do primeiro contato do lead à próxima venda. A equipe vê quais oportunidades estão paradas, quem não voltou e quem está pronto para um novo protocolo — em vez de descobrir isso quando a agenda já esvaziou.</p>

  <h3>Financeiro com foco em lucro, não em faturamento</h3>
  <p>Receita, despesas, margem, inadimplência e rentabilidade por procedimento, com DRE. Serve para responder a pergunta que a planilha nunca respondeu: dos procedimentos que a clínica vende, quais realmente dão lucro.</p>

  <h3>Lumia AI e Escuta Ativa</h3>
  <p>A IA da Lumia trabalha sobre os dados reais da clínica, não em respostas genéricas: dá para perguntar pelos números do mês, encontrar pacientes em atraso, checar o estoque ou gerar um relatório em segundos. A <strong>Escuta Ativa</strong> grava a consulta direto no perfil da paciente, transcreve em tempo real e gera o relatório da conversa — o profissional conversa olhando para a paciente, não para o teclado.</p>

  <h3>Automação de WhatsApp</h3>
  <p>Confirmação automática de agendamento, régua de comunicação e campanhas segmentadas. É o recurso com efeito mais imediato na maioria das clínicas: as clínicas que ativam a confirmação automática relatam <strong>até 40% menos faltas</strong>, e a recepção recupera cerca de <strong>3 horas por dia</strong> antes gastas confirmando, remarcando e lançando dado manualmente.</p>

  <div class="highlight-box">
    <strong>Resumo da Lumia</strong>
    <p><strong>Preço:</strong> a partir de R$ 349,90/mês por unidade, com todos os módulos incluídos.<br>
    <strong>Teste:</strong> 14 dias grátis, sem cartão de crédito.<br>
    <strong>Fidelidade:</strong> nenhuma — cancele quando quiser, sem multa.<br>
    <strong>Implantação:</strong> onboarding guiado; a maioria das clínicas opera 100% em menos de 48 horas.<br>
    <strong>Suporte:</strong> chat e WhatsApp todos os dias, com tempo médio de resposta de 4 minutos.<br>
    <strong>Base:</strong> mais de 100 clínicas de estética, laser e emagrecimento.</p>
  </div>

  <h3>Pontos de atenção</h3>
  <p>A Lumia é feita para clínica de estética — se o seu negócio é um salão de beleza com estética como serviço secundário, ou um consultório odontológico, existem opções mais aderentes nesta mesma lista. E o preço de entrada é mais alto que o de sistemas focados só em agendamento: a conta fecha quando a clínica realmente usa vendas, financeiro, estoque e CRM, não apenas a agenda.</p>

  <div class="cta-section">
    <h2>Teste a Lumia por 14 dias, de graça</h2>
    <p>Sem cartão de crédito, sem fidelidade e com implantação assistida. Veja a sua clínica organizada em menos de 48 horas.</p>
    <a class="cta-button" href="https://app.lumiaclin.com.br/">Começar teste grátis</a>
  </div>
</section>

<section id="belle">
  <h2>2. Belle Software</h2>

  <p>O <a href="https://www.bellesoftware.com.br/" rel="nofollow">Belle Software</a> é um dos nomes mais tradicionais no segmento de estética no Brasil e uma referência para quem procura um sistema especializado. Reúne agenda, painel de atendimentos, financeiro, CRM e automação de marketing numa plataforma só.</p>

  <p>Entre os destaques estão a gestão de comissões de profissionais — calculadas automaticamente sobre vendas, planos e produtos —, o controle de permissões por usuário e a gestão de salas e equipamentos, que evita o conflito clássico de duas profissionais agendarem a mesma maca ou o mesmo aparelho no mesmo horário. Também oferece aplicativos separados para profissionais e para clientes.</p>

  <p>Na parte de infraestrutura, todos os planos incluem hospedagem em nuvem, backup diário, atualizações, usuários ilimitados, cadastros de clientes ilimitados e armazenamento ilimitado. O treinamento é remoto e coletivo, distribuído em sessões de cerca de uma hora.</p>

  <p><strong>Pontos de atenção:</strong> o preço não é publicado no site — é preciso pedir proposta, e o valor varia conforme o número de agendas liberadas. Além disso, os planos anual e bienal (que trazem os descontos de 15% e 26%) têm fidelidade, com multa de 50% do saldo devedor em caso de cancelamento antecipado. O plano mensal exige aviso prévio de 30 dias.</p>

  <p><strong>Melhor para:</strong> clínicas de estética que querem um sistema especializado e consolidado, com muitos profissionais e necessidade forte de controle de comissões, salas e equipamentos — e que não se incomodam com contrato de fidelidade em troca de desconto.</p>
</section>

<section id="trinks">
  <h2>3. Trinks</h2>

  <p>Fundado em 2015, o <a href="https://www.trinks.com/" rel="nofollow">Trinks</a> é uma das plataformas mais conhecidas do mercado brasileiro de beleza. Atende salões, barbearias, spas e clínicas de estética, com preço de entrada por volta de R$ 89/mês.</p>

  <p>O grande diferencial do Trinks não está só no software: está na vitrine. A plataforma tem um marketplace próprio de agendamento, em que a cliente encontra o estabelecimento e marca horário sozinha. Para quem depende de captação, isso é um canal a mais — algo que nenhum sistema puramente interno oferece.</p>

  <p>No dia a dia, entrega agendamento online com autonomia para a cliente, controle financeiro com receitas, despesas e lucro em tempo real, e comunicação automatizada por SMS, e-mail e WhatsApp (lembretes, aniversário, promoções). Tem ainda um mapa de calor que mostra horários de pico e serviços mais procurados, e integração com a conta digital Stone e a maquininha Belezinha, com divisão automática de comissões.</p>

  <p><strong>Pontos de atenção:</strong> o Trinks é, na origem, um sistema de beleza — e isso aparece. Recursos específicos de clínica de estética, como controle de intervalo mínimo entre sessões de laser, registro de parâmetros de equipamento, evolução clínica estruturada e termo de consentimento assinado digitalmente, não são o foco do produto.</p>

  <p><strong>Melhor para:</strong> salões de beleza e barbearias que oferecem estética como serviço complementar, e para negócios que querem aproveitar o marketplace do Trinks como canal de captação.</p>
</section>

<section id="clinicorp">
  <h2>4. Clinicorp</h2>

  <p>O <a href="https://www.clinicorp.com/" rel="nofollow">Clinicorp</a> nasceu no mercado odontológico e expandiu para estética. É um sistema robusto, com mais de 60 funcionalidades cobrindo desde o primeiro contato do paciente até a execução do tratamento, e planos a partir de R$ 149,90/mês nas versões Standard e Premium.</p>

  <p>A força do Clinicorp está na gestão financeira e na análise. O sistema trabalha com múltiplos meios de pagamento com baixa automática, ferramentas de redução de inadimplência e uma biblioteca ampla de relatórios: fluxo de caixa, faltas, desmarcações, primeiras consultas, aniversariantes e orçamentos em aberto. Também tem integração com WhatsApp para a comunicação com pacientes.</p>

  <p>Outro ponto forte é a operação multiunidade: o Clinicorp foi desenhado para atender redes e franquias, com gestão centralizada de várias unidades num único sistema — um cenário em que muitos concorrentes menores não competem.</p>

  <p><strong>Pontos de atenção:</strong> a origem odontológica ainda define boa parte da linguagem e da estrutura do produto, o que exige adaptação em uma clínica de estética pura. Os recursos de IA são vendidos em combos separados, à parte da mensalidade — vale somar isso ao custo total antes de comparar preços.</p>

  <p><strong>Melhor para:</strong> redes e franquias com várias unidades, e clínicas que combinam odontologia e estética (como as que trabalham com harmonização orofacial).</p>
</section>

<section id="simples-agenda">
  <h2>5. Simples Agenda</h2>

  <p>O <a href="https://www.simplesagenda.com.br/" rel="nofollow">Simples Agenda</a> é um ERP de gestão online que atende pequenas e médias empresas de vários segmentos, com uma frente dedicada a clínicas de estética. Já são mais de 3.900 clínicas na base, e os planos começam em R$ 39,90/mês.</p>

  <p>O modelo comercial é o mais transparente da lista: <strong>as funcionalidades são as mesmas em todos os planos</strong> — o que muda é apenas a quantidade de profissionais. Não há custo de implantação, o pagamento pode ser feito em cartão, boleto ou Pix, e o teste grátis é de 35 dias, sem cartão. Para uma esteticista autônoma ou uma clínica pequena, é difícil achar barreira de entrada menor.</p>

  <p>Na parte de estética, entrega anamnese digital, pacotes de sessões, agenda online, WhatsApp automático e Pix. A gestão de comissões é detalhada, com cálculo automático por serviço, produto, pacote e desconto aplicado, e o financeiro tem fluxo de caixa integrado. Há app mobile para acompanhar a clínica pelo celular e controle de acesso por profissional, com atenção à LGPD.</p>

  <p><strong>Pontos de atenção:</strong> por ser um ERP multissegmento — atende de fotógrafo a prestador de serviço —, a profundidade em estética avançada é menor. Quem trabalha com laser, protocolos longos com evolução clínica estruturada ou precisa de CRM comercial e inteligência de dados vai encontrar limites conforme a clínica cresce.</p>

  <p><strong>Melhor para:</strong> esteticistas autônomas e clínicas pequenas que precisam sair da planilha com o menor custo e o menor atrito possíveis.</p>
</section>

<section id="comparativo">
  <h2>Comparativo lado a lado</h2>

  <div class="table-wrap">
    <table>
      <thead>
        <tr>
          <th>Sistema</th>
          <th>Preço de entrada</th>
          <th>Teste grátis</th>
          <th>Foco principal</th>
          <th>Melhor para</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Lumia</strong></td>
          <td>R$ 349,90/mês</td>
          <td>14 dias, sem cartão</td>
          <td>Clínica de estética, laser e emagrecimento</td>
          <td>Clínicas que querem toda a operação em um sistema só</td>
        </tr>
        <tr>
          <td><strong>Belle Software</strong></td>
          <td>Sob consulta</td>
          <td>Sim</td>
          <td>Clínica de estética</td>
          <td>Clínicas com muitos profissionais, salas e equipamentos</td>
        </tr>
        <tr>
          <td><strong>Trinks</strong></td>
          <td>A partir de R$ 89/mês</td>
          <td>Sim</td>
          <td>Beleza (salões, barbearias, spas)</td>
          <td>Salões com estética complementar e captação via marketplace</td>
        </tr>
        <tr>
          <td><strong>Clinicorp</strong></td>
          <td>A partir de R$ 149,90/mês</td>
          <td>Sim</td>
          <td>Odontologia e estética</td>
          <td>Redes, franquias e clínicas com odonto + estética</td>
        </tr>
        <tr>
          <td><strong>Simples Agenda</strong></td>
          <td>A partir de R$ 39,90/mês</td>
          <td>35 dias, sem cartão</td>
          <td>ERP multissegmento</td>
          <td>Autônomas e clínicas pequenas saindo da planilha</td>
        </tr>
      </tbody>
    </table>
  </div>

  <p>Valores de referência coletados em agosto de 2026 nos sites oficiais dos fabricantes. Confirme as condições vigentes com cada fornecedor.</p>
</section>

<section id="como-escolher">
  <h2>Como escolher o melhor sistema para a sua clínica</h2>

  <p>Trocar de sistema dá trabalho, e trocar duas vezes dá o dobro. Antes de assinar qualquer contrato, passe a decisão por estes sete filtros:</p>

  <ol>
    <li><strong>Liste a sua operação real, não a ideal.</strong> Escreva tudo o que a clínica faz hoje — da confirmação de horário ao fechamento do caixa. Esse é o checklist contra o qual você vai testar cada sistema. Demonstração bonita esconde buraco de processo.</li>
    <li><strong>Cheque as regras específicas de estética.</strong> Pacote com saldo de sessões, intervalo mínimo entre aplicações, baixa automática de estoque por atendimento, evolução clínica e termo de consentimento assinado. Se o sistema não cobre isso, a planilha volta pela porta dos fundos.</li>
    <li><strong>Pergunte o que acontece sozinho.</strong> A diferença entre um sistema que organiza e um que só registra está na automação. Se alguém precisa lembrar de clicar, em três meses ninguém clica mais.</li>
    <li><strong>Some o custo total, não a mensalidade.</strong> Implantação, treinamento, módulos vendidos à parte, combos de IA, taxa por usuário adicional. O plano de R$ 89 pode custar mais que o de R$ 349 quando você fecha a conta do ano.</li>
    <li><strong>Leia a cláusula de fidelidade.</strong> Descontos de 15% ou 26% em planos longos são atraentes — até você precisar sair antes e descobrir a multa sobre o saldo devedor. Se a clínica está em fase de teste, prefira mensal sem fidelidade.</li>
    <li><strong>Teste com dados reais.</strong> Use o período gratuito para rodar uma semana de verdade: cadastre pacientes, venda um pacote, faça um atendimento, emita um contrato, feche o caixa. Sistema se revela no uso, não no vídeo de demonstração.</li>
    <li><strong>Avalie o suporte antes de contratar.</strong> Mande uma dúvida no canal de atendimento durante o teste e cronometre a resposta. É a melhor previsão de como será o suporte quando o sistema cair numa sexta-feira cheia.</li>
  </ol>

  <div class="highlight-box">
    <strong>O erro mais caro na escolha</strong>
    <p>Escolher pelo preço da mensalidade e descobrir depois que o sistema resolve só a agenda. A clínica continua com a planilha do financeiro, a pasta dos contratos e o controle de pacote no caderno — e agora paga por isso.</p>
  </div>
</section>

<section id="faq" class="faq-section">
  <h2>Perguntas frequentes</h2>

  <details>
    <summary>Qual o melhor sistema para clínica de estética?</summary>
    <p>Para clínicas que querem toda a operação em um sistema só, a Lumia é a opção mais completa: reúne agenda inteligente, funil de vendas (CRM), vendas com contrato digital, financeiro com DRE, prontuários, estoque, automações de WhatsApp e uma IA nativa numa única plataforma, a partir de R$ 349,90/mês. Para salões com estética complementar, o Trinks faz mais sentido. Para redes e franquias, o Clinicorp. Para esteticistas autônomas começando, o Simples Agenda tem a menor barreira de entrada.</p>
  </details>

  <details>
    <summary>Quanto custa um sistema para clínica de estética?</summary>
    <p>A faixa de mercado vai de cerca de R$ 39,90/mês, em sistemas focados em agendamento para autônomos, a R$ 350/mês ou mais em plataformas all-in-one com financeiro, CRM, estoque e IA inclusos. O que define o custo real não é a mensalidade, e sim quantos módulos estão incluídos e quantos são cobrados à parte.</p>
  </details>

  <details>
    <summary>Vale a pena trocar a planilha por um sistema?</summary>
    <p>Vale quando a clínica já perde dinheiro com o método atual — em faltas não confirmadas, pacotes descontrolados, comissões calculadas errado ou pacientes que sumiram sem ninguém notar. Na prática, o sistema costuma se pagar só com a redução de faltas: clínicas que ativam confirmação automática por WhatsApp relatam até 40% menos no-show.</p>
  </details>

  <details>
    <summary>Quanto tempo leva para implantar um sistema na clínica?</summary>
    <p>Depende do sistema e do volume de dados a migrar. Com onboarding guiado, a maioria das clínicas da Lumia está operando 100% em menos de 48 horas. Sistemas que entregam só o acesso e um manual costumam levar semanas — pergunte sobre o processo de implantação antes de contratar, não depois.</p>
  </details>

  <details>
    <summary>Preciso migrar todos os meus dados antigos?</summary>
    <p>Não é obrigatório. Muitas clínicas começam com o cadastro de pacientes ativos e os pacotes em andamento, e deixam o histórico antigo arquivado. Na Lumia, a importação de contatos, histórico de agendamentos e dados financeiros é feita junto com um especialista.</p>
  </details>

  <details>
    <summary>Existe sistema para clínica de estética sem fidelidade?</summary>
    <p>Sim. A Lumia não tem fidelidade — o cancelamento pode ser feito a qualquer momento, sem multa. Atenção ao comparar: vários fornecedores oferecem descontos relevantes em planos anuais ou bienais, mas esses planos costumam prever multa sobre o saldo devedor em caso de cancelamento antecipado.</p>
  </details>

  <details>
    <summary>O sistema precisa se integrar com o WhatsApp?</summary>
    <p>Para clínica de estética, sim — é o canal em que a paciente de fato responde. A integração resolve confirmação de agendamento, lembrete de sessão, retorno de quem sumiu e campanha para a base. É o recurso com retorno mais rápido: devolve horas da recepção e reduz faltas já no primeiro mês.</p>
  </details>
</section>

<div class="cta-section">
  <h2>Veja a Lumia funcionando na sua clínica</h2>
  <p>Agenda, pacotes, vendas, financeiro, estoque e IA conectados em um único sistema feito para clínicas de estética. 14 dias grátis, sem cartão e sem fidelidade.</p>
  <a class="cta-button" href="https://app.lumiaclin.com.br/">Começar teste grátis</a>
</div>$html$,
  'Gestão',
  13,
  'published',
  now(),
  '/images/blog/5-melhores-sistemas-para-clinica-de-estetica.png',
  'Time Lumia'
)
on conflict (slug) do update set
  title        = excluded.title,
  excerpt      = excluded.excerpt,
  content      = excluded.content,
  category     = excluded.category,
  read_minutes = excluded.read_minutes,
  status       = excluded.status,
  cover_url    = excluded.cover_url,
  author_name  = excluded.author_name;
