CREATE DATABASE cronsport;
USE cronsport;

CREATE TABLE noticias (
	idNoticias INT PRIMARY KEY AUTO_INCREMENT,
	titulo VARCHAR(500) NOT NULL,
	categoria VARCHAR(255) NOT NULL,
	descricao VARCHAR(500) NOT NULL,
	conteudo LONGTEXT NOT NULL,
	data_publicacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE noticias ADD COLUMN imagem VARCHAR(500) NOT NULL;

SELECT * FROM noticias;

TRUNCATE noticias;

INSERT INTO noticias
(titulo, categoria, descricao, conteudo, imagem)
VALUES
(
'Jovens talentos ganham espaço e renovam o futebol brasileiro',
'Futebol',
'Clubes brasileiros ampliam as oportunidades para jogadores formados nas categorias de base. A aposta em novos talentos pode fortalecer os elencos, aumentar a concorrência por posições e revelar atletas capazes de decidir partidas importantes.',
'A utilização de jovens jogadores tem ganhado espaço no planejamento de equipes que procuram renovar seus elencos e desenvolver atletas para o futuro. Muitos clubes investem em centros de treinamento, acompanhamento técnico e preparação física para facilitar a transição entre as categorias de base e o futebol profissional. Entretanto, conquistar uma vaga entre os titulares exige muito mais do que demonstrar habilidade durante os treinamentos. Os jovens precisam aprender a tomar decisões sob pressão, manter a concentração durante os noventa minutos e compreender as exigências táticas de cada partida. A presença de jogadores experientes também pode contribuir para acelerar esse processo, oferecendo referências dentro e fora de campo. Quando recebem oportunidades de maneira planejada, os atletas podem acrescentar velocidade, criatividade e novas alternativas ao sistema de jogo. Para os treinadores, o desafio consiste em equilibrar o desenvolvimento dos talentos com a necessidade de conquistar resultados. O sucesso dessa estratégia depende da continuidade do trabalho e da capacidade de transformar potencial em desempenho consistente ao longo da temporada.',
'https://www.sistemampa.com.br/wp-content/uploads/2026/10/cover-1034-1024x577.jpg'
),
(
'Basquete nacional intensifica preparação para a fase decisiva',
'Basquete',
'Equipes ajustam suas estratégias defensivas e ofensivas antes dos confrontos eliminatórios. A regularidade nos arremessos, o controle dos rebotes e a participação coletiva podem ser determinantes para avançar na competição.',
'A aproximação da fase decisiva aumenta a intensidade dos treinamentos e exige atenção aos detalhes que podem definir uma partida de basquete. As equipes trabalham para melhorar a comunicação defensiva, reduzir os erros de passe e construir oportunidades de arremesso em melhores condições. O aproveitamento nas tentativas de três pontos pode alterar rapidamente o ritmo de um confronto, mas a eficiência dentro do garrafão e o controle dos rebotes também desempenham papéis importantes. Os treinadores precisam administrar o tempo de quadra dos principais jogadores para preservar o rendimento durante uma sequência exigente de partidas. Além disso, a participação dos reservas pode ser decisiva quando surgem problemas com faltas ou queda de desempenho. Em jogos equilibrados, a capacidade de manter a concentração nos minutos finais costuma fazer diferença. As equipes que conseguirem combinar organização tática, intensidade física e boas decisões ofensivas terão mais condições de enfrentar os desafios da fase eliminatória.',
'https://admin.cnnbrasil.com.br/wp-content/uploads/sites/12/2023/05/flabasquete-e1684240026273.jpg?w=849&h=477&crop=0&quality=90'
),
(
'Vôlei brasileiro aposta no entrosamento para enfrentar grandes desafios',
'Vôlei',
'Preparação técnica e integração entre os jogadores estão entre as prioridades das equipes brasileiras. A eficiência no saque, a qualidade da recepção e a organização do bloqueio podem influenciar o desempenho nos próximos confrontos.',
'A preparação de uma equipe de vôlei para competições importantes exige dedicação aos fundamentos e construção de entrosamento entre os jogadores. A recepção tem papel essencial, pois permite que o levantador distribua as jogadas e explore diferentes alternativas ofensivas. Um saque eficiente, por sua vez, pode dificultar a organização adversária e criar oportunidades para o bloqueio. Os treinadores também trabalham a movimentação defensiva, a comunicação em quadra e a capacidade de reagir após perder uma sequência de pontos. Em partidas de alto nível, pequenas falhas de posicionamento podem comprometer uma jogada inteira, tornando a concentração um elemento indispensável. A preparação física precisa acompanhar as exigências de saltos, deslocamentos e mudanças rápidas de direção. Outro aspecto importante é a capacidade de adaptar a estratégia conforme as características do adversário. Com treinamento consistente e boa comunicação, as equipes procuram alcançar maior regularidade e chegar aos confrontos decisivos em condições de competir em alto nível.',
'https://lncimg.lance.com.br/cdn-cgi/image/width=750,quality=60,fit=pad,format=webp/uploads/2026/09/Bloqueio-do-Brasil-para-cima-de-Cugno-scaled-aspect-ratio-512-320.jpg'
),
(
'Fórmula 1 exige precisão das equipes na escolha dos pneus e estratégias',
'Fórmula 1',
'Engenheiros e pilotos analisam o desgaste dos pneus, as condições da pista e o comportamento dos carros para definir a melhor estratégia de corrida. Decisões tomadas durante a prova podem alterar significativamente o resultado final.',
'A preparação para uma corrida de Fórmula 1 envolve uma combinação de análise técnica, planejamento estratégico e capacidade de reação. As equipes estudam o comportamento dos pneus, a temperatura do asfalto e as características do circuito para encontrar um acerto competitivo. Em pistas com curvas rápidas, a estabilidade aerodinâmica pode ser decisiva, enquanto circuitos com curvas lentas exigem atenção especial à tração e à aceleração. Os dados obtidos durante os treinos ajudam os engenheiros a identificar pontos de melhoria e comparar o rendimento dos diferentes compostos de pneus. Durante a corrida, a estratégia de pit stops precisa considerar o desgaste dos pneus, o tráfego e as possíveis intervenções do safety car. Uma parada realizada no momento adequado pode ajudar o piloto a ganhar posições, mas uma decisão equivocada pode comprometer toda a prova. A comunicação entre piloto e equipe continua sendo fundamental para interpretar as condições da corrida e ajustar o planejamento conforme necessário.',
'https://lncimg.lance.com.br/cdn-cgi/image/width=750,quality=60,fit=pad,format=webp/uploads/2026/04/AFP__20260212__977Y7MC__v1__HighRes__AutoPrixF1BrnTest-scaled-aspect-ratio-512-320.jpg'
),
(
'Tênis profissional exige resistência física e concentração nos momentos decisivos',
'Tênis',
'Jogadores precisam combinar preparação física, consistência técnica e controle emocional para enfrentar partidas longas. A capacidade de adaptar o estilo de jogo às condições da quadra pode representar uma vantagem importante nos torneios.',
'O tênis profissional exige que os atletas mantenham um elevado nível de concentração mesmo quando uma partida apresenta mudanças constantes de ritmo. A preparação física permite sustentar deslocamentos rápidos, golpes repetidos e partidas que podem durar várias horas. Entretanto, a resistência precisa estar acompanhada de uma estratégia eficiente, capaz de aproveitar as características do adversário e as condições da quadra. O saque é um dos fundamentos mais importantes, pois pode facilitar a construção dos pontos e reduzir a pressão sobre o jogador. A movimentação também influencia o resultado, já que chegar bem posicionado à bola aumenta as possibilidades de executar golpes com precisão. Outro aspecto relevante é o controle emocional após erros ou oportunidades desperdiçadas. Em torneios com partidas consecutivas, a recuperação física e o planejamento dos treinamentos são essenciais. Os atletas que conseguem combinar consistência, inteligência tática e concentração encontram melhores condições para manter um desempenho competitivo ao longo da temporada.',
'https://blog.prospin.com.br/wp-content/uploads/2018/04/tenista-profissional-com-raquete-na-quadra-1-1200x480.jpg'
),
(
'Preparação estratégica ganha destaque antes dos eventos de MMA',
'MMA',
'Atletas e treinadores estudam diferentes possibilidades de combate para desenvolver estratégias mais eficientes. O condicionamento físico, a defesa e a capacidade de adaptação são aspectos importantes na preparação para os confrontos.',
'A preparação para uma luta de MMA reúne diferentes modalidades de treinamento e exige planejamento individualizado. Os atletas trabalham técnicas de trocação, defesa contra quedas, movimentação e controle no solo para responder às diferentes situações que podem surgir durante o combate. A análise do adversário permite identificar características de seu estilo e preparar alternativas para lidar com suas principais habilidades. O condicionamento físico também recebe atenção especial, pois os lutadores precisam administrar a energia ao longo dos rounds sem comprometer a execução técnica. Durante os treinamentos, a comissão técnica procura desenvolver a capacidade de adaptação, já que nem sempre a estratégia inicial funciona como esperado. A preparação inclui ainda descanso adequado, acompanhamento profissional e respeito aos procedimentos de segurança. O desempenho em uma competição depende da combinação entre treinamento consistente, disciplina e tomada de decisões sob pressão. A estratégia mais eficiente é aquela que considera as características do atleta e permite aproveitar suas qualidades sem ignorar os riscos apresentados pelo adversário.',
'https://blog.maximumshop.com.br/wp-content/uploads/2026/04/a-era-dos-reality-shows-e-a-popularizacao-do-mma-edited-1536x864.jpg'
),
(
'Ciclismo de estrada combina resistência, estratégia e trabalho em equipe',
'Ciclismo',
'Grandes provas de ciclismo exigem planejamento cuidadoso para enfrentar diferentes terrenos e condições climáticas. A distribuição de energia e a colaboração entre companheiros podem influenciar diretamente o desempenho durante o percurso.',
'O ciclismo de estrada é uma modalidade que exige resistência física, inteligência tática e excelente planejamento. Em provas longas, os atletas precisam administrar o esforço para manter um ritmo competitivo sem gastar energia excessiva antes dos trechos decisivos. O trabalho coletivo permite que os ciclistas protejam seus companheiros do vento, controlem o ritmo do pelotão e preparem oportunidades para ataques. Nas subidas, a inclinação do terreno e a capacidade de sustentar a potência influenciam a seleção dos atletas que permanecem na disputa. Em trechos planos, a organização do grupo pode favorecer velocidades elevadas e dificultar tentativas de fuga. Alimentação e hidratação também são fundamentais, pois ajudam a preservar o rendimento durante muitas horas de atividade. As equipes analisam o percurso antes da competição para identificar os pontos em que vale a pena acelerar ou economizar energia. No final, a combinação entre preparação individual e execução coletiva pode ser determinante para conquistar um resultado expressivo.',
'https://fpciclismo.org.br/wp-content/uploads/2025/07/2024estradmasc-1024x683.jpeg'
),
(
'Natação competitiva valoriza técnica e eficiência em cada movimento',
'Natação',
'Nadadores aperfeiçoam saídas, viradas e movimentos para buscar melhores tempos nas piscinas. A combinação entre velocidade, resistência e execução técnica pode fazer diferença em provas decididas por pequenas margens.',
'Na natação competitiva, o resultado depende da combinação entre força, resistência e eficiência técnica. A saída do bloco pode oferecer uma vantagem importante nos primeiros metros, enquanto a posição do corpo na água influencia a resistência enfrentada durante o deslocamento. Nas provas com viradas, a aproximação da parede e a impulsão após o contato também podem representar diferenças significativas no tempo final. Os treinadores observam a frequência das braçadas, a distância percorrida em cada ciclo e a manutenção da velocidade ao longo da prova. A preparação física precisa ser equilibrada com o aperfeiçoamento dos movimentos, pois aumentar a força sem preservar a técnica nem sempre produz os resultados esperados. A recuperação entre sessões de treinamento também merece atenção, principalmente durante períodos de preparação para competições importantes. Com acompanhamento especializado e ajustes constantes, os atletas procuram melhorar a eficiência de cada movimento e transformar o treinamento diário em resultados mais consistentes.',
'https://nadarcomsucesso.com.br/wp-content/uploads/2025/01/Alexandre-artigo-01-696x392.jpg'
),
(
'Handebol exige velocidade de decisão e organização coletiva em quadra',
'Handebol',
'Equipes trabalham a transição entre defesa e ataque para aproveitar oportunidades de pontuação. A comunicação entre os jogadores, a eficiência nas finalizações e o desempenho dos goleiros podem decidir partidas equilibradas.',
'O handebol é uma modalidade marcada pela velocidade das ações e pela necessidade de tomar decisões em poucos segundos. Quando uma equipe recupera a posse de bola, a transição rápida pode criar situações favoráveis antes que a defesa adversária consiga se organizar. Para aproveitar essas oportunidades, os jogadores precisam identificar espaços, escolher o melhor momento para passar e reconhecer quando existe uma chance de finalização. No sistema defensivo, o posicionamento coletivo ajuda a dificultar infiltrações e limitar os espaços próximos à área. O goleiro também exerce papel importante, tanto pelas defesas quanto pela possibilidade de iniciar contra-ataques. Em partidas equilibradas, os erros de passe e o aproveitamento das cobranças de sete metros podem influenciar diretamente o placar. Os treinadores procuram desenvolver estratégias que combinem intensidade e disciplina, permitindo que a equipe mantenha o controle mesmo diante de mudanças no ritmo do jogo. A preparação coletiva é fundamental para responder às diferentes situações encontradas durante uma competição.',
'https://cdn.atletis.com.br/atletis-website/base/f35/635/5c1/regras-handebol.jpg'
),
(
'Atletismo reúne diferentes estratégias para superar limites nas competições',
'Atletismo',
'Velocistas, fundistas e atletas de campo seguem programas específicos para desenvolver suas habilidades. A preparação técnica, o condicionamento físico e a recuperação adequada são fundamentais para buscar melhores resultados.',
'O atletismo reúne provas que exigem capacidades físicas e estratégias distintas, desde corridas de velocidade até saltos e lançamentos. Nos sprints, a largada e a aceleração inicial são elementos importantes para alcançar um bom desempenho. Nas provas de longa distância, a administração do ritmo e a resistência física ajudam os atletas a sustentar o esforço até a linha de chegada. Nos saltos e lançamentos, a coordenação dos movimentos e a precisão técnica influenciam diretamente os resultados. Os treinadores organizam os ciclos de preparação para desenvolver as capacidades necessárias em cada modalidade, considerando o calendário de competições e as características individuais dos atletas. A recuperação também é indispensável para que o corpo responda adequadamente à carga de treinamento. Durante as competições, a concentração e a capacidade de executar a técnica sob pressão podem representar diferenças importantes. O progresso no atletismo costuma ser resultado de planejamento de longo prazo, acompanhamento especializado e aperfeiçoamento contínuo.',
'https://s2-ge.glbimg.com/NRieOKdWChOvWvxThe2o_NeP4Mo=/0x0:4930x3237/984x0/smart/filters:strip_icc()/i.s3.glbimg.com/v1/AUTH_bc8228b6673f488aa253bbcb03c80ec5/internal_photos/bs/2021/Y/4/kYfX6gTHSIPZPg9wpYCg/2021-08-03t033344z-589451166-sp1eh8309w4f7-rtrmadp-3-olympics-2020-ath-m-400mhurd-fnl.jpg'
),
(
'Futebol feminino amplia visibilidade e fortalece o desenvolvimento de novos talentos',
'Futebol',
'O crescimento do interesse pelo futebol feminino aumenta a atenção sobre as competições e a formação de atletas. Investimentos em estrutura, treinamento e categorias de base são importantes para ampliar as oportunidades no esporte.',
'O futebol feminino vem conquistando mais espaço no debate esportivo e ampliando o interesse de torcedores, clubes e patrocinadores. O desenvolvimento da modalidade depende de iniciativas que fortaleçam as categorias de base, melhorem as condições de treinamento e ampliem o acesso das atletas a competições organizadas. A formação de jogadoras exige acompanhamento técnico, preparação física e oportunidades para adquirir experiência em diferentes níveis competitivos. Além disso, a divulgação dos campeonatos contribui para aproximar o público das equipes e criar novas referências para as próximas gerações. Os clubes também enfrentam o desafio de construir estruturas sustentáveis, capazes de oferecer continuidade ao trabalho e melhores condições profissionais. O crescimento da modalidade não depende apenas de grandes eventos, mas também da organização cotidiana das competições e da valorização das atletas. Com investimentos consistentes e maior visibilidade, o futebol feminino pode ampliar sua base de praticantes e fortalecer sua presença no cenário esportivo nacional e internacional.',
'https://gdia.com.br/images/noticias/6042/5e57bacca32f0756972ba1f10aee6b0b.webp'
),
(
'Basquete valoriza leitura tática e participação coletiva para superar defesas fortes',
'Basquete',
'A movimentação sem a bola e a escolha dos arremessos ajudam a construir ataques mais eficientes. As equipes procuram identificar as respostas defensivas dos adversários para encontrar espaços e criar oportunidades de pontuação.',
'O basquete moderno exige que os jogadores combinem habilidade individual com uma leitura constante das movimentações adversárias. Durante uma posse de bola, a equipe precisa identificar como a defesa reage aos bloqueios e decidir se vale a pena infiltrar, arremessar de longa distância ou movimentar a bola para outro companheiro. A movimentação sem a bola também é importante, pois cria dúvidas na marcação e abre espaços para finalizações. Na defesa, a comunicação durante as trocas de marcação e o controle dos rebotes ajudam a reduzir as oportunidades do adversário. O aproveitamento dos arremessos deve ser analisado junto com a qualidade das oportunidades criadas, já que nem toda tentativa difícil representa a melhor decisão. Os treinadores utilizam exercícios específicos para melhorar a tomada de decisão e aumentar a compreensão coletiva do jogo. Em partidas equilibradas, a paciência ofensiva e a capacidade de adaptar a estratégia podem fazer diferença nos minutos finais.',
'https://www.catapult.com/wp-content/uploads/2023/09/2023-AUGUST-Webinar-HubSpot-Thumbnail-1920px-x-1080px-072523-1024x576.jpg'
);
